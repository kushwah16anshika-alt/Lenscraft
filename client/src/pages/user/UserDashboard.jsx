import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Heart,
  Star,
  Compass,
  ArrowRight,
  Clock,
  MessageSquare,
  Bell,
  User as UserIcon,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Eye,
  Camera,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { usePlatform } from '../../context/PlatformContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import ProfessionalCard from '../../components/cards/ProfessionalCard';

const UserDashboard = () => {
  const { user } = useAuth();
  const { bookings, favorites, toggleFavorite, professionals } = usePlatform();
  const [activeTab, setActiveTab] = useState('upcoming');

  const displayName = (user?.name || 'Anshika').toUpperCase();

  const userBookings = bookings?.length > 0 ? bookings : [
    {
      id: 'BK-9281',
      service: 'Wedding Photography',
      date: '12 Oct 2026',
      time: '10:00 AM – 06:00 PM',
      creatorName: 'Arjun Mehta',
      creatorId: 'pro-1',
      package: 'Signature',
      totalAmount: 28000,
      advancePaid: 7000,
      status: 'Confirmed',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'BK-7741',
      service: 'Pre-Wedding Shoot',
      date: '28 Nov 2026',
      time: '04:00 PM – 07:30 PM',
      creatorName: 'Kabir Varma',
      creatorId: 'pro-2',
      package: 'Essential',
      totalAmount: 20000,
      advancePaid: 5000,
      status: 'Confirmed',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  ];

  const pastBookings = [
    {
      id: 'BK-5520',
      service: 'Fashion Lookbook Editorial',
      date: '15 Jan 2026',
      creatorName: 'Nisha Singhania',
      creatorId: 'pro-4',
      package: 'Signature',
      totalAmount: 32000,
      status: 'Completed',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#FBF9F5] pb-24 text-left space-y-8 animate-reveal">
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL GREETING & STATS HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-10 bg-[#111111] border border-[#262626] rounded flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A059]">
            Client Portal · Workspace
          </span>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-semibold text-[#FBF9F5]">
            GOOD MORNING, {displayName}
          </h1>
          <p className="text-xs sm:text-sm text-[#A39E93]">
            Track upcoming shoot dates, master archival deliverables, and saved talent.
          </p>
        </div>

        {/* 3 Prominent Metric Pills */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="px-5 py-3 rounded bg-[#171717] border border-[#262626]">
            <span className="text-[10px] uppercase tracking-wider text-[#A39E93] block">Upcoming</span>
            <span className="text-2xl font-mono font-bold text-[#FBF9F5]">2</span>
          </div>

          <div className="px-5 py-3 rounded bg-[#171717] border border-[#262626]">
            <span className="text-[10px] uppercase tracking-wider text-[#A39E93] block">Saved Creators</span>
            <span className="text-2xl font-mono font-bold text-[#DFCA9B]">12</span>
          </div>

          <div className="px-5 py-3 rounded bg-[#171717] border border-[#262626]">
            <span className="text-[10px] uppercase tracking-wider text-[#A39E93] block">Completed</span>
            <span className="text-2xl font-mono font-bold text-[#FBF9F5]">8</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURED UPCOMING BOOKING BANNER
          ───────────────────────────────────────────────────────────── */}
      <div className="p-6 bg-[#171717] border-2 border-[#C5A059]/60 rounded relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-[#111111] border border-[#C5A059]/40 text-[#C5A059]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                Next Confirmed Shoot
              </span>
              <h3 className="text-lg font-cinzel font-bold text-[#FBF9F5]">
                Wedding Photography · 12 Oct 2026
              </h3>
              <p className="text-xs text-[#A39E93]">
                Creator: <strong className="text-[#DFCA9B]">Arjun Mehta</strong> · Signature Package (₹28,000)
              </p>
            </div>
          </div>

          <Link
            to="/professionals/pro-1"
            className="px-5 py-2.5 rounded gold-btn text-xs uppercase tracking-wider font-semibold self-start sm:self-auto inline-flex items-center gap-1.5"
          >
            <span>View Booking Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SECTION TABS & CONTENT
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#262626] gap-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'upcoming', label: 'Upcoming Bookings' },
            { id: 'past', label: 'Past Bookings' },
            { id: 'saved', label: 'Saved Creators (12)' },
            { id: 'messages', label: 'Messages' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'profile', label: 'Profile Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab.id
                  ? 'text-[#DFCA9B] font-semibold'
                  : 'text-[#A39E93] hover:text-[#FBF9F5]'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
              )}
            </button>
          ))}
        </div>

        {/* TAB: UPCOMING BOOKINGS */}
        {activeTab === 'upcoming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-reveal">
            {userBookings.map((b) => (
              <div key={b.id} className="p-6 bg-[#111111] border border-[#262626] rounded space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#C5A059]">Ref: {b.id}</span>
                    <h4 className="text-base font-cinzel font-bold text-[#FBF9F5]">{b.service}</h4>
                    <p className="text-xs text-[#A39E93]">Creator: {b.creatorName}</p>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#171717] text-[#C5A059] border border-[#262626]">
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-[#262626] text-[#A39E93]">
                  <div>
                    <span className="text-[10px] uppercase text-[#6B665E] block">Date & Time</span>
                    <span className="font-semibold text-[#FBF9F5]">{b.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#6B665E] block">Total Amount</span>
                    <span className="font-mono font-semibold text-[#DFCA9B]">₹{b.totalAmount?.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#A39E93] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Escrow Secured
                  </span>
                  <Link to={`/professionals/${b.creatorId || 'pro-1'}`} className="text-[#DFCA9B] hover:underline font-semibold">
                    Open Production Chat →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: PAST BOOKINGS */}
        {activeTab === 'past' && (
          <div className="space-y-4 animate-reveal">
            {pastBookings.map((pb) => (
              <div key={pb.id} className="p-5 bg-[#111111] border border-[#262626] rounded flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#FBF9F5]">{pb.service}</h4>
                  <p className="text-xs text-[#A39E93]">{pb.date} · {pb.creatorName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#FBF9F5]">₹{pb.totalAmount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#171717] text-[#A39E93] border border-[#262626]">
                    Archived
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: SAVED CREATORS */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-reveal">
            {professionals.slice(0, 4).map((pro) => (
              <ProfessionalCard
                key={pro.id}
                professional={pro}
                isWishlisted={true}
                onWishlistToggle={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* TAB: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="p-12 text-center bg-[#111111] border border-[#262626] rounded space-y-3 animate-reveal">
            <MessageSquare className="w-10 h-10 text-[#C5A059] mx-auto" />
            <h3 className="text-lg font-cinzel text-[#FBF9F5]">Active Creative Inquiries</h3>
            <p className="text-xs text-[#A39E93] max-w-sm mx-auto">
              You have 2 active pre-production chats with Arjun Mehta and Kabir Varma.
            </p>
          </div>
        )}

        {/* TAB: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="p-12 text-center bg-[#111111] border border-[#262626] rounded space-y-3 animate-reveal">
            <Star className="w-10 h-10 text-[#C5A059] mx-auto" />
            <h3 className="text-lg font-cinzel text-[#FBF9F5]">Your Feedback & Endorsements</h3>
            <p className="text-xs text-[#A39E93] max-w-sm mx-auto">
              You have reviewed 1 studio. Your feedback helps our creative collective maintain a world-class standard.
            </p>
          </div>
        )}

        {/* TAB: PROFILE */}
        {activeTab === 'profile' && (
          <div className="p-6 bg-[#111111] border border-[#262626] rounded max-w-xl space-y-4 animate-reveal">
            <h3 className="text-base font-cinzel font-bold text-[#FBF9F5]">Client Details</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#A39E93] block mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name || 'Anshika Kushwah'}
                  className="w-full p-2.5 rounded bg-[#171717] border border-[#262626] text-[#FBF9F5]"
                />
              </div>
              <div>
                <label className="text-[#A39E93] block mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || 'anshika@example.com'}
                  disabled
                  className="w-full p-2.5 rounded bg-[#171717] border border-[#262626] text-[#6B665E]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
