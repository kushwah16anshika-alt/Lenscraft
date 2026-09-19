import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Image,
  Layers,
  DollarSign,
  Clock,
  Star,
  Users,
  FileText,
  Tag,
  Settings,
  Heart,
  User as UserIcon,
  Compass,
  LogOut,
  Camera,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Aperture,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../constants/roles';
import Avatar from '../common/Avatar';

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getNavLinks = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return [
          { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
          { label: 'Platform Users', path: '/admin/users', icon: Users },
          { label: 'Creators Directory', path: '/admin/professionals', icon: Camera },
          { label: 'All Bookings', path: '/admin/appointments', icon: Calendar },
          { label: 'Review Moderation', path: '/admin/reviews', icon: Star },
          { label: 'Disputes & Reports', path: '/admin/reports', icon: FileText },
          { label: 'Categories', path: '/admin/categories', icon: Tag },
          { label: 'System Settings', path: '/admin/settings', icon: Settings },
        ];
      case ROLES.PHOTOGRAPHER:
      case ROLES.VIDEOGRAPHER:
      case ROLES.EDITOR:
        return [
          { label: 'Studio Overview', path: '/professional/dashboard', icon: LayoutDashboard },
          { label: 'Appointments', path: '/professional/appointments', icon: Calendar },
          { label: 'Portfolio Gallery', path: '/professional/portfolio', icon: Image },
          { label: 'Service Packages', path: '/professional/services', icon: Layers },
          { label: 'Rate Cards', path: '/professional/pricing', icon: DollarSign },
          { label: 'Working Hours', path: '/professional/availability', icon: Clock },
          { label: 'Earnings & Payouts', path: '/professional/earnings', icon: TrendingUp },
          { label: 'Client Reviews', path: '/professional/reviews', icon: Star },
          { label: 'Studio Settings', path: '/professional/settings', icon: Settings },
        ];
      case ROLES.USER:
      default:
        return [
          { label: 'Client Overview', path: '/user/dashboard', icon: LayoutDashboard },
          { label: 'My Bookings', path: '/user/bookings', icon: Calendar },
          { label: 'Saved Creators', path: '/user/wishlist', icon: Heart },
          { label: 'My Reviews', path: '/user/reviews', icon: Star },
          { label: 'Profile Details', path: '/user/profile', icon: UserIcon },
          { label: 'Account Settings', path: '/user/settings', icon: Settings },
          { label: 'Explore Talent', path: '/photographers', icon: Compass },
        ];
    }
  };

  const navLinks = getNavLinks(user?.role);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-[#050a18]/90 backdrop-blur-2xl text-white border-r border-white/10 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link
            to="/"
            className={`flex items-center gap-3 overflow-hidden ${
              isCollapsed ? 'justify-center w-full' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 flex items-center justify-center text-white shrink-0 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#030712] rounded-[6px] flex items-center justify-center">
                <Aperture className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="text-left">
                <span className="text-sm font-heading font-extrabold tracking-wider text-white block leading-none">
                  LENS<span className="text-cyan-400">·</span>CRAFT
                </span>
                <span className="text-[9px] text-cyan-400/80 uppercase tracking-widest block font-mono font-bold mt-1">
                  {user?.role === ROLES.ADMIN ? 'Admin Terminal' : 'Studio Portal'}
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          {!isMobileOpen && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* User Card */}
        <div className="p-3 border-b border-white/10">
          <div
            className={`flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 ${
              isCollapsed ? 'justify-center' : 'text-left'
            }`}
          >
            <Avatar src={user?.avatar?.url} name={user?.name} size="xs" isOnline={true} />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <span className="inline-block text-[9px] px-1.5 py-0.5 rounded-sm uppercase font-mono font-bold text-cyan-300 bg-cyan-950/50 border border-cyan-500/30">
                  {user?.role}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar text-left">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 ${
                    isCollapsed ? 'justify-center px-2' : ''
                  } ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10 font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                  }`
                }
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Footer Actions */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Sign out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
