import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

const BeforeAfterSlider = ({
  beforeImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=40',
  afterImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
  beforeLabel = 'Raw / Before Retouch',
  afterLabel = 'Master Color Grade & Retouch',
  title = 'Interactive Retouch & Color Grade Comparison',
  aspectRatio = 'aspect-[16/9]',
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="space-y-3">
      {title && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{title}</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Drag slider left/right to compare
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className={`relative ${aspectRatio} w-full rounded-2xl overflow-hidden glass-card border border-sky-500/30 select-none cursor-ew-resize shadow-2xl`}
      >
        {/* After Image (Background / Full Width) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover filter contrast-110"
          draggable={false}
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover filter contrast-90 brightness-95 saturate-50"
            draggable={false}
          />
        </div>

        {/* Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_12px_rgba(0,210,255,0.8)] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={() => (isDragging.current = true)}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-midnight-950 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.7)] flex items-center justify-center text-cyan-300 pointer-events-auto cursor-grab active:cursor-grabbing"
          >
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-midnight-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
            {beforeLabel}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-midnight-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            {afterLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
