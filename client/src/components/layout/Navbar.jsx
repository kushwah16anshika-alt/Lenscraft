import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Camera,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Compass,
  Film,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Button from '../common/Button';
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/#portfolio', isAnchor: true },
    { label: 'Stories', path: '/#stories', isAnchor: true },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (link, e) => {
    if (link.isAnchor) {
      if (location.pathname !== '/') {
        navigate(link.path);
      } else {
        const id = link.path.replace('/#', '');
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMobileMenuOpen(false);
  };

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
            ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-sky-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-[#030712]/40 backdrop-blur-md border-b border-white/5 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Futuristic Camera/Lens Aperture Logo */}
            <Link to="/" className="flex items-center gap-3 group text-left">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-sky-950 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-sky-400 group-hover:shadow-[0_0_25px_rgba(0,210,255,0.45)]">
                {/* Glowing Aperture Ring */}
                <div className="absolute inset-0 rounded-xl bg-sky-400/10 animate-pulse pointer-events-none" />
                <svg
                  className="w-5 h-5 stroke-[1.75] transition-transform duration-500 group-hover:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.4" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
                  <path d="m14.31 8 5.74 9.94" />
                  <path d="M9.69 8h11.48" />
                  <path d="m7.38 12 5.74-9.94" />
                  <path d="M9.69 16 3.95 6.06" />
                  <path d="M14.31 16H2.83" />
                  <path d="m16.62 12-5.74 9.94" />
                </svg>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-display font-extrabold tracking-tight text-white block leading-none group-hover:text-sky-300 transition-colors">
                  LENS<span className="text-sky-400">·</span>CRAFT
                </span>
                <span className="text-[9px] text-sky-400/70 uppercase tracking-[0.25em] block font-mono font-medium mt-0.5">
                  CINEMATIC VISUALS
                </span>
              </div>
            </Link>

            {/* Center: Curated Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isCurrentActive =
                  !link.isAnchor &&
                  (link.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.path));

                return (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={(e) => handleNavClick(link, e)}
                    className={
                      `text-xs font-semibold uppercase tracking-wider transition-all duration-200 py-1 relative group ${
                        isCurrentActive
                          ? 'text-sky-300 font-bold'
                          : 'text-slate-300 hover:text-white'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-300 ${
                        isCurrentActive ? 'w-full shadow-[0_0_8px_rgba(56,189,248,0.8)]' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </NavLink>
                );
              })}
            </nav>

            {/* Right: Actions, Glowing Book Shoot CTA, Demo Switcher, Profile */}
            <div className="hidden sm:flex items-center gap-3">
              {/* AI Matchmaker Icon Button */}
              <button
                onClick={() => setMatchmakerModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-sky-500/20 hover:border-sky-400/50 transition-all shadow-xs"
                title="AI Creator Matchmaker"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden xl:inline">AI Match</span>
              </button>

              {/* Demo Role Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-sky-500/20 text-[11px] font-semibold text-slate-300 hover:text-white hover:border-sky-400/50 transition-all"
                  title="Switch Demo Role"
                >
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>Demo Roles</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {demoDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-xl bg-[#060b19] border border-sky-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.9)] p-1.5 z-50 animate-reveal text-left backdrop-blur-xl"
                    onMouseLeave={() => setDemoDropdownOpen(false)}
                  >
                    <span className="text-[10px] uppercase font-mono font-bold text-sky-400/70 px-3 py-1.5 block border-b border-white/10 mb-1">
                      Role Simulator
                    </span>
                    {Object.values(ROLES).map((roleKey) => (
                      <button
                        key={roleKey}
                        onClick={() => {
                          quickDemoLogin(roleKey);
                          setDemoDropdownOpen(false);
                          navigate(getDashboardPath(roleKey));
                        }}
                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-sky-500/10 flex items-center justify-between text-slate-200 hover:text-sky-300 font-medium transition-colors"
                      >
                        <span>{ROLE_LABELS[roleKey]}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded border uppercase font-bold text-sky-400 bg-sky-950/60 border-sky-500/30 font-mono">
                          {roleKey}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Glowing "Book a Shoot" CTA Button */}
              <button
                type="button"
                onClick={handleBookShoot}
                className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] border border-sky-300/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-3.5 h-3.5 text-sky-200" />
                <span>Book a Shoot</span>
              </button>

              {/* User Authenticated Profile / Sign In */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-slate-900/80 border border-sky-500/30 hover:border-sky-400 transition-all shadow-xs"
                  >
                    <Avatar src={user?.avatar?.url} name={user?.name} size="xs" />
                    <span className="text-xs font-semibold text-white max-w-[90px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-[#060b19] border border-sky-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.9)] p-2 z-50 animate-reveal text-left backdrop-blur-xl"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                        <span className="inline-block mt-1.5 text-[9px] px-2 py-0.5 rounded border uppercase font-bold bg-sky-950/80 text-sky-300 border-sky-500/30 font-mono">
                          {ROLE_LABELS[user?.role] || user?.role}
                        </span>
                      </div>

                      <Link
                        to={getDashboardPath(user?.role)}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:text-sky-300 hover:bg-sky-500/10 rounded-lg transition-colors font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-sky-400" />
                        <span>Studio Dashboard</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs font-bold text-sky-300 hover:text-white px-3.5 py-1.5 rounded-lg bg-sky-950/60 hover:bg-sky-900/80 border border-sky-500/30 transition-all shadow-xs"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={handleBookShoot}
                className="sm:hidden px-3 py-1.5 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-[0_0_15px_rgba(56,189,248,0.4)] border border-sky-300/30"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-900/80 border border-sky-500/30 text-slate-200 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#060b19]/95 backdrop-blur-2xl border-b border-sky-500/20 px-4 pt-4 pb-6 space-y-4 animate-reveal text-left mt-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={(e) => handleNavClick(link, e)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-200 hover:bg-sky-500/10 hover:text-sky-300 transition-colors"
                >
                  <span>{link.label}</span>
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
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-xs font-bold text-white shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              >
                <Calendar className="w-4 h-4 text-sky-200" />
                <span>Book a Shoot Now</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMatchmakerModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-sky-500/30 text-xs font-bold text-sky-300"
              >
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>AI Creator Matchmaker</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCreatorModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs font-medium text-slate-300"
              >
                <span>Apply as Creator</span>
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardPath(user?.role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full block"
                  >
                    <button className="w-full p-2.5 rounded-xl bg-sky-950 border border-sky-500/40 text-xs font-bold text-sky-300">
                      Studio Dashboard ({ROLE_LABELS[user?.role] || user?.role})
                    </button>
                  </Link>
                  <button
                    className="w-full p-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/');
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full p-2 rounded-xl border border-white/10 text-xs font-semibold text-white hover:bg-white/5">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full p-2 rounded-xl bg-sky-500 text-xs font-bold text-slate-950 hover:bg-sky-400">
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

