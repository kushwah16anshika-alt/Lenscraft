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
  Camera,
  Bot,
  SlidersHorizontal,
  Briefcase,
  Shield,
  ArrowRight,
  Zap,
  Settings,
  FolderHeart,
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
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerModalOpen, setMatchmakerModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const demoDropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll detection for backdrop blur and bottom border glow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global ⌘K / Ctrl+K keyboard shortcut to toggle Search modal
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

  // Click-outside listener for dropdown menus
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

  // Auto-close open menus on route change
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

  return (
    <>
      {/* Edge-to-Edge Sticky Top Navigation Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030712]/95 backdrop-blur-2xl border-b border-cyan-500/25 shadow-[0_4px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(0,210,255,0.12)]'
            : 'bg-[#030712]/85 backdrop-blur-xl border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
          {/* 1. Left: Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="LensCraft Home">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-sky-500/20 to-cyan-500/20 border border-sky-400/40 group-hover:border-cyan-300 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.5)] shrink-0">
              <Aperture className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyan-400 group-hover:rotate-90 transition-transform duration-500" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg lg:text-xl font-display font-extrabold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                LENSCRAFT
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                AI
              </span>
            </div>
          </Link>

          {/* 2. Center: Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Primary Navigation">
            {/* Core Creatives */}
            <NavLink
              to="/photographers"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,210,255,0.25)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              Photographers
            </NavLink>

            <NavLink
              to="/videographers"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,210,255,0.25)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              Videographers
            </NavLink>

            <NavLink
              to="/editors"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,210,255,0.25)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              Editors
            </NavLink>

            {/* AI Technologies directly visible for showcase */}
            <NavLink
              to="/recommendations"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/35 shadow-[0_0_15px_rgba(0,210,255,0.3)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
              title="Technology 1: Multi-Factor AI Photographer Recommendation Engine"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>AI Recommend</span>
            </NavLink>

            <NavLink
              to="/smart-packages"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/15 border border-amber-400/35 shadow-[0_0_15px_rgba(245,158,11,0.3)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
              title="Technology 4: Machine Learning Smart Package Ranking (NDCG@3 = 1.0)"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Packages</span>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase">
                ML
              </span>
            </NavLink>

            <NavLink
              to="/color-lab"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,210,255,0.25)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
              title="Technology 2: Cinematic Color Lab & Neural LUT Studio"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Color Lab</span>
            </NavLink>

            {/* Secondary navigation links */}
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `hidden xl:inline-block px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hidden 2xl:inline-block px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              About
            </NavLink>
          </nav>

          {/* 3. Right: Action Buttons, Quick Search & Profile / Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Quick Search Trigger (⌘K) */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-slate-300 hover:text-cyan-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/30 transition-all text-xs cursor-pointer shrink-0"
              title="Search Creators & Packages (⌘K)"
              aria-label="Search Creators"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400/80" />
              <span className="hidden sm:inline text-[11px] text-slate-300">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 rounded bg-white/10 text-[9px] font-mono text-slate-400 border border-white/15">
                ⌘K
              </kbd>
            </button>

            {/* Technology 3: Quick AI Assistant Chip */}
            <Link
              to="/assistant"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/35 hover:border-amber-400 transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:scale-105 shrink-0"
              title="Technology 3: 24/7 Gemini Conversational Concierge Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask AI</span>
            </Link>

            {/* Book a Shoot CTA (Desktop 2XL+) */}
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="hidden 2xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider glow-btn-primary transition-all duration-300 shadow-[0_0_18px_rgba(0,210,255,0.35)] hover:scale-105 shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-midnight-950" />
              <span>Book Shoot</span>
            </button>

            {/* Authenticated User Menu OR Public Auth CTA */}
            {isAuthenticated ? (
              <div className="relative shrink-0" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.08] border border-sky-500/25 hover:border-cyan-400/50 transition-all cursor-pointer"
                  aria-expanded={userDropdownOpen}
                  aria-label="User profile menu"
                >
                  <Avatar user={user} size="sm" isOnline={true} />
                  <span className="text-xs text-slate-200 font-semibold hidden md:inline max-w-[90px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" />
                </button>

                {/* Solid Glass User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-64 rounded-2xl bg-[#060c1d]/98 backdrop-blur-2xl border border-cyan-500/35 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,210,255,0.15)] py-2 z-50 animate-reveal">
                    <div className="px-4 py-2.5 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
                        {ROLE_LABELS[user?.role] || user?.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to={getDashboardPath(user?.role)}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Command Dashboard</span>
                      </Link>

                      {user?.role === ROLES.USER ? (
                        <Link
                          to="/user/bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>My Bookings</span>
                        </Link>
                      ) : (
                        <Link
                          to="/professional/appointments"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Client Appointments</span>
                        </Link>
                      )}

                      <Link
                        to="/user/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-400" />
                        <span>Saved Creators ({favorites?.length || 0})</span>
                      </Link>

                      <Link
                        to={
                          user?.role === ROLES.ADMIN
                            ? '/admin/settings'
                            : user?.role === ROLES.USER
                            ? '/user/settings'
                            : '/professional/settings'
                        }
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Account Settings</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all shrink-0"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,210,255,0.35)] shrink-0"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Quick Demo Role Switcher (1-Click Viva Testing Pill) */}
            <div className="relative shrink-0 hidden sm:block" ref={demoDropdownRef}>
              <button
                type="button"
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="px-2.5 py-1.5 rounded-full bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 border border-indigo-400/30 transition-all text-xs flex items-center gap-1 shrink-0 cursor-pointer"
                title="Switch Demo Role for Viva / Evaluation (Client / Creator / Admin)"
              >
                <Shield className="w-3 h-3 text-indigo-400" />
                <span className="text-[10px] font-mono font-bold">Demo</span>
                <ChevronDown className="w-2.5 h-2.5 text-indigo-400/80" />
              </button>

              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-52 rounded-2xl bg-[#060c1d]/98 backdrop-blur-2xl border border-indigo-500/35 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(99,102,241,0.2)] py-2 z-50 animate-reveal">
                  <p className="px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-indigo-300 font-bold border-b border-white/10 flex items-center justify-between">
                    <span>1-Click Demo Profiles</span>
                    <span className="text-[8px] px-1 py-0.2 rounded bg-indigo-500/30 text-indigo-200">Viva Ready</span>
                  </p>
                  <div className="space-y-0.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        quickDemoLogin(ROLES.USER);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-sky-500/10 hover:text-cyan-300 transition-colors flex items-center justify-between"
                    >
                      <span>Client Profile</span>
                      <span className="text-[9px] font-mono text-slate-400">User</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        quickDemoLogin(ROLES.PHOTOGRAPHER);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-sky-500/10 hover:text-cyan-300 transition-colors flex items-center justify-between"
                    >
                      <span>Lead Creator</span>
                      <span className="text-[9px] font-mono text-slate-400">Pro</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        quickDemoLogin(ROLES.ADMIN);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-sky-500/10 hover:text-cyan-300 transition-colors flex items-center justify-between"
                    >
                      <span>Admin Control</span>
                      <span className="text-[9px] font-mono text-slate-400">Root</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-cyan-400 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 transition-colors shrink-0 cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-300" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 4. Full Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-[#060c1d]/98 backdrop-blur-2xl border-b border-cyan-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(0,210,255,0.18)] p-4 sm:p-6 space-y-4 animate-reveal">
            {/* Quick Demo Switcher on Mobile */}
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-300 flex items-center gap-1.5 font-bold">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  Evaluate Roles (1-Click Login)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Viva Mode</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    quickDemoLogin(ROLES.USER);
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-sky-500/20 text-[11px] text-slate-200 hover:text-cyan-300 border border-white/10 text-center font-medium transition-colors"
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickDemoLogin(ROLES.PHOTOGRAPHER);
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-sky-500/20 text-[11px] text-slate-200 hover:text-cyan-300 border border-white/10 text-center font-medium transition-colors"
                >
                  Creator
                </button>
                <button
                  type="button"
                  onClick={() => {
                    quickDemoLogin(ROLES.ADMIN);
                    setMobileMenuOpen(false);
                  }}
                  className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-sky-500/20 text-[11px] text-slate-200 hover:text-cyan-300 border border-white/10 text-center font-medium transition-colors"
                >
                  Admin
                </button>
              </div>
            </div>

            {/* 5 AI Technologies Group */}
            <div className="space-y-1.5">
              <p className="px-1 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-cyan-400" />
                5 Implemented AI Technologies
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <Link
                  to="/recommendations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 hover:bg-cyan-500/20 flex items-center justify-between text-xs font-semibold text-cyan-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    AI Matchmaker
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                    Tech 1
                  </span>
                </Link>

                <Link
                  to="/smart-packages"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 hover:bg-amber-500/20 flex items-center justify-between text-xs font-semibold text-amber-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    Smart Packages (ML)
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    Tech 4
                  </span>
                </Link>

                <Link
                  to="/assistant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 flex items-center justify-between text-xs font-semibold text-emerald-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    AI Concierge Assistant
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    Tech 3
                  </span>
                </Link>

                <Link
                  to="/color-lab"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/25 hover:bg-purple-500/20 flex items-center justify-between text-xs font-semibold text-purple-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
                    Color Lab & LUTs
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                    Tech 2
                  </span>
                </Link>
              </div>
            </div>

            {/* Standard Category & Exploration Links */}
            <div className="space-y-1">
              <p className="px-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Marketplace Creators
              </p>
              <nav className="flex flex-col space-y-1">
                {[
                  { label: 'Photographers', path: '/photographers' },
                  { label: 'Videographers', path: '/videographers' },
                  { label: 'Editors', path: '/editors' },
                  { label: 'Services Catalog', path: '/services' },
                  { label: 'Platform Features', path: '/features' },
                  { label: 'About LensCraft', path: '/about' },
                ].map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 font-bold'
                          : 'text-slate-200 hover:text-cyan-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Actions CTAs */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-2 pb-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold text-center text-slate-200 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-center text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,210,255,0.3)]"
                  >
                    Get Started
                  </Link>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider glow-btn-primary text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.35)]"
              >
                <Calendar className="w-4 h-4 text-midnight-950" />
                <span>Book a Shoot</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCreatorModalOpen(true);
                }}
                className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-center transition-all"
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
