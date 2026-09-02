import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
  ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Button from '../common/Button';
import Avatar from '../common/Avatar';

const Navbar = () => {
  const { user, isAuthenticated, logout, quickDemoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
    { label: 'About', path: '/about', icon: null },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F5F2]/95 backdrop-blur-md border-b border-[#E5E0D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-md bg-[#171717] flex items-center justify-center text-white shadow-2xs group-hover:scale-102 transition-transform">
              <Camera className="w-4.5 h-4.5 stroke-[1.75]" />
            </div>
            <div className="text-left">
              <span className="text-xl font-serif font-extrabold tracking-tight text-[#171717] block leading-none">
                LENS<span className="text-[#B88A5A]">·</span>CRAFT
              </span>
              <span className="text-[9px] text-[#6B6258] uppercase tracking-[0.2em] block font-semibold mt-1">
                Creative Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs font-semibold uppercase tracking-wider transition-colors py-1 editorial-nav-link ${
                    isActive ? 'text-[#171717] active font-bold' : 'text-[#6B6258] hover:text-[#171717]'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Role Switcher (Dev feature) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EEEAE4] border border-[#E5E0D8] text-xs font-semibold text-[#6B6258] hover:text-[#171717] hover:border-[#171717] transition-all"
                title="Switch test user role"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B88A5A]" />
                <span>Demo Roles</span>
                <ChevronDown className="w-3 h-3 text-[#8C8276]" />
              </button>

              {demoDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 rounded-md bg-white border border-[#E5E0D8] shadow-lg p-1.5 z-50 animate-slide-up text-left"
                  onMouseLeave={() => setDemoDropdownOpen(false)}
                >
                  <span className="text-[10px] uppercase font-bold text-[#8C8276] px-3 py-1.5 block border-b border-[#E5E0D8] mb-1">
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
                      className="w-full text-left px-3 py-2 text-xs rounded hover:bg-[#F7F5F2] flex items-center justify-between text-[#171717] font-medium"
                    >
                      <span>{ROLE_LABELS[roleKey]}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded border uppercase font-bold text-[#6B6258] bg-[#EEEAE4] border-[#E5E0D8]">
                        {roleKey}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white border border-[#E5E0D8] hover:border-[#171717] transition-all shadow-2xs"
                >
                  <Avatar src={user?.avatar?.url} name={user?.name} size="xs" />
                  <span className="text-xs font-semibold text-[#171717] max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#8C8276]" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-md bg-white border border-[#E5E0D8] shadow-lg p-1.5 z-50 animate-slide-up text-left"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-[#E5E0D8] mb-1">
                      <p className="text-xs font-bold text-[#171717] truncate">{user?.name}</p>
                      <p className="text-[11px] text-[#6B6258] truncate">{user?.email}</p>
                      <span className="inline-block mt-1.5 text-[9px] px-2 py-0.5 rounded-sm border uppercase font-bold bg-[#FAF7F3] text-[#B88A5A] border-[#E8DBCA]">
                        {ROLE_LABELS[user?.role] || user?.role}
                      </span>
                    </div>

                    <Link
                      to={getDashboardPath(user?.role)}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#171717] hover:bg-[#F7F5F2] rounded transition-colors font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#B88A5A]" />
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
                    Join Marketplace
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-white border border-[#E5E0D8] text-[#171717]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E0D8] px-4 pt-3 pb-6 space-y-3 animate-slide-up text-left">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider ${
                    isActive ? 'text-[#171717] bg-[#EEEAE4]' : 'text-[#6B6258] hover:bg-[#F7F5F2]'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E5E0D8] space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardPath(user?.role)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block"
                >
                  <Button variant="primary" size="md" className="w-full">
                    Dashboard ({ROLE_LABELS[user?.role] || user?.role})
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
                    Join
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
