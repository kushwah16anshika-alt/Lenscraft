import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Aperture, ShieldCheck, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import CinematicCosmosBackground from '../common/CinematicCosmosBackground';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-[#f8fafc] flex flex-col lg:flex-row relative overflow-hidden selection:bg-sky-500/30 selection:text-sky-200">
      {/* Background Animated Starlight & Glow */}
      <CinematicCosmosBackground />

      {/* ─────────────────────────────────────────────────────────────
          LEFT: Editorial Split Showcase (Desktop)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-midnight-950/80 border-r border-sky-500/15">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
          alt="Lenscraft Editorial"
          className="w-full h-full object-cover filter brightness-[0.42] contrast-110 scale-105 transition-transform duration-1000 hover:scale-100"
        />
        {/* Gradients & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-[#030712]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#030712]/90" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Overlay on Left */}
        <div className="absolute top-10 left-10 z-10">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-midnight-900/90 border border-sky-400/40 group-hover:border-cyan-400 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
              <Aperture className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <span className="text-xl font-display font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                LENSCRAFT
              </span>
              <p className="text-[9px] font-mono tracking-widest text-cyan-400/80 uppercase -mt-0.5">
                CREATIVE COLLECTIVE
              </p>
            </div>
          </Link>
        </div>

        {/* Glassmorphic Editorial Quote at Bottom-Left */}
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-sky-500/25 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,210,255,0.15)] space-y-4 max-w-lg">
            <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Creative Standard</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-white leading-snug">
              "Every frame holds an untold narrative waiting to be preserved in timeless clarity."
            </h2>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-sky-500/15">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.96 / 5 Client Rating</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>100% Escrow Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT: Glassmorphic Interactive Form Container
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-xl mx-auto w-full relative z-10">
        {/* Top Logo for Mobile */}
        <div className="lg:hidden flex items-center justify-between pb-6 border-b border-sky-500/15 mb-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-midnight-900/90 border border-sky-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,210,255,0.25)]">
              <Aperture className="w-4.5 h-4.5 text-cyan-400" />
            </div>
            <span className="text-lg font-display font-bold tracking-wider text-white">
              LENSCRAFT
            </span>
          </Link>
          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            SECURE PORTAL
          </span>
        </div>

        {/* Center Outlet Form */}
        <div className="my-auto py-4">
          <Outlet />
        </div>

        {/* Bottom Security Footer */}
        <div className="pt-6 border-t border-sky-500/15 text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-2 mt-6">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Protected by Verified Talent Escrow & 256-Bit SSL Protocol.</span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

