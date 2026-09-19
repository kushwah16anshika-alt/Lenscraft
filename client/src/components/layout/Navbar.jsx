import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Calendar,
  Aperture,
  Compass,
  ArrowRight,
  Shield,
  Camera,
  Video,
  Film,
  CircleDot,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Avatar from '../common/Avatar';
import CreatorOnboardingModal from '../common/CreatorOnboardingModal';
import AiMatchmakerModal from '../common/AiMatchmakerModal';
import BookingModal from '../common/BookingModal';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';

const Navbar = () => {
  const { user, isAuthenticated, logout, quickDemoLogin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerModalOpen, setMatchmakerModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const demoDropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (demoDropdownRef.current && !demoDropdownRef.current.contains(e.target)) {
        setDemoDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setDemoDropdownOpen(false);
  }, [location.pathname]);

  const getDashboardPath = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return '/admin/dashboard';
      case ROLES.PHOTOGRAPHER:
      case ROLES.VIDEOGRAPHER:
      case ROLES.EDITOR:
        return '/professional/dashboard';
      case ROLES.USER:
      default:
        return '/user/dashboard';
    }
  };

  const navLinks = [
    { label: 'Photographers', path: '/photographers', code: '01' },
    { label: 'Videographers', path: '/videographers', code: '02' },
    { label: 'Editors', path: '/editors', code: '03' },
    { label: 'Services', path: '/services', code: '04' },
    { label: 'About', path: '/about', code: '05' },
    { label: 'Contact', path: '/contact', code: '06' },
  ];

  const handleBookShoot = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('plan-shoot');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    setBookingModalOpen(true);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#02040a]/95 backdrop-blur-2xl border-b border-cyan-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(6,182,212,0.1)] py-2.5'
            : 'bg-[#02040a]/80 backdrop-blur-xl border-b border-cyan-500/15 py-3.5 sm:py-4'
        }`}
      >
        {/* Top HUD Technical Ticker Rail */}
        <div className="hidden lg:block border-b border-white/[0.06] pb-1.5 mb-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                REC // 8K PRORES RAW
              </span>
              <span className="text-slate-600">|</span>
              <span className="tracking-widest uppercase">SHUTTER: 1/8000s · ƒ/1.2 · ISO 100</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="tracking-wider text-slate-400">
                ESCROW PROTECTION: <span className="text-cyan-300 font-bold">100% SECURE</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-indigo-300 font-semibold">TALENT SYNDICATE // LIVE</span>
            </div>
          </div>
        </div>

        {/* Main Cinema Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* 1. Left: High-Fashion Bold Serif Brand Logo */}
            <Link to="/" className="flex items-center gap-3.5 group text-left shrink-0">
              {/* Aperture HUD Reticle */}
              <div className="relative w-10 h-10 rounded-lg bg-[#060c1d] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300">
                {/* HUD Corner Ticks */}
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
                
                <Aperture className="w-5 h-5 group-hover:rotate-90 transition-transform duration-700 ease-out text-cyan-300" />
              </div>

              <div>
                <span className="text-xl sm:text-2xl font-serif font-black tracking-[0.16em] text-white flex items-center group-hover:text-cyan-300 transition-colors">
                  LENS<span className="text-cyan-400 mx-0.5">·</span>CRAFT
                </span>
                <div className="flex items-center gap-2 -mt-0.5">
                  <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-cyan-400/90 font-bold">
                    CINEMA // STUDIO
                  </span>
                  <span className="text-[8px] px-1 py-0.2 rounded font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                    v2.6
                  </span>
                </div>
              </div>
            </Link>

            {/* 2. Center: Futuristic Cinema Viewfinder Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    className={`relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 group flex items-center gap-1.5 rounded-md ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/10'
                    }`}
                  >
                    <span className={`text-[9px] font-mono ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`}>
                      {link.code}
                    </span>
                    <span>{link.label}</span>

                    {/* Active HUD Glow Bar */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* 3. Right: HUD Controls, Demo Switcher, Book Shoot CTA */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* AI Smart Matchmaker Pill */}
              <button
                onClick={() => setMatchmakerModalOpen(true)}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#060c1d] border border-cyan-500/30 hover:border-cyan-400 text-[11px] font-mono text-cyan-300 hover:text-white transition-all shadow-xs group"
                title="AI Creative Matchmaker"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>AI MATCH</span>
              </button>

              {/* Demo Mode HUD Switcher */}
              <div className="relative" ref={demoDropdownRef}>
                <button
                  type="button"
                  onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#060c1d] border border-white/10 hover:border-cyan-500/40 text-[11px] font-mono text-slate-300 hover:text-white transition-all"
                  title="Switch Demo Role"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="uppercase">ROLE: {user?.role || 'GUEST'}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${demoDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {demoDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#060c1d]/98 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-2 z-50 animate-reveal text-left">
                    <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between text-[10px] uppercase font-mono font-bold text-cyan-400">
                      <span>HUD Role Switcher</span>
                      <span className="text-[9px] text-slate-500">1-CLICK</span>
                    </div>
                    <div className="space-y-0.5">
                      {Object.values(ROLES).map((roleKey) => (
                        <button
                          key={roleKey}
                          onClick={() => {
                            quickDemoLogin(roleKey);
                            setDemoDropdownOpen(false);
                            navigate(getDashboardPath(roleKey));
                          }}
                          className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-cyan-500/10 flex items-center justify-between text-slate-200 hover:text-cyan-300 font-mono transition-colors"
                        >
                          <span>{ROLE_LABELS[roleKey]}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded border uppercase font-mono text-cyan-400 bg-cyan-950/60 border-cyan-500/30">
                            {roleKey}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile / Sign In */}
              {isAuthenticated ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-md bg-[#060c1d] border border-white/10 hover:border-cyan-400/50 transition-all shadow-xs"
                  >
                    <Avatar src={user?.avatar?.url} name={user?.name} size="xs" isOnline={true} />
                    <span className="text-xs font-mono font-semibold text-white max-w-[85px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#060c1d]/98 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-2 z-50 animate-reveal text-left font-mono">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                        <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded uppercase font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                          {ROLE_LABELS[user?.role] || user?.role}
                        </span>
                      </div>

                      <Link
                        to={getDashboardPath(user?.role)}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                        <span>Studio Dashboard</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                >
                  Sign In
                </Link>
              )}

              {/* High-Tech Glowing HUD "Book a Shoot" Button */}
              <button
                type="button"
                onClick={handleBookShoot}
                className="relative group overflow-hidden inline-flex items-center gap-2 px-5 py-2 rounded-md font-mono text-xs font-bold tracking-wider text-white uppercase bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] border border-cyan-300/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* HUD Corner Accents */}
                <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white" />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white" />
                <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white" />
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white" />

                <Calendar className="w-3.5 h-3.5 text-cyan-200 group-hover:scale-110 transition-transform" />
                <span>BOOK SHOOT</span>
              </button>

            </div>

            {/* 4. Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={handleBookShoot}
                className="sm:hidden px-3.5 py-1.5 rounded-md text-xs font-mono font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-md border border-cyan-400/40"
              >
                BOOK
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md bg-[#060c1d] border border-cyan-500/30 text-slate-200 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
              </button>
            </div>

          </div>
        </div>

        {/* 5. Mobile Cinema Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#02040a]/98 backdrop-blur-3xl border-b border-cyan-500/25 px-4 pt-4 pb-6 space-y-4 animate-reveal text-left mt-3">
            <div className="flex items-center justify-between px-3 py-1 border-b border-white/10 text-[10px] font-mono text-cyan-400">
              <span>// VIEWPORT DIRECTORY</span>
              <span className="text-red-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                LIVE
              </span>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-mono uppercase tracking-wider text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-cyan-500 text-[10px]">{link.code}</span>
                    <span>{link.label}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBookShoot();
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-md bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-xs font-mono font-bold text-white shadow-lg shadow-cyan-500/30 uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4 text-cyan-200" />
                <span>COMMISSION TALENT (ESCROW)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMatchmakerModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-md bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono font-semibold text-cyan-300"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI CREATOR MATCHMAKER</span>
              </button>

              {isAuthenticated ? (
                <div className="pt-2 space-y-1.5">
                  <Link
                    to={getDashboardPath(user?.role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full block"
                  >
                    <button className="w-full p-2.5 rounded-md bg-white/[0.04] border border-cyan-500/30 text-xs font-mono font-semibold text-cyan-300 flex items-center justify-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>OPEN STUDIO DASHBOARD ({ROLE_LABELS[user?.role] || user?.role})</span>
                    </button>
                  </Link>
                  <button
                    className="w-full p-2 rounded-md text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/');
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>SIGN OUT</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full p-2.5 rounded-md border border-white/10 text-xs font-mono font-semibold text-slate-200 hover:bg-white/5 transition-colors">
                      SIGN IN
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full p-2.5 rounded-md bg-cyan-500 text-xs font-mono font-bold text-black hover:bg-cyan-400 shadow-md shadow-cyan-500/30 transition-all">
                      JOIN ROSTER
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Creator Application Modal */}
      <CreatorOnboardingModal
        isOpen={creatorModalOpen}
        onClose={() => setCreatorModalOpen(false)}
      />

      {/* AI Matchmaker Modal */}
      <AiMatchmakerModal
        isOpen={matchmakerModalOpen}
        onClose={() => setMatchmakerModalOpen(false)}
      />

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        professional={MOCK_PROFESSIONALS[0]}
      />
    </>
  );
};

export default Navbar;
