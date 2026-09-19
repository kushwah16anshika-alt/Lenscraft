import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Search,
  Bookmark,
  Sparkles,
  Calendar,
  Aperture,
  User as UserIcon,
  ArrowRight,
  Camera,
  Layers,
  Heart,
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    { label: 'Home', path: '/' },
    { label: 'Photographers', path: '/photographers' },
    { label: 'Services', path: '/#services' },
    { label: 'Portfolio', path: '/#portfolio' },
    { label: 'Stories', path: '/#stories' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (link) => {
    if (link.path.startsWith('/#')) {
      const sectionId = link.path.replace('/#', '');
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
      navigate(link.path);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Glassmorphism Navbar */}
      <header className="sticky top-0 z-40 w-full transition-all duration-300 px-3 sm:px-6 lg:px-8 pt-3 pb-2">
        <div
          className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between ${
            isScrolled
              ? 'bg-[#060b19]/90 backdrop-blur-xl border border-sky-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,210,255,0.15)]'
              : 'bg-[#060b19]/70 backdrop-blur-md border border-sky-500/15 shadow-xl'
          }`}
        >
          {/* 1. Left: Brand Logo with Camera Lens Icon */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 border border-sky-400/40 group-hover:border-cyan-400 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.4)]">
              <Aperture className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="text-lg sm:text-xl font-display font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              LENSCRAFT
            </span>
          </Link>

          {/* 2. Center: Futuristic Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isAnchor = link.path.startsWith('/#');
              const isActive = !isAnchor && location.pathname === link.path;

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-cyan-400 bg-sky-500/10 border border-sky-500/30 shadow-[0_0_12px_rgba(0,210,255,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* 3. Right: Actions & Book a Shoot CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-full text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-colors"
              title="Search Creators (⌘K)"
              aria-label="Search Creators"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Matchmaker */}
            <button
              onClick={() => setMatchmakerModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-200 hover:text-cyan-300 bg-white/5 hover:bg-sky-500/10 border border-white/10 hover:border-sky-500/30 transition-all"
              title="Find matches with AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">AI Match</span>
            </button>

            {/* Glowing "Book a Shoot" CTA */}
            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider glow-btn-primary transition-all duration-300 shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:scale-105 flex items-center gap-1.5 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-midnight-950" />
              <span>Book a Shoot</span>
            </button>

            {/* User Dropdown / Auth CTA */}
            {isAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full bg-white/5 border border-sky-500/20 hover:border-sky-500/40 transition-all"
                >
                  <Avatar user={user} size="sm" />
                  <span className="text-xs text-slate-200 font-medium hidden md:inline max-w-[80px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 pr-1" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel border border-sky-500/30 shadow-2xl py-2 z-50 animate-reveal">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-cyan-400 font-mono">{ROLE_LABELS[user?.role] || user?.role}</p>
                    </div>

                    <Link
                      to={getDashboardPath(user?.role)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Dashboard</span>
                    </Link>

                    {user?.role === ROLES.USER && (
                      <Link
                        to="/user/bookings"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>My Bookings</span>
                      </Link>
                    )}

                    <Link
                      to="/user/wishlist"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Saved ({favorites?.length || 0})</span>
                    </Link>

                    <button
                      onClick={() => logout()}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/10 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Sign In
                </Link>

                {/* Quick Demo Switcher */}
                <div className="relative" ref={demoDropdownRef}>
                  <button
                    onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                    className="p-1.5 rounded-full bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-400/30 transition-all text-xs flex items-center gap-1"
                    title="Quick Demo Role"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span className="text-[10px] hidden md:inline font-mono">Demo</span>
                  </button>

                  {demoDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl glass-panel border border-indigo-500/30 shadow-2xl py-2 z-50 animate-reveal">
                      <p className="px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-white/10">
                        Test Profiles
                      </p>
                      <button
                        onClick={() => {
                          quickDemoLogin(ROLES.USER);
                          setDemoDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-sky-500/10 hover:text-cyan-300"
                      >
                        Client / User
                      </button>
                      <button
                        onClick={() => {
                          quickDemoLogin(ROLES.PHOTOGRAPHER);
                          setDemoDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-sky-500/10 hover:text-cyan-300"
                      >
                        Lead Photographer
                      </button>
                      <button
                        onClick={() => {
                          quickDemoLogin(ROLES.ADMIN);
                          setDemoDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-sky-500/10 hover:text-cyan-300"
                      >
                        Admin Control
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-3xl glass-panel border border-sky-500/30 shadow-2xl p-5 space-y-4 animate-reveal">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModalOpen(true);
                }}
                className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider glow-btn-primary text-center"
              >
                Book a Shoot
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCreatorModalOpen(true);
                }}
                className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider btn-secondary-luxury text-center"
              >
                Join as Creator
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Action Modals */}
      <CreatorOnboardingModal
        isOpen={creatorModalOpen}
        onClose={() => setCreatorModalOpen(false)}
      />
      <AiMatchmakerModal
        isOpen={matchmakerModalOpen}
        onClose={() => setMatchmakerModalOpen(false)}
      />
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        professional={MOCK_PROFESSIONALS[0]}
      />
      <SearchOverlayModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
