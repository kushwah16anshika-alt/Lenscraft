import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ShieldCheck, Instagram, Youtube, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#02040a] text-white pt-24 pb-12 text-left border-t border-sky-500/20 relative z-20 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Top Split: Newsletter & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12 border-b border-white/10 items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-300 text-[10px] font-mono font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE FUTURE OF PHOTOGRAPHY</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug">
              Step Into the World of Visionary Visual Storytelling.
            </h3>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Join our private dispatch to receive runway lookbooks, masterclass releases, and newly inducted creator portfolio showcases.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md lg:ml-auto w-full">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-sky-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-sky-500/25 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all shadow-inner"
              />
            </div>
            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-slate-900 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <Camera className="w-4.5 h-4.5 stroke-[1.75]" />
              </div>
              <span className="text-xl font-display font-extrabold tracking-tight text-white">
                LENS<span className="text-sky-400">·</span>CRAFT
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The premier futuristic creative platform connecting visionary couples, luxury brands, and global directors with certified Photographers, Cinematographers, and Visual Artists.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-sky-500/20 text-slate-400 hover:text-sky-400 hover:border-sky-400/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-sky-500/20 text-slate-400 hover:text-sky-400 hover:border-sky-400/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-sky-500/20 text-slate-400 hover:text-sky-400 hover:border-sky-400/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Disciplines */}
          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
              Explore Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/photographers?category=weddings" className="hover:text-sky-300 transition-colors">
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link to="/videographers?category=pre-wedding" className="hover:text-sky-300 transition-colors">
                  Cinematic Pre-Wedding
                </Link>
              </li>
              <li>
                <Link to="/photographers?category=commercial" className="hover:text-sky-300 transition-colors">
                  Product & Commercial
                </Link>
              </li>
              <li>
                <Link to="/editors?category=reels-editing" className="hover:text-sky-300 transition-colors">
                  Viral Reels & Post-Production
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-sky-300 transition-colors">
                  Turnkey Production Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-sky-300 transition-colors">
                  Home Discovery
                </Link>
              </li>
              <li>
                <Link to="/photographers" className="hover:text-sky-300 transition-colors">
                  Photographers Roster
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-sky-300 transition-colors">
                  Services & Experiences
                </Link>
              </li>
              <li>
                <Link to="/#portfolio" className="hover:text-sky-300 transition-colors">
                  Master Portfolio Gallery
                </Link>
              </li>
              <li>
                <Link to="/#stories" className="hover:text-sky-300 transition-colors">
                  Behind the Lens Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Guarantee */}
          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
              Trust & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-sky-300 transition-colors">
                  About LensCraft
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-300 transition-colors">
                  Creative Concierge & Briefs
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-sky-300 transition-colors">
                  Platform Architecture
                </Link>
              </li>
              <li>
                <a href="#plan-shoot" className="hover:text-sky-300 transition-colors">
                  Interactive Shoot Planner
                </a>
              </li>
              <li>
                <Link to="/register" className="hover:text-sky-300 transition-colors text-sky-400 font-semibold">
                  Apply to Creator Roster →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 LensCraft Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span className="font-mono text-[11px]">100% Escrow-Protected Global Creative Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

