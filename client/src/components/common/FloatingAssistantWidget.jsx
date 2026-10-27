import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  X,
  Maximize2,
  Send,
  RefreshCw,
  Star,
  MapPin,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { assistantService } from '../../services/assistantService';

const QUICK_PROMPTS = [
  'Wedding in Bhopal under ₹15,000',
  'What packages are available?',
  'How does booking work?',
];

const FloatingAssistantWidget = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi! Ask me anything about finding photographers, package pricing, or how booking works on Lenscraft.',
      photographers: [],
      packages: [],
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of mini-chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Don't render floating widget if user is already on the dedicated /assistant page
  const isAssistantRoute =
    location.pathname === '/assistant' ||
    location.pathname === '/ai-assistant' ||
    location.pathname === '/chat';

  if (isAssistantRoute) {
    return null;
  }

  const handleSend = async (textToSend = inputMessage) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { id: `u-${Date.now()}`, role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

      const res = await assistantService.sendMessage(trimmed, historyPayload);
      const data = res.data || res;

      const aiMsg = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Here are the matching results:',
        photographers: data.photographers || [],
        packages: data.packages || [],
        suggestedFollowUps: data.suggestedFollowUps || [],
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: 'Sorry, I encountered an issue retrieving data. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 text-left">
      {/* Floating Pill Launcher */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 p-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-bold shadow-[0_10px_30px_rgba(245,158,11,0.35)] hover:shadow-[0_10px_35px_rgba(245,158,11,0.5)] border border-amber-400/40 hover:scale-105 transition-all duration-300"
          title="Open Lenscraft AI Assistant"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950/20 flex items-center justify-center">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-950 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xs tracking-wide hidden sm:inline">Ask AI Assistant</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Expanded Floating Chat Panel */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[390px] h-[520px] max-h-[82vh] rounded-3xl bg-[#060b19]/95 backdrop-blur-2xl border border-sky-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.15)] flex flex-col overflow-hidden animate-reveal">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-slate-900/90 to-[#0c152e]/90 border-b border-sky-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500/30 to-orange-500/30 border border-orange-500/40 flex items-center justify-center text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-display font-bold text-white flex items-center gap-1.5">
                  Lenscraft AI Assistant
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-slate-400">Grounded in verified database</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Link
                to="/assistant"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-cyan-300 transition-colors"
                title="Open Full Page Assistant"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Starter Chips */}
          {messages.length <= 1 && (
            <div className="p-2.5 bg-slate-950/40 border-b border-sky-500/10 flex gap-1.5 overflow-x-auto scrollbar-none">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap bg-sky-950/40 hover:bg-sky-500/20 border border-sky-500/20 text-sky-200 transition-colors"
                >
                  ⚡ {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs scrollbar-thin">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-br-none'
                        : 'bg-slate-900 text-slate-200 rounded-bl-none border border-sky-500/20'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Matching Photographers Mini Cards */}
                  {m.photographers && m.photographers.length > 0 && (
                    <div className="w-full mt-2 space-y-2">
                      {m.photographers.slice(0, 2).map((pro) => (
                        <div
                          key={pro.id}
                          className="p-2.5 rounded-xl bg-slate-900/90 border border-sky-500/20 flex items-center justify-between gap-2 shadow"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={pro.avatar}
                              alt={pro.name}
                              className="w-9 h-9 rounded-lg object-cover border border-sky-500/30 shrink-0"
                            />
                            <div className="min-w-0">
                              <h5 className="text-xs font-bold text-white truncate">{pro.name}</h5>
                              <p className="text-[10px] text-slate-400 truncate">
                                {pro.city} · ★ {pro.rating.toFixed(1)}
                              </p>
                              <span className="text-[10px] font-mono text-cyan-300 font-semibold">
                                From ₹{pro.startingPrice?.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>

                          <Link
                            to={pro.profileUrl}
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 shrink-0"
                            title="View Profile"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-sky-500/20 text-slate-400 text-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Finding real creators & packages...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Mini Input Footer */}
          <div className="p-2.5 bg-slate-900/95 border-t border-sky-500/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-1.5"
            >
              <input
                type="text"
                placeholder="Ask about photographers, prices..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 rounded-xl bg-slate-950 border border-sky-500/20 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingAssistantWidget;
