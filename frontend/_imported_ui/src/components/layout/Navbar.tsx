'use client';

import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { VoiceAssistant } from './VoiceAssistant';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <VoiceAssistant />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
          U
        </div>
      </div>
    </header>
  );
}
