import Link from 'next/link';
import { Shield, AlertCircle, MapPin, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
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
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
              <AlertCircle className="h-4 w-4" />
              AI-Powered Personal Safety
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Predict. Protect. Prevent.
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Your intelligent safety companion that analyzes risks, connects you with help, 
              and keeps you safe wherever you go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-lg bg-white text-blue-600 hover:bg-blue-50">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-white text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
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
                title: 'AI Risk Analysis',
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
            <p className="text-sm">© 2024 AEGIS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
