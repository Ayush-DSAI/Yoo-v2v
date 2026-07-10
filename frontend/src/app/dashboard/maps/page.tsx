'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MapPin, Navigation, Search, Layers } from 'lucide-react';

export default function MapsPage() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>({ lat: 40.7128, lng: -74.0060 });
  const [destination, setDestination] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMapLoaded(true);
        },
        () => {
          // Keep default location if blocked or failed
          setMapLoaded(true);
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      setMapLoaded(true);
    }
  }, []);

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
              {['Incidents', 'Safe Spaces', 'Traffic', 'Weather'].map((layer) => (
                <label key={layer} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" defaultChecked={layer === 'Incidents'} />
                  {layer}
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-medium mb-3">Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span>High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span>Moderate Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Safe Space</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span>Your Location</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-3 h-[600px] overflow-hidden relative bg-slate-100">
          {mapLoaded && currentLocation ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-lg font-medium text-slate-900">
                  Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                </p>
                <p className="text-slate-500 mt-2">
                  Map integration will be displayed here with Google Maps or Leaflet
                </p>
                <Button className="mt-4">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-slate-500">Loading map...</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
