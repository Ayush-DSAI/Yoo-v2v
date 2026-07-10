'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Mic, MapPin, Shield, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const DEV_JWT = process.env.NEXT_PUBLIC_DEV_JWT || '';

export default function SOSPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<'idle' | 'countdown' | 'recording' | 'sending' | 'sent' | 'cancelled' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    setCountdown(3);
    setErrorMsg(null);

    try {
      const loc = await getCurrentLocation();
      setLocation(loc);
    } catch {
      // Fall back to a default; the backend will still receive the SOS
      setLocation({ lat: 40.7128, lng: -74.006 });
    }

    let count = 3;
    countdownIntervalRef.current = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(countdownIntervalRef.current!);
        startRecording();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const cancelCountdown = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    setStatus('cancelled');
    setCountdown(null);
    setTimeout(() => setStatus('idle'), 2000);
  };

  const startRecording = async () => {
    setStatus('recording');
    setIsRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach((t) => t.stop());
        await sendSOS(audioBlob);
      };

      mediaRecorder.start();
      // Record for 10 seconds then auto-stop
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') mediaRecorder.stop();
      }, 10000);
    } catch {
      // Microphone not available — still send SOS without audio
      await sendSOS(null);
    }
  };

  /**
   * POST multipart/form-data to FastAPI POST /api/sos
   * Fields: latitude, longitude, audio (optional file)
   */
  const sendSOS = async (audioBlob: Blob | null) => {
    setIsRecording(false);
    setStatus('sending');

    try {
      const formData = new FormData();
      if (location) {
        formData.append('latitude', location.lat.toString());
        formData.append('longitude', location.lng.toString());
      }
      if (audioBlob) {
        formData.append('audio', audioBlob, 'sos_audio.webm');
      }

      const res = await fetch(`${API_URL}/api/sos`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${DEV_JWT}` },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Backend error ${res.status}: ${text}`);
      }

      setStatus('sent');
      setTimeout(() => router.push('/dashboard'), 4000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send SOS');
      setStatus('error');
    }
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
            <Card className="overflow-hidden">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-32 h-32 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-16 w-16 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Emergency SOS</h1>
                  <p className="text-slate-500 mt-2">
                    Press the button below to send an emergency alert. Your location and 10s of audio will be captured.
                  </p>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>GPS location will be attached</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Sent to <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">POST /api/sos</code></span>
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
            <Card className="overflow-hidden border-red-200">
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
                <Button
                  onClick={cancelCountdown}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  size="lg"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* RECORDING */}
        {status === 'recording' && (
          <motion.div
            key="recording"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="overflow-hidden border-red-200">
              <CardContent className="p-8 text-center space-y-6">
                <motion.div
                  className="mx-auto w-32 h-32 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-200"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Mic className="h-16 w-16 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Recording Audio…</h1>
                  <p className="text-slate-500 mt-2">Speak clearly about your emergency</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-red-600 font-medium">
                  <span className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
                  Audio recording in progress (10s)
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
            <Card>
              <CardContent className="p-8 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Shield className="h-8 w-8 text-blue-600" />
                  </motion.div>
                </div>
                <h1 className="text-xl font-bold text-slate-900">Sending to backend…</h1>
                <p className="text-sm text-slate-500">Uploading audio and location data</p>
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
            <Card className="overflow-hidden border-green-200">
              <CardContent className="p-8 text-center space-y-6">
                <motion.div
                  className="mx-auto w-32 h-32 rounded-full bg-green-100 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <Check className="h-16 w-16 text-green-600" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">SOS Sent!</h1>
                  <p className="text-slate-500 mt-2">Emergency alert dispatched to backend.</p>
                </div>
                {location && (
                  <div className="text-sm text-slate-500 bg-slate-50 rounded-lg p-3">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                  </div>
                )}
                <Button className="w-full" onClick={() => router.push('/dashboard')}>
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ERROR */}
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="overflow-hidden border-red-200">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-32 h-32 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="h-16 w-16 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Failed to Send</h1>
                  <p className="text-sm text-red-600 mt-2 bg-red-50 rounded-lg p-3">{errorMsg}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStatus('idle')}>
                    Try Again
                  </Button>
                  <Button className="flex-1" onClick={() => router.push('/dashboard')}>
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
            <Card>
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
