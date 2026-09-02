import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Camera, Sparkles, ShieldCheck } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#F7F5F2] text-[#171717]">
      {/* Left Form Area */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-xl mx-auto w-full">
        {/* Top Logo */}
        <div>
          <Link to="/" className="flex items-center gap-2.5 inline-flex group">
            <div className="w-9 h-9 rounded-md bg-[#171717] flex items-center justify-center text-white shadow-2xs">
              <Camera className="w-4.5 h-4.5 stroke-[1.75]" />
            </div>
            <span className="text-xl font-serif font-extrabold tracking-tight text-[#171717]">
              LENS<span className="text-[#B88A5A]">·</span>CRAFT
            </span>
          </Link>
        </div>

        {/* Center Auth Outlet */}
        <div className="my-8">
          <Outlet />
        </div>

        {/* Footer info */}
        <div className="text-xs text-[#8C8276] text-center sm:text-left flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B88A5A]" />
          <span>Protected by enterprise security & 100% verified talent escrow guarantee.</span>
        </div>
      </div>

      {/* Right Visual Showcase */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#171717] border-l border-[#E5E0D8]">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
          alt="Creative editorial shoot"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity scale-102 transition-transform duration-10000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/50 to-transparent" />

        <div className="relative z-10 m-auto max-w-lg p-10 space-y-6 text-left text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#262626] border border-[#3D3A37] text-[#B88A5A] text-[11px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Curated Creative Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
            Where Exceptional Vision Meets Seamless Production.
          </h2>

          <p className="text-xs text-[#D6CFC4] leading-relaxed">
            From intimate weddings and brand lookbooks to 4K cinematography and viral short-form color grading, LensCraft is the verified platform for world-class visual storytellers.
          </p>

          <div className="pt-4 flex items-center gap-8 border-t border-[#333333]">
            <div>
              <span className="text-2xl font-serif font-bold text-[#B88A5A] block">4.96 / 5</span>
              <span className="text-[11px] text-[#A39B91]">Average Rating</span>
            </div>
            <div className="w-px h-8 bg-[#333333]" />
            <div>
              <span className="text-2xl font-serif font-bold text-white block">100%</span>
              <span className="text-[11px] text-[#A39B91]">Verified Portfolios</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
