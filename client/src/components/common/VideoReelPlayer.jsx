import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Maximize,
  Minimize,
  Film,
  Sparkles,
  RotateCcw,
  RotateCw,
  Tv,
  Gauge,
  Layers,
  Camera,
  Radio,
  Sliders,
  HelpCircle,
  Check,
  ChevronDown
} from 'lucide-react';

const DEFAULT_PLAYLIST = [
  {
    id: 'reel-1',
    title: '4K Cinematic Signature Showreel',
    subtitle: 'Captured on RED V-Raptor 8K VV · Master Color Grade',
    category: 'Showreel',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    duration: '0:15',
    camera: 'RED V-Raptor 8K VV',
    lens: 'Cooke Anamorphic /i 40mm T2.3',
    iso: '800',
    fps: '23.976',
    shutter: '180° (1/48)',
    codec: 'ProRes 4444 XQ 4K DCI',
    colorSpace: 'REDWideGamutRGB / Log3G10'
  },
  {
    id: 'reel-2',
    title: 'Golden Hour Wedding & Romance',
    subtitle: 'Sony FX6 Full Frame · Natural Warm Tone Grade',
    category: 'Weddings',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    duration: '0:15',
    camera: 'Sony FX6 Full Frame',
    lens: 'Sony G-Master 50mm f/1.2',
    iso: '12800 (Dual Base)',
    fps: '59.940 (Slow Motion)',
    shutter: '180° (1/120)',
    codec: 'XAVC-I 10-bit 4:2:2',
    colorSpace: 'S-Gamut3.Cine / S-Log3'
  },
  {
    id: 'reel-3',
    title: 'High-Fashion & Commercial Narrative',
    subtitle: 'ARRI Alexa 35 · Studio Lighting & Precision Grading',
    category: 'Commercial',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    duration: '0:15',
    camera: 'ARRI Alexa 35',
    lens: 'ARRI Signature Prime 35mm T1.8',
    iso: '800 EI',
    fps: '24.000',
    shutter: '172.8° (1/50)',
    codec: 'ARRIRAW 4.6K 3:2 Open Gate',
    colorSpace: 'ARRI Wide Gamut 4 / LogC4'
  }
];

const COLOR_GRADES = [
  { id: 'natural', name: 'Rec.709 Natural', filter: 'none', badgeColor: 'border-slate-500 text-slate-300' },
  { id: 'teal-orange', name: 'Teal & Orange Cinema', filter: 'contrast(1.18) saturate(1.28) hue-rotate(-8deg) brightness(1.03)', badgeColor: 'border-cyan-400 text-cyan-300' },
  { id: 'warm-film', name: '35mm Kodak Warmth', filter: 'sepia(0.2) contrast(1.12) brightness(1.05) saturate(1.18)', badgeColor: 'border-amber-400 text-amber-300' },
  { id: 'moody-noir', name: 'Moody Film Noir', filter: 'grayscale(1) contrast(1.35) brightness(0.92)', badgeColor: 'border-slate-400 text-slate-200' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon Matrix', filter: 'contrast(1.3) saturate(1.6) hue-rotate(15deg) brightness(1.05)', badgeColor: 'border-fuchsia-400 text-fuchsia-300' }
];

const ASPECT_RATIOS = [
  { id: '16-9', label: '16:9 Wide', className: 'aspect-video' },
  { id: '239-1', label: '2.39:1 CinemaScope', className: 'aspect-[2.39/1]' },
  { id: '9-16', label: '9:16 Vertical Reel', className: 'aspect-[9/16] max-w-sm mx-auto' }
];

const VideoReelPlayer = ({
  videoUrl,
  poster,
  title,
  subtitle,
  playlist = null
}) => {
  // Setup clips list based on props or default playlist
  const clips = playlist || [
    {
      id: 'custom-1',
      title: title || DEFAULT_PLAYLIST[0].title,
      subtitle: subtitle || DEFAULT_PLAYLIST[0].subtitle,
      videoUrl: videoUrl || DEFAULT_PLAYLIST[0].videoUrl,
      poster: poster || DEFAULT_PLAYLIST[0].poster,
      duration: DEFAULT_PLAYLIST[0].duration,
      category: DEFAULT_PLAYLIST[0].category,
      camera: DEFAULT_PLAYLIST[0].camera,
      lens: DEFAULT_PLAYLIST[0].lens,
      iso: DEFAULT_PLAYLIST[0].iso,
      fps: DEFAULT_PLAYLIST[0].fps,
      shutter: DEFAULT_PLAYLIST[0].shutter,
      codec: DEFAULT_PLAYLIST[0].codec,
      colorSpace: DEFAULT_PLAYLIST[0].colorSpace
    },
    ...DEFAULT_PLAYLIST.slice(1)
  ];

  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const currentClip = clips[activeClipIndex] || clips[0];

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('16-9');
  const [activeLut, setActiveLut] = useState(COLOR_GRADES[0]);
  const [showHud, setShowHud] = useState(false);
  const [showLutMenu, setShowLutMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [autoScrollPlay, setAutoScrollPlay] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [showCenterFeedback, setShowCenterFeedback] = useState(null);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === null || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Quick feedback icon animation
  const triggerFeedback = useCallback((type) => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setShowCenterFeedback(type);
    feedbackTimerRef.current = setTimeout(() => {
      setShowCenterFeedback(null);
    }, 650);
  }, []);

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        triggerFeedback('play');
      }).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      triggerFeedback('pause');
    }
  }, [triggerFeedback]);

  // Mute toggle
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.volume === 0) {
      videoRef.current.volume = 0.8;
      setVolume(0.8);
    }
  }, [isMuted]);

  // Volume slider change
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Seek +/- 5s
  const handleSeek = useCallback((delta) => {
    if (!videoRef.current) return;
    try {
      const dur = videoRef.current.duration || 0;
      const newTime = Math.max(0, Math.min(dur, (videoRef.current.currentTime || 0) + delta));
      if (!isNaN(newTime) && isFinite(newTime)) {
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    } catch (err) {
      console.warn('Seek error:', err);
    }
    triggerFeedback(delta > 0 ? 'forward' : 'rewind');
  }, [triggerFeedback]);

  // Handle Scrub / Seek click on timeline
  const handleTimelineClick = (e) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    if (!rect.width) return;
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const dur = videoRef.current.duration || 0;
    const targetTime = percentage * dur;
    if (!isNaN(targetTime) && isFinite(targetTime)) {
      try {
        videoRef.current.currentTime = targetTime;
        setCurrentTime(targetTime);
      } catch (err) {
        console.warn('Timeline scrub error:', err);
      }
    }
  };

  // Handle timeline hover for tooltip preview
  const handleTimelineMouseMove = (e) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    if (!rect.width) return;
    const hoverX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percentage = hoverX / rect.width;
    setHoverPosition(percentage * 100);
    setHoverTime(percentage * (videoRef.current.duration || 0));
  };

  const handleTimelineMouseLeave = () => {
    setHoverTime(null);
  };

  // Playback speed change
  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen().then(() => {
            setIsFullscreen(true);
          }).catch(() => {});
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().then(() => {
            setIsFullscreen(false);
          }).catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      console.warn('Fullscreen error:', err);
    }
  }, []);

  // Picture in Picture
  const togglePictureInPicture = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled && typeof videoRef.current.requestPictureInPicture === 'function') {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.warn('PiP error:', err);
    }
  };

  // Switch playlist clip
  const selectClip = (index) => {
    setActiveClipIndex(index);
    setIsPlaying(true);
    setCurrentTime(0);
    setTimeout(() => {
      if (videoRef.current) {
        try {
          if (videoRef.current.readyState >= 1) {
            videoRef.current.currentTime = 0;
          }
        } catch (e) {}
        videoRef.current.play().catch(() => {});
      }
    }, 100);
  };

  // Cycle through LUTs
  const cycleLut = useCallback(() => {
    const currentIndex = COLOR_GRADES.findIndex(g => g.id === activeLut.id);
    const nextIndex = (currentIndex + 1) % COLOR_GRADES.length;
    setActiveLut(COLOR_GRADES[nextIndex]);
    triggerFeedback('lut');
  }, [activeLut, triggerFeedback]);

  // Listen to time updates & buffer
  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime || 0);
    if (videoRef.current.buffered && videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      const dur = videoRef.current.duration || 1;
      setBuffered((bufferedEnd / dur) * 100);
    }
  };

  const onLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
    videoRef.current.playbackRate = playbackSpeed;
  };

  // Intersection Observer for auto-scroll play
  useEffect(() => {
    if (!autoScrollPlay || !videoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.6 }
    );

    const target = containerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [autoScrollPlay]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Cleanup feedback timer on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  // Keyboard Shortcuts (when hovering over player or in fullscreen)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid capturing when user is in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if (!isHovered && !document.fullscreenElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'KeyC' || e.code === 'KeyL') {
        e.preventDefault();
        cycleLut();
      } else if (e.code === 'KeyH') {
        e.preventDefault();
        setShowHud(prev => !prev);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleSeek(-5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSeek(5);
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        setVolume(prev => {
          const nextVol = Math.min(1, parseFloat((prev + 0.1).toFixed(2)));
          if (videoRef.current) {
            videoRef.current.volume = nextVol;
            videoRef.current.muted = false;
            setIsMuted(false);
          }
          return nextVol;
        });
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        setVolume(prev => {
          const nextVol = Math.max(0, parseFloat((prev - 0.1).toFixed(2)));
          if (videoRef.current) {
            videoRef.current.volume = nextVol;
            if (nextVol === 0) setIsMuted(true);
          }
          return nextVol;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, toggleMute, toggleFullscreen, cycleLut, handleSeek, isHovered]);

  const selectedAspect = ASPECT_RATIOS.find(r => r.id === aspectRatio) || ASPECT_RATIOS[0];

  return (
    <div
      className="space-y-4 text-left w-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverTime(null);
      }}
    >
      {/* Header bar with Master Tag, LUT indicator & Playlist Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d2ff] animate-pulse" />
          <div className="flex items-center gap-1.5 text-xs uppercase font-mono tracking-wider text-cyan-300 font-bold">
            <Film className="w-4 h-4 text-cyan-400" />
            <span className="truncate max-w-[280px] sm:max-w-md">{currentClip.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active LUT Badge */}
          <button
            type="button"
            onClick={() => setShowLutMenu(!showLutMenu)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono border bg-slate-900/80 backdrop-blur-md transition-all hover:bg-slate-800 ${activeLut.badgeColor}`}
            title="Click to change color grading LUT profile (Shortcut: C or L)"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden xs:inline">LUT:</span>
            <span>{activeLut.name}</span>
            <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
          </button>

          {/* HUD specs toggle */}
          <button
            type="button"
            onClick={() => setShowHud(!showHud)}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono border transition-all flex items-center gap-1 ${
              showHud
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_rgba(0,210,255,0.25)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
            title="Toggle Cine Camera Metadata HUD (Shortcut: H)"
          >
            <Camera className="w-3 h-3" />
            <span className="hidden sm:inline">HUD</span>
          </button>

          {/* Aspect Ratio Selector */}
          <div className="hidden sm:flex items-center bg-slate-900/80 border border-slate-800 rounded-lg p-0.5 text-[10px] font-mono">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.id}
                type="button"
                onClick={() => setAspectRatio(ratio.id)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  aspectRatio === ratio.id
                    ? 'bg-cyan-500 text-midnight-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {ratio.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Video Frame with Dynamic Ambient Glow */}
      <div
        ref={containerRef}
        className={`group relative w-full rounded-2xl overflow-hidden glass-card border border-sky-500/30 shadow-2xl bg-midnight-950 transition-all duration-300 ${selectedAspect.className}`}
        style={{
          boxShadow: isPlaying ? '0 20px 60px -15px rgba(0, 210, 255, 0.25), 0 0 35px -5px rgba(56, 189, 248, 0.2)' : undefined
        }}
      >
        {/* Dynamic ambient backdrop filter light */}
        <div
          className={`absolute -inset-4 blur-2xl pointer-events-none transition-all duration-700 -z-10 ${
            isPlaying ? 'opacity-30' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${currentClip.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Video Element */}
        <video
          ref={videoRef}
          src={currentClip.videoUrl}
          poster={currentClip.poster}
          playsInline
          muted={isMuted}
          loop
          className="w-full h-full object-cover transition-all duration-300 cursor-pointer"
          style={{ filter: activeLut.filter }}
          onClick={togglePlay}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Cinema Anamorphic Letterbox Mattes when in 2.39:1 mode */}
        {aspectRatio === '239-1' && (
          <>
            <div className="absolute top-0 left-0 right-0 h-[7%] bg-black/90 pointer-events-none border-b border-white/5" />
            <div className="absolute bottom-0 left-0 right-0 h-[7%] bg-black/90 pointer-events-none border-t border-white/5" />
          </>
        )}

        {/* Center Feedback Animation (Play, Pause, Seek, LUT) */}
        {showCenterFeedback && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="w-16 h-16 rounded-full bg-black/70 backdrop-blur-md border border-cyan-400/40 text-cyan-300 flex items-center justify-center animate-ping">
              {showCenterFeedback === 'play' && <Play className="w-8 h-8 fill-current ml-1" />}
              {showCenterFeedback === 'pause' && <Pause className="w-8 h-8 fill-current" />}
              {showCenterFeedback === 'forward' && <RotateCw className="w-8 h-8" />}
              {showCenterFeedback === 'rewind' && <RotateCcw className="w-8 h-8" />}
              {showCenterFeedback === 'lut' && <Sparkles className="w-8 h-8" />}
            </div>
          </div>
        )}

        {/* Camera Metadata HUD Overlay */}
        {showHud && (
          <div className="absolute top-3 left-3 right-3 pointer-events-none z-20 flex justify-between items-start text-[10px] font-mono text-cyan-300/90 drop-shadow-md">
            <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-cyan-500/30 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-cyan-500/20 pb-1">
                <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                <span>CAMERA REC LIVE</span>
                <span className="text-[9px] bg-red-600/30 text-red-400 px-1.5 py-0.5 rounded border border-red-500/40">RAW</span>
              </div>
              <div>CAM: <span className="text-white">{currentClip.camera || 'RED V-Raptor 8K VV'}</span></div>
              <div>LENS: <span className="text-white">{currentClip.lens || 'Cooke 40mm T2.3'}</span></div>
              <div>SHUTTER: <span className="text-white">{currentClip.shutter || '180° (1/48)'}</span> · ISO <span className="text-white">{currentClip.iso || '800'}</span></div>
            </div>

            <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-cyan-500/30 text-right space-y-1">
              <div>FPS: <span className="text-emerald-400 font-bold">{currentClip.fps || '23.976'} FPS</span></div>
              <div>CODEC: <span className="text-white">{currentClip.codec || 'ProRes 4444 XQ'}</span></div>
              <div>CS: <span className="text-white">{currentClip.colorSpace || 'REDWideGamut'}</span></div>
              {/* Audio visualizer bars when unmuted */}
              <div className="flex items-center justify-end gap-0.5 pt-1">
                <span className="text-[9px] text-slate-400 mr-1.5">CH 1/2</span>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-sm transition-all duration-150 ${
                      isMuted || !isPlaying
                        ? 'h-1 bg-slate-600'
                        : i < 5
                        ? 'h-3 bg-emerald-400 animate-pulse'
                        : 'h-2 bg-yellow-400'
                    }`}
                    style={{ animationDelay: `${i * 90}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ambient Start Overlay when not playing */}
        {!isPlaying && (
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 backdrop-blur-[2px] transition-all flex flex-col items-center justify-center p-6 text-center z-10 cursor-pointer"
            onClick={togglePlay}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full glow-btn-primary flex items-center justify-center shadow-[0_0_35px_rgba(0,210,255,0.7)] hover:scale-110 active:scale-95 transition-all mb-4 group/play"
              aria-label="Play 4K Cinematic Reel"
            >
              <Play className="w-8 sm:w-10 h-8 sm:h-10 text-midnight-950 fill-midnight-950 ml-1.5 transition-transform group-hover/play:scale-110" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>4K CINEMA MASTER · {currentClip.category}</span>
            </div>

            <h4 className="text-lg sm:text-2xl font-display font-bold text-white max-w-lg leading-snug drop-shadow-md">
              {currentClip.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1.5 max-w-md line-clamp-2">
              {currentClip.subtitle}
            </p>

            <div className="flex items-center gap-3 mt-4 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                Space to Play
              </span>
              <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                L to Switch Color Grade
              </span>
            </div>
          </div>
        )}

        {/* Floating Bottom Controls Toolbar */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 pt-6 bg-gradient-to-t from-midnight-950 via-midnight-950/80 to-transparent backdrop-blur-[2px] transition-opacity duration-300 z-20 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Interactive Scrubber Timeline */}
          <div className="relative mb-2.5">
            {/* Timestamp hover tooltip */}
            {hoverTime !== null && (
              <div
                className="absolute -top-7 transform -translate-x-1/2 px-2 py-0.5 rounded bg-cyan-950/95 border border-cyan-400/60 text-cyan-300 text-[10px] font-mono pointer-events-none shadow-lg z-30"
                style={{ left: `${hoverPosition}%` }}
              >
                {formatTime(hoverTime)}
              </div>
            )}

            <div
              ref={progressBarRef}
              className="relative h-2 w-full bg-slate-800/80 rounded-full cursor-pointer overflow-visible group/bar py-1"
              onClick={handleTimelineClick}
              onMouseMove={handleTimelineMouseMove}
              onMouseLeave={handleTimelineMouseLeave}
            >
              {/* Background track */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                {/* Buffered bar */}
                <div
                  className="h-full bg-slate-500/40 transition-all duration-200"
                  style={{ width: `${buffered}%` }}
                />
              </div>

              {/* Active Progress Fill with Gradient & Glow */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 rounded-full shadow-[0_0_10px_#00d2ff]"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />

              {/* Scrubber thumb handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-cyan-400 rounded-full shadow-[0_0_8px_#00d2ff] transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity"
                style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Controls Bar Row */}
          <div className="flex items-center justify-between text-xs text-white">
            {/* Left Controls: Play/Pause, Rewind, Forward, Time Display */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white transition-colors"
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={() => handleSeek(-5)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Rewind 5s (Left Arrow)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleSeek(5)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Forward 5s (Right Arrow)"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              {/* Volume Slider with Mute Button */}
              <div className="flex items-center gap-1 group/vol ml-1">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-cyan-300" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 sm:w-20 h-1 accent-cyan-400 bg-slate-700 rounded-lg cursor-pointer transition-all opacity-70 group-hover/vol:opacity-100"
                  title="Volume"
                />
              </div>

              {/* Time display */}
              <div className="font-mono text-[11px] text-slate-300 ml-1">
                <span className="text-white font-semibold">{formatTime(currentTime)}</span>
                <span className="text-slate-500 mx-1">/</span>
                <span>{formatTime(duration || 15)}</span>
              </div>
            </div>

            {/* Right Controls: LUT Selector, Speed, AutoPlay, PiP, Fullscreen */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* LUT Menu Dropdown Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLutMenu(!showLutMenu)}
                  className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 text-[11px] font-mono ${
                    activeLut.id !== 'natural' ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30' : 'text-slate-300'
                  }`}
                  title="Color Grade LUT Simulation"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden md:inline">{activeLut.name.split(' ')[0]}</span>
                </button>

                {/* LUT options dropdown */}
                {showLutMenu && (
                  <div className="absolute right-0 bottom-full mb-2 w-52 p-2 rounded-xl bg-midnight-950/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl space-y-1 z-40">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between border-b border-white/10">
                      <span>Cinema LUT Presets</span>
                      <Sliders className="w-3 h-3" />
                    </div>
                    {COLOR_GRADES.map((lut) => (
                      <button
                        key={lut.id}
                        type="button"
                        onClick={() => {
                          setActiveLut(lut);
                          setShowLutMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${
                          activeLut.id === lut.id
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{lut.name}</span>
                        {activeLut.id === lut.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Playback Speed Menu Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-0.5 text-[11px] font-mono"
                  title="Playback Speed"
                >
                  <Gauge className="w-3.5 h-3.5" />
                  <span>{playbackSpeed}x</span>
                </button>

                {showSpeedMenu && (
                  <div className="absolute right-0 bottom-full mb-2 w-28 p-1.5 rounded-xl bg-midnight-950/95 backdrop-blur-xl border border-white/10 shadow-2xl space-y-0.5 z-40">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        onClick={() => handleSpeedChange(spd)}
                        className={`w-full text-left px-2 py-1 rounded text-[11px] font-mono flex items-center justify-between ${
                          playbackSpeed === spd
                            ? 'bg-cyan-500 text-midnight-950 font-bold'
                            : 'text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{spd}x</span>
                        {playbackSpeed === spd && <Check className="w-3 h-3 text-midnight-950" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Smart Autoplay when in view toggle */}
              <button
                type="button"
                onClick={() => setAutoScrollPlay(!autoScrollPlay)}
                className={`hidden sm:flex items-center gap-1 p-1.5 rounded-lg text-[11px] font-mono transition-colors ${
                  autoScrollPlay
                    ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Auto-play when scrolled into view"
              >
                <Tv className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">AutoScroll</span>
              </button>

              {/* PiP Button */}
              <button
                type="button"
                onClick={togglePictureInPicture}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Picture in Picture"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>

              {/* Shortcuts Help Info */}
              <button
                type="button"
                onClick={() => setShowShortcutsHelp(!showShortcutsHelp)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors hidden sm:block"
                title="Keyboard Shortcuts"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-cyan-300 transition-colors"
                title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Overlay Modal / Drawer */}
      {showShortcutsHelp && (
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs text-slate-300 font-mono grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">Space</kbd> Play / Pause</div>
          <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">M</kbd> Mute / Unmute</div>
          <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">F</kbd> Fullscreen</div>
          <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">L / C</kbd> Cycle LUT</div>
          <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">← / →</kbd> Seek ±5s</div>
          <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">↑ / ↓</kbd> Volume ±10%</div>
          <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">H</kbd> Camera HUD</div>
          <button
            type="button"
            onClick={() => setShowShortcutsHelp(false)}
            className="text-right text-cyan-400 hover:underline cursor-pointer"
          >
            [Close Shortcuts]
          </button>
        </div>
      )}

      {/* Multi-Clip Playlist Selector Ribbon */}
      {clips.length > 1 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono uppercase tracking-wider text-slate-400 text-[11px] font-semibold flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              CINEMATIC CHAPTERS & REELS ({clips.length})
            </span>
            <span className="text-[11px] font-mono text-cyan-400">Click any reel to switch instant stream</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {clips.map((clip, index) => {
              const isActive = activeClipIndex === index;
              return (
                <button
                  key={clip.id || index}
                  type="button"
                  onClick={() => selectClip(index)}
                  className={`group/clip flex items-center gap-3 p-2.5 rounded-xl text-left transition-all border ${
                    isActive
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.2)]'
                      : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  {/* Thumbnail with overlay badge */}
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-950 border border-white/10">
                    <img
                      src={clip.poster}
                      alt={clip.title}
                      className="w-full h-full object-cover group-hover/clip:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      {isActive && isPlaying ? (
                        <div className="flex items-center gap-0.5">
                          <span className="w-1 h-3 bg-cyan-400 animate-pulse" />
                          <span className="w-1 h-2 bg-cyan-300 animate-pulse delay-75" />
                          <span className="w-1 h-3 bg-cyan-400 animate-pulse delay-150" />
                        </div>
                      ) : (
                        <Play className="w-4 h-4 text-white fill-white opacity-80 group-hover/clip:opacity-100" />
                      )}
                    </div>
                  </div>

                  {/* Metadata info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold truncate">
                        {clip.category || `Reel 0${index + 1}`}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">{clip.duration || '0:15'}</span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate group-hover/clip:text-cyan-300 transition-colors">
                      {clip.title}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      {clip.camera ? clip.camera.split(' ')[0] : 'ProRes Master'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoReelPlayer;

