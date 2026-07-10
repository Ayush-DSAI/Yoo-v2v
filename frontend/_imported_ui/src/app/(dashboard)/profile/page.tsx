'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Mail, Phone, Shield, Plus, Trash2 } from 'lucide-react';

const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234-567-8900',
  avatar: null,
};

const mockGuardians = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+1 234-567-8901',
    relationship: 'Spouse',
    isPrimary: true,
  },
  {
    id: '2',
    name: 'Robert Doe',
    email: 'robert@example.com',
    phone: '+1 234-567-8902',
    relationship: 'Father',
    isPrimary: false,
  },
];

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(mockUser);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500">Manage your account settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic account details</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
                {editing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {formData.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{formData.name}</h3>
                <p className="text-sm text-slate-500">{formData.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  icon={<User className="h-4 w-4" />}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  icon={<Mail className="h-4 w-4" />}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  icon={<Phone className="h-4 w-4" />}
                  disabled={!editing}
                />
              </div>
            </div>

            {editing && (
              <div className="flex gap-2 pt-4">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Guardians */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Guardians</CardTitle>
                <CardDescription>Emergency contacts who can help you</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Guardian
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockGuardians.map((guardian) => (
              <div
                key={guardian.id}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium">{guardian.name}</p>
                    <p className="text-sm text-slate-500">{guardian.relationship}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {guardian.isPrimary && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Primary
                    </span>
                  )}
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
