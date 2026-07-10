'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Loader } from '@/components/ui/Loader';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { AlertCircle, FileText, Shield, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
} from 'recharts';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const DEV_JWT = process.env.NEXT_PUBLIC_DEV_JWT || '';

interface AnalyticsData {
  total_reports: number;
  active_sos_alerts: number;
  total_safe_spaces: number;
}

const incidentTrendData = [
  { month: 'Jan', incidents: 12, resolved: 8 },
  { month: 'Feb', incidents: 15, resolved: 12 },
  { month: 'Mar', incidents: 18, resolved: 15 },
  { month: 'Apr', incidents: 14, resolved: 11 },
  { month: 'May', incidents: 20, resolved: 17 },
  { month: 'Jun', incidents: 16, resolved: 14 },
];

const categoryData = [
  { name: 'Harassment', value: 35 },
  { name: 'Theft', value: 25 },
  { name: 'Assault', value: 15 },
  { name: 'Suspicious', value: 15 },
  { name: 'Other', value: 10 },
];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/analytics`, {
        headers: {
          Authorization: `Bearer ${DEV_JWT}`,
        },
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const json: AnalyticsData = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const statCards = data
    ? [
        {
          title: 'Total Reports',
          value: data.total_reports,
          icon: FileText,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          badge: null,
        },
        {
          title: 'Active SOS Alerts',
          value: data.active_sos_alerts,
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          badge:
            data.active_sos_alerts > 0 ? (
              <Badge variant="destructive" className="animate-pulse">
                LIVE
              </Badge>
            ) : null,
        },
        {
          title: 'Total Safe Spaces',
          value: data.total_safe_spaces,
          icon: Shield,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          badge: null,
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500">
            Real-time safety insights from{' '}
            <span className="font-medium text-blue-600">GET /api/analytics</span>
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchAnalytics}
          loading={loading}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span className="font-medium">Backend error:</span> {error}
        </div>
      )}

      {/* Live stat cards from API */}
      <div className="grid gap-6 md:grid-cols-3">
        {loading && !data ? (
          <div className="col-span-3 flex items-center justify-center h-32">
            <Loader size="lg" />
          </div>
        ) : (
          statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                      <p className="mt-2 text-3xl font-bold text-slate-900">
                        <AnimatedCounter end={stat.value} duration={1.2} />
                      </p>
                      <p className="mt-1 text-xs text-slate-400">Live from backend</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      {stat.badge}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <p className="text-xs text-slate-400">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      {/* Charts (static trend data) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Incident Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={incidentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar dataKey="incidents" fill="#ef4444" name="Incidents" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" fill="#22c55e" name="Resolved" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Monthly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={incidentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="incidents"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Incident Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {categoryData.map((category) => (
              <div key={category.name} className="text-center p-4 rounded-lg bg-slate-50">
                <p className="text-2xl font-bold text-slate-900">{category.value}%</p>
                <p className="text-sm text-slate-500 mt-1">{category.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
