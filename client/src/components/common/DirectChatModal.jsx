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

const AUTO_REPLIES = [
  'Thanks for reaching out! I would love to be part of your special shoot. What dates and city are you considering?',
  'Absolutely! All my master packages include full color-grading, skin retouching, and cloud gallery backup.',
  'Yes, I frequently shoot destination projects across Rajasthan, Goa, Mumbai, and internationally.',
  'Our standard turnaround is 7-14 days for curated 4K stills, with a 48-hour teaser preview guaranteed.',
];

const DirectChatModal = ({ isOpen, onClose, professional, initialMessage = '' }) => {
  const { user } = useAuth();
  const { conversations, sendMessage } = usePlatform();
  const [inputText, setInputText] = useState(initialMessage);
  const [isTyping, setIsTyping] = useState(false);
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
  const proName = pro.name || 'Creator Studio';
  const proAvatar = pro.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
  const clientName = user?.name || 'Pooja Sethi';

  // Find or construct current conversation
  const existingConv = conversations?.find(
    (c) => c.creatorId === proId || c.creatorName === proName
  );

  const messages = existingConv?.messages || [
    {
      id: 'init-1',
      sender: 'creator',
      senderName: proName,
      text: `Hello ${clientName}! Welcome to ${proName} studio. How can I help you plan your upcoming shoot or campaign?`,
      timestamp: 'Just now',
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    // Send user message
    if (sendMessage) {
      sendMessage({
        creatorId: proId,
        creatorName: proName,
        creatorAvatar: proAvatar,
        sender: 'client',
        senderName: clientName,
        text,
      });
    }

    setInputText('');

    // Simulate realistic creator reply with typing indicator
    setIsTyping(true);
    const replyDelay = 1200 + Math.random() * 800;
    setTimeout(() => {
      setIsTyping(false);
      const randomReply =
        AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      if (sendMessage) {
        sendMessage({
          creatorId: proId,
          creatorName: proName,
          creatorAvatar: proAvatar,
          sender: 'creator',
          senderName: proName,
          text: randomReply,
        });
      }
    }, replyDelay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickInquiry = (q) => {
    handleSend(q);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02040a]/85 backdrop-blur-2xl p-3 sm:p-4 overflow-y-auto animate-fade-in text-left">
        {/* Background dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        <div className="relative w-full max-w-2xl bg-[#080e22]/95 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden z-10 flex flex-col h-[85vh] max-h-[720px] text-left animate-slide-up backdrop-blur-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-sky-500/20 bg-gradient-to-r from-sky-500/10 via-cyan-500/5 to-transparent flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <Avatar src={proAvatar} name={proName} size="md" />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#080e22]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm sm:text-base font-display font-bold text-white truncate">
                    {proName}
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" title="Verified Creator" />
                </div>
                <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span>● Online</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 truncate">Pre-Production Direct Channel</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl glow-btn-primary text-xs uppercase font-mono font-bold tracking-wider shadow-lg"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Shoot</span>
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

          {/* Chat Info Banner */}
          <div className="bg-[#050a18] border-b border-sky-500/15 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-cyan-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              100% Escrow Safeguarded Channel
            </span>
            <span className="font-mono text-slate-400 hidden sm:inline">
              Starting at ₹{(pro.startingPrice || 25000).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 no-scrollbar bg-[#040817]/60">
            {messages.map((m, idx) => {
              const isClient = m.sender === 'client';
              return (
                <div
                  key={m.id || idx}
                  className={`flex items-end gap-2.5 ${
                    isClient ? 'justify-end' : 'justify-start'
                  } animate-fade-in`}
                >
                  {!isClient && (
                    <Avatar src={proAvatar} name={proName} size="xs" />
                  )}

                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-lg ${
                      isClient
                        ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-br-sm border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                        : 'bg-[#0b1430] border border-sky-500/25 text-slate-200 rounded-bl-sm shadow-md'
                    }`}
                  >
                    {!isClient && (
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold block mb-1">
                        {proName}
                      </span>
                    )}
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 text-[9px] font-mono mt-1 ${
                        isClient ? 'text-cyan-100/70' : 'text-slate-400'
                      }`}
                    >
                      <span>{m.timestamp || 'Just now'}</span>
                      {isClient && <CheckCheck className="w-3 h-3 text-cyan-200" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2.5 animate-fade-in">
                <Avatar src={proAvatar} name={proName} size="xs" />
                <div className="bg-[#0b1430] border border-sky-500/25 rounded-2xl rounded-bl-sm px-4 py-2.5 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Inquiry Suggestions Chips */}
          <div className="px-4 py-2 bg-[#050a18] border-t border-sky-500/15 overflow-x-auto no-scrollbar flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 whitespace-nowrap">
              Quick Inquiries:
            </span>
            {QUICK_INQUIRIES.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickInquiry(q)}
                className="text-[11px] px-3 py-1 rounded-full glass-panel hover:bg-sky-500/15 text-slate-300 hover:text-cyan-300 border border-sky-500/20 hover:border-cyan-400/40 whitespace-nowrap transition-all"
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
                  placeholder={`Message ${proName} directly about your shoot...`}
                  className="w-full pl-4 pr-10 py-3 rounded-2xl bg-white/[0.04] border border-sky-500/25 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleSend("Here is my moodboard concept reference link: https://pinterest.com/shoot-inspo");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors"
                  title="Attach Moodboard Link"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-3 rounded-2xl glow-btn-primary disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition-all"
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
