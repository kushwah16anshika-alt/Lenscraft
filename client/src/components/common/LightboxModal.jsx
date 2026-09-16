import React, { useEffect } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-fadeIn">
      {/* Top Header Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-20">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 bg-white/10 px-2.5 py-1 rounded border border-white/10">
            {item.category || 'Portfolio Master'}
          </span>
          <span className="text-xs sm:text-sm font-serif font-bold text-white/90 truncate max-w-xs sm:max-w-md">
            {item.title}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Close Lightbox (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Media Preview Area */}
      <div className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center my-auto">
        {item.mediaType === 'video' ? (
          <div className="relative w-full aspect-video max-h-[75vh] rounded-md overflow-hidden bg-black shadow-2xl">
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase border border-white/30">
                Cinematic 4K Master Video
              </span>
            </div>
          </div>
        ) : (
          <img
            src={item.url}
            alt={item.title}
            className="max-h-[75vh] max-w-full object-contain rounded-md shadow-2xl"
          />
        )}

        {/* Previous / Next Arrow Controls */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:-left-12 p-3 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 transition-all"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:-right-12 p-3 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 transition-all"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Information & Metadata Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col sm:flex-row items-center justify-between text-white gap-3 z-20">
        <div className="text-left space-y-0.5">
          <h4 className="text-base font-serif font-bold text-white">{item.title}</h4>
          {creatorName && (
            <p className="text-xs text-zinc-400">
              Captured & Curated by <span className="text-white font-medium">{creatorName}</span>
            </p>
          )}
        </div>

        {creatorId && (
          <a
            href={`/professionals/${creatorId}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white text-zinc-900 text-xs font-semibold hover:bg-zinc-200 transition-all shadow-lg"
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
