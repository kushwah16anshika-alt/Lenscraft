import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Aperture, ShieldCheck, Star } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-[#FBF9F5] flex flex-col lg:flex-row">
      {/* ─────────────────────────────────────────────────────────────
          LEFT: Large Photography Composition (Cinematic Split Screen)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#111111]">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
          alt="Lenscraft Editorial"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40" />

        {/* Brand Overlay on Left */}
        <div className="absolute top-12 left-12 z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#080808] border border-[#262626] flex items-center justify-center">
              <Aperture className="w-4 h-4 text-[#C5A059]" />
            </div>
            <span className="text-xl font-cinzel font-bold tracking-widest text-[#FBF9F5]">
              LENSCRAFT
            </span>
          </Link>
        </div>

        {/* Editorial Quote at Bottom-Left */}
        <div className="absolute bottom-12 left-12 right-12 z-10 space-y-3 max-w-md">
          <p className="text-xs uppercase font-mono tracking-widest text-[#C5A059]">
            The Creative Standard
          </p>
          <h2 className="text-2xl sm:text-3xl font-cinzel text-[#FBF9F5] leading-snug">
            "Every frame holds an untold narrative waiting to be preserved."
          </h2>
          <div className="pt-2 flex items-center gap-4 text-xs text-[#A39E93]">
            <span className="flex items-center gap-1 text-[#DFCA9B]">
              <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" /> 4.96 / 5 Client Rating
            </span>
            <span>·</span>
            <span>100% Escrow Protection</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT: Minimalist Luxury Form Area
          ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-xl mx-auto w-full">
        {/* Top Logo for Mobile */}
        <div className="lg:hidden flex items-center justify-between pb-6 border-b border-[#262626]">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#171717] border border-[#262626] flex items-center justify-center">
              <Aperture className="w-3.5 h-3.5 text-[#C5A059]" />
            </div>
            <span className="text-lg font-cinzel font-bold tracking-wider text-[#FBF9F5]">
              LENSCRAFT
            </span>
          </Link>
        </div>

        {/* Center Outlet Container */}
        <div className="my-auto py-8">
          <Outlet />
        </div>

        {/* Bottom Escrow Security Guarantee */}
        <div className="pt-6 border-t border-[#262626] text-xs text-[#6B665E] flex items-center justify-center sm:justify-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>Protected by 100% Verified Talent Escrow Protocol.</span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
