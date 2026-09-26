import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Sparkles } from 'lucide-react';

const VideoReelPlayer = ({
  videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  poster = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
  title = '4K Cinematic Showreel & Color Grade',
  subtitle = 'Directed & Captured on RED V-Raptor / Sony FX6',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
          <Film className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
        <span className="text-[11px] font-mono text-cyan-300/80 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30">
          4K CINEMA PRO
        </span>
      </div>

      <div className="group relative aspect-video w-full rounded-2xl overflow-hidden glass-card border border-sky-500/30 shadow-2xl bg-midnight-950">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={poster}
          playsInline
          muted={isMuted}
          loop
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Ambient overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all flex flex-col items-center justify-center p-6 text-center">
            <button
              type="button"
              onClick={togglePlay}
              className="w-16 h-16 rounded-full glow-btn-primary flex items-center justify-center shadow-[0_0_30px_rgba(0,210,255,0.6)] group-hover:scale-110 transition-transform mb-3"
              aria-label="Play Reel"
            >
              <Play className="w-7 h-7 text-midnight-950 fill-midnight-950 ml-1" />
            </button>
            <h4 className="text-base sm:text-lg font-display font-bold text-white max-w-md">
              {title}
            </h4>
            <p className="text-xs text-slate-300 font-mono mt-1">
              {subtitle}
            </p>
          </div>
        )}

        {/* Floating Controls Toolbar when playing */}
        {isPlaying && (
          <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-midnight-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1 rounded hover:bg-white/10 text-cyan-300"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <span className="font-mono text-[11px] text-slate-300">4K Master Stream</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleFullscreen}
                className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoReelPlayer;
