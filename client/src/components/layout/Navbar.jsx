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
  Settings,
  ArrowRight,
  ExternalLink,
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
      setIsScrolled(window.scrollY > 10);
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

  // Click-outside listener
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
      {/* Sleek, Executive Glassmorphism Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-[#030712]/70 backdrop-blur-md border-b border-white/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* 1. Left: Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="LensCraft Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-transparent border border-cyan-500/30 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.3)]">
              <Aperture className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-display font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                LENSCRAFT
              </span>
              <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-cyan-400/90 px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30 hidden sm:inline-block">
                STUDIO
              </span>
            </div>
          </Link>

          {/* 2. Center: Minimalist, High-End Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary Navigation">
            {/* Primary Creative Directories */}
            <NavLink
              to="/photographers"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium tracking-normal transition-all duration-150 ${
                  isActive
                    ? 'text-white bg-white/[0.08] font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                }`
              }
            >
              Photographers
            </NavLink>

            <NavLink
              to="/videographers"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium tracking-normal transition-all duration-150 ${
                  isActive
                    ? 'text-white bg-white/[0.08] font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                }`
              }
            >
              Videographers
            </NavLink>

            <NavLink
              to="/editors"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium tracking-normal transition-all duration-150 ${
                  isActive
                    ? 'text-white bg-white/[0.08] font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                }`
              }
            >
              Editors
            </NavLink>

            {/* AI Suite Dropdown (Clean, Professional Hover/Click Panel) */}
            <div className="relative" ref={aiMenuRef}>
              <button
                type="button"
                onClick={() => setAiMenuOpen(!aiMenuOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium tracking-normal transition-all duration-150 cursor-pointer ${
                  isAiRouteActive || aiMenuOpen
                    ? 'text-cyan-300 bg-cyan-500/10 font-semibold border border-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                }`}
                aria-expanded={aiMenuOpen}
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Features</span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                    aiMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {aiMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-xl bg-[#060c1d]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-2 z-50 animate-slide-up">
                  <div className="px-3 py-1.5 border-b border-white/[0.06] mb-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      Proprietary AI Technologies
                    </p>
                  </div>

                  <Link
                    to="/recommendations"
                    onClick={() => setAiMenuOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">AI Matchmaker</p>
                      <p className="text-[11px] text-slate-400">Multi-factor creator recommendations</p>
                    </div>
                  </Link>

                  <Link
                    to="/smart-packages"
                    onClick={() => setAiMenuOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Smart Packages</p>
                      <p className="text-[11px] text-slate-400">ML-ranked photography packages</p>
                    </div>
                  </Link>

                  <Link
                    to="/color-lab"
                    onClick={() => setAiMenuOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Color Lab & LUTs</p>
                      <p className="text-[11px] text-slate-400">Neural grading & aesthetic filters</p>
                    </div>
                  </Link>

                  <Link
                    to="/assistant"
                    onClick={() => setAiMenuOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">AI Concierge Assistant</p>
                      <p className="text-[11px] text-slate-400">Gemini 24/7 conversational booking</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium tracking-normal transition-all duration-150 ${
                  isActive
                    ? 'text-white bg-white/[0.08] font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                }`
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium tracking-normal transition-all duration-150 ${
                  isActive
                    ? 'text-white bg-white/[0.08] font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                }`
              }
            >
              About
            </NavLink>
          </nav>

          {/* 3. Right: Sleek Actions & Authentication */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Minimalist Search Button */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] text-xs text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              title="Search Creators (⌘K)"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline text-[11px]">Search</span>
              <kbd className="hidden lg:inline-block px-1 py-0.2 rounded bg-white/[0.06] text-[9px] font-mono text-slate-400 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Quick Demo Switcher (Understated Viva Testing Pill) */}
            <div className="relative shrink-0 hidden sm:block" ref={demoDropdownRef}>
              <button
                type="button"
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] transition-all flex items-center gap-1.5 cursor-pointer"
                title="Switch Role for Viva / Demo"
              >
                <Shield className="w-3 h-3 text-cyan-400" />
                <span>Demo</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
              </button>

              {demoDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#060c1d]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-1.5 z-50 animate-slide-up">
                  <p className="px-2.5 py-1 text-[9px] uppercase font-mono tracking-wider text-slate-400 font-semibold border-b border-white/[0.06]">
                    Switch Profile
                  </p>
                  <div className="space-y-0.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        quickDemoLogin(ROLES.USER);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-white/[0.06] rounded-md transition-colors flex items-center justify-between"
                    >
                      <span>Client</span>
                      <span className="text-[9px] font-mono text-slate-400">User</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        quickDemoLogin(ROLES.PHOTOGRAPHER);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-white/[0.06] rounded-md transition-colors flex items-center justify-between"
                    >
                      <span>Creator</span>
                      <span className="text-[9px] font-mono text-slate-400">Pro</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        quickDemoLogin(ROLES.ADMIN);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-white/[0.06] rounded-md transition-colors flex items-center justify-between"
                    >
                      <span>Admin</span>
                      <span className="text-[9px] font-mono text-slate-400">Root</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden sm:block h-4 w-[1px] bg-white/10" />

            {/* Auth / Profile State */}
            {isAuthenticated ? (
              <div className="relative shrink-0" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-white/[0.06] transition-all cursor-pointer"
                  aria-expanded={userDropdownOpen}
                >
                  <Avatar user={user} size="sm" isOnline={true} />
                  <span className="text-xs text-slate-200 font-medium hidden md:inline max-w-[85px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#060c1d]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-2 z-50 animate-slide-up">
                    <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                      <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                    </div>

                    <div className="space-y-0.5 py-1">
                      <Link
                        to={getDashboardPath(user?.role)}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Dashboard</span>
                      </Link>

                      {user?.role === ROLES.USER ? (
                        <Link
                          to="/user/bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>My Bookings</span>
                        </Link>
                      ) : (
                        <Link
                          to="/professional/appointments"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Appointments</span>
                        </Link>
                      )}

                      <Link
                        to="/user/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
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
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>

                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
                >
                  Book Shoot
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 4. Refined Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-[#030712]/98 backdrop-blur-2xl border-b border-white/10 px-4 py-5 space-y-4 animate-slide-up">
            {/* Demo Switcher for Mobile */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2 font-semibold">
                Test Role (1-Click Demo)
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

            {/* AI Features */}
            <div className="space-y-1">
              <p className="px-1 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                AI Intelligence
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/recommendations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center gap-2 text-xs text-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Matchmaker</span>
                </Link>

                <Link
                  to="/smart-packages"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center gap-2 text-xs text-slate-200"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Smart Packages</span>
                </Link>

                <Link
                  to="/color-lab"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center gap-2 text-xs text-slate-200"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
                  <span>Color Lab</span>
                </Link>

                <Link
                  to="/assistant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center gap-2 text-xs text-slate-200"
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AI Assistant</span>
                </Link>
              </div>
            </div>

            {/* General Links */}
            <div className="space-y-1">
              <p className="px-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Marketplace
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
                    className="px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="w-full py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 transition-all text-center shadow-md cursor-pointer"
              >
                Book a Shoot
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCreatorModalOpen(true);
                }}
                className="w-full py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all text-center cursor-pointer"
              >
                Join as Creator
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
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
