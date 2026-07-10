'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bell, Shield, Lock, Globe, Moon, Smartphone } from 'lucide-react';

const toggleSettings = [
  {
    id: 'notifications',
    title: 'Push Notifications',
    description: 'Receive real-time safety alerts',
    icon: Bell,
    default: true,
  },
  {
    id: 'location',
    title: 'Location Tracking',
    description: 'Share your location with guardians',
    icon: Shield,
    default: true,
  },
  {
    id: 'twoFactor',
    title: 'Two-Factor Authentication',
    description: 'Add an extra layer of security',
    icon: Lock,
    default: false,
  },
  {
    id: 'darkMode',
    title: 'Dark Mode',
    description: 'Switch to dark theme',
    icon: Moon,
    default: false,
  },
  {
    id: 'language',
    title: 'Language',
    description: 'Select your preferred language',
    icon: Globe,
    default: true,
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState(
    toggleSettings.reduce((acc, setting) => {
      acc[setting.id] = setting.default;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleSetting = (id: string) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Customize your AEGIS experience</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Manage your app settings and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {toggleSettings.map((setting) => {
            const Icon = setting.icon;
            return (
              <div
                key={setting.id}
                className="flex items-center justify-between py-4 border-b border-slate-200 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <Icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium">{setting.title}</p>
                    <p className="text-sm text-slate-500">{setting.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting(setting.id)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    settings[setting.id] ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                      settings[setting.id] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-slate-500">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
