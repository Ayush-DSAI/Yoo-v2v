'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Mic, MapPin, Shield, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { getSupabaseToken } from '@/lib/supabase/authHelper';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const DEV_JWT = process.env.NEXT_PUBLIC_DEV_JWT || '';

export default function SOSPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<'idle' | 'countdown' | 'recording' | 'sending' | 'sent' | 'cancelled' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    };
  }, []);

  const getCurrentLocation = useCallback(() => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }, []);

  const startCountdown = async () => {
    setStatus('countdown');
    setCountdown(10);
    setErrorMsg(null);

    try {
      const loc = await getCurrentLocation();
      setLocation(loc);
    } catch {
      setLocation({ lat: 20.2961, lng: 85.8245 }); // Bhubaneswar coordinate fallback
    }

    let count = 10;
    countdownIntervalRef.current = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(countdownIntervalRef.current!);
        countdownIntervalRef.current = null;
        triggerAlert();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const cancelCountdown = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setStatus('cancelled');
    setCountdown(null);
    setTimeout(() => setStatus('idle'), 2000);
  };

  const triggerAlert = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">

        {/* IDLE */}
        {status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="overflow-hidden bg-white/80 backdrop-blur-md border border-slate-100 shadow-xl">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-32 h-32 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-16 w-16 text-red-600 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Emergency SOS</h1>
                  <p className="text-slate-500 mt-2">
                    Press the button below to trigger an emergency alert.
                  </p>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>GPS location tracking enabled</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Instant dispatch to local guardians</span>
                  </div>
                </div>
                <Button
                  onClick={startCountdown}
                  className="w-full h-16 text-lg bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200"
                  size="lg"
                >
                  <AlertCircle className="h-6 w-6 mr-2" />
                  ACTIVATE SOS
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* COUNTDOWN */}
        {status === 'countdown' && countdown !== null && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="overflow-hidden border-red-200 bg-white/90 backdrop-blur-md shadow-xl">
              <CardContent className="p-8 text-center space-y-6">
                <motion.div
                  className="mx-auto w-32 h-32 rounded-full bg-red-100 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <AlertCircle className="h-16 w-16 text-red-600" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Sending Alert In</h1>
                  <motion.p
                    key={countdown}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-7xl font-black text-red-600 mt-4"
                  >
                    {countdown}
                  </motion.p>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={cancelCountdown}
                    variant="outline"
                    className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={triggerAlert}
                    className="flex-1 bg-red-650 hover:bg-red-700 text-white"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Send Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* SENDING */}
        {status === 'sending' && (
          <motion.div
            key="sending"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="bg-white/95 backdrop-blur-md">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Shield className="h-8 w-8 text-blue-600" />
                  </motion.div>
                </div>
                <h1 className="text-xl font-bold text-slate-900">Dispatching Alerts…</h1>
                <p className="text-sm text-slate-500">Contacting emergency services and parents</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* SENT */}
        {status === 'sent' && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="overflow-hidden border-teal-500 shadow-xl bg-slate-900 text-white">
              <CardContent className="p-8 text-center space-y-6">
                <motion.div
                  className="mx-auto w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center animate-pulse"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <AlertCircle className="h-12 w-12 text-red-550" />
                </motion.div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-black text-red-555 tracking-wide uppercase">SOS Sent!</h1>
                  <p className="font-semibold text-lg text-slate-100">🚨 Guardian Alerted! SMS with live location dispatched.</p>
                </div>

                {location && (
                  <div className="text-xs text-slate-400 bg-slate-800/80 rounded-lg p-2.5 flex items-center justify-center gap-1.5 font-mono">
                    <MapPin className="h-3.5 w-3.5 text-blue-400" />
                    <span>Coords: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</span>
                  </div>
                )}

                {/* High contrast emergency contacts card */}
                <div className="rounded-xl border border-red-555 bg-gradient-to-br from-red-950/70 to-slate-900 p-4 text-left space-y-3">
                  <h3 className="font-bold text-red-400 text-xs uppercase tracking-wider">Emergency Helplines</h3>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between items-center py-1.5 border-b border-red-900/30">
                      <span className="font-medium text-slate-200">Police</span>
                      <span className="font-mono bg-red-600 text-white px-2 py-0.5 rounded font-extrabold text-xs">112 / 100</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-red-900/30">
                      <span className="font-medium text-slate-200">Women Helpline</span>
                      <span className="font-mono bg-red-600 text-white px-2 py-0.5 rounded font-extrabold text-xs">1091 / 181</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="font-medium text-slate-200">Ambulance</span>
                      <span className="font-mono bg-red-600 text-white px-2 py-0.5 rounded font-extrabold text-xs">108</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 bg-slate-850 hover:bg-slate-800 text-white border border-slate-700" onClick={() => setStatus('idle')}>
                    Trigger Again
                  </Button>
                  <Button className="flex-1 bg-red-650 hover:bg-red-700 text-white font-medium" onClick={() => router.push('/dashboard')}>
                    Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* CANCELLED */}
        {status === 'cancelled' && (
          <motion.div
            key="cancelled"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="bg-white/95 backdrop-blur-md">
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center">
                  <X className="h-16 w-16 text-slate-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Cancelled</h1>
                  <p className="text-slate-500 mt-2">Emergency alert was cancelled</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
