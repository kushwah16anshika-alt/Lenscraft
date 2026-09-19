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
  User as UserIcon,
  Shield,
  ArrowRight,
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
      setIsScrolled(window.scrollY > 10);
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
    { label: 'Photographers', path: '/photographers' },
    { label: 'Videographers', path: '/videographers' },
    { label: 'Editors', path: '/editors' },
    { label: 'Services', path: '/services' },
    { label: 'Features', path: '/features' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
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
      {/* Main Top Navigation Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50 py-3.5'
            : 'bg-[#030712]/40 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            
            {/* 1. Left: Premium Logo */}
            <Link to="/" className="flex items-center gap-3 group text-left shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                  <Aperture className="w-5 h-5 text-cyan-400 group-hover:rotate-90 transition-transform duration-500" />
                </div>
              </div>
              <span className="text-xl font-heading font-extrabold tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                LensCraft
              </span>
            </Link>

            {/* 2. Center: Clean Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                      isActive
                        ? 'text-cyan-400 font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* 3. Right: Clean Actions (Sign In + Book a Shoot CTA) */}
            <div className="hidden sm:flex items-center gap-4">
              
              {/* Authenticated User Menu OR Sign In Link */}
              {isAuthenticated ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1 pl-1.5 pr-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <Avatar src={user?.avatar?.url} name={user?.name} size="xs" isOnline={true} />
                    <span className="text-xs font-semibold text-white max-w-[90px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#0a1128]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/90 p-2 z-50 animate-reveal text-left">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                        <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase">
                          {ROLE_LABELS[user?.role] || user?.role}
                        </span>
                      </div>

                      <Link
                        to={getDashboardPath(user?.role)}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-xl transition-colors font-medium"
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
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-1 font-medium"
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
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Main "Book a Shoot" CTA Button */}
              <button
                type="button"
                onClick={handleBookShoot}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-300/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-200" />
                <span>Book a Shoot</span>
              </button>

            </div>

            {/* 4. Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2.5">
              <button
                type="button"
                onClick={handleBookShoot}
                className="sm:hidden px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-sm"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 5. Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#060c1d]/98 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 space-y-4 animate-reveal text-left mt-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-300 transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBookShoot();
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/30"
              >
                <Calendar className="w-4 h-4 text-cyan-200" />
                <span>Book a Shoot</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMatchmakerModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-xs font-semibold text-cyan-300"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Creator Matchmaker</span>
              </button>

              {isAuthenticated ? (
                <div className="pt-2 space-y-1.5">
                  <Link
                    to={getDashboardPath(user?.role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full block"
                  >
                    <button className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Open {ROLE_LABELS[user?.role] || user?.role} Dashboard</span>
                    </button>
                  </Link>
                  <button
                    className="w-full p-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/');
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full p-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/5 transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full p-2.5 rounded-xl bg-cyan-500 text-xs font-bold text-black hover:bg-cyan-400 shadow-md transition-all">
                      Join LensCraft
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom-Right Demo Role Switcher (Keeps Navbar Clean) */}
      <div className="fixed bottom-5 right-5 z-40" ref={demoDropdownRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#030712]/90 hover:bg-[#0a1128] border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:text-white shadow-xl shadow-black/80 backdrop-blur-xl transition-all duration-300 hover:scale-105"
            title="Switch Demo Role"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">Demo: {user?.role || 'User'}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${demoDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {demoDropdownOpen && (
            <div className="absolute bottom-full right-0 mb-3 w-56 rounded-2xl bg-[#060c1d]/98 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-black/90 p-2 z-50 animate-slide-up text-left">
              <div className="px-3 py-2 border-b border-white/10 mb-1 flex items-center justify-between text-[10px] uppercase font-mono font-bold text-cyan-400">
                <span>Instant Demo Role</span>
                <span className="text-[9px] text-slate-400">1-Click</span>
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
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-cyan-500/10 flex items-center justify-between text-slate-200 hover:text-cyan-300 font-medium transition-colors"
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
      </div>

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
