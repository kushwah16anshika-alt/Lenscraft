import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Camera,
  Video,
  Film,
  Compass,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  Search,
  BookOpen,
  ArrowUpRight,
  PlusCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import CreatorOnboardingModal from '../common/CreatorOnboardingModal';

const Navbar = () => {
  const { user, isAuthenticated, logout, quickDemoLogin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
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
    { label: 'About', path: '/about', icon: BookOpen },
  ];

  const isHeroPage = location.pathname === '/';

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] shadow-xs py-3.5'
            : isHeroPage
            ? 'bg-[#FAF8F5]/80 backdrop-blur-xs border-b border-[#E8E2D8]/60 py-5'
            : 'bg-[#FAF8F5] border-b border-[#E8E2D8] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Editorial Logo */}
            <Link to="/" className="flex items-center gap-3 group text-left">
              <div className="w-8 h-8 rounded bg-[#121212] flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Camera className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-serif font-extrabold tracking-tight text-[#121212] block leading-none">
                  LENS<span className="text-[#C4683C]">·</span>CRAFT
                </span>
                <span className="text-[9px] text-[#6B6258] uppercase tracking-[0.2em] block font-semibold mt-0.5">
                  Editorial Creative Roster
                </span>
              </div>
            </Link>

            {/* Center: Curated Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs font-semibold uppercase tracking-wider transition-colors py-1 editorial-nav-link ${
                      isActive
                        ? 'text-[#121212] active font-bold'
                        : 'text-[#6B6258] hover:text-[#121212]'
                    }`
                  }
                >
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Right: Actions & Profile */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Become a Creator CTA */}
              <button
                onClick={() => setCreatorModalOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#6B6258] hover:text-[#121212] hover:bg-[#F3EFEA] transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#C4683C]" />
                <span>Become a Creator</span>
              </button>

              {/* Demo Role Switcher (Dev Sandbox) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#F3EFEA] border border-[#E8E2D8] text-[11px] font-semibold text-[#6B6258] hover:text-[#121212] transition-all"
                  title="Switch test role"
                >
                  <Sparkles className="w-3 h-3 text-[#C4683C]" />
                  <span>Demo Roles</span>
                  <ChevronDown className="w-3 h-3 text-[#8C8276]" />
                </button>

                {demoDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded bg-white border border-[#E8E2D8] shadow-xl p-1.5 z-50 animate-reveal text-left"
                    onMouseLeave={() => setDemoDropdownOpen(false)}
                  >
                    <span className="text-[10px] uppercase font-bold text-[#8C8276] px-3 py-1.5 block border-b border-[#E8E2D8] mb-1">
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
                        className="w-full text-left px-3 py-2 text-xs rounded hover:bg-[#FAF8F5] flex items-center justify-between text-[#121212] font-medium"
                      >
                        <span>{ROLE_LABELS[roleKey]}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded border uppercase font-bold text-[#6B6258] bg-[#F3EFEA] border-[#E8E2D8]">
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
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white border border-[#E8E2D8] hover:border-[#121212] transition-all shadow-2xs"
                  >
                    <Avatar src={user?.avatar?.url} name={user?.name} size="xs" />
                    <span className="text-xs font-semibold text-[#121212] max-w-[110px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#8C8276]" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded bg-white border border-[#E8E2D8] shadow-xl p-1.5 z-50 animate-reveal text-left"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-3 py-2 border-b border-[#E8E2D8] mb-1">
                        <p className="text-xs font-bold text-[#121212] truncate">{user?.name}</p>
                        <p className="text-[11px] text-[#6B6258] truncate">{user?.email}</p>
                        <span className="inline-block mt-1.5 text-[9px] px-2 py-0.5 rounded border uppercase font-bold bg-[#FAF8F5] text-[#C4683C] border-[#E8E2D8]">
                          {ROLE_LABELS[user?.role] || user?.role}
                        </span>
                      </div>

                      <Link
                        to={getDashboardPath(user?.role)}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-[#121212] hover:bg-[#FAF8F5] rounded transition-colors font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#C4683C]" />
                        <span>Studio Dashboard</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#99453F] hover:bg-[#FDF2F1] rounded transition-colors mt-1 font-medium"
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
                className="p-2 rounded bg-white border border-[#E8E2D8] text-[#121212]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E8E2D8] px-4 pt-4 pb-6 space-y-4 animate-reveal text-left">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold uppercase tracking-wider ${
                      isActive ? 'text-[#121212] bg-[#F3EFEA]' : 'text-[#6B6258] hover:bg-[#FAF8F5]'
                    }`
                  }
                >
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E8E2D8] space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCreatorModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded bg-[#F3EFEA] text-xs font-bold text-[#121212]"
              >
                <PlusCircle className="w-4 h-4 text-[#C4683C]" />
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
                    className="w-full text-[#99453F]"
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
    </>
  );
};

export default Navbar;
