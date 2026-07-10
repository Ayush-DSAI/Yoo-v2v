'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Loader } from '@/components/ui/Loader';
import { MapPin, Navigation, Sparkles, ShieldCheck, AlertTriangle, TrendingUp, RotateCcw } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const DEV_JWT = process.env.NEXT_PUBLIC_DEV_JWT || '';

interface RouteAnalysis {
  safety_score: number;
  risk_level: string;
  explanation: string;
}

function RiskBadge({ level }: { level: string }) {
  const lowerLevel = level.toLowerCase();
  if (lowerLevel.includes('low')) return <Badge variant="success">Low Risk</Badge>;
  if (lowerLevel.includes('medium') || lowerLevel.includes('moderate'))
    return <Badge variant="warning">Moderate Risk</Badge>;
  if (lowerLevel.includes('high') || lowerLevel.includes('severe'))
    return <Badge variant="destructive">High Risk</Badge>;
  return <Badge variant="secondary">{level}</Badge>;
}

function ScoreRing({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));
  const color =
    clamped >= 70 ? '#22c55e' : clamped >= 40 ? '#eab308' : '#ef4444';
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#f1f5f9" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-slate-900">{clamped}</span>
        <span className="text-xs text-slate-500 font-medium">/ 100</span>
      </div>
    </div>
  );
}

export default function RouteAIPage() {
  const [srcLat, setSrcLat] = useState('');
  const [srcLng, setSrcLng] = useState('');
  const [dstLat, setDstLat] = useState('');
  const [dstLng, setDstLng] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RouteAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser or is restricted (non-secure HTTP context). Please enter coordinates manually.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSrcLat(pos.coords.latitude.toFixed(6));
        setSrcLng(pos.coords.longitude.toFixed(6));
      },
      (error) => {
        let errMsg = "Failed to get current location.";
        if (error.code === error.PERMISSION_DENIED) {
          errMsg = "Location access denied. Please enable location permissions or enter coordinates manually.";
        } else if (error.code === error.TIMEOUT) {
          errMsg = "Location request timed out. Please enter coordinates manually.";
        }
        alert(errMsg);
      },
      { timeout: 5000, enableHighAccuracy: true }
    );
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!srcLat || !srcLng || !dstLat || !dstLng) {
      setError('All four coordinate fields are required');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      /**
       * POST /api/routes/analyze
       * Body: JSON { source: { lat, lng }, destination: { lat, lng } }
       * Auth: Bearer token
       */
      const res = await fetch(`${API_URL}/api/routes/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DEV_JWT}`,
        },
        body: JSON.stringify({
          source: { lat: parseFloat(srcLat), lng: parseFloat(srcLng) },
          destination: { lat: parseFloat(dstLat), lng: parseFloat(dstLng) },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Backend error ${res.status}: ${text}`);
      }

      const json: RouteAnalysis = await res.json();
      setResult(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          AI Route Analyzer
        </h1>
        <p className="text-slate-500">
          Powered by Mistral AI via{' '}
          <span className="font-medium text-blue-600">POST /api/routes/analyze</span>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Route Coordinates
            </CardTitle>
            <CardDescription>
              Enter source and destination GPS coordinates to get an AI safety analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnalyze} className="space-y-5">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Source */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    Source Location
                  </label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={useCurrentLocation}
                    className="text-xs text-blue-600 h-7"
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    Use my location
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    step="any"
                    placeholder="Latitude"
                    value={srcLat}
                    onChange={(e) => setSrcLat(e.target.value)}
                    required
                  />
                  <Input
                    type="number"
                    step="any"
                    placeholder="Longitude"
                    value={srcLng}
                    onChange={(e) => setSrcLng(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <Navigation className="h-4 w-4 text-slate-400 rotate-90" />
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Destination */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  Destination Location
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    step="any"
                    placeholder="Latitude"
                    value={dstLat}
                    onChange={(e) => setDstLat(e.target.value)}
                    required
                  />
                  <Input
                    type="number"
                    step="any"
                    placeholder="Longitude"
                    value={dstLng}
                    onChange={(e) => setDstLng(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" loading={loading}>
                <Sparkles className="h-4 w-4 mr-2" />
                Analyze Route Safety
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result card */}
        <Card className={result ? 'border-blue-200' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Safety Analysis
            </CardTitle>
            <CardDescription>Mistral AI will evaluate the route and return a score</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 gap-4">
                <Loader size="lg" />
                <p className="text-sm text-slate-500 animate-pulse">Consulting Mistral AI…</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* Score ring */}
                <div className="text-center space-y-2">
                  <ScoreRing score={result.safety_score} />
                  <p className="text-sm font-medium text-slate-600">Safety Score</p>
                </div>

                {/* Risk level badge */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2">
                    {result.safety_score >= 70 ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                    )}
                    <span className="text-sm font-medium text-slate-700">Risk Level</span>
                  </div>
                  <RiskBadge level={result.risk_level} />
                </div>

                {/* AI explanation */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    AI Explanation
                  </div>
                  <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-4 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                <Button variant="outline" className="w-full" onClick={reset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Analyze Another Route
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 gap-3 text-slate-400">
                <Sparkles className="h-12 w-12 text-slate-200" />
                <p className="text-sm">Enter coordinates and click Analyze</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
