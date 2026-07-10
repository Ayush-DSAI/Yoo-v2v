'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Cloud, Thermometer, Droplets, Sun, Moon } from 'lucide-react';

const mockWeather = {
  temperature: 24,
  condition: 'Partly Cloudy',
  humidity: 65,
  isDay: true,
};

export function Environment() {
  const WeatherIcon = mockWeather.isDay ? Sun : Moon;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-500">
          Environment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <WeatherIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {mockWeather.temperature}°C
              </p>
              <p className="text-sm text-slate-500">{mockWeather.condition}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs text-slate-500">Humidity</p>
              <p className="text-sm font-medium">{mockWeather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-orange-600" />
            <div>
              <p className="text-xs text-slate-500">Feels Like</p>
              <p className="text-sm font-medium">{mockWeather.temperature + 2}°C</p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Visibility Impact</span>
            <span className="text-green-600 font-medium">Good</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Weather conditions are favorable for outdoor activities
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
