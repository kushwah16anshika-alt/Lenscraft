import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Camera, Aperture } from 'lucide-react';

/**
 * Web Audio API Camera Shutter Sound Synthesizer
 * Generates an ultra-crisp dual-transient mechanical DSLR shutter click + capacitor strobe pop.
 * Zero external audio files required.
 */
class CameraShutterAudioSynthesizer {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
  }

  playShutter() {
    try {
      this.init();
      if (!this.audioCtx) return;

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.28, now);
      masterGain.connect(this.audioCtx.destination);

      // --- Transient 1: Mirror Up & Shutter Blade 1 (Initial mechanical snap) ---
      const snap1Noise = this.createNoiseBuffer(0.04);
      if (snap1Noise) {
        const snap1Source = this.audioCtx.createBufferSource();
        snap1Source.buffer = snap1Noise;

        const snap1Filter = this.audioCtx.createBiquadFilter();
        snap1Filter.type = 'bandpass';
        snap1Filter.frequency.setValueAtTime(3200, now);
        snap1Filter.Q.setValueAtTime(2.5, now);

        const snap1Gain = this.audioCtx.createGain();
        snap1Gain.gain.setValueAtTime(0.9, now);
        snap1Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

        snap1Source.connect(snap1Filter);
        snap1Filter.connect(snap1Gain);
        snap1Gain.connect(masterGain);
        snap1Source.start(now);
      }

      // Mechanical body thud (low frequency punch)
      const thudOsc = this.audioCtx.createOscillator();
      const thudGain = this.audioCtx.createGain();
      thudOsc.type = 'sine';
      thudOsc.frequency.setValueAtTime(220, now);
      thudOsc.frequency.exponentialRampToValueAtTime(45, now + 0.05);

      thudGain.gain.setValueAtTime(0.6, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      thudOsc.connect(thudGain);
      thudGain.connect(masterGain);
      thudOsc.start(now);
      thudOsc.stop(now + 0.055);

      // --- Transient 2: Strobe Flash Capacitor Pop & High Whistle (0.015s after) ---
      const flashOsc = this.audioCtx.createOscillator();
      const flashGain = this.audioCtx.createGain();
      flashOsc.type = 'triangle';
      flashOsc.frequency.setValueAtTime(4800, now + 0.01);
      flashOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.06);

      flashGain.gain.setValueAtTime(0.001, now);
      flashGain.gain.setValueAtTime(0.25, now + 0.012);
      flashGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      flashOsc.connect(flashGain);
      flashGain.connect(masterGain);
      flashOsc.start(now + 0.01);
      flashOsc.stop(now + 0.08);

      // --- Transient 3: Shutter Close & Mirror Return ("Chick" sound, 0.072s after) ---
      const closeTime = now + 0.072;
      const snap2Noise = this.createNoiseBuffer(0.06);
      if (snap2Noise) {
        const snap2Source = this.audioCtx.createBufferSource();
        snap2Source.buffer = snap2Noise;

        const snap2Filter = this.audioCtx.createBiquadFilter();
        snap2Filter.type = 'bandpass';
        snap2Filter.frequency.setValueAtTime(2400, closeTime);
        snap2Filter.Q.setValueAtTime(3.0, closeTime);

        const snap2Gain = this.audioCtx.createGain();
        snap2Gain.gain.setValueAtTime(0.001, now);
        snap2Gain.gain.setValueAtTime(0.85, closeTime);
        snap2Gain.gain.exponentialRampToValueAtTime(0.001, closeTime + 0.055);

        snap2Source.connect(snap2Filter);
        snap2Filter.connect(snap2Gain);
        snap2Gain.connect(masterGain);
        snap2Source.start(closeTime);
      }
    } catch {
      // Audio playback fails gracefully if browser blocks before user interaction
    }
  }

  createNoiseBuffer(duration) {
    if (!this.audioCtx) return null;
    const bufferSize = Math.floor(this.audioCtx.sampleRate * duration);
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
}

const shutterSynth = new CameraShutterAudioSynthesizer();

const CameraFlashTransition = () => {
  const location = useLocation();
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashPhase, setFlashPhase] = useState('idle'); // 'idle' | 'focus' | 'strobe' | 'fade'
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('lenscraft_camera_sound_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [fxEnabled, setFxEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('lenscraft_camera_fx_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [shutterSpeed, setShutterSpeed] = useState('1/500s');
  const [isoValue, setIsoValue] = useState('ISO 100');
  const [apertureVal, setApertureVal] = useState('f/1.4');

  const prevLocationRef = useRef(location.pathname + location.search);
  const isFirstMountRef = useRef(true);

  const triggerFlash = useCallback((customShutter = null) => {
    if (!fxEnabled) return;

    // Randomize camera specs slightly for authentic DSLR immersion
    const speeds = ['1/250s', '1/500s', '1/1000s', '1/2000s', '1/800s'];
    const isos = ['ISO 100', 'ISO 200', 'ISO 400', 'ISO 64'];
    const apertures = ['f/1.2', 'f/1.4', 'f/1.8', 'f/2.0', 'f/2.8'];

    setShutterSpeed(customShutter || speeds[Math.floor(Math.random() * speeds.length)]);
    setIsoValue(isos[Math.floor(Math.random() * isos.length)]);
    setApertureVal(apertures[Math.floor(Math.random() * apertures.length)]);

    setIsFlashing(true);
    setFlashPhase('strobe');

    if (soundEnabled) {
      shutterSynth.playShutter();
    }

    // Scroll to top immediately when capturing new page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Transition smoothly through flash phases
    const strobeTimer = setTimeout(() => {
      setFlashPhase('fade');
    }, 180);

    const endTimer = setTimeout(() => {
      setIsFlashing(false);
      setFlashPhase('idle');
    }, 480);

    return () => {
      clearTimeout(strobeTimer);
      clearTimeout(endTimer);
    };
  }, [fxEnabled, soundEnabled]);

  // Handle route change
  useEffect(() => {
    const currentLoc = location.pathname + location.search;

    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      // Trigger a welcome flash on first page load
      triggerFlash('1/1000s');
      prevLocationRef.current = currentLoc;
      return;
    }

    if (prevLocationRef.current !== currentLoc) {
      prevLocationRef.current = currentLoc;
      triggerFlash();
    }
  }, [location, triggerFlash]);

  const toggleSound = (e) => {
    e.stopPropagation();
    const next = !soundEnabled;
    setSoundEnabled(next);
    try {
      localStorage.setItem('lenscraft_camera_sound_enabled', JSON.stringify(next));
    } catch {}
    if (next) {
      shutterSynth.playShutter();
    }
  };

  const toggleFx = (e) => {
    e.stopPropagation();
    const next = !fxEnabled;
    setFxEnabled(next);
    try {
      localStorage.setItem('lenscraft_camera_fx_enabled', JSON.stringify(next));
    } catch {}
    if (next) {
      triggerFlash();
    }
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. CAMERA FLASH OVERLAY CONTAINER (Non-blocking z-[99999])
          ───────────────────────────────────────────────────────────── */}
      {isFlashing && fxEnabled && (
        <div
          className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden flex items-center justify-center transition-all duration-300"
          aria-hidden="true"
        >
          {/* A. Core High-Intensity Strobe White & Cyan Flare Burst */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              flashPhase === 'strobe'
                ? 'opacity-100 bg-white'
                : 'opacity-0 bg-transparent'
            }`}
            style={{
              background: flashPhase === 'strobe'
                ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(224,242,254,0.92) 35%, rgba(56,189,248,0.7) 65%, rgba(99,102,241,0.2) 85%, transparent 100%)'
                : 'transparent',
              animation: 'cameraFlashStrobe 0.46s cubic-bezier(0.12, 0.8, 0.32, 1) forwards',
            }}
          />

          {/* B. Secondary Chromatic Optical Bloom Flare */}
          <div
            className="absolute inset-0 bg-sky-400/20 mix-blend-screen"
            style={{
              animation: 'cameraFlashStrobe 0.44s ease-out forwards',
            }}
          />

          {/* C. Horizontal Anamorphic Lens Flare Line */}
          <div
            className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_#00d2ff]"
            style={{
              animation: 'lensFlareBeam 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          />

          {/* D. Expanding Camera Aperture Iris Shockwave */}
          <div
            className="absolute w-[240px] h-[240px] rounded-full border border-cyan-400/60 shadow-[0_0_50px_rgba(0,210,255,0.6)]"
            style={{
              animation: 'irisExpandShockwave 0.48s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          />

          {/* E. Viewfinder HUD Reticle & Focus Brackets */}
          <div
            className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between"
            style={{
              animation: 'viewfinderHudFade 0.45s ease-out forwards',
            }}
          >
            {/* Top Viewfinder Bar */}
            <div className="flex justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-cyan-300/90 drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold">REC • 4K 60FPS</span>
                <span className="hidden sm:inline text-slate-300/70">| 10-BIT PRORES</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-300 font-semibold">{isoValue}</span>
                <span className="text-cyan-200">{shutterSpeed}</span>
                <span className="text-emerald-300">{apertureVal}</span>
              </div>
            </div>

            {/* Center Focus Box & Crosshairs */}
            <div className="relative mx-auto my-auto w-24 h-24 sm:w-32 sm:h-32 border border-cyan-300/70 rounded-lg flex items-center justify-center shadow-[0_0_25px_rgba(0,210,255,0.4)]">
              {/* Corner accent tabs */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-200" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-200" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-200" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-200" />

              {/* Center crosshair */}
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-300/90 shadow-[0_0_10px_#00d2ff]" />
              <div className="absolute w-8 h-[1px] bg-cyan-300/60" />
              <div className="absolute h-8 w-[1px] bg-cyan-300/60" />

              <span className="absolute -bottom-5 text-[9px] font-mono tracking-widest text-cyan-300/80 uppercase font-semibold">
                AF-C LOCK [ ● ]
              </span>
            </div>

            {/* Bottom Viewfinder Bar */}
            <div className="flex justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-300/80 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-2">
                <Aperture className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-200 font-semibold">LENSCRAFT OPTICS</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-mono">BATTERY 98%</span>
                <span className="text-cyan-300">RAW EXPOSURE 0.0</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. FLOATING CAMERA FX QUICK CONTROLS (Discreet bottom-left badge)
          ───────────────────────────────────────────────────────────── */}
      <aside
        aria-label="Camera flash and audio preferences"
        className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-1.5 bg-midnight-900/80 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400/40 rounded-full px-3 py-1.5 shadow-xl transition-all duration-300 group hover:scale-[1.02]"
      >
        <button
          type="button"
          onClick={() => triggerFlash('1/1000s')}
          title="Snap Camera Shutter Flash (Test Animation)"
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300 transition-colors pr-2 border-r border-slate-700/60"
        >
          <Camera className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-mono text-[11px] font-medium tracking-tight">Flash FX</span>
        </button>

        <button
          type="button"
          onClick={toggleSound}
          title={soundEnabled ? 'Shutter Sound On (Click to Mute)' : 'Shutter Sound Muted (Click to Enable)'}
          className={`p-1 rounded-full transition-colors ${
            soundEnabled
              ? 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10'
              : 'text-slate-500 hover:text-slate-400 hover:bg-slate-800/40'
          }`}
          aria-label={soundEnabled ? 'Disable Shutter Sound' : 'Enable Shutter Sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>

        <button
          type="button"
          onClick={toggleFx}
          title={fxEnabled ? 'Page Transition Flash Enabled' : 'Page Transition Flash Disabled'}
          className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors ${
            fxEnabled
              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          {fxEnabled ? 'ON' : 'OFF'}
        </button>
      </aside>
    </>
  );
};

export default CameraFlashTransition;
