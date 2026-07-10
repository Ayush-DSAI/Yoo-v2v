'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Shield, Plus, Wifi, WifiOff } from 'lucide-react';
import type { GuardianStatus as GuardianStatusType } from '@/types';

interface GuardianStatusProps {
  status: GuardianStatusType;
}

export function GuardianStatus({ status }: GuardianStatusProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-500">
            Guardian Network
          </CardTitle>
          <Badge variant={status.isOnline ? 'success' : 'secondary'}>
            {status.isOnline ? 'Active' : 'Offline'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {status.guardians.length > 0 ? (
          <div className="space-y-3">
            {status.guardians.map((guardian) => (
              <div key={guardian.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{guardian.name}</p>
                    <p className="text-xs text-slate-500">{guardian.relationship}</p>
                  </div>
                </div>
                {guardian.isPrimary && (
                  <Badge variant="default" className="text-xs">Primary</Badge>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Shield className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500 mb-4">No guardians added yet</p>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Guardian
            </Button>
          </div>
        )}

        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <div className="flex items-center gap-2">
              {status.isOnline ? (
                <>
                  <Wifi className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-400">Disconnected</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
