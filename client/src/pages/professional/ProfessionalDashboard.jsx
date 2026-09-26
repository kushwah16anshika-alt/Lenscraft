import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  DollarSign,
  Star,
  Eye,
  Clock,
  CheckCircle,
  Plus,
  Check,
  X,
  MessageSquare,
  Image,
  Layers,
  Settings,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { usePlatform } from '../../context/PlatformContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Avatar from '../../components/common/Avatar';
import DirectChatModal from '../../components/common/DirectChatModal';

const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const { success } = useToast();
  const { bookings, conversations, professionals } = usePlatform();
  const [activeTab, setActiveTab] = useState('requests');
  const [chatWithClient, setChatWithClient] = useState(null);

  const displayName = (user?.name || 'Arjun').toUpperCase();

  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 'REQ-101',
      clientName: 'Rohan & Simran Kapoor',
      event: 'Royal Destination Wedding',
      date: '18 Nov 2026',
      city: 'Udaipur, Rajasthan',
      package: 'Signature',
      amount: 45000,
      status: 'Pending',
    },
    {
      id: 'REQ-102',
      clientName: 'AeroCouture Brand',
      event: 'Commercial Fashion Lookbook',
      date: '02 Dec 2026',
      city: 'Mumbai, Maharashtra',
      package: 'Editorial',
      amount: 60000,
      status: 'Pending',
    },
    {
      id: 'REQ-103',
      clientName: 'Meera Deshmukh',
      event: 'Pre-Wedding Stills & Reel',
      date: '10 Dec 2026',
      city: 'Goa',
      package: 'Essential',
      amount: 25000,
      status: 'Pending',
    },
  ]);

  const handleAcceptRequest = (id) => {
    setBookingRequests((prev) => prev.filter((r) => r.id !== id));
    success('Shoot request accepted! Client invited to pre-production channel.');
  };

  const handleDeclineRequest = (id) => {
    setBookingRequests((prev) => prev.filter((r) => r.id !== id));
    success('Shoot request declined.');
  };

  return (
    <div className="min-h-screen text-slate-100 pb-24 text-left space-y-8 animate-reveal">
      {/* ─────────────────────────────────────────────────────────────
          1. CREATOR WORKSPACE HEADER
          ───────────────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-10 glass-card border border-sky-500/20 rounded-3xl flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creator Workspace · Studio Admin</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            GOOD MORNING, <span className="text-gradient-cyan">{displayName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage production requests, locked dates, client deliverables, and escrow payouts.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 relative z-10">
          <Link
            to="/professional/portfolio"
            className="px-4 py-2.5 rounded-full btn-secondary-luxury text-xs uppercase font-mono tracking-wider font-semibold inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Media</span>
          </Link>

          <Link
            to="/professional/pricing"
            className="px-4 py-2.5 rounded-full glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,210,255,0.4)]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Package</span>
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CORE METRICS
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 glass-panel border border-sky-500/20 rounded-2xl space-y-2 shadow-lg">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
            Upcoming Shoots
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-white">3</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-[11px] text-slate-400">Next: 12 Oct (Udaipur)</p>
        </div>

        <div className="p-5 sm:p-6 glass-panel border border-sky-500/20 rounded-2xl space-y-2 shadow-lg">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
            Pending Requests
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-300">
              {bookingRequests.length}
            </span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-[11px] text-slate-400">Requires response in 24h</p>
        </div>

        <div className="p-5 sm:p-6 glass-panel border border-sky-500/20 rounded-2xl space-y-2 shadow-lg">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
            This Month
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-white">
              ₹84,000
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-[11px] text-emerald-400">+22% vs last month</p>
        </div>

        <div className="p-5 sm:p-6 glass-panel border border-sky-500/20 rounded-2xl space-y-2 shadow-lg">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
            Rating
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-300">4.9</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <p className="text-[11px] text-slate-400">Based on 48 reviews</p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. WORKSPACE SECTIONS & TABS
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex border-b border-sky-500/15 gap-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'requests', label: `Booking Requests (${bookingRequests.length})` },
            { id: 'messages', label: `Client Messages (${(conversations || []).length})` },
            { id: 'shoots', label: 'Upcoming Shoots (3)' },
            { id: 'earnings', label: 'Earnings & Escrow' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'packages', label: 'Packages' },
            { id: 'availability', label: 'Calendar & Availability' },
            { id: 'reviews', label: 'Reviews' },
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

        {/* TAB: BOOKING REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-4 animate-reveal">
            {bookingRequests.length === 0 ? (
              <div className="p-12 text-center glass-card border border-sky-500/20 rounded-2xl">
                <CheckCircle className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-white">All requests cleared!</h4>
                <p className="text-xs text-slate-400">New client inquiries will appear here automatically.</p>
              </div>
            ) : (
              bookingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-6 glass-card border border-sky-500/20 hover:border-cyan-400/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-lg"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-cyan-400">Request {req.id}</span>
                    <h4 className="text-base font-display font-bold text-white">{req.clientName}</h4>
                    <p className="text-xs text-cyan-300">{req.event} · {req.city}</p>
                    <p className="text-xs text-slate-400">Date: {req.date} · {req.package} Package</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-lg font-mono font-bold font-mono text-white">₹{req.amount.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">Escrow 25% Reserved</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setChatWithClient({
                            id: 'pro-1',
                            name: 'Aarav Mehta',
                            clientName: req.clientName,
                            category: req.event,
                          });
                        }}
                        className="p-2.5 rounded-xl glass-panel border border-sky-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-semibold flex items-center gap-1.5"
                        title="Chat with Client"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Message</span>
                      </button>

                      <button
                        onClick={() => handleAcceptRequest(req.id)}
                        className="p-2.5 rounded-xl glow-btn-primary text-xs font-semibold flex items-center gap-1 shadow-md"
                        title="Accept Shoot"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept</span>
                      </button>

                      <button
                        onClick={() => handleDeclineRequest(req.id)}
                        className="p-2.5 rounded-xl bg-midnight-900 border border-sky-500/20 hover:border-red-500/40 text-red-400 text-xs font-semibold"
                        title="Decline Shoot"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB: CLIENT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-reveal">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>Incoming Client Inquiries</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Direct production inquiries from clients planning upcoming shoots and campaigns.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(conversations || []).map((conv) => (
                <div
                  key={conv.id}
                  className="p-5 glass-card border border-sky-500/20 hover:border-cyan-400/50 rounded-2xl space-y-3 transition-all shadow-lg flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={conv.clientAvatar} name={conv.clientName} size="md" />
                      <div>
                        <h4 className="text-sm font-display font-bold text-white">
                          {conv.clientName || 'Client Inquiry'}
                        </h4>
                        <span className="text-[11px] text-cyan-300 font-mono">
                          Client · {conv.creatorRole || 'Pre-Wedding Inquiry'}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {conv.lastUpdated || 'Recently'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 bg-white/[0.03] p-3 rounded-xl border border-sky-500/10 line-clamp-2 italic">
                    "{conv.lastMessage || 'Shoot inquiry received.'}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-sky-500/15">
                    <span className="text-[10px] text-emerald-400 font-mono">
                      ● Active Inquiry
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setChatWithClient({
                          id: conv.creatorId || 'pro-1',
                          name: conv.creatorName || 'Aarav Mehta',
                          avatar: conv.creatorAvatar,
                        });
                      }}
                      className="px-4 py-2 rounded-xl glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold inline-flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Reply in Studio Channel</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: UPCOMING SHOOTS */}
        {activeTab === 'shoots' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-reveal">
            {[
              { id: 'S-1', title: 'Royal Wedding (Anshika & Dev)', date: '12 Oct 2026', time: '10:00 AM', city: 'Udaipur', pkg: 'Signature (₹28,000)' },
              { id: 'S-2', title: 'Editorial Lookbook Shoot', date: '24 Oct 2026', time: '02:00 PM', city: 'Indore', pkg: 'Essential (₹15,000)' },
              { id: 'S-3', title: 'Commercial Jewelry Campaign', date: '08 Nov 2026', time: '09:00 AM', city: 'Mumbai', pkg: 'Editorial (₹45,000)' },
            ].map((shoot) => (
              <div key={shoot.id} className="p-6 glass-card border border-sky-500/20 rounded-2xl space-y-4 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-cyan-400">Production #{shoot.id}</span>
                    <h4 className="text-base font-display font-bold text-white">{shoot.title}</h4>
                    <p className="text-xs text-slate-400">{shoot.city} · {shoot.pkg}</p>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    Locked
                  </span>
                </div>

                <div className="pt-2 border-t border-sky-500/15 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Schedule: {shoot.date} ({shoot.time})</span>
                  <button
                    onClick={() => success('Gear checklist confirmed!')}
                    className="text-cyan-300 hover:text-cyan-200 hover:underline font-semibold"
                  >
                    Gear Checklist →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: EARNINGS */}
        {activeTab === 'earnings' && (
          <div className="p-6 glass-card border border-sky-500/20 rounded-2xl space-y-6 animate-reveal shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-bold text-white">Milestone Escrow Payouts</h3>
                <p className="text-xs text-slate-400">Direct bank transfer upon master delivery confirmation.</p>
              </div>
              <span className="text-2xl font-mono font-bold text-emerald-400">₹84,000 Total Active</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Udaipur Palace Shoot (25% Advance)', amount: '₹7,000', status: 'In Escrow' },
                { label: 'Lookbook Shoot (Advance Lock)', amount: '₹3,750', status: 'In Escrow' },
                { label: 'Completed Goa Wedding Stills (100% Payout)', amount: '₹42,000', status: 'Transferred' },
              ].map((payout, pIdx) => (
                <div key={pIdx} className="p-4 bg-midnight-950/70 border border-sky-500/15 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-200">{payout.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-white">{payout.amount}</span>
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                      payout.status === 'Transferred' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-midnight-800 text-cyan-300 border border-sky-500/30'
                    }`}>
                      {payout.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PORTFOLIO & PACKAGES */}
        {(activeTab === 'portfolio' || activeTab === 'packages' || activeTab === 'availability' || activeTab === 'reviews') && (
          <div className="p-12 text-center glass-card border border-sky-500/20 rounded-2xl space-y-4 animate-reveal shadow-lg">
            <Layers className="w-10 h-10 text-cyan-400 mx-auto" />
            <h3 className="text-lg font-display font-bold text-white">Studio Configuration & Settings</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You can adjust portfolio images, package tiers, and calendar blackouts anytime.
            </p>
            <div className="flex justify-center gap-3">
              <Link to="/professional/portfolio" className="px-4 py-2 rounded-full glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold">
                Manage Portfolio
              </Link>
              <Link to="/professional/pricing" className="px-4 py-2 rounded-full btn-secondary-luxury text-xs uppercase font-mono tracking-wider font-semibold">
                Edit Packages
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Direct Chat Modal for Studio */}
      <DirectChatModal
        isOpen={!!chatWithClient}
        onClose={() => setChatWithClient(null)}
        professional={chatWithClient}
        defaultSenderRole="creator"
      />
    </div>
  );
};

export default ProfessionalDashboard;
