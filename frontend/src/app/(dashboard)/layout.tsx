'use client';

import { useState } from 'react';
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 overflow-x-hidden relative">
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
        />
      )}
      <main className="lg:ml-64 pt-16 min-h-screen min-w-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
