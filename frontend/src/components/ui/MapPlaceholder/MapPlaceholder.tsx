'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Shield, Hospital, Radio, Navigation2, AlertTriangle, Wifi } from 'lucide-react';
import { Badge } from '../Badge';

const THREAT_MARKERS = [
  { id: 1, x: '22%', y: '35%', type: 'alert' as const, label: 'Suspicious Activity' },
  { id: 2, x: '68%', y: '52%', type: 'alert' as const, label: 'Low Visibility Zone' },
  { id: 3, x: '45%', y: '72%', type: 'alert' as const, label: 'Reported Incident' },
];

const SAFE_MARKERS = [
  { id: 4, x: '35%', y: '28%', type: 'safe' as const, icon: Shield, label: 'Police Station' },
  { id: 5, x: '72%', y: '30%', type: 'safe' as const, icon: Hospital, label: 'City Hospital' },
  { id: 6, x: '55%', y: '45%', type: 'safe' as const, icon: Shield, label: 'Fire Dept' },
  { id: 7, x: '28%', y: '65%', type: 'safe' as const, icon: Radio, label: 'Comm Hub' },
];

const ROUTE_POINTS = [
  { x: 15, y: 80 }, { x: 25, y: 68 }, { x: 35, y: 55 },
  { x: 48, y: 48 }, { x: 60, y: 40 }, { x: 72, y: 35 },
  { x: 82, y: 25 },
];

export const MapPlaceholder = () => {
  const routePath = ROUTE_POINTS.map((p, i) =>
    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
  ).join(' ');

  return (
    <div className="absolute inset-0 z-0 bg-[#060912] flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />

      {/* Heatmap zones */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-danger/10 blur-3xl" style={{ left: '18%', top: '25%' }} />
      <div className="absolute w-[150px] h-[150px] rounded-full bg-warning/10 blur-3xl" style={{ left: '60%', top: '45%' }} />
      <div className="absolute w-[180px] h-[180px] rounded-full bg-safe/8 blur-3xl" style={{ left: '30%', top: '55%' }} />

      {/* Radar sweep */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 75%, rgba(59, 130, 246, 0.08) 100%)',
        }}
      />

      {/* Concentric boundary rings */}
      {[500, 380, 260, 140].map((size) => (
        <div key={size} className="absolute rounded-full border border-white/3" style={{ width: size, height: size }} />
      ))}

      {/* AI recommended route (SVG overlay) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Route glow */}
        <motion.path
          d={routePath}
          fill="none"
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' as const, repeatDelay: 2 }}
        />
        {/* Route line */}
        <motion.path
          d={routePath}
          fill="none"
          stroke="rgba(34, 197, 94, 0.8)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' as const, repeatDelay: 2 }}
        />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Origin marker */}
      <motion.div
        className="absolute z-20 flex items-center gap-1.5"
        style={{ left: '13%', top: '76%' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' as const, stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.8, 1.8], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 w-6 h-6 rounded-full bg-safe/40"
          />
          <div className="w-6 h-6 rounded-full bg-safe border-2 border-white shadow-[0_0_20px_rgba(34,197,94,0.6)] flex items-center justify-center">
            <Navigation2 className="w-3 h-3 text-white" />
          </div>
        </div>
        <span className="text-[10px] font-semibold text-safe bg-surface/80 backdrop-blur-sm px-1.5 py-0.5 rounded">YOU</span>
      </motion.div>

      {/* Destination marker */}
      <motion.div
        className="absolute z-20 flex items-center gap-1.5"
        style={{ left: '80%', top: '20%' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' as const, stiffness: 300, damping: 20 }}
      >
        <MapPin className="w-6 h-6 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        <span className="text-[10px] font-semibold text-primary bg-surface/80 backdrop-blur-sm px-1.5 py-0.5 rounded">DEST</span>
      </motion.div>

      {/* Threat markers */}
      {THREAT_MARKERS.map((marker, i) => (
        <motion.div
          key={marker.id}
          className="absolute z-20 group cursor-pointer"
          style={{ left: marker.x, top: marker.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 + i * 0.2, type: 'spring' as const, stiffness: 300, damping: 20 }}
        >
          <motion.div
            animate={{ scale: [1, 1.6, 1.6], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="absolute -inset-2 rounded-full bg-danger/30"
          />
          <div className="w-5 h-5 rounded-full bg-danger/90 border border-danger/50 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            <AlertTriangle className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="absolute left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] text-danger bg-surface/90 backdrop-blur-sm px-2 py-1 rounded border border-danger/20">
            {marker.label}
          </div>
        </motion.div>
      ))}

      {/* Safe markers */}
      {SAFE_MARKERS.map((marker, i) => {
        const Icon = marker.icon;
        return (
          <motion.div
            key={marker.id}
            className="absolute z-20 group cursor-pointer"
            style={{ left: marker.x, top: marker.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5 + i * 0.15, type: 'spring' as const, stiffness: 300, damping: 20 }}
          >
            <div className="w-5 h-5 rounded-full bg-safe/20 border border-safe/40 flex items-center justify-center">
              <Icon className="w-2.5 h-2.5 text-safe" />
            </div>
            <div className="absolute left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] text-safe bg-surface/90 backdrop-blur-sm px-2 py-1 rounded border border-safe/20">
              {marker.label}
            </div>
          </motion.div>
        );
      })}

      {/* Top-right map legend */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5">
        <Badge variant="glass" size="sm" className="bg-surface/70 backdrop-blur-md border-white/10 shadow-lg text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-safe mr-1.5 inline-block" /> Safe Zone
        </Badge>
        <Badge variant="glass" size="sm" className="bg-surface/70 backdrop-blur-md border-white/10 shadow-lg text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-danger mr-1.5 inline-block" /> Threat
        </Badge>
        <Badge variant="glass" size="sm" className="bg-surface/70 backdrop-blur-md border-white/10 shadow-lg text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 inline-block" /> AI Route
        </Badge>
      </div>

      {/* Bottom-left connection status */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-4 z-30"
      >
        <Badge variant="glass" className="bg-surface/70 backdrop-blur-md border-safe/20 shadow-lg gap-1.5">
          <Wifi className="w-3 h-3 text-safe" />
          <span className="text-safe text-[10px] font-semibold">LIVE</span>
          <span className="text-text-muted text-[10px]">• 3 feeds active</span>
        </Badge>
      </motion.div>
    </div>
  );
};
