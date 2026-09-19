import React from 'react';
import { Link } from 'react-router-dom';
import { Aperture, ShieldCheck, Instagram, Youtube, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#080808] text-[#FBF9F5] pt-20 pb-12 text-left border-t border-[#262626] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Top Newsletter & Manifesto Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12 border-b border-[#262626] items-center">
          <div className="space-y-2">
            <p className="text-xs uppercase font-mono tracking-widest text-[#C5A059]">
              The Lenscraft Journal
            </p>
            <h3 className="text-2xl sm:text-4xl font-cinzel font-normal text-[#FBF9F5]">
              STEP INTO VISUAL STORYTELLING.
            </h3>
            <p className="text-xs sm:text-sm text-[#A39E93] max-w-md leading-relaxed">
              Join our curated dispatch to receive runway lookbooks, editorial spotlights, and newly inducted creator case studies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md lg:ml-auto w-full">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-2.5 rounded bg-[#111111] border border-[#262626] text-xs text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none focus:border-[#C5A059] transition-all"
              />
            </div>
            <button
              type="button"
              onClick={() => alert('Thank you for subscribing to the Lenscraft journal!')}
              className="px-6 py-2.5 rounded gold-btn text-xs uppercase tracking-wider font-semibold shrink-0"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#262626]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded bg-[#171717] border border-[#262626] group-hover:border-[#C5A059] flex items-center justify-center transition-colors">
                <Aperture className="w-4 h-4 text-[#C5A059]" />
              </div>
              <span className="text-xl font-cinzel font-semibold tracking-wider text-[#FBF9F5]">
                LENSCRAFT
              </span>
            </Link>
            <p className="text-xs text-[#A39E93] max-w-sm leading-relaxed">
              The premier creative marketplace connecting discerning couples, visionary brands, and global directors with verified Photographers, Cinematographers, and Master Editors.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-[#111111] border border-[#262626] text-[#A39E93] hover:text-[#DFCA9B] hover:border-[#C5A059] transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-[#111111] border border-[#262626] text-[#A39E93] hover:text-[#DFCA9B] hover:border-[#C5A059] transition-all"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-[#111111] border border-[#262626] text-[#A39E93] hover:text-[#DFCA9B] hover:border-[#C5A059] transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Disciplines */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-[#C5A059] mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A39E93]">
              <li>
                <Link to="/photographers" className="hover:text-[#FBF9F5] transition-colors">
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link to="/videographers" className="hover:text-[#FBF9F5] transition-colors">
                  4K Cinematography
                </Link>
              </li>
              <li>
                <Link to="/editors?type=photo" className="hover:text-[#FBF9F5] transition-colors">
                  High-End Retouching
                </Link>
              </li>
              <li>
                <Link to="/editors?type=video" className="hover:text-[#FBF9F5] transition-colors">
                  Video Color Grading
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-[#FBF9F5] transition-colors">
                  Complete Creator Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-[#C5A059] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A39E93]">
              <li>
                <Link to="/explore" className="hover:text-[#FBF9F5] transition-colors">
                  Explore Talent
                </Link>
              </li>
              <li>
                <Link to="/#stories" className="hover:text-[#FBF9F5] transition-colors">
                  Stories Worth Remembering
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="hover:text-[#FBF9F5] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/register?role=creator" className="hover:text-[#FBF9F5] transition-colors">
                  Join as a Creator
                </Link>
              </li>
            </ul>
          </div>

          {/* Escrow & Trust */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-[#C5A059] mb-4">
              Trust & Security
            </h4>
            <div className="space-y-3 text-xs text-[#A39E93]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <p>100% Escrow Milestone Payout Protection</p>
              </div>
              <p className="text-[11px] text-[#6B665E]">
                All transactions are encrypted and backed by our master delivery guarantee.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B665E]">
          <p>© {new Date().getFullYear()} Lenscraft Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#A39E93] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#A39E93] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#A39E93] cursor-pointer">Escrow Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
