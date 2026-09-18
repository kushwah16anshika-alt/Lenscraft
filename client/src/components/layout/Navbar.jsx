import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Camera,
  Video,
  Film,
  Compass,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  BookOpen,
  PlusCircle,
  Sliders,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import CreatorOnboardingModal from '../common/CreatorOnboardingModal';
import AiMatchmakerModal from '../common/AiMatchmakerModal';

const Navbar = () => {
  const { user, isAuthenticated, logout, quickDemoLogin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [matchmakerModalOpen, setMatchmakerModalOpen] = useState(false);
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
    { label: 'Photographers', path: '/photographers', icon: Camera },
    { label: 'Videographers', path: '/videographers', icon: Video },
    { label: 'Video Editors', path: '/editors', icon: Film },
    { label: 'Services', path: '/services', icon: Compass },
    { label: 'Features', path: '/features', icon: Sparkles },
    { label: 'About', path: '/about', icon: BookOpen },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-subtle py-3.5'
            : 'bg-white border-b border-zinc-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Editorial Logo */}
            <Link to="/" className="flex items-center gap-3 group text-left">
              <div className="w-8 h-8 rounded-md bg-zinc-900 flex items-center justify-center text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
                <Camera className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-serif font-extrabold tracking-tight text-zinc-900 block leading-none">
                  LENS<span className="text-zinc-400">·</span>CRAFT
                </span>
                <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] block font-semibold mt-0.5">
                  Editorial Creative Roster
                </span>
              </div>
            </Link>

            {/* Center: Curated Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs font-semibold uppercase tracking-wider transition-colors py-1 editorial-nav-link ${
                      isActive
                        ? 'text-zinc-900 active font-bold'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`
                  }
                >
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Right: Actions & Profile */}
            <div className="hidden sm:flex items-center gap-3">
              {/* AI Matchmaker CTA */}
              <button
                onClick={() => setMatchmakerModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
                <span>Find Match</span>
              </button>

              {/* Become a Creator CTA */}
              <button
                onClick={() => setCreatorModalOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 text-zinc-700" />
                <span>Become a Creator</span>
              </button>

              {/* Demo Role Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-100 border border-zinc-200 text-[11px] font-semibold text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-all"
                  title="Switch test role"
                >
                  <Sparkles className="w-3 h-3 text-zinc-800" />
                  <span>Demo Roles</span>
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                </button>

                {demoDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-md bg-white border border-zinc-200 shadow-soft-lg p-1.5 z-50 animate-reveal text-left"
                    onMouseLeave={() => setDemoDropdownOpen(false)}
                  >
                    <span className="text-[10px] uppercase font-bold text-zinc-400 px-3 py-1.5 block border-b border-zinc-100 mb-1">
                      Instant Role Switcher
                    </span>
                    {Object.values(ROLES).map((roleKey) => (
                      <button
                        key={roleKey}
                        onClick={() => {
                          quickDemoLogin(roleKey);
                          setDemoDropdownOpen(false);
                          navigate(getDashboardPath(roleKey));
                        }}
                        className="w-full text-left px-3 py-2 text-xs rounded hover:bg-zinc-50 flex items-center justify-between text-zinc-900 font-medium"
                      >
                        <span>{ROLE_LABELS[roleKey]}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded border uppercase font-bold text-zinc-600 bg-zinc-100 border-zinc-200">
                          {roleKey}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Authenticated Menu / Sign In Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white border border-zinc-200 hover:border-zinc-900 transition-all shadow-subtle"
                  >
                    <Avatar src={user?.avatar?.url} name={user?.name} size="xs" />
                    <span className="text-xs font-semibold text-zinc-900 max-w-[110px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-md bg-white border border-zinc-200 shadow-soft-lg p-1.5 z-50 animate-reveal text-left"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-3 py-2 border-b border-zinc-100 mb-1">
                        <p className="text-xs font-bold text-zinc-900 truncate">{user?.name}</p>
                        <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
                        <span className="inline-block mt-1.5 text-[9px] px-2 py-0.5 rounded border uppercase font-bold bg-zinc-100 text-zinc-700 border-zinc-200">
                          {ROLE_LABELS[user?.role] || user?.role}
                        </span>
                      </div>

                      <Link
                        to={getDashboardPath(user?.role)}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-900 hover:bg-zinc-50 rounded transition-colors font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-zinc-700" />
                        <span>Studio Dashboard</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-700 hover:bg-red-50 rounded transition-colors mt-1 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm">
                      Join Roster
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Drawer Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md bg-white border border-zinc-200 text-zinc-900"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-zinc-200 px-4 pt-4 pb-6 space-y-4 animate-reveal text-left">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider ${
                      isActive ? 'text-zinc-900 bg-zinc-100 font-bold' : 'text-zinc-600 hover:bg-zinc-50'
                    }`
                  }
                >
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-200 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMatchmakerModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-md bg-zinc-900 text-xs font-bold text-white shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-zinc-300" />
                <span>AI Creator Matchmaker</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCreatorModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-md bg-zinc-100 text-xs font-bold text-zinc-900"
              >
                <PlusCircle className="w-4 h-4 text-zinc-700" />
                <span>Apply as Creator</span>
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardPath(user?.role)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full block"
                  >
                    <Button variant="primary" size="md" className="w-full">
                      Studio Dashboard ({ROLE_LABELS[user?.role] || user?.role})
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full text-red-600"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/');
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="md" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="md" className="w-full">
                      Join Roster
                    </Button>
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
    </>
  );
};

export default Navbar;
