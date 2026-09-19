import React, { useEffect } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const LightboxModal = ({ isOpen, onClose, item, onNext, onPrev, hasNext, hasPrev, creatorName, creatorId }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02040a]/90 backdrop-blur-xl p-4 sm:p-8 animate-fade-in">
      {/* Top Header Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-20">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-400/20">
            {item.category || 'Portfolio Master'}
          </span>
          <span className="text-xs sm:text-sm font-serif font-bold text-white/90 truncate max-w-xs sm:max-w-md">
            {item.title}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all"
          title="Close Lightbox (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Media Preview Area */}
      <div className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center my-auto">
        {item.mediaType === 'video' ? (
          <div className="relative w-full aspect-video max-h-[75vh] rounded-2xl overflow-hidden bg-black shadow-2xl border border-cyan-500/30">
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="px-4 py-2 rounded-full bg-cyan-500/20 backdrop-blur-md text-cyan-200 text-xs font-semibold tracking-wider uppercase border border-cyan-400/40 shadow-lg">
                Cinematic 4K Master Video
              </span>
            </div>
          </div>
        ) : (
          <img
            src={item.url}
            alt={item.title}
            className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-cyan-500/20"
          />
        )}

        {/* Previous / Next Arrow Controls */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:-left-12 p-3 rounded-full bg-slate-900/80 hover:bg-cyan-500 text-white hover:text-slate-950 border border-slate-700 hover:border-cyan-400 transition-all shadow-xl"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:-right-12 p-3 rounded-full bg-slate-900/80 hover:bg-cyan-500 text-white hover:text-slate-950 border border-slate-700 hover:border-cyan-400 transition-all shadow-xl"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Information & Metadata Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent flex flex-col sm:flex-row items-center justify-between text-white gap-3 z-20">
        <div className="text-left space-y-0.5">
          <h4 className="text-base font-serif font-bold text-white">{item.title}</h4>
          {creatorName && (
            <p className="text-xs text-slate-400">
              Captured & Curated by <span className="text-cyan-400 font-medium">{creatorName}</span>
            </p>
          )}
        </div>

        {creatorId && (
          <a
            href={`/professionals/${creatorId}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            <span>View Full Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;
