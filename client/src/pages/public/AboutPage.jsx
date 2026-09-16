import React from 'react';
import { ShieldCheck, Award, Users, Sparkles } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="space-y-16 pb-24 text-left">
      {/* Editorial Manifesto Hero */}
      <section className="bg-zinc-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-[10px] font-semibold uppercase tracking-[0.2em] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial Manifesto</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Elevating the Standards of Visual Storytelling.
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            LensCraft was founded to bridge the gap between discerning clients, luxury brands, and celebrations with the most gifted Photographers, Cinematographers, and Video Editors.
          </p>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-white border border-zinc-200 space-y-4 shadow-subtle">
            <div className="w-12 h-12 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
              <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-zinc-900">Rigorous Curation</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Every creator on our platform undergoes a meticulous portfolio, gear bag, and identity audit by our senior creative board before joining the active roster.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white border border-zinc-200 space-y-4 shadow-subtle">
            <div className="w-12 h-12 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
              <Award className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-zinc-900">100% Escrow Protection</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              No hidden surprise charges. Clear package tiering, deliverable counts, turnaround timelines, and milestone funds held in certified escrow until your delivery approval.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white border border-zinc-200 space-y-4 shadow-subtle">
            <div className="w-12 h-12 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
              <Users className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-zinc-900">Empowering Studios</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We provide independent creators with the digital studio infrastructure to manage shoot calendars, client call-sheets, milestone earnings, and direct cloud media deliveries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
