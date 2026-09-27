import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  MapPin,
  Camera,
} from 'lucide-react';

const LightboxModal = ({
  isOpen,
  onClose,
  images = [],
  initialIndex = 0,
  item = null,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  creatorName,
  creatorId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync index when initialIndex changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoomLevel(1);
    }
  }, [isOpen, initialIndex]);

  // Determine active media item
  const activeList = images.length > 0 ? images : item ? [item] : [];
  const currentItem = activeList[currentIndex] || activeList[0] || item;

  const canGoPrev = hasPrev !== undefined ? hasPrev : currentIndex > 0;
  const canGoNext = hasNext !== undefined ? hasNext : currentIndex < activeList.length - 1;

  const handlePrevItem = useCallback(() => {
    setZoomLevel(1);
    if (onPrev) {
      onPrev();
    } else if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, onPrev]);

  const handleNextItem = useCallback(() => {
    setZoomLevel(1);
    if (onNext) {
      onNext();
    } else if (currentIndex < activeList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, activeList.length, onNext]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.7));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && canGoNext) handleNextItem();
      if (e.key === 'ArrowLeft' && canGoPrev) handlePrevItem();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
      if (e.key === '0') handleResetZoom();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, canGoNext, canGoPrev, handleNextItem, handlePrevItem]);

  if (!isOpen || !currentItem) return null;

  const resolvedUrl = currentItem.url || currentItem.image || currentItem.src;
  const resolvedTitle = currentItem.title || 'Master Showcase';
  const resolvedCategory = currentItem.category || 'Portfolio';
  const resolvedCreator = currentItem.creator || currentItem.creatorName || creatorName;
  const resolvedLocation = currentItem.location || '';
  const resolvedCreatorId = currentItem.creatorId || creatorId;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#02040a]/95 backdrop-blur-2xl p-3 sm:p-6 select-none animate-reveal"
      role="dialog"
      aria-modal="true"
      aria-label={resolvedTitle}
    >
      {/* 1. Top Header Bar */}
      <div className="flex items-center justify-between text-white z-20 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-400/30 shrink-0">
            {resolvedCategory}
          </span>
          <h2 className="text-xs sm:text-sm font-display font-bold text-white/95 truncate">
            {resolvedTitle}
          </h2>
          {activeList.length > 1 && (
            <span className="text-[11px] font-mono text-slate-400 shrink-0">
              ({currentIndex + 1} / {activeList.length})
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom In */}
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors"
            title="Zoom Out (-)"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Reset Zoom */}
          {zoomLevel !== 1 && (
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-2 rounded-xl bg-white/5 hover:bg-sky-500/20 text-cyan-400 border border-cyan-500/30 transition-colors"
              title="Reset Zoom (0)"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors hidden sm:inline-flex"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Lightbox */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/20 transition-colors ml-1"
            title="Close Lightbox (Esc)"
            aria-label="Close Lightbox"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Media Viewer Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-auto py-2">
        <div
          className="transition-transform duration-200 ease-out flex items-center justify-center max-h-full max-w-full"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {currentItem.mediaType === 'video' ? (
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-cyan-500/30">
              <img
                src={resolvedUrl}
                alt={resolvedTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="px-5 py-2.5 rounded-full bg-cyan-500/20 backdrop-blur-md text-cyan-200 text-xs font-semibold tracking-wider uppercase border border-cyan-400/40 shadow-lg">
                  Cinematic 4K Master Video
                </span>
              </div>
            </div>
          ) : (
            <img
              src={resolvedUrl}
              alt={resolvedTitle}
              className="max-h-[74vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl border border-sky-500/20 select-none"
              loading="lazy"
            />
          )}
        </div>

        {/* Previous Button */}
        {canGoPrev && (
          <button
            type="button"
            onClick={handlePrevItem}
            className="absolute left-2 sm:left-4 p-3.5 rounded-full bg-midnight-950/80 hover:bg-cyan-500 text-white hover:text-midnight-950 border border-sky-500/30 hover:border-cyan-400 transition-all shadow-2xl hover:scale-110 z-30"
            title="Previous (Left Arrow)"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Next Button */}
        {canGoNext && (
          <button
            type="button"
            onClick={handleNextItem}
            className="absolute right-2 sm:right-4 p-3.5 rounded-full bg-midnight-950/80 hover:bg-cyan-500 text-white hover:text-midnight-950 border border-sky-500/30 hover:border-cyan-400 transition-all shadow-2xl hover:scale-110 z-30"
            title="Next (Right Arrow)"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 3. Bottom Metadata Bar */}
      <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-white gap-3 z-20">
        <div className="text-left space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm sm:text-base font-display font-bold text-white truncate">
              {resolvedTitle}
            </h4>
            {resolvedLocation && (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {resolvedLocation}
              </span>
            )}
          </div>
          {resolvedCreator && (
            <p className="text-xs text-slate-400">
              Captured & Curated by <span className="text-cyan-300 font-semibold">{resolvedCreator}</span>
            </p>
          )}
        </div>

        {resolvedCreatorId && (
          <a
            href={`/professionals/${resolvedCreatorId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glow-btn-primary text-xs uppercase font-mono tracking-wider font-bold shadow-lg"
          >
            <span>View Creator Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;

