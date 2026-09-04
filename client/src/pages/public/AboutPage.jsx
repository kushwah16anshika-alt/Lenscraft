import React from 'react';
import { Camera, ShieldCheck, Award, Users, Sparkles, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="space-y-16 pb-24 text-left">
      {/* Editorial Manifesto Hero */}
      <section className="bg-[#121212] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#242424]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C4683C] text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial Manifesto</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Elevating the Standards of Visual Storytelling.
          </h1>
          <p className="text-sm sm:text-base text-[#8C8276] leading-relaxed max-w-2xl mx-auto">
            LensCraft was founded to bridge the gap between discerning clients, luxury brands, and celebrations with the most gifted Photographers, Cinematographers, and Video Editors.
          </p>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-white border border-[#E8E2D8] space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#C4683C]">
              <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#121212]">Rigorous Curation</h3>
            <p className="text-xs text-[#6B6258] leading-relaxed">
              Every creator on our platform undergoes a meticulous portfolio, gear bag, and identity audit by our senior creative board before joining the active roster.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white border border-[#E8E2D8] space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#C4683C]">
              <Award className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#121212]">100% Escrow Protection</h3>
            <p className="text-xs text-[#6B6258] leading-relaxed">
              No hidden surprise charges. Clear package tiering, deliverable counts, turnaround timelines, and milestone funds held in certified escrow until your delivery approval.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white border border-[#E8E2D8] space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E8E2D8] flex items-center justify-center text-[#C4683C]">
              <Users className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#121212]">Empowering Studios</h3>
            <p className="text-xs text-[#6B6258] leading-relaxed">
              We provide independent creators with the digital studio infrastructure to manage shoot calendars, client call-sheets, milestone earnings, and direct cloud media deliveries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
