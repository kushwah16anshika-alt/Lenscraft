import React from 'react';
import { Camera, ShieldCheck, Award, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B88A5A] block">
          Editorial Manifesto
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#171717] leading-tight">
          Elevating Creative Talent & Production Standards.
        </h1>
        <p className="text-sm text-[#6B6258] leading-relaxed">
          LensCraft was founded to bridge the gap between discerning clients, couples, and luxury brands with the world's most gifted photographers, cinematographers, and video editors.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-md bg-white border border-[#E5E0D8] space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A]">
            <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
          </div>
          <h3 className="text-base font-serif font-bold text-[#171717]">Rigorous Curation</h3>
          <p className="text-xs text-[#6B6258] leading-relaxed">
            Every creator on our platform undergoes a meticulous portfolio and identity audit to ensure top-tier artistic and professional fidelity.
          </p>
        </div>

        <div className="p-6 rounded-md bg-white border border-[#E5E0D8] space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A]">
            <Award className="w-5 h-5 stroke-[1.75]" />
          </div>
          <h3 className="text-base font-serif font-bold text-[#171717]">Transparent Pricing</h3>
          <p className="text-xs text-[#6B6258] leading-relaxed">
            No hidden charges or surprise surcharges. Clear package tiering, deliverable counts, turnaround timelines, and milestone escrow.
          </p>
        </div>

        <div className="p-6 rounded-md bg-white border border-[#E5E0D8] space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A]">
            <Users className="w-5 h-5 stroke-[1.75]" />
          </div>
          <h3 className="text-base font-serif font-bold text-[#171717]">Empowering Creators</h3>
          <p className="text-xs text-[#6B6258] leading-relaxed">
            We provide creators with the digital infrastructure to manage calendars, receive timely payouts, and scale their independent studio business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
