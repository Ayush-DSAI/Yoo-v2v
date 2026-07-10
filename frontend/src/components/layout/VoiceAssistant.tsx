'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { motion, AnimatePresence } from 'framer-motion';

export function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { isListening, transcript, error, toggleListening, speak } = useVoiceAssistant();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Mic className="h-5 w-5" />
        {isListening && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-14 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Voice Assistant</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Listening State */}
              <div className="flex items-center justify-center">
                <motion.button
                  onClick={toggleListening}
                  className={`h-16 w-16 rounded-full flex items-center justify-center transition-colors ${
                    isListening
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isListening ? (
                    <MicOff className="h-8 w-8 text-white" />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </motion.button>
              </div>

              {/* Status */}
              <div className="text-center">
                <p className="text-sm font-medium text-slate-900">
                  {isListening ? 'Listening...' : 'Tap to speak'}
                </p>
                {isListening && (
                  <motion.div
                    className="flex items-center justify-center gap-1 mt-2"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-4 bg-red-500 rounded-full"
                        animate={{
                          height: [4, 16, 4],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Transcript */}
              {transcript && (
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 italic">&quot;{transcript}&quot;</p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Commands */}
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs font-medium text-slate-500 mb-2">Try saying:</p>
                <div className="flex flex-wrap gap-1">
                  {['Open Maps', 'Open Reports', 'Safe Spaces', 'SOS'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => speak(`Opening ${cmd.toLowerCase()}`)}
                      className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
