import React from 'react';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0F19] text-white p-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] bg-clip-text text-transparent">
          AEGIS Intelligent Safety
        </h1>
        <p className="text-lg text-gray-400">
          Enterprise-grade protective intelligence, real-time analytics, safe routing, and responsive SOS dispatch.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-[#0A84FF] hover:bg-[#0066CC] font-medium transition-all duration-150"
          >
            Enter Dashboard
          </a>
          <a
            href="/settings"
            className="px-6 py-3 rounded-lg bg-[#151D30] hover:bg-[#1E293B] border border-[#2A364F] font-medium transition-all duration-150"
          >
            Configure System
          </a>
        </div>
      </div>
    </main>
  );
}
