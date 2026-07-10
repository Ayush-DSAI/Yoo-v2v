'use client';

import React, { useState } from 'react';
import { NavbarProps } from '../../../types/layout';

export const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen, className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const notifications = 3;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm ${className || ''}`}>
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Left Section - Logo & Search */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">AEGIS</h1>
                <p className="text-xs text-gray-500 -mt-1">Command Center</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center ml-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locations, alerts, users..."
                  className="w-80 lg:w-96 pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
 
          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Actions */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Quick Report
            </button>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Settings */}
            <button className="hidden md:block p-2.5 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
 
            {/* Profile */}
            <div className="hidden sm:flex items-center gap-3 ml-2 pl-2 border-l border-gray-200">
              <div className="hidden lg:block text-right">
                <p className="text-sm font-medium text-gray-900">Alex Morgan</p>
                <p className="text-xs text-gray-500">Security Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                AM
              </div>
            </div>
 
            {/* SOS Button */}
            <button className="ml-1 sm:ml-2 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-200 hover:shadow-red-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="hidden xs:inline sm:inline">SOS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </>
  );
};
