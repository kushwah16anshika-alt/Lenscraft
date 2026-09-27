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
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { usePlatform } from '../../context/PlatformContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import Avatar from '../../components/common/Avatar';
import DirectChatModal from '../../components/common/DirectChatModal';

const UserDashboard = () => {
  const { user } = useAuth();
  const { bookings, favorites, toggleFavorite, professionals, conversations, reviews } = usePlatform();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedChatPro, setSelectedChatPro] = useState(null);
  const [chatModalOpen, setChatModalOpen] = useState(false);

  const displayName = (user?.name || 'Guest Creator').toUpperCase();

  const userBookings = bookings || [];
  const upcomingBookings = userBookings.filter((b) => b.status?.toLowerCase() !== 'completed' && b.status?.toLowerCase() !== 'cancelled');
  const pastBookings = userBookings.filter((b) => b.status?.toLowerCase() === 'completed');
  const nextShoot = upcomingBookings[0] || null;

  const savedCreatorsList = favorites?.length > 0 ? favorites : [];

  return (
    <div className="min-h-screen text-slate-100 pb-24 text-left space-y-8 animate-reveal">
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL GREETING & STATS HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-10 glass-card border border-sky-500/20 rounded-3xl flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Portal · Workspace</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            GOOD MORNING, <span className="text-gradient-cyan">{displayName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Track upcoming shoot dates, master archival deliverables, and saved talent.
          </p>
        </div>

        {/* 3 Metric Pills */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="px-5 py-3 rounded-2xl glass-panel border border-sky-500/20">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Upcoming</span>
            <span className="text-2xl font-mono font-bold text-white">{upcomingBookings.length}</span>
          </div>

          <div className="px-5 py-3 rounded-2xl glass-panel border border-sky-500/20">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Saved Creators</span>
            <span className="text-2xl font-mono font-bold text-cyan-300">{savedCreatorsList.length}</span>
          </div>

          <div className="px-5 py-3 rounded-2xl glass-panel border border-sky-500/20">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Completed</span>
            <span className="text-2xl font-mono font-bold text-white">{pastBookings.length}</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURED UPCOMING BOOKING BANNER
          ───────────────────────────────────────────────────────────── */}
      {nextShoot ? (
        <div className="p-6 glass-panel border border-cyan-400/40 rounded-3xl relative overflow-hidden space-y-4 shadow-[0_0_25px_rgba(0,210,255,0.15)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">
                  Next Confirmed Shoot
                </span>
                <h3 className="text-lg font-display font-bold text-white">
                  {nextShoot.service || nextShoot.serviceTitle || 'Creative Production'} · {nextShoot.date || nextShoot.eventDate}
                </h3>
                <p className="text-xs text-slate-400">
                  Creator: <strong className="text-cyan-300">{nextShoot.creatorName || nextShoot.professionalName || 'Verified Studio'}</strong> · {nextShoot.package || 'Signature'} Package (₹{nextShoot.totalAmount?.toLocaleString('en-IN')})
                </p>
              </div>
            </div>

            <Link
              to={nextShoot.professionalId ? `/professionals/${nextShoot.professionalId}` : '/photographers'}
              className="px-5 py-2.5 rounded-full glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold self-start sm:self-auto inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,210,255,0.4)]"
            >
              <span>View Creator Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-6 glass-panel border border-sky-500/20 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-400/30 text-sky-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-display font-bold text-white">
                No upcoming shoots scheduled
              </h3>
              <p className="text-xs text-slate-400">
                Explore our curated network of photographers, videographers, and retouchers to reserve your next date.
              </p>
            </div>
          </div>
          <Link
            to="/photographers"
            className="px-5 py-2.5 rounded-full glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5"
          >
            <span>Discover Creators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. SECTION TABS & CONTENT
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-sky-500/15 gap-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'upcoming', label: `Upcoming Bookings (${upcomingBookings.length})` },
            { id: 'past', label: `Past Bookings (${pastBookings.length})` },
            { id: 'saved', label: `Saved Creators (${savedCreatorsList.length})` },
            { id: 'messages', label: 'Messages' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'profile', label: 'Profile Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs uppercase font-mono tracking-wider font-semibold whitespace-nowrap transition-colors relative ${
                activeTab === tab.id
                  ? 'text-cyan-300 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00d2ff]" />
              )}
            </button>
          ))}
        </div>

        {/* TAB: UPCOMING BOOKINGS */}
        {activeTab === 'upcoming' && (
          <div className="animate-reveal">
            {upcomingBookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingBookings.map((b) => (
                  <div key={b.id} className="p-6 glass-card border border-sky-500/20 rounded-2xl space-y-4 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-cyan-400">Ref: {b.id}</span>
                        <h4 className="text-base font-display font-bold text-white">{b.service || b.serviceTitle || 'Creative Session'}</h4>
                        <p className="text-xs text-slate-400">Creator: {b.creatorName || b.professionalName || 'Verified Studio'}</p>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        {b.status || 'Confirmed'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-sky-500/15 text-slate-300">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Date & Time</span>
                        <span className="font-semibold text-white">{b.date || b.eventDate}</span>
                        {b.time && <span className="block text-[10px] text-cyan-400">{b.time}</span>}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">Total Amount</span>
                        <span className="font-mono font-bold text-cyan-300">₹{b.totalAmount?.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Escrow Secured
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const matchedPro = professionals.find((p) => p.id === (b.creatorId || b.professionalId)) || {
                            id: b.creatorId || b.professionalId || 'pro-1',
                            name: b.creatorName || b.professionalName || 'Arjun Mehta',
                            avatar: b.avatar || b.professionalAvatar,
                            role: 'photographer',
                            category: b.service || 'Royal Wedding Studio',
                            startingPrice: b.totalAmount,
                          };
                          setSelectedChatPro(matchedPro);
                          setChatModalOpen(true);
                        }}
                        className="text-cyan-300 hover:text-cyan-200 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Open Production Chat →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center glass-card border border-sky-500/20 rounded-3xl space-y-4">
                <Calendar className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-lg font-display font-bold text-white">No Upcoming Bookings Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Reserve dates with top verified photographers, videographers, and editors with 100% escrow protection.
                </p>
                <Link
                  to="/photographers"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glow-btn-primary text-xs uppercase font-mono font-bold"
                >
                  <span>Browse Talent Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB: PAST BOOKINGS */}
        {activeTab === 'past' && (
          <div className="space-y-4 animate-reveal">
            {pastBookings.length > 0 ? (
              pastBookings.map((pb) => (
                <div key={pb.id} className="p-5 glass-card border border-sky-500/20 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-display font-bold text-white">{pb.service}</h4>
                    <p className="text-xs text-slate-400">{pb.date} · {pb.creatorName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-white">₹{pb.totalAmount?.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      Archived
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center glass-card border border-sky-500/20 rounded-3xl space-y-2">
                <p className="text-sm text-slate-300 font-display">No completed shoot archives yet.</p>
                <p className="text-xs text-slate-500">Your delivered sessions and cloud master galleries will appear here.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB: SAVED CREATORS */}
        {activeTab === 'saved' && (
          <div className="animate-reveal">
            {savedCreatorsList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedCreatorsList.map((pro) => (
                  <ProfessionalCard
                    key={pro.id}
                    professional={pro}
                    isWishlisted={true}
                    onWishlistToggle={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center glass-card border border-sky-500/20 rounded-3xl space-y-4">
                <Heart className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-lg font-display font-bold text-white">No Saved Creators Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click the heart icon on any creator card or profile to shortlist your favorite talent for upcoming events.
                </p>
                <Link
                  to="/photographers"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glow-btn-primary text-xs uppercase font-mono font-bold"
                >
                  <span>Explore Portfolios</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB: MESSAGES & CREATIVE CHATS */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-reveal">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>Direct Creator Channels</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time pre-production discussions, moodboard reviews, and logistics with your hired studios.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-300 font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                {(conversations || []).length} Active Channels
              </span>
            </div>

            {/* Active Conversation Threads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(conversations || []).map((conv) => {
                const matchedPro = professionals.find((p) => p.id === conv.creatorId) || {
                  id: conv.creatorId,
                  name: conv.creatorName,
                  avatar: conv.creatorAvatar,
                  role: conv.creatorRole || 'photographer',
                  category: conv.creatorRole || 'Royal Wedding Studio',
                };

                return (
                  <div
                    key={conv.id}
                    className="p-5 glass-card border border-sky-500/20 hover:border-cyan-400/50 rounded-2xl space-y-3 transition-all shadow-lg flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <Avatar src={conv.creatorAvatar} name={conv.creatorName} size="md" />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-midnight-950" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-display font-bold text-white">
                              {conv.creatorName}
                            </h4>
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                          <span className="text-[11px] text-cyan-300 font-mono">
                            {conv.creatorRole || 'Verified Artist'}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-slate-400">
                        {conv.lastUpdated || 'Recently'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 bg-white/[0.03] p-3 rounded-xl border border-sky-500/10 line-clamp-2 italic">
                      "{conv.lastMessage || 'Channel opened. Ready to assist with shoot planning.'}"
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-sky-500/15">
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        ● Direct Response Active
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedChatPro(matchedPro);
                          setChatModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold inline-flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat Now</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Start New Chat with Featured Studios */}
            <div className="p-6 glass-panel border border-sky-500/20 rounded-2xl space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Start a New Direct Inquiry:
              </h4>
              <div className="flex flex-wrap gap-3">
                {professionals.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedChatPro(p);
                      setChatModalOpen(true);
                    }}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl glass-panel hover:bg-cyan-500/15 border border-sky-500/20 hover:border-cyan-400 text-slate-200 hover:text-white transition-all text-xs"
                  >
                    <Avatar src={p.avatar} name={p.name} size="xs" />
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-[10px] text-cyan-300 font-mono">({p.location?.city || 'Mumbai'})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="p-12 text-center glass-card border border-sky-500/20 rounded-2xl space-y-3 animate-reveal">
            <Star className="w-10 h-10 text-cyan-400 mx-auto" />
            <h3 className="text-lg font-display font-bold text-white">Your Feedback & Endorsements</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You have reviewed 1 studio. Your feedback helps our creative collective maintain a world-class standard.
            </p>
          </div>
        )}

        {/* TAB: PROFILE */}
        {activeTab === 'profile' && (
          <div className="p-6 glass-card border border-sky-500/20 rounded-2xl max-w-xl space-y-4 animate-reveal">
            <h3 className="text-base font-display font-bold text-white">Client Details</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-mono uppercase text-[11px]">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name || 'Anshika Kushwah'}
                  className="w-full p-2.5 rounded-xl glass-input border border-sky-500/20 text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1 font-mono uppercase text-[11px]">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || 'anshika@example.com'}
                  disabled
                  className="w-full p-2.5 rounded-xl glass-input border border-sky-500/20 text-slate-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Direct Chat Modal */}
      <DirectChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        professional={selectedChatPro}
        defaultSenderRole="client"
      />
    </div>
  );
};

export default UserDashboard;
