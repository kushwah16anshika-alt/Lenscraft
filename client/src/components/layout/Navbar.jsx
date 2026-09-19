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
  Compass,
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
    { label: 'Photographers', path: '/photographers' },
    { label: 'Videographers', path: '/videographers' },
    { label: 'Editors', path: '/editors' },
    { label: 'Services', path: '/services' },
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
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/70 py-3.5'
            : 'bg-[#030712]/60 backdrop-blur-md border-b border-white/[0.04] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* 1. Left: Minimalist Luxury Brand */}
            <Link to="/" className="flex items-center gap-3 group text-left">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50 group-hover:text-cyan-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                <Aperture className="w-5 h-5 group-hover:rotate-90 transition-transform duration-700 ease-out" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-heading font-extrabold tracking-wider text-white flex items-center group-hover:text-cyan-300 transition-colors">
                  LENSCRAFT
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-slate-400 block -mt-0.5">
                  STUDIO SYNDICATE
                </span>
              </div>
            </Link>

            {/* 2. Center: Clean, Spacious Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    className={`text-sm tracking-wide transition-all duration-200 relative py-1.5 font-medium ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* 3. Right: Subtle Role Switcher, Book CTA, User / Sign In */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Quick AI Matchmaker Icon Button */}
              <button
                onClick={() => setMatchmakerModalOpen(true)}
                className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                title="AI Creative Matchmaker"
              >
                <Sparkles className="w-4 h-4" />
              </button>

              {/* Demo Simulator Dropdown */}
              <div className="relative" ref={demoDropdownRef}>
                <button
                  type="button"
                  onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Demo: {user?.role || 'Guest'}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${demoDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {demoDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#060c1d]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2 z-50 animate-reveal text-left">
                    <div className="px-3 py-1.5 border-b border-white/10 mb-1 text-[10px] uppercase font-mono font-bold text-cyan-400">
                      Switch Demo Role
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
                          <span className="text-[9px] px-1.5 py-0.5 rounded border uppercase font-mono text-slate-400 bg-white/5 border-white/10">
                            {roleKey}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Authenticated Profile / Sign In */}
              {isAuthenticated ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all"
                  >
                    <Avatar src={user?.avatar?.url} name={user?.name} size="xs" isOnline={true} />
                    <span className="text-xs font-semibold text-white max-w-[80px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#060c1d]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2 z-50 animate-reveal text-left">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                      </div>

                      <Link
                        to={getDashboardPath(user?.role)}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-xl transition-colors font-medium"
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
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-1 font-medium"
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
                  className="text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Primary "Book a Shoot" Action */}
              <button
                type="button"
                onClick={handleBookShoot}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-[#030712] bg-white hover:bg-slate-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#030712]" />
                <span>Book a Shoot</span>
              </button>

            </div>

            {/* 4. Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={handleBookShoot}
                className="sm:hidden px-3.5 py-1.5 rounded-full text-xs font-bold text-black bg-white shadow-sm"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 5. Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#060c1d]/98 backdrop-blur-3xl border-b border-white/10 px-4 pt-4 pb-6 space-y-4 animate-reveal text-left mt-3">
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
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white text-xs font-bold text-black shadow-lg"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Book a Shoot (Escrow Protected)</span>
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
                    <button className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Studio Dashboard ({ROLE_LABELS[user?.role] || user?.role})</span>
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
                      Join Roster
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
