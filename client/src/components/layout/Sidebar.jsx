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
          className="fixed inset-0 z-40 bg-zinc-950/70 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-zinc-950 text-white border-r border-zinc-800 transition-all duration-200 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-800">
          <Link
            to="/"
            className={`flex items-center gap-3 overflow-hidden ${
              isCollapsed ? 'justify-center w-full' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shrink-0">
              <Camera className="w-4 h-4 stroke-[1.75]" />
            </div>
            {!isCollapsed && (
              <div className="text-left">
                <span className="text-base font-serif font-bold tracking-tight text-white block leading-none">
                  LENS<span className="text-zinc-400">·</span>CRAFT
                </span>
                <span className="text-[9px] text-zinc-400 uppercase tracking-widest block font-semibold mt-1">
                  {user?.role === ROLES.ADMIN ? 'Admin Portal' : 'Studio Workspace'}
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          {!isMobileOpen && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* User Card */}
        <div className="p-3 border-b border-zinc-800">
          <div
            className={`flex items-center gap-3 p-2 rounded-md bg-zinc-900 border border-zinc-800 ${
              isCollapsed ? 'justify-center' : 'text-left'
            }`}
          >
            <Avatar src={user?.avatar?.url} name={user?.name} size="xs" isOnline={true} />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <span className="inline-block text-[9px] px-1.5 py-0.2 rounded-xs uppercase font-bold text-zinc-300 bg-zinc-800 border border-zinc-700">
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
                  `flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium tracking-wide transition-all ${
                    isCollapsed ? 'justify-center px-2' : ''
                  } ${
                    isActive
                      ? 'bg-white text-zinc-950 font-bold shadow-xs'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
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
        <div className="p-3 border-t border-zinc-800">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-red-400 hover:bg-zinc-900 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Log out"
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
