import React from 'react';
import { ShieldCheck, Award, Users, Sparkles, Camera, Heart, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="space-y-16 pb-24 text-left">
      {/* Editorial Manifesto Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Editorial Manifesto</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Elevating the Standards of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Visual Storytelling.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            LensCraft was founded to bridge the gap between discerning clients, luxury brands, and celebrations with the most gifted Photographers, Cinematographers, and Video Editors.
          </p>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl glass-card space-y-4 shadow-xl hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Rigorous Curation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every creator on our platform undergoes a meticulous portfolio, gear bag, and identity audit by our senior creative board before joining the active roster.
            </p>
          </div>

          <div className="p-8 rounded-2xl glass-card space-y-4 shadow-xl hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400">
              <Award className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">100% Escrow Protection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No hidden surprise charges. Clear package tiering, deliverable counts, turnaround timelines, and milestone funds held in certified escrow until your delivery approval.
            </p>
          </div>

          <div className="p-8 rounded-2xl glass-card space-y-4 shadow-xl hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center text-violet-400">
              <Users className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Empowering Studios</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We provide independent creators with the digital studio infrastructure to manage shoot calendars, client call-sheets, milestone earnings, and direct cloud media deliveries.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Quote / Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl glass-panel text-center space-y-6 border-cyan-500/20 shadow-2xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">Platform Benchmarks</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white max-w-2xl mx-auto leading-snug">
            "Artistry without compromise. Trust without ambiguity."
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <span className="text-3xl font-serif font-bold text-white block">12,000+</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Frames Delivered</span>
            </div>
            <div>
              <span className="text-3xl font-serif font-bold text-white block">100%</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Escrow Bonded</span>
            </div>
            <div>
              <span className="text-3xl font-serif font-bold text-white block">48 Hours</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Teaser Speed</span>
            </div>
            <div>
              <span className="text-3xl font-serif font-bold text-white block">4.96 / 5</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Client Rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
