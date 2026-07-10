'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FileText, ChevronRight, MapPin } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import type { Report } from '@/types';
import { reportCategories } from '@/constants/status';

interface RecentReportsProps {
  reports: Report[];
}

export function RecentReports({ reports }: RecentReportsProps) {
  const getCategoryIcon = (categoryId: string) => {
    const category = reportCategories.find((c) => c.id === categoryId);
    return category ? category.icon : 'alert-circle';
  };

  if (reports.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Reports</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">No recent reports</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Reports</CardTitle>
          <Button variant="ghost" size="sm">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.slice(0, 5).map((report) => (
            <div
              key={report.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {report.category}
                  </p>
                  <Badge variant={report.verified ? 'success' : 'secondary'} className="text-xs">
                    {report.verified ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <p className="text-xs text-slate-500 truncate">
                    {report.address || 'Location unavailable'}
                  </p>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {formatRelativeTime(report.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}