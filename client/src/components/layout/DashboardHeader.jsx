import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
  ExternalLink,
  LogOut,
  ArrowUpRight,
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
      title: 'New Booking Inquiry',
      message: 'You have a new inquiry for Wedding Photography in Mumbai.',
      time: '10m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Advance Payment Received',
      message: 'Advance payment of ₹15,000 confirmed for Project #LC-2025.',
      time: '2h ago',
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/95 border-b border-[#E5E0D8] backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
      {/* Left Area: Mobile menu & Quick Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-md bg-[#EEEAE4] text-[#171717]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-md bg-[#F7F5F2] border border-[#E5E0D8] text-[#6B6258] text-xs w-72">
          <Search className="w-4 h-4 text-[#8C8276] shrink-0" />
          <input
            type="text"
            placeholder="Search projects, appointments..."
            className="w-full bg-transparent border-none text-[#171717] placeholder-[#8C8276] focus:outline-none text-xs"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] text-xs font-semibold text-[#B88A5A] hover:border-[#B88A5A] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Role: {user?.role}</span>
            <ChevronDown className="w-3 h-3 text-[#8C8276]" />
          </button>

          {demoRoleOpen && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-md bg-white border border-[#E5E0D8] shadow-lg p-1.5 z-50 animate-slide-up text-left"
              onMouseLeave={() => setDemoRoleOpen(false)}
            >
              <span className="text-[10px] uppercase font-bold text-[#8C8276] px-3 py-1.5 block border-b border-[#E5E0D8] mb-1">
                Instant Role Switcher
              </span>
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

        {/* View Public Website */}
        <Link
          to="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#6B6258] hover:text-[#171717] bg-[#F7F5F2] hover:bg-[#EEEAE4] border border-[#E5E0D8] transition-colors"
        >
          <span>View Site</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-md bg-[#F7F5F2] border border-[#E5E0D8] text-[#6B6258] hover:text-[#171717] relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B88A5A]" />
          </button>

          {notificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-md bg-white border border-[#E5E0D8] shadow-xl p-2 z-50 animate-slide-up text-left"
              onMouseLeave={() => setNotificationsOpen(false)}
            >
              <div className="px-3 py-2 border-b border-[#E5E0D8] flex items-center justify-between">
                <span className="text-xs font-bold text-[#171717]">Notifications</span>
                <span className="text-[10px] text-[#B88A5A] cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="py-1 space-y-1">
                {mockNotifications.map((notif) => (
                  <div key={notif.id} className="p-2.5 rounded-md hover:bg-[#F7F5F2] text-xs">
                    <p className="font-semibold text-[#171717] mb-0.5">{notif.title}</p>
                    <p className="text-[#6B6258] leading-snug">{notif.message}</p>
                    <span className="text-[10px] text-[#8C8276] mt-1 block">{notif.time}</span>
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
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#B88A5A]/30 transition-all"
          >
            <Avatar src={user?.avatar?.url} name={user?.name} size="xs" />
          </button>

          {userDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-md bg-white border border-[#E5E0D8] shadow-xl p-1.5 z-50 animate-slide-up text-left"
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <div className="px-3 py-2 border-b border-[#E5E0D8] mb-1">
                <p className="text-xs font-bold text-[#171717] truncate">{user?.name}</p>
                <p className="text-[10px] text-[#6B6258] truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  logout();
                  setUserDropdownOpen(false);
                  navigate('/');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#99453F] hover:bg-[#FDF2F1] rounded transition-colors"
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
