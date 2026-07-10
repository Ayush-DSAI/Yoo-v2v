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
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-900 tracking-tight">AEGIS</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link href="#overview" className="hover:text-slate-900 transition-colors">Overview</Link>
              <Link href="#features" className="hover:text-slate-900 transition-colors">Features</Link>
              <Link href="#community" className="hover:text-slate-900 transition-colors">Community</Link>
              <Link href="#tech" className="hover:text-slate-900 transition-colors">Tech</Link>
              <Link href="#resources" className="hover:text-slate-900 transition-colors">Resources</Link>
            </div>

            <div className="flex items-center">
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 font-semibold shadow-md transition-all">
                  GET THE APP
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      {/* Hero */}
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] text-slate-900 pointer-events-none" />
        
        {/* Colorful mesh gradient on the right */}
        <div className="absolute top-0 right-0 w-[50vw] h-full bg-gradient-to-bl from-pink-400 via-purple-400 to-blue-300 opacity-20 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-rose-400 to-orange-300 opacity-20 blur-3xl rounded-full transform translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="text-left space-y-6">
              <h1 className="text-6xl lg:text-[5.5rem] font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                Predict.<br />
                Protect.<br />
                Prevent.
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 max-w-md leading-relaxed">
                Your intelligent safety companion that analyzes risks, connects you with help, keeps you safe wherever you go.
              </p>
              
              <div className="pt-4">
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-6 text-lg font-bold shadow-lg transition-all transform hover:-translate-y-1">
                    Start Your Journey
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Interactive Mockups */}
            <div className="relative h-[500px] lg:h-[600px] w-full hidden lg:block perspective-1000">
              
              {/* Laptop Mockup */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-[16/10] bg-slate-900 rounded-t-2xl rounded-b-md shadow-2xl border-8 border-slate-800 flex flex-col overflow-hidden">
                <div className="h-4 bg-slate-800 flex items-center gap-1 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-slate-100 relative overflow-hidden flex">
                  {/* Sidebar mockup */}
                  <div className="w-1/4 bg-slate-900 border-r border-slate-700 p-4 space-y-4">
                    <div className="h-6 w-24 bg-blue-600/20 rounded-md" />
                    <div className="space-y-2 mt-8">
                      <div className="h-3 w-full bg-slate-800 rounded" />
                      <div className="h-3 w-3/4 bg-slate-800 rounded" />
                      <div className="h-3 w-5/6 bg-slate-800 rounded" />
                    </div>
                  </div>
                  {/* Map area mockup */}
                  <div className="flex-1 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=13&size=600x300&maptype=roadmap&style=feature:all|element:geometry.fill|color:0xf4f5f7')] bg-cover bg-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-48 h-32 border-2 border-blue-500 bg-blue-500/10 flex items-center justify-center relative">
                         <MapPin className="w-8 h-8 text-blue-600 absolute" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-6 bg-slate-300 w-[120%] -ml-[10%] rounded-b-xl shadow-inner relative z-10" />
              </div>

              {/* Phone Mockup */}
              <div className="absolute bottom-12 right-12 w-[180px] h-[360px] bg-white rounded-3xl shadow-2xl border-[6px] border-slate-800 overflow-hidden z-20 flex flex-col">
                <div className="h-5 bg-slate-800 w-full flex justify-center items-center rounded-b-xl mb-1 mx-auto max-w-[50%]">
                  <div className="w-10 h-2 bg-black rounded-full" />
                </div>
                <div className="flex-1 bg-blue-50 p-2 space-y-2 relative">
                  {/* Phone Map */}
                  <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=14&size=200x400&maptype=roadmap&style=feature:all|element:geometry.fill|color:0xf4f5f7')] bg-cover bg-center opacity-50" />
                  <div className="relative h-24 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-3 flex flex-col justify-between border border-white">
                    <div className="h-2 w-1/2 bg-slate-200 rounded" />
                    <div className="h-10 w-full bg-blue-100 rounded-lg" />
                  </div>
                  <div className="relative h-16 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-2 flex items-center gap-2 border border-white">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                       <AlertCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-3/4 bg-slate-200 rounded" />
                      <div className="h-2 w-1/2 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Widgets */}
              <motion.div 
                className="absolute top-1/4 -left-8 bg-white p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex items-center gap-3 border border-slate-100 z-30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-none">SOS Triggered</p>
                  <p className="text-[10px] text-slate-500 mt-1">Connecting to Guardians...</p>
                </div>
              </motion.div>

              <motion.div 
                className="absolute top-12 right-16 bg-white p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex items-center gap-3 border border-slate-100 z-30"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="h-8 w-8 rounded-full border-2 border-green-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-900">98</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-none">Safety Score</p>
                  <p className="text-[10px] text-slate-500 mt-1">Route is secure</p>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-1/4 -left-12 bg-blue-600 p-3 rounded-xl rounded-bl-sm shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex items-center gap-2 border border-blue-500 z-30"
                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <ShieldCheck className="h-3 w-3 text-white" />
                </div>
                <p className="text-xs font-medium text-white">"You've entered a Safe Zone"</p>
              </motion.div>

            </div>
            
          </div>
        </div>
      </section>

      {/* Features */}
      {/* Features */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-extrabold text-slate-900 tracking-widest uppercase mb-4">
              Everything you need to stay safe
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div key={feature.title} className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-transform hover:-translate-y-1">
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
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
