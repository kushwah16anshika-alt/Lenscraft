import React, { useState, useEffect, useRef } from 'react';
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
  Video,
  Calendar,
  Layers,
  ArrowRight,
  Shield,
  Heart,
  User as UserIcon,
  PhoneCall,
  Sliders,
  Aperture,
  CheckCircle2,
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
  const [talentDropdownOpen, setTalentDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerModalOpen, setMatchmakerModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const talentDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const demoDropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll event for sticky navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (talentDropdownRef.current && !talentDropdownRef.current.contains(e.target)) {
        setTalentDropdownOpen(false);
      }
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setTalentDropdownOpen(false);
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

  const talentLinks = [
    {
      label: 'Photographers',
      path: '/photographers',
      icon: Camera,
      desc: 'Editorial, portraits & commercial',
      accent: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      label: 'Cinematographers',
      path: '/videographers',
      icon: Video,
      desc: '8K motion, drone & brand films',
      accent: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    },
    {
      label: 'Post & Colorists',
      path: '/editors',
      icon: Film,
      desc: 'DaVinci color & visual post',
      accent: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
  ];

  const mainNavLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Features', path: '/features' },
    { label: 'Portfolio', path: '/#portfolio', isAnchor: true },
    { label: 'Stories', path: '/#stories', isAnchor: true },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
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

  const isTalentRouteActive = ['/photographers', '/videographers', '/editors'].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030712]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-3'
            : 'bg-[#030712]/50 backdrop-blur-md border-b border-white/5 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* 1. Left: Aperture Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0 text-left">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                  <Aperture className="w-5 h-5 text-cyan-400 group-hover:rotate-90 transition-transform duration-500" />
                </div>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-heading font-extrabold tracking-wider text-white flex items-center group-hover:text-cyan-300 transition-colors">
                  LENS<span className="text-cyan-400 mx-0.5">·</span>CRAFT
                </span>
                <span className="text-[9px] text-cyan-400/80 tracking-[0.25em] uppercase font-mono font-medium block">
                  CREATIVE SYNDICATE
                </span>
              </div>
            </Link>

            {/* 2. Center: Desktop Navigation Bar */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/[0.03] p-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-inner shadow-black/40">
              {/* Home */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive && location.pathname === '/'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                Home
              </NavLink>

              {/* Talent Dropdown Menu */}
              <div className="relative" ref={talentDropdownRef}>
                <button
                  type="button"
                  onClick={() => setTalentDropdownOpen(!talentDropdownOpen)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    isTalentRouteActive || talentDropdownOpen
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Talent Roster</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${talentDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {talentDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-72 rounded-2xl bg-[#060c1d]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2.5 z-50 animate-reveal text-left">
                    <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                        Browse Creative Disciplines
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">100% Escrow</span>
                    </div>

                    <div className="space-y-1">
                      {talentLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setTalentDropdownOpen(false)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
                          >
                            <div className={`p-2 rounded-lg border ${item.accent} group-hover:scale-110 transition-transform shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                                  {item.label}
                                </h4>
                                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                              </div>
                              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-2 mt-1 border-t border-white/10">
                      <button
                        onClick={() => {
                          setTalentDropdownOpen(false);
                          setMatchmakerModalOpen(true);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold transition-all group"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                          <span>AI Smart Matchmaker</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400/70">Instant</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Main Links */}
              {mainNavLinks.map((link) => {
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
                      `px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                        isCurrentActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* 3. Right: Actions, Role Switcher, Book Shoot CTA, Auth */}
            <div className="hidden sm:flex items-center gap-2.5">
              
              {/* AI Matchmaker Quick Pill */}
              <button
                onClick={() => setMatchmakerModalOpen(true)}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-xs"
                title="AI Creative Matchmaker"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>AI Match</span>
              </button>

              {/* Demo Role Switcher Dropdown */}
              <div className="relative" ref={demoDropdownRef}>
                <button
                  type="button"
                  onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/30 text-xs font-mono text-slate-300 hover:text-white transition-all"
                  title="Switch Demo Role"
                >
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden md:inline text-[11px]">Role: {user?.role || 'Guest'}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${demoDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {demoDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#060c1d]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2 z-50 animate-reveal text-left">
                    <div className="px-3 py-1.5 border-b border-white/10 mb-1 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono font-bold text-cyan-400">
                        Demo Role Switcher
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">1-Click</span>
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
                          <span className="text-[9px] px-1.5 py-0.5 rounded border uppercase font-mono font-bold text-cyan-400 bg-cyan-950/60 border-cyan-500/30">
                            {roleKey}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Glowing "Book a Shoot" CTA Button */}
              <button
                type="button"
                onClick={handleBookShoot}
                className="relative inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-300/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-200" />
                <span>Book Shoot</span>
              </button>

              {/* User Authenticated Profile / Sign In */}
              {isAuthenticated ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 transition-all shadow-xs"
                  >
                    <Avatar src={user?.avatar?.url} name={user?.name} size="xs" isOnline={true} />
                    <span className="text-xs font-semibold text-white max-w-[85px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#060c1d]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2 z-50 animate-reveal text-left">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                        <span className="inline-block mt-1.5 text-[9px] px-2 py-0.5 rounded uppercase font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                          {ROLE_LABELS[user?.role] || user?.role}
                        </span>
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
                <div className="flex items-center gap-1.5 pl-1">
                  <Link
                    to="/login"
                    className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs font-semibold text-cyan-300 hover:text-white px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 transition-all shadow-xs"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={handleBookShoot}
                className="sm:hidden px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/20 border border-cyan-300/30"
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

        {/* 5. Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#060c1d]/98 backdrop-blur-3xl border-b border-white/10 px-4 pt-4 pb-6 space-y-4 animate-reveal text-left mt-3">
            
            {/* Talent Categories */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold px-3 block">
                Talent Syndicate
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
                {talentLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/5 hover:text-cyan-300 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Main Links */}
            <div className="space-y-1 pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold px-3 block">
                Navigation
              </span>
              <div className="grid grid-cols-2 gap-1 pt-1">
                {mainNavLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={(e) => handleNavClick(link, e)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Fast Action CTAs */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBookShoot();
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/30"
              >
                <Calendar className="w-4 h-4 text-cyan-200" />
                <span>Book a Shoot (Escrow Protected)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMatchmakerModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>AI Creator Matchmaker</span>
              </button>

              {/* Auth / Demo Simulator on Mobile */}
              {isAuthenticated ? (
                <div className="pt-2 space-y-1.5">
                  <Link
                    to={getDashboardPath(user?.role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full block"
                  >
                    <button className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2">
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
                    <button className="w-full p-2.5 rounded-xl bg-cyan-500 text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all">
                      Join LensCraft
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
