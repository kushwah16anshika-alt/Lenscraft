import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
  LogOut,
  ArrowUpRight,
  Shield,
  Aperture,
  User as UserIcon,
  Settings,
  LayoutDashboard,
  CheckCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Avatar from '../common/Avatar';

const DashboardHeader = ({ onMobileMenuToggle }) => {
  const { user, logout, quickDemoLogin } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [demoRoleOpen, setDemoRoleOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Escrow Inquiry',
      message: 'You have a new inquiry for Commercial Lookbook in Mumbai.',
      time: '10m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Milestone Advance Secured',
      message: 'Milestone escrow payment of ₹35,000 confirmed for Project #LC-2026.',
      time: '2h ago',
      unread: false,
    },
  ]);

  const notificationsRef = useRef(null);
  const demoRoleRef = useRef(null);
  const userDropdownRef = useRef(null);

  const navigate = useNavigate();

  // Click-outside listener for all header dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (demoRoleRef.current && !demoRoleRef.current.contains(e.target)) {
        setDemoRoleOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const hasUnreadNotifications = notifications.some((n) => n.unread);

  const getProfilePath = () => {
    if (user?.role === ROLES.USER) return '/user/profile';
    if (user?.role === ROLES.ADMIN) return '/admin/dashboard';
    return '/professional/dashboard';
  };

  const getSettingsPath = () => {
    if (user?.role === ROLES.USER) return '/user/settings';
    if (user?.role === ROLES.ADMIN) return '/admin/settings';
    return '/professional/settings';
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#030712]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
      {/* Left Area: Mobile Menu Toggle, Mobile Logo, and Quick Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          aria-label="Toggle Dashboard Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Brand Wordmark */}
        <Link to="/" className="lg:hidden flex items-center gap-2 group shrink-0" aria-label="LensCraft Home">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500/20 to-cyan-500/20 border border-sky-400/40 flex items-center justify-center shrink-0">
            <Aperture className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-90 transition-transform duration-500" />
          </div>
          <span className="text-sm font-display font-extrabold tracking-wider text-white">
            LENSCRAFT
          </span>
        </Link>

        {/* Search input field */}
        <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 text-xs w-52 md:w-64 lg:w-80 focus-within:border-cyan-500/50 focus-within:bg-white/[0.07] transition-all">
          <Search className="w-4 h-4 text-cyan-400/70 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, gear, escrow IDs..."
            className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:outline-none text-xs"
          />
        </div>
      </div>

      {/* Right Area: Demo Role Switcher, Public Site Link, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Role Testing Switcher */}
        <div className="relative" ref={demoRoleRef}>
          <button
            type="button"
            onClick={() => setDemoRoleOpen(!demoRoleOpen)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer"
            aria-expanded={demoRoleOpen}
            title="Switch demo profile for testing and viva"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="hidden sm:inline font-semibold">
              {ROLE_LABELS[user?.role] || user?.role}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-cyan-400/80 transition-transform duration-200 ${
                demoRoleOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {demoRoleOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#060c1d]/98 border border-cyan-500/35 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,210,255,0.15)] p-2 z-50 animate-reveal text-left backdrop-blur-2xl">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 mb-1 text-[10px] uppercase font-mono text-cyan-400 font-bold">
                <Sparkles className="w-3 h-3" />
                <span>1-Click Viva Role Switcher</span>
              </div>
              {Object.values(ROLES).map((roleKey) => (
                <button
                  key={roleKey}
                  type="button"
                  onClick={() => {
                    quickDemoLogin(roleKey);
                    setDemoRoleOpen(false);
                    if (roleKey === ROLES.ADMIN) navigate('/admin/dashboard');
                    else if ([ROLES.PHOTOGRAPHER, ROLES.VIDEOGRAPHER, ROLES.EDITOR].includes(roleKey))
                      navigate('/professional/dashboard');
                    else navigate('/user/dashboard');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center justify-between font-medium transition-colors cursor-pointer ${
                    user?.role === roleKey
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{ROLE_LABELS[roleKey]}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded border uppercase font-mono text-cyan-300 bg-cyan-950/40 border-cyan-500/30 font-bold">
                    {roleKey}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Public Website */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          title="Open Public Marketplace in New Tab"
        >
          <span>Live Site</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
        </Link>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white relative hover:bg-white/10 transition-colors cursor-pointer"
            aria-expanded={notificationsOpen}
            aria-label="Escrow and System Notifications"
          >
            <Bell className="w-4 h-4 text-cyan-400" />
            {hasUnreadNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,210,255,0.9)] animate-pulse" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#060c1d]/98 border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,210,255,0.12)] p-2 z-50 animate-reveal text-left backdrop-blur-2xl">
              <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-white font-display">Escrow & Milestone Updates</span>
                {hasUnreadNotifications && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 cursor-pointer font-mono flex items-center gap-1"
                  >
                    <CheckCheck className="w-3 h-3" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>
              <div className="py-1 space-y-1 max-h-72 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-2.5 rounded-xl text-xs transition-colors ${
                      notif.unread
                        ? 'bg-cyan-500/10 border border-cyan-500/25'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="font-semibold text-white">{notif.title}</p>
                      {notif.unread && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-slate-400 text-[11px] leading-snug">{notif.message}</p>
                    <span className="text-[10px] text-cyan-400/80 font-mono mt-1 block">
                      {notif.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Avatar Menu */}
        <div className="relative" ref={userDropdownRef}>
          <button
            type="button"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-1.5 p-0.5 pr-1 rounded-full hover:ring-2 hover:ring-cyan-400/40 transition-all cursor-pointer"
            aria-expanded={userDropdownOpen}
            aria-label="User Account Menu"
          >
            <Avatar user={user} size="sm" isOnline={true} />
            <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#060c1d]/98 border border-cyan-500/35 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,210,255,0.15)] p-2 z-50 animate-reveal text-left backdrop-blur-2xl">
              <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
                  {ROLE_LABELS[user?.role] || user?.role}
                </span>
              </div>

              <div className="space-y-0.5 py-1">
                <Link
                  to={getProfilePath()}
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to={getSettingsPath()}
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Settings</span>
                </Link>

                <Link
                  to="/"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-slate-200 hover:text-cyan-300 hover:bg-sky-500/10 transition-colors"
                >
                  <Aperture className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Marketplace Home</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
