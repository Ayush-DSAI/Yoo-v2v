'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Loader } from '@/components/ui/Loader';
import { FileText, Plus, Search, Filter, MapPin, Camera, Upload, X, CheckCircle } from 'lucide-react';
import { reportCategories } from '@/constants/status';
import { formatRelativeTime } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const DEV_JWT = process.env.NEXT_PUBLIC_DEV_JWT || '';

interface Report {
  id: string | number;
  category: string;
  description: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  image_url?: string;
  created_at?: string;
  createdAt?: Date;
  verified?: boolean;
  status?: string;
}

export default function ReportsPage() {
  // ── List state ──────────────────────────────────────────────────────────
  const [reports, setReports] = useState<Report[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ── New report form state ────────────────────────────────────────────────
  const [showForm, setShowForm] = useState(false);
  const [formCategory, setFormCategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formImage, setFormImage] = useState<File | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  // ── Fetch reports from GET /api/reports (public) ─────────────────────────
  const fetchReports = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const res = await fetch(`${API_URL}/api/reports`);
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const json: Report[] = await res.json();
      setReports(json);
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Failed to load reports');
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // ── Submit new report to POST /api/reports (multipart/form-data) ──────────
  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCategory || !formDescription) {
      setFormError('Category and description are required');
      return;
    }

    setFormLoading(true);
    setFormError(null);

    try {
      const formData = new FormData();
      formData.append('category', formCategory);
      formData.append('description', formDescription);
      if (formAddress) formData.append('address', formAddress);
      if (formImage) formData.append('image', formImage);

      const res = await fetch(`${API_URL}/api/reports`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${DEV_JWT}` },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Backend error ${res.status}: ${text}`);
      }

      setFormSuccess(true);
      setFormCategory('');
      setFormDescription('');
      setFormAddress('');
      setFormImage(null);

      // Refresh the list
      await fetchReports();
      setTimeout(() => {
        setFormSuccess(false);
        setShowForm(false);
      }, 2000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to submit report');
    } finally {
      setFormLoading(false);
    }
  };

  // ── Filter logic ──────────────────────────────────────────────────────────
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.address ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Incident Reports</h1>
          <p className="text-slate-500">
            Live crowdsourced safety data and incidents
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>
              <X className="h-4 w-4 mr-2" /> Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" /> New Report
            </>
          )}
        </Button>
      </div>

      {/* New Report Form */}
      {showForm && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle>Submit New Report</CardTitle>
            <CardDescription>
              Posts <code className="text-xs bg-slate-100 px-1 rounded">multipart/form-data</code>{' '}
              to <code className="text-xs bg-slate-100 px-1 rounded">POST /api/reports</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {formSuccess ? (
              <div className="flex flex-col items-center gap-3 py-8 text-green-600">
                <CheckCircle className="h-12 w-12" />
                <p className="font-semibold">Report submitted successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4">
                {formError && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                    {formError}
                  </div>
                )}

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    required
                  >
                    <option value="">Select a category…</option>
                    {reportCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Description *</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows={3}
                    className="flex w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 resize-none"
                    placeholder="Describe the incident…"
                    required
                  />
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Address (optional)</label>
                  <Input
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="Street address or landmark"
                    icon={<MapPin className="h-4 w-4" />}
                  />
                </div>

                {/* Image upload */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">
                    Photo Evidence (optional)
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer rounded-lg border-2 border-dashed border-slate-200 p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <Camera className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {formImage ? formImage.name : 'Click to upload image'}
                      </p>
                      <p className="text-xs text-slate-400">JPG, PNG, WEBP — streamed to reports-images bucket</p>
                    </div>
                    {formImage && <Upload className="h-4 w-4 text-blue-500 ml-auto" />}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => setFormImage(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>

                <Button type="submit" className="w-full" loading={formLoading}>
                  Submit Report
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search reports…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge
              variant={!selectedCategory ? 'default' : 'secondary'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {reportCategories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reports list */}
      {listLoading ? (
        <div className="flex items-center justify-center h-48">
          <Loader size="lg" />
        </div>
      ) : listError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span className="font-medium">Error:</span> {listError}
          <Button variant="link" size="sm" onClick={fetchReports} className="ml-2">
            Retry
          </Button>
        </div>
      ) : filteredReports.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-slate-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p>No reports found. Be the first to submit one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredReports.map((report) => {
            const createdDate =
              report.created_at ? new Date(report.created_at) : report.createdAt ?? new Date();
            return (
              <Card key={report.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      {report.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={report.image_url}
                          alt="Report"
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <FileText className="h-6 w-6 text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900">
                          {reportCategories.find((c) => c.id === report.category)?.label ??
                            report.category}
                        </h3>
                        {report.verified !== undefined && (
                          <Badge variant={report.verified ? 'success' : 'warning'}>
                            {report.verified ? 'Verified' : 'Pending'}
                          </Badge>
                        )}
                        {report.status && (
                          <Badge variant="secondary">{report.status}</Badge>
                        )}
                      </div>
                      <p className="text-slate-600 mt-1">{report.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        {report.address && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {report.address}
                          </div>
                        )}
                        <span>{formatRelativeTime(createdDate)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
