'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Shield } from 'lucide-react';

interface SafetyScoreProps {
  score: number;
}

export function SafetyScore({ score }: SafetyScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Very Safe';
    if (score >= 60) return 'Safe';
    if (score >= 40) return 'Moderate';
    return 'Unsafe';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-500">
          Area Safety Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-slate-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Shield className={`h-6 w-6 ${getScoreColor(score)}`} />
              <span className={`mt-1 text-2xl font-bold ${getScoreColor(score)}`}>
                {score}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className={`text-lg font-semibold ${getScoreColor(score)}`}>
            {getScoreLabel(score)}
          </p>
          <p className="text-sm text-slate-500">
            Based on incident reports and analysis
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
