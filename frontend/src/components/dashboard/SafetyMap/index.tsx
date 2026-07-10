import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation2, AlertTriangle, Wifi, ZoomIn, ZoomOut, Layers, Maximize } from 'lucide-react';
import { styles } from './styles';
import { THREAT_MARKERS, SAFE_MARKERS, ROUTE_POINTS } from './constants';
import { MapSkeleton } from '../ui/Skeletons';
import { SafetyMapProps } from './types';

export const SafetyMap: React.FC<SafetyMapProps> = ({ loading: initialLoading, error, empty }) => {
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);

  // Simulate satellite connection link-up
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) return <MapSkeleton />;

  if (error) {
    return (
      <div className={styles.container}>
        <div className="p-6 text-red-550 text-center font-medium h-[400px] flex items-center justify-center flex-col gap-2">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          <p className="font-bold">Failed to load radar signals</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div className={styles.container}>
        <div className="p-6 text-gray-500 text-center font-medium h-[400px] flex items-center justify-center flex-col gap-2">
          <MapPin className="w-8 h-8 text-gray-400" />
          <p className="font-bold">No maps active</p>
          <p className="text-sm text-gray-500">Global navigation link is down.</p>
        </div>
      </div>
    );
  }

  const routePath = ROUTE_POINTS.map((p, i) =>
    i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`
  ).join(' ');

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 1.4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.8));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h3 className={styles.title}>Live Safety Map</h3>
            <p className={styles.subtitle}>Real-time routing and threat intelligence</p>
          </div>
          <div className={styles.controls}>
            <button className={styles.btnSecondary} onClick={() => alert('Layers: Topographic, Incident Heatmap, Safe Zones')}>
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4" /> Layers</span>
            </button>
            <button className={styles.btnPrimary} onClick={() => alert('Fullscreen: Entering Protected Map View')}>
              <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" /> Full Screen</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.mapViewport}>
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.loadingOverlay}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse">
                  <Navigation2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
                <p className="text-blue-400 font-semibold tracking-wide">ESTABLISHING SECURE LINK</p>
                <p className="text-sm text-gray-400 mt-1">Connecting to Aegis Satellite Cluster...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ scale: zoom }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Heatmap zones */}
          <div className="absolute w-[200px] h-[200px] rounded-full bg-red-500/5 blur-3xl" style={{ left: '18%', top: '25%' }} />
          <div className="absolute w-[150px] h-[150px] rounded-full bg-amber-500/5 blur-3xl" style={{ left: '60%', top: '45%' }} />
          <div className="absolute w-[180px] h-[180px] rounded-full bg-emerald-500/5 blur-3xl" style={{ left: '30%', top: '55%' }} />

          {/* Radar sweep */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, transparent 75%, rgba(59, 130, 246, 0.06) 100%)',
            }}
          />

          {/* Concentric boundary rings */}
          {[480, 360, 240, 120].map((size) => (
            <div key={size} className="absolute rounded-full border border-gray-800/40 pointer-events-none" style={{ width: size, height: size }} />
          ))}

          {/* AI recommended route (SVG overlay) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Route glow */}
            <motion.path
              d={routePath}
              fill="none"
              stroke="rgba(34, 197, 94, 0.25)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
            />
            {/* Route line */}
            <motion.path
              d={routePath}
              fill="none"
              stroke="rgba(34, 197, 94, 0.7)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="3 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
            />
          </svg>

          {/* Origin marker */}
          <motion.div
            className="absolute z-20 flex items-center gap-1.5"
            style={{ left: '13%', top: '76%' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 w-6 h-6 rounded-full bg-emerald-500/30"
              />
              <div className="w-6 h-6 rounded-full bg-emerald-500 border border-white shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center justify-center">
                <Navigation2 className="w-3 h-3 text-white fill-white rotate-45" />
              </div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-400 bg-gray-900/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-emerald-500/20">YOU</span>
          </motion.div>

          {/* Destination marker */}
          <motion.div
            className="absolute z-20 flex items-center gap-1.5"
            style={{ left: '80%', top: '20%' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <MapPin className="w-6 h-6 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
            <span className="text-[10px] font-semibold text-blue-400 bg-gray-900/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-blue-500/20">DEST</span>
          </motion.div>

          {/* Threat markers */}
          {THREAT_MARKERS.map((marker, i) => (
            <motion.div
              key={marker.id}
              className="absolute z-20 group cursor-pointer"
              style={{ left: marker.x, top: marker.y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.2, type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="absolute -inset-1.5 rounded-full bg-red-500/20"
              />
              <div className="w-5 h-5 rounded-full bg-red-500/90 border border-red-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                <AlertTriangle className="w-2.5 h-2.5 text-white" />
              </div>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] text-red-400 bg-gray-900/95 backdrop-blur-sm px-2 py-1 rounded border border-red-500/20 z-30 pointer-events-none">
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
                transition={{ delay: 1.6 + i * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center hover:bg-emerald-500/20 transition-colors">
                  <Icon className="w-2.5 h-2.5 text-emerald-400" />
                </div>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] text-emerald-400 bg-gray-900/95 backdrop-blur-sm px-2 py-1 rounded border border-emerald-500/20 z-30 pointer-events-none">
                  {marker.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Live connection badge */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-gray-800/80 backdrop-blur-sm border border-emerald-500/20 shadow-lg px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] font-semibold">LIVE</span>
            <span className="text-gray-400 text-[10px]">• 3 feeds active</span>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className={styles.zoomControls}>
          <button className={styles.controlBtn} onClick={handleZoomIn} aria-label="Zoom In Map">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button className={styles.controlBtn} onClick={handleZoomOut} aria-label="Zoom Out Map">
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
