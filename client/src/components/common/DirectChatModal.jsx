import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Calendar,
  Image as ImageIcon,
  Check,
  CheckCheck,
  ArrowRight,
  MapPin,
  Star,
  Paperclip,
  Smile,
  Clock,
  MessageSquare,
  User,
  Camera,
  RefreshCw,
} from 'lucide-react';
import { usePlatform } from '../../hooks/usePlatform';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrency } from '../../utils/formatters';
import Avatar from './Avatar';
import BookingModal from './BookingModal';

const QUICK_INQUIRIES = [
  'Are you available for an upcoming shoot?',
  'Can you share a full gallery / raw samples?',
  'Do you include drone coverage in packages?',
  'Do you travel for destination celebrations?',
  'What is your delivery timeline for edited photos?',
];

const DirectChatModal = ({
  isOpen,
  onClose,
  professional,
  initialMessage = '',
  defaultSenderRole, // 'client' or 'creator'
}) => {
  const { user, isCreative } = useAuth();
  const { conversations, sendMessage } = usePlatform();
  const [inputText, setInputText] = useState(initialMessage);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const pro = professional || {
    id: 'pro-1',
    name: 'Aarav Mehta',
    role: 'photographer',
    category: 'Royal Wedding Photographer',
    location: { city: 'Mumbai' },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    startingPrice: 35000,
    rating: 4.98,
    reviewCount: 142,
  };

  const proId = pro.id || 'pro-1';
  const proName = pro.name || 'Aarav Mehta';
  const proAvatar =
    pro.avatar ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';

  const clientName = user?.name || pro.clientName || 'Pooja Sethi';
  const clientAvatar =
    user?.avatar?.url ||
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80';

  // Active sender role: can switch between 'client' (Customer) and 'creator' (Photographer)
  const initialRole = defaultSenderRole || (isCreative ? 'creator' : 'client');
  const [activeSenderRole, setActiveSenderRole] = useState(initialRole);

  // Sync role if defaultSenderRole changes
  useEffect(() => {
    if (defaultSenderRole) {
      setActiveSenderRole(defaultSenderRole);
    }
  }, [defaultSenderRole]);

  // Find active conversation from global state
  const existingConv = conversations?.find(
    (c) => c.creatorId === proId || c.creatorName === proName
  );

  const messages = existingConv?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages.length]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const isClient = activeSenderRole === 'client';
    const senderName = isClient ? clientName : proName;
    const senderAvatar = isClient ? clientAvatar : proAvatar;

    if (sendMessage) {
      sendMessage({
        creatorId: proId,
        creatorName: proName,
        creatorAvatar: proAvatar,
        clientId: user?._id || 'u-1',
        clientName: clientName,
        clientAvatar: clientAvatar,
        sender: activeSenderRole,
        senderName,
        senderAvatar,
        text,
      });
    }

    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickInquiry = (q) => {
    setInputText(q);
    inputRef.current?.focus();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02040a]/85 backdrop-blur-2xl p-3 sm:p-4 overflow-y-auto animate-fade-in text-left">
        {/* Background dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        <div className="relative w-full max-w-2xl bg-[#080e22]/95 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden z-10 flex flex-col h-[85vh] max-h-[720px] text-left animate-slide-up backdrop-blur-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-sky-500/20 bg-gradient-to-r from-sky-500/10 via-cyan-500/5 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <Avatar
                  src={activeSenderRole === 'client' ? proAvatar : clientAvatar}
                  name={activeSenderRole === 'client' ? proName : clientName}
                  size="md"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#080e22]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm sm:text-base font-display font-bold text-white truncate">
                    {activeSenderRole === 'client' ? proName : clientName}
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" title="Verified Member" />
                </div>
                <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span>● Direct Channel</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 truncate">
                    {activeSenderRole === 'client'
                      ? `${pro.category || 'Creator Studio'} (${typeof pro.location === 'object' ? pro.location.city : pro.location || 'Mumbai'})`
                      : `Client Inquiry · ${clientName}`}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Role Perspective Switcher Pill */}
              <div className="flex items-center bg-[#050a18] border border-sky-500/25 rounded-xl p-0.5 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setActiveSenderRole('client')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    activeSenderRole === 'client'
                      ? 'bg-cyan-500 text-midnight-950 font-bold shadow-[0_0_10px_rgba(0,210,255,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Switch to Customer perspective"
                >
                  <User className="w-3 h-3" />
                  <span>Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSenderRole('creator')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    activeSenderRole === 'creator'
                      ? 'bg-cyan-500 text-midnight-950 font-bold shadow-[0_0_10px_rgba(0,210,255,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Switch to Photographer perspective"
                >
                  <Camera className="w-3 h-3" />
                  <span>Studio</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl glow-btn-primary text-xs uppercase font-mono font-bold tracking-wider shadow-lg"
              >
                <Calendar className="w-3 h-3" />
                <span>Book</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Sender Indicator Bar */}
          <div className="bg-[#050a18] border-b border-sky-500/15 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>
                Sending as:{' '}
                <strong className="text-white">
                  {activeSenderRole === 'client' ? `${clientName} (Customer)` : `${proName} (Studio Artist)`}
                </strong>
              </span>
            </span>
            <span className="font-mono text-slate-400 hidden sm:inline text-[10px]">
              100% Escrow Milestone Safeguarded
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 no-scrollbar bg-[#040817]/60">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-white">Start Your Shoot Discussion</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Send a direct message to {proName} to discuss shoot dates, moodboards, package customizations, or locations.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((m, idx) => {
                const isMsgFromClient = m.sender === 'client';
                const isMe = activeSenderRole === m.sender;

                return (
                  <div
                    key={m.id || idx}
                    className={`flex items-end gap-2.5 ${
                      isMe ? 'justify-end' : 'justify-start'
                    } animate-fade-in`}
                  >
                    {!isMe && (
                      <Avatar
                        src={isMsgFromClient ? clientAvatar : proAvatar}
                        name={isMsgFromClient ? clientName : proName}
                        size="xs"
                      />
                    )}

                    <div
                      className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-lg ${
                        isMe
                          ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-br-sm border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                          : 'bg-[#0b1430] border border-sky-500/25 text-slate-200 rounded-bl-sm shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span
                          className={`text-[10px] font-mono uppercase font-semibold ${
                            isMe ? 'text-cyan-100' : 'text-cyan-400'
                          }`}
                        >
                          {m.senderName || (isMsgFromClient ? clientName : proName)}
                          <span className="text-[9px] opacity-70 ml-1 font-normal">
                            ({isMsgFromClient ? 'Customer' : 'Photographer'})
                          </span>
                        </span>
                      </div>

                      <p className="whitespace-pre-wrap">{m.text}</p>

                      <div
                        className={`flex items-center justify-end gap-1 text-[9px] font-mono mt-1.5 ${
                          isMe ? 'text-cyan-100/70' : 'text-slate-400'
                        }`}
                      >
                        <span>{m.timestamp || 'Just now'}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-cyan-200" />}
                      </div>
                    </div>

                    {isMe && (
                      <Avatar
                        src={isMsgFromClient ? clientAvatar : proAvatar}
                        name={isMsgFromClient ? clientName : proName}
                        size="xs"
                      />
                    )}
                  </div>
                );
              })
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Inquiry Suggestions Chips (Inserts text for sender to review/send) */}
          <div className="px-4 py-2 bg-[#050a18] border-t border-sky-500/15 overflow-x-auto no-scrollbar flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 whitespace-nowrap">
              Inquiry Suggestions:
            </span>
            {QUICK_INQUIRIES.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickInquiry(q)}
                className="text-[11px] px-3 py-1 rounded-full glass-panel hover:bg-sky-500/15 text-slate-300 hover:text-cyan-300 border border-sky-500/20 hover:border-cyan-400/40 whitespace-nowrap transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 sm:p-4 bg-[#080e22] border-t border-sky-500/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    activeSenderRole === 'client'
                      ? `Message ${proName} about your shoot dates, budget or moodboards...`
                      : `Reply to ${clientName} with availability, pricing or equipment notes...`
                  }
                  className="w-full pl-4 pr-10 py-3 rounded-2xl bg-white/[0.04] border border-sky-500/25 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    setInputText(
                      activeSenderRole === 'client'
                        ? 'Here is my Pinterest moodboard concept: https://pinterest.com/shoot-inspo'
                        : 'Here is our studio portfolio showcase: https://lenscraft.dev/portfolio/masters'
                    );
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  title="Insert Moodboard / Reference Link"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-3 rounded-2xl glow-btn-primary disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition-all cursor-pointer"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Embedded Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        professional={pro}
      />
    </>
  );
};

export default DirectChatModal;
