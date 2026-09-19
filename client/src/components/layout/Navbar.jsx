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
  PlusCircle,
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
    { label: 'Explore', path: '/explore' },
    { label: 'Photographers', path: '/photographers' },
    { label: 'Videographers', path: '/videographers' },
    { label: 'Editors', path: '/editors' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Stories', path: '/#stories' },
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
    }
  };

  return (
    <>
      {/* Top Luxury Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/92 backdrop-blur-md border-b border-[#262626] shadow-2xl py-3.5'
            : 'bg-[#080808]/40 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            
            {/* 1. Left: Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group text-left shrink-0">
              <div className="w-8 h-8 rounded bg-[#171717] border border-[#262626] group-hover:border-[#C5A059] flex items-center justify-center transition-colors">
                <Aperture className="w-4 h-4 text-[#C5A059] group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <span className="text-xl font-cinzel font-semibold tracking-wider text-[#FBF9F5] group-hover:text-[#DFCA9B] transition-colors">
                LENSCRAFT
              </span>
            </Link>

            {/* 2. Center: Editorial Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isAnchor = link.path.startsWith('/#');
                const isActive = !isAnchor && location.pathname === link.path;
                
                if (isAnchor) {
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link)}
                      className="text-xs uppercase tracking-widest font-medium text-[#A39E93] hover:text-[#FBF9F5] transition-colors py-1 cursor-pointer"
                    >
                      {link.label}
                    </button>
                  );
                }

                return (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    className={`text-xs uppercase tracking-widest font-medium transition-all duration-200 relative py-1 ${
                      isActive
                        ? 'text-[#DFCA9B] font-semibold'
                        : 'text-[#A39E93] hover:text-[#FBF9F5]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#C5A059]" />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* 3. Right: Search + Saved + Login + CTA */}
            <div className="hidden sm:flex items-center gap-4">
              
              {/* Search Icon */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-[#A39E93] hover:text-[#FBF9F5] bg-[#111111] hover:bg-[#171717] border border-[#262626] transition-colors"
                title="Search creators, styles, locations (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-[11px] uppercase tracking-wider">Search</span>
              </button>

              {/* Saved (Favorites) */}
              <Link
                to="/user/dashboard"
                className="relative p-2 rounded text-[#A39E93] hover:text-[#FBF9F5] hover:bg-[#171717] transition-colors"
                title="Saved creators"
              >
                <Bookmark className="w-4 h-4 text-[#A39E93] hover:text-[#C5A059]" />
                {favorites?.length > 0 && (
                  <span className="absolute 1 top-1 right-1 w-2 h-2 rounded-full bg-[#C5A059]" />
                )}
              </Link>

              {/* Auth state */}
              {isAuthenticated ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded bg-[#111111] border border-[#262626] hover:border-[#C5A059]/40 transition-all"
                  >
                    <Avatar src={user?.avatar?.url} name={user?.name} size="xs" />
                    <span className="text-xs font-medium text-[#FBF9F5] max-w-[85px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#A39E93] transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded bg-[#111111] border border-[#262626] shadow-2xl p-2 z-50 animate-reveal text-left">
                      <div className="px-3 py-2 border-b border-[#262626] mb-1">
                        <p className="text-xs font-semibold text-[#FBF9F5] truncate">{user?.name}</p>
                        <p className="text-[10px] text-[#A39E93] truncate">{user?.email}</p>
                        <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded font-mono uppercase bg-[#171717] text-[#C5A059] border border-[#262626]">
                          {ROLE_LABELS[user?.role] || user?.role}
                        </span>
                      </div>

                      <Link
                        to={getDashboardPath(user?.role)}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#EAE6DF] hover:text-[#DFCA9B] hover:bg-[#171717] rounded transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Workspace Dashboard</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded transition-colors mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-xs uppercase tracking-wider font-medium text-[#EAE6DF] hover:text-[#DFCA9B] transition-colors px-2 py-1"
                >
                  Login
                </Link>
              )}

              {/* Join as Creator CTA */}
              <button
                type="button"
                onClick={() => setCreatorModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold gold-btn transition-all"
              >
                <span>Join as Creator</span>
              </button>

            </div>

            {/* 4. Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 rounded bg-[#111111] border border-[#262626] text-[#A39E93]"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded bg-[#111111] border border-[#262626] text-[#FBF9F5]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 5. Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#080808]/98 backdrop-blur-2xl border-b border-[#262626] px-4 pt-4 pb-6 space-y-4 animate-reveal text-left mt-3">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isAnchor = link.path.startsWith('/#');
                return isAnchor ? (
                  <button
                    key={link.label}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleNavClick(link);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded text-xs uppercase tracking-wider font-medium text-[#EAE6DF] hover:bg-[#171717] hover:text-[#C5A059] transition-colors text-left"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6B665E]" />
                  </button>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded text-xs uppercase tracking-wider font-medium text-[#EAE6DF] hover:bg-[#171717] hover:text-[#C5A059] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6B665E]" />
                  </NavLink>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#262626] space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCreatorModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded gold-btn text-xs uppercase tracking-wider font-semibold"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Join as Creator</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMatchmakerModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2 rounded bg-[#171717] border border-[#262626] text-xs font-medium text-[#DFCA9B]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>AI Creator Matchmaker</span>
              </button>

              {isAuthenticated ? (
                <div className="pt-2 space-y-1.5">
                  <Link
                    to={getDashboardPath(user?.role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full block"
                  >
                    <button className="w-full p-2.5 rounded bg-[#171717] border border-[#262626] text-xs font-semibold text-[#DFCA9B] flex items-center justify-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-[#C5A059]" />
                      <span>Open Workspace ({ROLE_LABELS[user?.role] || user?.role})</span>
                    </button>
                  </Link>
                  <button
                    className="w-full p-2 rounded text-xs text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/');
                    }}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full p-2 rounded border border-[#262626] text-xs font-medium text-[#EAE6DF] hover:bg-[#171717] transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full p-2 rounded gold-btn text-xs font-semibold">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom-Right Demo Role Switcher */}
      <div className="fixed bottom-5 right-5 z-40" ref={demoDropdownRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#111111]/95 hover:bg-[#171717] border border-[#262626] hover:border-[#C5A059] text-xs font-mono text-[#DFCA9B] shadow-2xl backdrop-blur-xl transition-all"
            title="Switch Demo Role"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">Role: {user?.role || 'User'}</span>
            <ChevronDown className={`w-3 h-3 text-[#A39E93] transition-transform ${demoDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {demoDropdownOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-52 rounded bg-[#111111] border border-[#262626] shadow-2xl p-1.5 z-50 animate-reveal text-left">
              <div className="px-2.5 py-1.5 border-b border-[#262626] mb-1 flex items-center justify-between text-[10px] uppercase font-mono font-bold text-[#C5A059]">
                <span>Instant Demo Role</span>
                <span className="text-[9px] text-[#A39E93]">1-Click</span>
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
                    className="w-full text-left px-2.5 py-1.5 text-xs rounded hover:bg-[#171717] flex items-center justify-between text-[#EAE6DF] hover:text-[#DFCA9B] font-medium transition-colors"
                  >
                    <span>{ROLE_LABELS[roleKey]}</span>
                    <span className="text-[9px] px-1 py-0.5 rounded border uppercase font-mono text-[#C5A059] bg-[#171717] border-[#262626]">
                      {roleKey}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Overlay Modal */}
      <SearchOverlayModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

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
