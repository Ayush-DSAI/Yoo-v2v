'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { FileText, Plus, Search, Filter, MapPin, Camera } from 'lucide-react';
import { reportCategories } from '@/constants/status';
import { formatRelativeTime } from '@/lib/utils';

const mockReports = [
  {
    id: '1',
    category: 'harassment',
    description: 'Verbal harassment near metro station',
    address: 'Downtown Metro Station',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    verified: false,
    status: 'pending',
  },
  {
    id: '2',
    category: 'unsafe_area',
    description: 'Poor lighting in parking area',
    address: 'West Side Parking Lot',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    verified: true,
    status: 'reviewed',
  },
  {
    id: '3',
    category: 'suspicious_activity',
    description: 'Suspicious person following pedestrians',
    address: 'Main Street',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    verified: true,
    status: 'resolved',
  },
];

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Incident Reports</h1>
          <p className="text-slate-500">View and manage safety reports</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
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

      {/* Reports List */}
      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900">
                      {reportCategories.find((c) => c.id === report.category)?.label || report.category}
                    </h3>
                    <Badge variant={report.verified ? 'success' : 'warning'}>
                      {report.verified ? 'Verified' : 'Pending'}
                    </Badge>
                    <Badge variant="secondary">{report.status}</Badge>
                  </div>
                  <p className="text-slate-600 mt-1">{report.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {report.address}
                    </div>
                    <span>{formatRelativeTime(report.createdAt)}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
