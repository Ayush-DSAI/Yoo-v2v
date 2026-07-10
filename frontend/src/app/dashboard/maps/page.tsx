'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Navigation, Search, Layers } from 'lucide-react';

// Dynamic import of LiveMap to prevent SSR window reference error
const LiveMap = dynamic(
  () => import('@/components/LiveMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[500px] bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500 text-sm animate-pulse">Loading Map Viewport...</p>
        </div>
      </div>
    ),
  }
);

export default function MapsPage() {
  const [destination, setDestination] = useState('');
  const [showIncidents, setShowIncidents] = useState(true);
  const [showSafeSpaces, setShowSafeSpaces] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Safety Map</h1>
          <p className="text-slate-500">View incidents, safe spaces, and routes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Controls */}
        <Card className="lg:col-span-1 p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Destination</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
              <Button size="icon">
                <Navigation className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Map Layers</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="rounded border-slate-350 text-indigo-600 focus:ring-indigo-500"
                  checked={showIncidents}
                  onChange={(e) => setShowIncidents(e.target.checked)}
                />
                Incidents
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="rounded border-slate-350 text-indigo-600 focus:ring-indigo-500"
                  checked={showSafeSpaces}
                  onChange={(e) => setShowSafeSpaces(e.target.checked)}
                />
                Safe Spaces
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-medium mb-3">Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span>High Risk / Incident</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Safe Space</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Leaflet Dynamic Viewport */}
        <Card className="lg:col-span-3 h-[600px] overflow-hidden relative border shadow-sm rounded-xl">
          <LiveMap showIncidents={showIncidents} showSafeSpaces={showSafeSpaces} />
        </Card>
      </div>
    </div>
  );
}
