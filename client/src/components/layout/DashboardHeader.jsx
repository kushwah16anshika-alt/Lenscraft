import React, { useState } from 'react';
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
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Avatar from '../common/Avatar';

const DashboardHeader = ({ onMobileMenuToggle }) => {
  const { user, logout, quickDemoLogin } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [demoRoleOpen, setDemoRoleOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const mockNotifications = [
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
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#060c1d]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 flex items-center justify-between">
      {/* Left Area: Mobile menu & Quick Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 text-xs w-80 focus-within:border-cyan-500/50 focus-within:bg-white/[0.07] transition-all">
          <Search className="w-4 h-4 text-cyan-400/70 shrink-0" />
          <input
            type="text"
            placeholder="Search projects, gear kit, escrow IDs..."
            className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:outline-none text-xs"
          />
        </div>
      </div>

      {/* Right Area: Demo Role Switcher, Public Site Link, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Role Testing Switcher */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDemoRoleOpen(!demoRoleOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Role: {user?.role}</span>
            <ChevronDown className="w-3 h-3 text-cyan-400/70" />
          </button>

          {demoRoleOpen && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0a122c]/95 border border-cyan-500/30 shadow-2xl shadow-black/80 p-2 z-50 animate-reveal text-left backdrop-blur-2xl"
              onMouseLeave={() => setDemoRoleOpen(false)}
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/10 mb-1 text-[10px] uppercase font-mono text-cyan-400 font-bold">
                <Shield className="w-3 h-3" />
                <span>Instant Demo Switcher</span>
              </div>
              {Object.values(ROLES).map((roleKey) => (
                <button
                  key={roleKey}
                  onClick={() => {
                    quickDemoLogin(roleKey);
                    setDemoRoleOpen(false);
                    if (roleKey === ROLES.ADMIN) navigate('/admin/dashboard');
                    else if ([ROLES.PHOTOGRAPHER, ROLES.VIDEOGRAPHER, ROLES.EDITOR].includes(roleKey))
                      navigate('/professional/dashboard');
                    else navigate('/user/dashboard');
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-white/10 flex items-center justify-between text-slate-200 hover:text-white font-medium transition-colors"
                >
                  <span>{ROLE_LABELS[roleKey]}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded border uppercase font-mono text-cyan-300 bg-cyan-950/40 border-cyan-500/30">
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
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <span>Live Site</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white relative hover:bg-white/10 transition-colors"
          >
            <Bell className="w-4 h-4 text-cyan-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
          </button>

          {notificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-xl bg-[#0a122c]/95 border border-white/10 shadow-2xl shadow-black/80 p-2 z-50 animate-slide-up text-left backdrop-blur-2xl"
              onMouseLeave={() => setNotificationsOpen(false)}
            >
              <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-white font-heading">Escrow Notifications</span>
                <span className="text-[10px] text-cyan-400 cursor-pointer hover:underline font-mono">Mark read</span>
              </div>
              <div className="py-1 space-y-1">
                {mockNotifications.map((notif) => (
                  <div key={notif.id} className="p-2.5 rounded-lg hover:bg-white/5 text-xs transition-colors">
                    <p className="font-semibold text-white mb-0.5">{notif.title}</p>
                    <p className="text-slate-400 text-[11px] leading-snug">{notif.message}</p>
                    <span className="text-[10px] text-cyan-400/80 font-mono mt-1 block">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Menu */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-cyan-400/40 transition-all"
          >
            <Avatar src={user?.avatar?.url} name={user?.name} size="xs" />
          </button>

          {userDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-xl bg-[#0a122c]/95 border border-white/10 shadow-2xl shadow-black/80 p-2 z-50 animate-slide-up text-left backdrop-blur-2xl"
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  logout();
                  setUserDropdownOpen(false);
                  navigate('/');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
