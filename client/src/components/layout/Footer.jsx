import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ShieldCheck, Instagram, Youtube, Twitter, ArrowRight, Mail } from 'lucide-react';
import Button from '../common/Button';

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white pt-20 pb-12 text-left border-t border-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Split: Newsletter & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12 border-b border-[#242424] items-center">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C4683C] block">
              Editorial Roster & Visual Culture
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Curating India’s Most Exceptional Visual Storytellers.
            </h3>
            <p className="text-xs text-[#8C8276] max-w-md leading-relaxed">
              Receive private invitations to runway lookbooks, seasonal wedding masterclasses, and featured creator drops.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md lg:ml-auto w-full">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#8C8276] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-2.5 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-xs text-white placeholder-[#8C8276] focus:outline-none focus:border-[#C4683C] transition-all"
              />
            </div>
            <button
              type="button"
              className="px-5 py-2.5 rounded bg-white hover:bg-[#C4683C] text-[#121212] hover:text-white font-semibold text-xs transition-all shrink-0"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#242424]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#1F1F1F] border border-[#333333] flex items-center justify-center text-[#C4683C]">
                <Camera className="w-4 h-4 stroke-[1.75]" />
              </div>
              <span className="text-xl font-serif font-extrabold tracking-tight text-white">
                LENS<span className="text-[#C4683C]">·</span>CRAFT
              </span>
            </Link>
            <p className="text-xs text-[#8C8276] max-w-sm leading-relaxed">
              The premier editorial marketplace connecting couples, brands, and agencies with verified Photographers, Cinematographers, and Video Editors.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a href="#" className="p-2 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-[#8C8276] hover:text-[#C4683C] transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-[#8C8276] hover:text-[#C4683C] transition-colors">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-[#8C8276] hover:text-[#C4683C] transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Explore Mediums */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4683C] mb-4">
              Visual Mediums
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8C8276]">
              <li>
                <Link to="/photographers?category=weddings" className="hover:text-white transition-colors">
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link to="/videographers?category=pre-wedding" className="hover:text-white transition-colors">
                  Cinematic Pre-Wedding
                </Link>
              </li>
              <li>
                <Link to="/editors?category=reels-editing" className="hover:text-white transition-colors">
                  Reels & Shorts Editing
                </Link>
              </li>
              <li>
                <Link to="/photographers?category=commercial" className="hover:text-white transition-colors">
                  Product & Commercial Stills
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Turnkey Service Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Creator Hub */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4683C] mb-4">
              Creator Hub
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8C8276]">
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Apply as Photographer
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Apply as Videographer
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Apply as Video Editor
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Studio Workspace Login
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Curation & Equipment Bar
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Guarantee */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4683C] mb-4">
              Platform & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8C8276]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About LensCraft
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Concierge & Custom Briefs
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Escrow Guarantee Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Commercial Rights License
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Production
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6258]">
          <p>© {new Date().getFullYear()} LensCraft Technologies Inc. Vogue × Behance Inspired Creative Marketplace.</p>
          <div className="flex items-center gap-2 text-[#8C8276]">
            <ShieldCheck className="w-4 h-4 text-[#C4683C]" />
            <span>100% Curated & Identity-Verified Creative Roster</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
