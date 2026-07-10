'use client';

import { useState, useCallback, useRef } from 'react';

interface VoiceCommand {
  command: string;
  action: () => void;
  keywords: string[];
}

export function useVoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const initializeRecognition = useCallback(() => {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript(result);
      
      if (event.results[current].isFinal) {
        processCommand(result);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setError(`Recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return recognition;
  }, []);

  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    const commands: VoiceCommand[] = [
      {
        command: 'open dashboard',
        action: () => window.location.href = '/dashboard',
        keywords: ['dashboard', 'home', 'main'],
      },
      {
        command: 'open maps',
        action: () => window.location.href = '/dashboard/maps',
        keywords: ['map', 'maps', 'location', 'navigate'],
      },
      {
        command: 'open reports',
        action: () => window.location.href = '/dashboard/reports',
        keywords: ['report', 'reports', 'incident'],
      },
      {
        command: 'open safe spaces',
        action: () => window.location.href = '/dashboard/safe-spaces',
        keywords: ['safe', 'spaces', 'safe spaces', 'hospital', 'police'],
      },
      {
        command: 'open analytics',
        action: () => window.location.href = '/dashboard/analytics',
        keywords: ['analytics', 'stats', 'statistics', 'charts'],
      },
      {
        command: 'trigger sos',
        action: () => {
          if (confirm('Are you sure you want to trigger SOS?')) {
            window.location.href = '/dashboard/sos';
          }
        },
        keywords: ['sos', 'emergency', 'help', 'alert'],
      },
      {
        command: 'search safe spaces',
        action: () => {
          window.location.href = '/dashboard/safe-spaces';
        },
        keywords: ['find', 'search', 'nearby', 'closest'],
      },
    ];

    for (const cmd of commands) {
      if (cmd.keywords.some((keyword) => lowerCommand.includes(keyword))) {
        cmd.action();
        return;
      }
    }

    // If no command matched, speak a response
    speak(`I didn't understand that command. Try saying "open maps" or "trigger SOS".`);
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }, []);

  const startListening = useCallback(() => {
    setError(null);
    setTranscript('');
    
    const recognition = recognitionRef.current || initializeRecognition();
    
    if (!recognition) {
      return;
    }

    recognitionRef.current = recognition;
    
    try {
      recognition.start();
      setIsListening(true);
      speak('Listening... What can I help you with?');
    } catch (err) {
      console.error('Failed to start recognition:', err);
      setError('Failed to start voice recognition');
    }
  }, [initializeRecognition, speak]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    toggleListening,
    speak,
    processCommand,
  };
}
