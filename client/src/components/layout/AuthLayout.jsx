import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Camera, Sparkles, ShieldCheck, Aperture, Star, CheckCircle2 } from 'lucide-react';
import CinematicCosmosBackground from '../common/CinematicCosmosBackground';

const AuthLayout = () => {
  return (
    <div className="min-h-screen relative flex bg-[#030712] text-white overflow-hidden">
      {/* Dynamic Cosmic Starfield Background */}
      <CinematicCosmosBackground />

      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left Form Area */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-xl mx-auto w-full relative z-10">
        {/* Top Logo */}
        <div>
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                <Aperture className="w-5 h-5 text-cyan-400 group-hover:rotate-90 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <span className="text-xl font-heading font-extrabold tracking-wider text-white flex items-center">
                LENS<span className="text-cyan-400 mx-0.5">·</span>CRAFT
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-mono block">
                CREATIVE PLATFORM
              </span>
            </div>
          </Link>
        </div>

        {/* Center Auth Outlet in Glass Panel */}
        <div className="my-8 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl shadow-black/60 relative">
          <Outlet />
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-400 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2 py-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Protected by 100% Verified Talent Escrow Guarantee.</span>
        </div>
      </div>

      {/* Right Visual Showcase */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden border-l border-white/10 bg-[#060c1d]/60 backdrop-blur-md">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
          alt="Creative editorial shoot"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity scale-102 transition-transform duration-10000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/40 to-[#030712]/90" />

        <div className="relative z-10 m-auto max-w-lg p-12 space-y-7 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curated Creative Syndicate</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
            Where Cinematic Vision Meets Milestone Production.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            From intimate editorial portraits and architectural campaigns to 8K master cinematography and DaVinci color grading, LensCraft unites visionaries with verified talent under a trust-protected escrow protocol.
          </p>

          <div className="pt-6 grid grid-cols-2 gap-4 border-t border-white/10">
            <div className="glass-card p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-xl font-heading font-bold text-white">4.96 / 5</span>
              </div>
              <span className="text-xs text-slate-400 block">Average Client Rating</span>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xl font-heading font-bold text-white">100%</span>
              </div>
              <span className="text-xs text-slate-400 block">Verified Portfolios & Gear</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
