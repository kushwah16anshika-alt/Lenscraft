import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Star,
  MapPin,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Calendar,
  Package,
  Scale,
  Heart,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  MessageSquare,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import { assistantService } from '../../services/assistantService';
import { useAuth } from '../../hooks/useAuth';

const INITIAL_SUGGESTIONS = [
  {
    title: 'Wedding in Bhopal',
    prompt: 'I need a wedding photographer in Bhopal under ₹15,000.',
    icon: Heart,
    color: 'from-amber-500/20 to-orange-500/20 border-orange-500/30 text-amber-300',
  },
  {
    title: 'Compare Top Creators',
    prompt: 'Compare Aarav Sharma and Kabir Sen for wedding shoots.',
    icon: Scale,
    color: 'from-cyan-500/20 to-sky-500/20 border-cyan-500/30 text-cyan-300',
  },
  {
    title: 'Available Packages',
    prompt: 'What packages are available and what are their actual prices?',
    icon: Package,
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300',
  },
  {
    title: 'How Booking Works',
    prompt: 'How does the booking process work on Lenscraft?',
    icon: Calendar,
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
  },
];

const AssistantPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hello${user?.name ? `, ${user.name.split(' ')[0]}` : ''}! I am your **Lenscraft AI Assistant**.\n\nI can help you:
- **Find verified photographers & videographers** by event, city, budget, or style.
- **Inspect actual package inclusions & verified prices** directly from our database.
- **Compare creator profiles side-by-side**.
- **Guide you through the secure booking process**.

How can I help you plan your next shoot?`,
      photographers: [],
      packages: [],
      suggestedFollowUps: [
        'I need a wedding photographer in Bhopal under ₹15,000.',
        'What packages are available and what are their prices?',
        'How does booking work on Lenscraft?',
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);

  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend = inputMessage) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setErrorMessage(null);
    setLastFailedMessage(null);

    const userMessageObj = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessageObj]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build history of previous text messages
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

      const res = await assistantService.sendMessage(trimmed, historyPayload);
      const data = res.data || res;

      const assistantMessageObj = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply || "I've retrieved the matching results for you below.",
        photographers: data.photographers || [],
        packages: data.packages || [],
        suggestedFollowUps: data.suggestedFollowUps || [],
        meta: data.meta || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessageObj]);
    } catch (err) {
      console.error('AI Assistant Error:', err);
      setErrorMessage(
        err.message || 'Unable to connect to the AI Assistant. Please verify your connection or try again.'
      );
      setLastFailedMessage(trimmed);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: `Conversation cleared. What creative services or photographers are you looking for?`,
        photographers: [],
        packages: [],
        suggestedFollowUps: [
          'I need a wedding photographer in Bhopal under ₹15,000.',
          'What packages are available and what are their prices?',
          'How does booking work on Lenscraft?',
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] max-w-5xl mx-auto px-3 sm:px-6 py-6 flex flex-col animate-reveal text-left">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-sky-500/15">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/30 to-orange-500/30 border border-orange-500/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                  Lenscraft <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">AI Assistant</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  Live Grounded
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Conversational search, verified package pricing & smart recommendations backed by real creators.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearChat}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-sky-500/15 transition-all flex items-center gap-1.5"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Starter Suggestions Strip (shown when conversation is new) */}
      {messages.length <= 1 && (
        <div className="mb-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Suggested Inquiries</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {INITIAL_SUGGESTIONS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(item.prompt)}
                  className={`p-3 rounded-xl border bg-gradient-to-br ${item.color} hover:scale-[1.02] transition-all text-left flex flex-col justify-between group shadow-lg`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-xs font-bold font-display text-white">{item.title}</span>
                    <Icon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[11px] text-slate-300/90 line-clamp-2">{item.prompt}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Chat Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4 min-h-[420px] max-h-[62vh] scrollbar-thin"
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              {/* Assistant Icon */}
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/25 to-orange-500/25 border border-orange-500/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble & Cards */}
              <div className={`max-w-[88%] sm:max-w-[78%] space-y-3 ${isUser ? 'text-right' : 'text-left'}`}>
                <div
                  className={`inline-block rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-lg backdrop-blur-md ${
                    isUser
                      ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-br-none border border-cyan-400/30'
                      : 'bg-slate-900/90 text-slate-200 rounded-bl-none border border-sky-500/20'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[9px] font-mono mt-1.5 opacity-60 ${
                      isUser ? 'text-sky-200 text-right' : 'text-slate-400 text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {/* Grounded Real Photographer Cards */}
                {msg.photographers && msg.photographers.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block text-left">
                      Verified Matching Photographers ({msg.photographers.length})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {msg.photographers.map((pro) => (
                        <div
                          key={pro.id}
                          className="rounded-2xl p-3.5 glass-card border border-sky-500/20 bg-slate-900/90 hover:border-cyan-400/40 transition-all text-left flex flex-col justify-between shadow-lg"
                        >
                          <div>
                            <div className="flex items-start gap-3">
                              <img
                                src={pro.avatar}
                                alt={pro.name}
                                className="w-12 h-12 rounded-xl object-cover border border-sky-500/30 shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <h4 className="text-sm font-display font-bold text-white truncate">
                                    {pro.name}
                                  </h4>
                                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                                  <span className="truncate">{pro.city}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-0.5">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  <span className="font-semibold text-white">{pro.rating?.toFixed(1) || '5.0'}</span>
                                  <span className="text-slate-400 text-[10px]">({pro.reviewCount} reviews)</span>
                                </div>
                              </div>
                            </div>

                            {/* Tagline / Specialties */}
                            <p className="text-[11px] text-slate-300 mt-2 line-clamp-2">
                              {pro.tagline || pro.about}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {(pro.specialties || []).slice(0, 3).map((sp) => (
                                <span
                                  key={sp}
                                  className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-sky-950/60 border border-sky-500/20 text-sky-300"
                                >
                                  {sp}
                                </span>
                              ))}
                            </div>

                            {/* Available Packages Snippet */}
                            {pro.packages && pro.packages.length > 0 && (
                              <div className="mt-2.5 pt-2 border-t border-sky-500/15">
                                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                                  Top Package:
                                </span>
                                <div className="p-1.5 rounded-lg bg-slate-950/60 border border-sky-500/10 flex items-center justify-between text-[11px]">
                                  <span className="text-white font-medium truncate pr-2">
                                    {pro.packages[0].title}
                                  </span>
                                  <span className="font-mono font-bold text-amber-400 shrink-0">
                                    ₹{pro.packages[0].price?.toLocaleString('en-IN')}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Footer Actions */}
                          <div className="mt-3 pt-2.5 border-t border-sky-500/15 flex items-center justify-between gap-2">
                            <div>
                              <span className="text-[9px] uppercase font-mono text-slate-400 block">Starting From</span>
                              <span className="text-xs font-bold font-mono text-cyan-300">
                                ₹{pro.startingPrice?.toLocaleString('en-IN')}
                              </span>
                            </div>

                            <Link
                              to={pro.profileUrl}
                              className="px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
                            >
                              <span>View Profile</span>
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grounded Package Cards */}
                {msg.packages && msg.packages.length > 0 && (!msg.photographers || msg.photographers.length === 0) && (
                  <div className="space-y-2 pt-1 text-left">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-semibold block">
                      Featured Photography Packages ({msg.packages.length})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {msg.packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className="p-3 rounded-xl bg-slate-900/90 border border-purple-500/20 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/30">
                                {pkg.category}
                              </span>
                              <span className="text-xs font-bold font-mono text-amber-400">
                                ₹{pkg.price?.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-white font-display">{pkg.title}</h4>
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{pkg.description}</p>
                            {pkg.inclusions && pkg.inclusions.length > 0 && (
                              <div className="mt-1.5 text-[10px] text-slate-300 space-y-0.5">
                                {pkg.inclusions.slice(0, 2).map((inc, i) => (
                                  <div key={i} className="flex items-center gap-1">
                                    <span className="text-cyan-400">✓</span> {inc}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {pkg.photographer && (
                            <div className="mt-2 pt-2 border-t border-purple-500/15 flex items-center justify-between text-[10px] text-slate-400">
                              <span>By {pkg.photographer.name} ({pkg.photographer.city})</span>
                              <Link
                                to={`/professionals/${pkg.photographer.id}`}
                                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-0.5"
                              >
                                Book <ChevronRight className="w-2.5 h-2.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Follow-up Suggestion Chips */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1 text-left">
                    {msg.suggestedFollowUps.map((promptText, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(promptText)}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900/80 hover:bg-sky-500/20 border border-sky-500/20 hover:border-cyan-400/40 text-sky-200 transition-all flex items-center gap-1 shadow-sm"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                        <span>{promptText}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500/30 to-cyan-500/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5 shadow-md">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Spinner Indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start animate-fadeIn">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/25 to-orange-500/25 border border-orange-500/40 flex items-center justify-center text-amber-300 shrink-0 shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div className="rounded-2xl rounded-bl-none px-4 py-3 bg-slate-900/90 border border-sky-500/20 text-slate-300 text-xs flex items-center gap-2 shadow-lg">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="font-mono text-[11px] text-slate-400">Consulting Lenscraft Database & Gemini API...</span>
            </div>
          </div>
        )}

        {/* Error / Retry Banner */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center justify-between gap-2 shadow-md">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            {lastFailedMessage && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSendMessage(lastFailedMessage)}
                leftIcon={<RefreshCw className="w-3 h-3" />}
              >
                Retry
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Input Form Bar */}
      <div className="pt-3 border-t border-sky-500/15">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              placeholder="e.g. I need a wedding photographer in Bhopal under ₹15,000..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-2xl bg-slate-900/95 border border-sky-500/20 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 pl-4 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 transition-all focus:outline-none backdrop-blur-md shadow-inner"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputMessage.trim() || isLoading}
            className="rounded-2xl px-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 border border-amber-400/40 text-slate-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            rightIcon={
              isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <Send className="w-4 h-4 text-slate-950" />
              )
            }
          >
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 px-1">
          <span>Lenscraft AI answers are grounded in real database profiles & packages.</span>
          <span className="font-mono text-slate-400">Gemini 2.5 Flash</span>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;
