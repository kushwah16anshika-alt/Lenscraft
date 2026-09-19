import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Aperture, ShieldCheck, Instagram, Youtube, Linkedin, Mail, ArrowRight, Sparkles, Camera } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    if (path.startsWith('/#')) {
      const sectionId = path.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-[#02050e] text-slate-300 pt-20 pb-12 text-left border-t border-sky-500/15 relative z-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-sky-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Top Newsletter / Dispatch Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12 border-b border-white/10 items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE VISUAL DISPATCH</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Stay immersed in timeless visual stories.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Subscribe to receive weekly curated photographer portfolios, editorial spotlights, and booking perks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-md lg:ml-auto w-full">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 rounded-full bg-midnight-950/80 border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>
            <button
              type="button"
              onClick={() => alert('Thank you for subscribing to LensCraft!')}
              className="px-6 py-3 rounded-full glow-btn-primary text-xs uppercase tracking-wider font-bold shrink-0 hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,210,255,0.4)]"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-400/40 group-hover:border-cyan-400 flex items-center justify-center transition-all">
                <Aperture className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-xl font-display font-bold tracking-wider text-white">
                LENSCRAFT
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The premier futuristic photography and creative storytelling platform connecting clients with world-class photographers, videographers, and editors.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass-panel border border-sky-500/20 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass-panel border border-sky-500/20 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
                title="YouTube"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass-panel border border-sky-500/20 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-cyan-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/photographers" className="hover:text-cyan-300 transition-colors">
                  Photographers
                </Link>
              </li>
              <li>
                <button onClick={() => handleNavClick('/#services')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/#portfolio')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/#stories')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  Stories
                </button>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400 mb-4">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/photographers?category=Wedding" className="hover:text-cyan-300 transition-colors">
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link to="/photographers?category=Portrait" className="hover:text-cyan-300 transition-colors">
                  Portrait & Editorial
                </Link>
              </li>
              <li>
                <Link to="/videographers" className="hover:text-cyan-300 transition-colors">
                  4K Videography
                </Link>
              </li>
              <li>
                <Link to="/editors?type=photo" className="hover:text-cyan-300 transition-colors">
                  Master Photo Editing
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-cyan-300 transition-colors">
                  Complete Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-400 mb-4">
              Trust & Guarantee
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-slate-300">100% Milestone Escrow Protected</p>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                All booking payments are held securely and released upon confirmed delivery of your edited media.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 LensCraft. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
