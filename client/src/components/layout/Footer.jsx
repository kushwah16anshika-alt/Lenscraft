import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ShieldCheck, Instagram, Youtube, Twitter, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const Footer = () => {
  return (
    <footer className="bg-[#171717] text-white pt-16 pb-12 text-left border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#262626]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[#262626] border border-[#333333] flex items-center justify-center text-[#B88A5A]">
                <Camera className="w-4.5 h-4.5 stroke-[1.75]" />
              </div>
              <span className="text-xl font-serif font-extrabold tracking-tight text-white">
                LENS<span className="text-[#B88A5A]">·</span>CRAFT
              </span>
            </Link>
            <p className="text-xs text-[#A39B91] max-w-sm leading-relaxed">
              The premier editorial marketplace connecting couples, luxury brands, and productions with elite Photographers, Cinematographers, and Post-Production Video Editors.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a href="#" className="p-2 rounded-md bg-[#262626] border border-[#333333] text-[#A39B91] hover:text-[#B88A5A] transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 rounded-md bg-[#262626] border border-[#333333] text-[#A39B91] hover:text-[#B88A5A] transition-colors">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 rounded-md bg-[#262626] border border-[#333333] text-[#A39B91] hover:text-[#B88A5A] transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B88A5A] mb-4">
              Explore Talent
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A39B91]">
              <li>
                <Link to="/photographers" className="hover:text-white transition-colors">
                  Wedding Photographers
                </Link>
              </li>
              <li>
                <Link to="/videographers" className="hover:text-white transition-colors">
                  Cinematographers & DPs
                </Link>
              </li>
              <li>
                <Link to="/editors" className="hover:text-white transition-colors">
                  Video & Reels Editors
                </Link>
              </li>
              <li>
                <Link to="/photographers?category=commercial" className="hover:text-white transition-colors">
                  Product & Commercial
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  All Service Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* For Creators */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B88A5A] mb-4">
              For Creators
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A39B91]">
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Join as Photographer
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Join as Videographer
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Join as Video Editor
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Creator Portal Login
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Curation & Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B88A5A] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A39B91]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About LensCraft
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Escrow Guarantee
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6258]">
          <p>© {new Date().getFullYear()} LensCraft Technologies Inc. Editorial Creative Platform.</p>
          <div className="flex items-center gap-2 text-[#A39B91]">
            <ShieldCheck className="w-4 h-4 text-[#B88A5A]" />
            <span>100% Curated & Identity Verified Creative Talent</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
