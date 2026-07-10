'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, AlertCircle, MapPin, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const [navHovered, setNavHovered] = useState<string | null>(null);
  const [heroHovered, setHeroHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">AEGIS</span>
            </div>
            <div 
              className="relative flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/50"
              onMouseLeave={() => setNavHovered(null)}
            >
              {[
                { name: 'Sign In', href: '/login' },
                { name: 'Sign Up', href: '/register' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-1.5 text-sm font-semibold rounded-full text-slate-600 hover:text-slate-900 transition-colors z-10"
                  onMouseEnter={() => setNavHovered(item.name)}
                >
                  {navHovered === item.name && (
                    <motion.div
                      layoutId="navHover"
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50 pt-24 lg:pt-32 pb-24 lg:pb-32">
        {/* Soft background abstract blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-3xl -z-10" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -z-10 animate-bounce" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide">
                <ShieldCheck className="h-4 w-4" />
                AEGIS.SAFETY
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
                Predict.<br />
                Protect.<br />
                Prevent.
              </h1>
              <p className="text-xl text-slate-600 max-w-lg">
                Your intelligent safety companion that analyzes risks, connects you with help, and keeps you safe wherever you go.
              </p>
              
              <div className="inline-flex items-center justify-start">
                <div 
                  className="relative flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shadow-sm"
                  onMouseLeave={() => setHeroHovered(null)}
                >
                  {[
                    { name: 'Sign Up', href: '/register' },
                    { name: 'Sign In', href: '/login' },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative px-8 py-3 text-lg font-bold rounded-lg text-slate-600 transition-colors z-10"
                      onMouseEnter={() => setHeroHovered(item.name)}
                    >
                      {heroHovered === item.name && (
                        <motion.div
                          layoutId="heroHover"
                          className="absolute inset-0 bg-blue-600 rounded-lg -z-10 shadow-md"
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        />
                      )}
                      <span className={heroHovered === item.name ? 'text-white transition-colors duration-200' : 'text-slate-600'}>
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Floating Interactive Mockups */}
            <div className="relative h-[500px] lg:h-[600px] w-full hidden lg:block">
              {/* Central gradient shape representing the abstract background in the mockup */}
              <div className="absolute inset-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] shadow-2xl opacity-90 transform rotate-3" />
              
              {/* SOS Alert Float */}
              <motion.div 
                className="absolute top-1/4 -left-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">SOS Triggered</p>
                  <p className="text-xs text-slate-500">Connecting to Guardians...</p>
                </div>
              </motion.div>

              {/* Safety Score Float */}
              <motion.div 
                className="absolute top-1/2 -right-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="h-12 w-12 rounded-full border-4 border-green-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-slate-900">98</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Safety Score</p>
                  <p className="text-xs text-slate-500">Route is secure</p>
                </div>
              </motion.div>

              {/* Chat Bubble Float */}
              <motion.div 
                className="absolute bottom-1/4 left-8 bg-blue-600 p-4 rounded-2xl rounded-bl-sm shadow-xl flex items-center gap-3 border border-blue-500"
                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm font-medium text-white">"You've entered a Safe Zone"</p>
              </motion.div>

              {/* Map Marker Float */}
              <motion.div 
                className="absolute bottom-12 right-24 bg-white p-3 rounded-full shadow-xl border border-slate-100"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <MapPin className="h-8 w-8 text-purple-600" />
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to stay safe</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive safety features powered by AI and real-time data
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Smart Maps',
                description: 'Real-time safety maps showing incidents, safe spaces, and risk levels in your area.',
              },
              {
                icon: TrendingUp,
                title: 'AI Route Analysis',
                description: 'Get intelligent route recommendations based on safety scores and risk factors.',
              },
              {
                icon: AlertCircle,
                title: 'SOS Alerts',
                description: 'One-tap emergency alerts that notify your guardians with location and audio.',
              },
              {
                icon: Shield,
                title: 'Guardian Network',
                description: 'Connect with trusted contacts who can monitor your safety and respond to emergencies.',
              },
              {
                icon: Users,
                title: 'Community Reports',
                description: 'Share and view safety incidents to help keep your community informed and safe.',
              },
              {
                icon: ShieldCheck,
                title: 'Safe Spaces',
                description: 'Find nearby hospitals, police stations, and other safe locations instantly.',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to take control of your safety?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Join thousands of users who trust AEGIS for their personal safety.
          </p>
          <Link href="/register">
            <Button size="lg" className="h-12 px-8 text-lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-white" />
              <span className="text-lg font-bold text-white">AEGIS</span>
            </div>
            <p className="text-sm">© 2026 AEGIS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
