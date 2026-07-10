'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { BarChart, LineChart, PieChart, TrendingUp, AlertCircle, Shield } from 'lucide-react';
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

const stats = [
  {
    title: 'Total Incidents',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: AlertCircle,
    color: 'text-orange-600',
  },
  {
    title: 'Resolution Rate',
    value: '78%',
    change: '+5%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-green-600',
  },
  {
    title: 'Active Alerts',
    value: '23',
    change: '-3%',
    trend: 'down',
    icon: Shield,
    color: 'text-blue-600',
  },
  {
    title: 'Response Time',
    value: '4.2m',
    change: '-0.8m',
    trend: 'down',
    icon: TrendingUp,
    color: 'text-green-600',
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500">Safety insights and trends</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                    <p className={`mt-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Incident Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={incidentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="incidents" fill="#ef4444" name="Incidents" />
                  <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Monthly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={incidentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="incidents" stroke="#3b82f6" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Incident Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {categoryData.map((category) => (
              <div key={category.name} className="text-center">
                <p className="text-2xl font-bold text-slate-900">{category.value}%</p>
                <p className="text-sm text-slate-500">{category.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
