'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { reportCategories } from '@/constants/status';
import { MapPin, Camera, UserX, ArrowLeft } from 'lucide-react';

export default function NewReportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    address: '',
    isAnonymous: false,
  });
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (err) {
      setError('Failed to get current location');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    if (!location) {
      setError('Please enable location access');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reportData = {
        ...formData,
        latitude: location.lat,
        longitude: location.lng,
      };

      // TODO: Upload image if exists
      // TODO: Send to API
      console.log('Submitting report:', reportData);

      router.push('/dashboard/reports');
    } catch (err) {
      setError('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Report</h1>
          <p className="text-slate-500">File an incident report</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Incident Details</CardTitle>
          <CardDescription>
            Provide accurate information to help keep the community safe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {reportCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: category.id })}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      formData.category === category.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="flex min-h-[120px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe what happened in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Address or location name"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  icon={<MapPin className="h-4 w-4" />}
                />
                <Button type="button" variant="outline" onClick={getCurrentLocation}>
                  Use Current
                </Button>
              </div>
              {location && (
                <p className="text-xs text-green-600">
                  Location captured: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Evidence Photo (Optional)</label>
              <div className="flex items-center gap-4">
                <label className="flex-1 flex items-center justify-center h-24 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-slate-300 transition-colors">
                  <div className="text-center">
                    <Camera className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">
                      {imageFile ? imageFile.name : 'Click to upload photo'}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-lg">
              <input
                type="checkbox"
                id="isAnonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isAnonymous" className="flex items-center gap-2 text-sm">
                <UserX className="h-4 w-4" />
                Submit anonymously
              </label>
            </div>

            {/* Submit */}
            <div className="flex gap-2 pt-4">
              <Button type="submit" loading={loading} className="flex-1">
                Submit Report
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
