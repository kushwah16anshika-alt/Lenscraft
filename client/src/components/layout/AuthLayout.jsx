import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Camera, Sparkles, ShieldCheck } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-zinc-50 text-zinc-900">
      {/* Left Form Area */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-xl mx-auto w-full">
        {/* Top Logo */}
        <div>
          <Link to="/" className="flex items-center gap-2.5 inline-flex group">
            <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center text-white shadow-xs">
              <Camera className="w-4 h-4 stroke-[1.75]" />
            </div>
            <span className="text-xl font-serif font-extrabold tracking-tight text-zinc-900">
              LENS<span className="text-zinc-400">·</span>CRAFT
            </span>
          </Link>
        </div>

        {/* Center Auth Outlet */}
        <div className="my-8">
          <Outlet />
        </div>

        {/* Footer info */}
        <div className="text-xs text-zinc-500 text-center sm:text-left flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
          <span>Protected by enterprise security & 100% verified talent escrow guarantee.</span>
        </div>
      </div>

      {/* Right Visual Showcase */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-zinc-950 border-l border-zinc-800">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
          alt="Creative editorial shoot"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity scale-102 transition-transform duration-10000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

        <div className="relative z-10 m-auto max-w-lg p-10 space-y-6 text-left text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-zinc-200 text-[11px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Curated Creative Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
            Where Exceptional Vision Meets Seamless Production.
          </h2>

          <p className="text-xs text-zinc-300 leading-relaxed">
            From intimate weddings and brand lookbooks to 4K cinematography and viral short-form color grading, LensCraft is the verified platform for world-class visual storytellers.
          </p>

          <div className="pt-4 flex items-center gap-8 border-t border-zinc-800">
            <div>
              <span className="text-2xl font-serif font-bold text-white block">4.96 / 5</span>
              <span className="text-[11px] text-zinc-400">Average Client Rating</span>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div>
              <span className="text-2xl font-serif font-bold text-white block">100%</span>
              <span className="text-[11px] text-zinc-400">Verified Portfolios</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
