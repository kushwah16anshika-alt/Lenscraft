import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Search,
  Sparkles,
  Calendar,
  Aperture,
  User as UserIcon,
  Heart,
  Layers,
  SlidersHorizontal,
  Shield,
  Bot,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { usePlatform } from '../../context/PlatformContext';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Avatar from '../common/Avatar';
import CreatorOnboardingModal from '../common/CreatorOnboardingModal';
import AiMatchmakerModal from '../common/AiMatchmakerModal';
import BookingModal from '../common/BookingModal';
import SearchOverlayModal from '../common/SearchOverlayModal';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';

const Navbar = () => {
  const { user, isAuthenticated, logout, quickDemoLogin } = useAuth();
  const { favorites } = usePlatform();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerModalOpen, setMatchmakerModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const demoDropdownRef = useRef(null);
  const aiMenuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click-outside listener for all dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (demoDropdownRef.current && !demoDropdownRef.current.contains(e.target)) {
        setDemoDropdownOpen(false);
      }
      if (aiMenuRef.current && !aiMenuRef.current.contains(e.target)) {
        setAiMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-close open menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setDemoDropdownOpen(false);
    setAiMenuOpen(false);
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

  const isAiRouteActive = ['/recommendations', '/smart-packages', '/color-lab', '/assistant'].includes(
    location.pathname
  );

  return (
    <>
      {/* 1. FIXED TOP FLOATING NAVBAR WITH ROUNDED BORDER */}
      <header className="fixed top-2.5 sm:top-3.5 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
        <div
          className={`max-w-7xl mx-auto rounded-full pointer-events-auto transition-all duration-300 px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4 ${
            isScrolled
              ? 'bg-slate-950/90 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(56,189,248,0.12)]'
              : 'bg-slate-950/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
          }`}
        >
          {/* A. LOGO: Far Left Branding */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="LENSCRAFT Home"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900/90 border border-white/10 group-hover:border-sky-400/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.35)] shrink-0">
              <Aperture className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 group-hover:rotate-45 transition-transform duration-500 ease-out" />
            </div>
            <span className="text-xs sm:text-sm font-display font-bold tracking-wider text-white group-hover:text-sky-300 transition-colors whitespace-nowrap">
              LENSCRAFT
            </span>
          </Link>

          {/* B. MAIN NAVIGATION LINKS: Centered with Center-Out Underline Slider */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
            {/* Photographers */}
            <NavLink
              to="/photographers"
              className={({ isActive }) =>
                `relative py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#38bdf8] after:rounded-full after:transition-transform after:duration-300 after:ease-out after:origin-center ${
                  isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                }`
              }
            >
              Photographers
            </NavLink>

            {/* Videographers */}
            <NavLink
              to="/videographers"
              className={({ isActive }) =>
                `relative py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#38bdf8] after:rounded-full after:transition-transform after:duration-300 after:ease-out after:origin-center ${
                  isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                }`
              }
            >
              Videographers
            </NavLink>

            {/* Editors */}
            <NavLink
              to="/editors"
              className={({ isActive }) =>
                `relative py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#38bdf8] after:rounded-full after:transition-transform after:duration-300 after:ease-out after:origin-center ${
                  isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                }`
              }
            >
              Editors
            </NavLink>

            {/* AI Features Dropdown */}
            <div className="relative" ref={aiMenuRef}>
              <button
                type="button"
                onClick={() => setAiMenuOpen(!aiMenuOpen)}
                className={`group relative py-1.5 flex items-center gap-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  isAiRouteActive || aiMenuOpen ? 'text-white' : 'text-slate-300 hover:text-white'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#38bdf8] after:rounded-full after:transition-transform after:duration-300 after:ease-out after:origin-center ${
                  isAiRouteActive ? 'after:scale-x-100' : 'after:scale-x-0 group-hover:after:scale-x-100'
                }`}
                aria-expanded={aiMenuOpen}
              >
                <span>AI Features</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-all duration-300 ${
                    aiMenuOpen ? 'rotate-180 text-sky-400' : ''
                  }`}
                />
              </button>

              {aiMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(56,189,248,0.12)] p-2 z-50 animate-slide-up">
                  <div className="px-3 py-2 border-b border-white/[0.06] mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                      AI Studio Technologies
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">4 Active</span>
                  </div>

                  <div className="space-y-1">
                    <Link
                      to="/recommendations"
                      onClick={() => setAiMenuOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0 mt-0.5 group-hover:bg-sky-500/20 transition-colors">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-white">AI Matchmaker</p>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-950/60 text-sky-400 border border-sky-500/30">
                            Tech 1
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          Multi-factor creator recommendations
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/smart-packages"
                      onClick={() => setAiMenuOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5 group-hover:bg-amber-500/20 transition-colors">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-white">Smart Packages</p>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-400 border border-amber-500/30">
                            Tech 4
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          ML-ranked custom booking packages
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/color-lab"
                      onClick={() => setAiMenuOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0 mt-0.5 group-hover:bg-purple-500/20 transition-colors">
                        <SlidersHorizontal className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-white">Color Lab & LUTs</p>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-400 border border-purple-500/30">
                            Tech 2
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          Neural grading & aesthetic filters
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/assistant"
                      onClick={() => setAiMenuOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5 group-hover:bg-emerald-500/20 transition-colors">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-white">AI Concierge Assistant</p>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                            Tech 3
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          Gemini 24/7 conversational studio concierge
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `relative py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#38bdf8] after:rounded-full after:transition-transform after:duration-300 after:ease-out after:origin-center ${
                  isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                }`
              }
            >
              Services
            </NavLink>

            {/* About */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#38bdf8] after:rounded-full after:transition-transform after:duration-300 after:ease-out after:origin-center ${
                  isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                }`
              }
            >
              About
            </NavLink>
          </nav>

          {/* C. RIGHT AREA: Search Bar + Single Demo Pill + Single Circular Avatar (No duplicate Demo text) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Minimalist Search Bar with ⌘K Badge */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="group hidden sm:flex items-center justify-between gap-2.5 px-3 py-1 rounded-full bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 hover:border-sky-400/40 focus:border-sky-400/60 transition-all duration-300 w-36 md:w-44 lg:w-52 cursor-pointer shadow-inner"
              title="Global Search (⌘K)"
              aria-label="Search"
            >
              <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-300 text-xs transition-colors truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors shrink-0" />
                <span className="font-normal truncate">Search...</span>
              </div>
              <kbd className="hidden md:flex items-center justify-center px-1.5 py-0.2 text-[9px] font-mono font-medium text-slate-400 group-hover:text-sky-300 bg-white/5 group-hover:bg-sky-950/40 border border-white/10 group-hover:border-sky-500/30 rounded-md transition-all shrink-0">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="sm:hidden p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Single Sleek "Demo" Menu Pill (Only 1 occurrence in the navbar) */}
            <div className="relative shrink-0 hidden sm:block" ref={demoDropdownRef}>
              <button
                type="button"
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 cursor-pointer border ${
                  demoDropdownOpen
                    ? 'bg-sky-950/50 text-sky-300 border-sky-400/40 shadow-[0_0_10px_rgba(56,189,248,0.25)]'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border-white/10 hover:border-white/20'
                }`}
                aria-expanded={demoDropdownOpen}
                title="Switch Demo Profile"
              >
                <Shield className="w-3 h-3 text-sky-400" />
                <span>Demo</span>
                <ChevronDown
                  className={`w-2.5 h-2.5 text-slate-400 transition-transform duration-200 ${
                    demoDropdownOpen ? 'rotate-180 text-sky-400' : ''
                  }`}
                />
              </button>

              {/* Demo Profiles Dropdown */}
              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-48 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_15px_rgba(56,189,248,0.1)] p-1.5 z-50 animate-slide-up">
                  <div className="px-2.5 py-1 border-b border-white/[0.06] mb-1">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                      1-Click Demo Profiles
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        quickDemoLogin(ROLES.USER);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Client User</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400">User</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        quickDemoLogin(ROLES.PHOTOGRAPHER);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Lead Creator</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-950/60 text-sky-400 border border-sky-500/30">Pro</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        quickDemoLogin(ROLES.ADMIN);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Platform Admin</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-400 border border-purple-500/30">Root</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Single Clean, Circular User Avatar Dropdown (No text label = NEVER displays "Demo" twice) */}
            <div className="relative shrink-0" ref={userDropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-sky-400/50 transition-all cursor-pointer group shrink-0"
                aria-expanded={userDropdownOpen}
                aria-label="User profile and account options"
              >
                {isAuthenticated ? (
                  <Avatar user={user} size="sm" isOnline={true} />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/90 border border-white/10 group-hover:border-sky-400/50 flex items-center justify-center text-slate-400 group-hover:text-white transition-all shadow-inner">
                    <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-56 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_15px_rgba(56,189,248,0.1)] p-2 z-50 animate-slide-up">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                        <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                        <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.2 rounded-full bg-sky-950/60 text-sky-400 border border-sky-500/30 font-semibold uppercase">
                          {ROLE_LABELS[user?.role] || user?.role}
                        </span>
                      </div>

                      <div className="space-y-0.5 py-1">
                        <Link
                          to={getDashboardPath(user?.role)}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-sky-400" />
                          <span>Dashboard</span>
                        </Link>

                        {user?.role === ROLES.USER ? (
                          <Link
                            to="/user/bookings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                          >
                            <Calendar className="w-3.5 h-3.5 text-sky-400" />
                            <span>My Bookings</span>
                          </Link>
                        ) : (
                          <Link
                            to="/professional/appointments"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                          >
                            <Calendar className="w-3.5 h-3.5 text-sky-400" />
                            <span>Appointments</span>
                          </Link>
                        )}

                        <Link
                          to="/user/wishlist"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                        >
                          <Heart className="w-3.5 h-3.5 text-rose-400" />
                          <span>Saved ({favorites?.length || 0})</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-white/[0.06]">
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-1 space-y-1">
                      <div className="px-3 py-2 border-b border-white/[0.06]">
                        <p className="text-xs font-semibold text-white">Account Access</p>
                        <p className="text-[11px] text-slate-400">Sign in to your studio dashboard</p>
                      </div>
                      <Link
                        to="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors"
                      >
                        <span>Sign In</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-xl transition-colors"
                      >
                        <span>Create Account</span>
                        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2. Mobile Navigation Drawer (Folds cleanly below the floating rounded navbar) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-3xl bg-slate-950/98 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_20px_rgba(56,189,248,0.15)] p-4 sm:p-5 space-y-4 animate-slide-up pointer-events-auto">
            {/* 1-Click Demo Profiles for Mobile */}
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/[0.08]">
              <p className="text-[10px] uppercase font-mono tracking-wider text-sky-400 mb-2 font-semibold">
                Test Profiles (1-Click Login)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    quickDemoLogin(ROLES.USER);
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 rounded-lg text-xs text-slate-200 bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] text-center"
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickDemoLogin(ROLES.PHOTOGRAPHER);
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 rounded-lg text-xs text-slate-200 bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] text-center"
                >
                  Creator
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickDemoLogin(ROLES.ADMIN);
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 rounded-lg text-xs text-slate-200 bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] text-center"
                >
                  Admin
                </button>
              </div>
            </div>

            {/* AI Technologies */}
            <div className="space-y-1">
              <p className="px-1 text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                AI Technologies
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/recommendations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] flex items-center gap-2 text-xs text-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>AI Matchmaker</span>
                </Link>

                <Link
                  to="/smart-packages"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] flex items-center gap-2 text-xs text-slate-200"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Smart Packages</span>
                </Link>

                <Link
                  to="/color-lab"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] flex items-center gap-2 text-xs text-slate-200"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
                  <span>Color Lab</span>
                </Link>

                <Link
                  to="/assistant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] flex items-center gap-2 text-xs text-slate-200"
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AI Assistant</span>
                </Link>
              </div>
            </div>

            {/* Standard Nav Links */}
            <div className="space-y-1">
              <p className="px-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Explore Marketplace
              </p>
              <div className="flex flex-col space-y-0.5">
                {[
                  { label: 'Photographers', path: '/photographers' },
                  { label: 'Videographers', path: '/videographers' },
                  { label: 'Editors', path: '/editors' },
                  { label: 'Services Catalog', path: '/services' },
                  { label: 'About LensCraft', path: '/about' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 transition-all text-center shadow-md cursor-pointer"
              >
                Book a Shoot
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCreatorModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all text-center cursor-pointer"
              >
                Join as Creator
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Modals */}
      <CreatorOnboardingModal isOpen={creatorModalOpen} onClose={() => setCreatorModalOpen(false)} />
      <AiMatchmakerModal isOpen={matchmakerModalOpen} onClose={() => setMatchmakerModalOpen(false)} />
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        professional={MOCK_PROFESSIONALS[0]}
      />
      <SearchOverlayModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};

export default Navbar;
