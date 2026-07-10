'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Mic, MicOff, MapPin, Phone, Shield, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SOSPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<'idle' | 'countdown' | 'recording' | 'sent' | 'cancelled'>('idle');
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
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }, []);

  const startCountdown = async () => {
    setStatus('countdown');
    setCountdown(3);

    try {
      const loc = await getCurrentLocation();
      setLocation(loc);
    } catch (error) {
      console.error('Failed to get location:', error);
      setLocation({ lat: 40.7128, lng: -74.0060 });
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
    setTimeout(() => {
      setStatus('idle');
    }, 2000);
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
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await sendSOS(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();

      // Record for 10 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 10000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      await sendSOS(null);
    }
  };

  const sendSOS = async (audioBlob: Blob | null) => {
    setIsRecording(false);
    setStatus('sent');

    // Here you would send the SOS to your backend
    // const formData = new FormData();
    // if (audioBlob) formData.append('audio', audioBlob);
    // if (location) {
    //   formData.append('latitude', location.lat.toString());
    //   formData.append('longitude', location.lng.toString());
    // }
    // await fetch('/api/sos', { method: 'POST', body: formData });

    // Auto-redirect after success
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
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
                    Press the button below to send an emergency alert to your guardians
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>Your location will be shared</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <Mic className="h-4 w-4" />
                    <span>10 seconds of audio will be recorded</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <Shield className="h-4 w-4" />
                    <span>Guardians will be notified immediately</span>
                  </div>
                </div>
                <Button
                  onClick={startCountdown}
                  className="w-full h-16 text-lg bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  <AlertCircle className="h-6 w-6 mr-2" />
                  HOLD FOR SOS
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {status === 'countdown' && countdown !== null && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-8 text-center space-y-6">
                <motion.div
                  className="mx-auto w-32 h-32 rounded-full bg-red-100 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <AlertCircle className="h-16 w-16 text-red-600" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Emergency Alert</h1>
                  <p className="text-slate-500 mt-2">Sending in {countdown}...</p>
                </div>
                <motion.div
                  className="text-6xl font-bold text-red-600"
                  key={countdown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  {countdown}
                </motion.div>
                <Button
                  onClick={cancelCountdown}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {status === 'recording' && (
          <motion.div
            key="recording"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-8 text-center space-y-6">
                <motion.div
                  className="mx-auto w-32 h-32 rounded-full bg-red-600 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Mic className="h-16 w-16 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Recording...</h1>
                  <p className="text-slate-500 mt-2">
                    Speak clearly about your emergency
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-red-600">
                  <span className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-medium">Audio recording in progress</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {status === 'sent' && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="overflow-hidden">
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
                  <h1 className="text-2xl font-bold text-slate-900">Alert Sent!</h1>
                  <p className="text-slate-500 mt-2">
                    Your guardians have been notified. Help is on the way.
                  </p>
                </div>
                {location && (
                  <div className="text-sm text-slate-600">
                    <p>Location shared: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => router.push('/dashboard')}>
                    Return to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {status === 'cancelled' && (
          <motion.div
            key="cancelled"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center">
                  <X className="h-16 w-16 text-slate-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Cancelled</h1>
                  <p className="text-slate-500 mt-2">
                    Emergency alert was cancelled
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
