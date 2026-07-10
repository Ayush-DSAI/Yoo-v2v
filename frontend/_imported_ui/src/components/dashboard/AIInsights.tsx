'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, TrendingUp, AlertTriangle, Route } from 'lucide-react';

const insights = [
  {
    type: 'route',
    title: 'Route Recommendation',
    message: 'Alternative route is 15% safer than your usual path',
    icon: Route,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    type: 'alert',
    title: 'Risk Alert',
    message: 'Increased activity reported in your area after 8 PM',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    type: 'trend',
    title: 'Safety Trend',
    message: 'Your area safety score improved by 8% this week',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

export function AIInsights() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            AI Insights
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.type}
              className={`p-3 rounded-lg ${insight.bgColor} border border-transparent`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-white`}>
                  <Icon className={`h-4 w-4 ${insight.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-900">{insight.title}</p>
                  <p className="text-xs text-slate-600 mt-1">{insight.message}</p>
                </div>
              </div>
            </div>
          );
        })}
        <Button variant="outline" size="sm" className="w-full mt-2">
          View All Insights
        </Button>
      </CardContent>
    </Card>
  );
}
