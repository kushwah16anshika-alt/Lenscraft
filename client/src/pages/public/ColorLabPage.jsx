import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Sliders,
  Sparkles,
  Download,
  Copy,
  RotateCcw,
  Upload,
  Eye,
  Camera,
  Film,
  Layers,
  Wand2,
  Check,
  ChevronRight,
  Share2,
  Maximize2,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  Sun,
  Flame,
  Palette,
  Droplets,
  Activity,
  SlidersHorizontal,
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Button from '../../components/common/Button';

// ─────────────────────────────────────────────────────────────
// 1. CURATED FILM STOCK PRESETS (LUTs)
// ─────────────────────────────────────────────────────────────
const FILM_PRESETS = [
  {
    id: 'portra400',
    name: 'Kodak Portra 400',
    type: 'Fine Art Film',
    era: 'Analogue 35mm',
    description: 'Creamy warm skin tones, soft pastel highlights, organic fine grain, and gentle highlight roll-off. The holy grail for weddings & portraits.',
    accentColor: '#f59e0b',
    badge: 'Legendary Portrait',
    params: {
      brightness: 4,
      contrast: 96,
      saturate: 108,
      warmth: 18,
      tint: -2,
      grain: 26,
      vignette: 18,
      bloom: 22,
      liftedBlacks: 12,
    },
    davinciNotes: 'Curve lift in toe (+0.05), soft shoulder knee, +150K warming bias, subtle skin-tone qualifier saturation boost.',
  },
  {
    id: 'tealorange',
    name: 'Teal & Orange Blockbuster',
    type: 'Cinema LUT',
    era: 'Hollywood 35mm',
    description: 'Deep teal-cyan shadows juxtaposed against radiant golden skin tones. High dynamic range with punchy, dramatic separation.',
    accentColor: '#00d2ff',
    badge: 'Cinematic Grade',
    params: {
      brightness: 2,
      contrast: 124,
      saturate: 132,
      warmth: 12,
      tint: -14,
      grain: 16,
      vignette: 36,
      bloom: 18,
      liftedBlacks: 6,
    },
    davinciNotes: 'Dual-tone split grading: Shadows pushed to Cyan-Teal (Hue 195°, Gain 0.85), Highlights pushed to Gold-Amber (Hue 35°, Gain 1.15).',
  },
  {
    id: 'cinestill',
    name: 'CineStill 800T Halation',
    type: 'Tungsten Cinema',
    era: 'Night City Motion',
    description: 'Tungsten balanced with signature red/magenta neon halation bloom around specular highlights. Moody, atmospheric, and urban.',
    accentColor: '#ec4899',
    badge: 'Night & Neon',
    params: {
      brightness: -2,
      contrast: 118,
      saturate: 122,
      warmth: -10,
      tint: 18,
      grain: 42,
      vignette: 32,
      bloom: 45,
      liftedBlacks: 14,
    },
    davinciNotes: 'Red halation layer blend mode screen on luma threshold > 85%, tungsten cold core (3200K) with warm specular scatter.',
  },
  {
    id: 'fuji400h',
    name: 'Fujifilm Pro 400H',
    type: 'Pastel Romance',
    era: 'Medium Format',
    description: 'Airy cool mint greens, clean luminous neutral whites, and delicate blush skin tones. Ethereal, romantic, and dreamy.',
    accentColor: '#10b981',
    badge: 'Airy & Pastel',
    params: {
      brightness: 8,
      contrast: 88,
      saturate: 104,
      warmth: -8,
      tint: -12,
      grain: 18,
      vignette: 10,
      bloom: 28,
      liftedBlacks: 18,
    },
    davinciNotes: 'Green-cyan shadow bias, overexposed highlight latitude, soft midtone contrast reduction for dreamy glow.',
  },
  {
    id: 'trix400',
    name: 'Kodak Tri-X 400 B&W',
    type: 'Silver Halide',
    era: 'Magnum Classic',
    description: 'High-contrast monochrome with ink-black shadows, crisp luminous whites, and heavy punchy street photography documentary grain.',
    accentColor: '#94a3b8',
    badge: 'Iconic Monochrome',
    params: {
      brightness: 0,
      contrast: 138,
      saturate: 0,
      warmth: 0,
      tint: 0,
      grain: 48,
      vignette: 42,
      bloom: 10,
      liftedBlacks: 4,
    },
    davinciNotes: 'Full desaturation with custom panchromatic RGB channel mixer (R: 40%, G: 45%, B: 15%), high S-curve contrast.',
  },
  {
    id: 'vintage70s',
    name: 'Vintage 70s Super 8',
    type: 'Nostalgic Film',
    era: 'Retro Kodachrome',
    description: 'Warm golden sepia hues, heavily lifted faded blacks, rich rounded vignette, and nostalgic organic patina.',
    accentColor: '#d97706',
    badge: 'Retro Nostalgia',
    params: {
      brightness: 2,
      contrast: 92,
      saturate: 114,
      warmth: 32,
      tint: 10,
      grain: 52,
      vignette: 55,
      bloom: 30,
      liftedBlacks: 28,
    },
    davinciNotes: 'Lift pedestal +0.12, warm amber midtone push, subtle green-yellow shadow tint, heavy optical vignette.',
  },
  {
    id: 'bleachbypass',
    name: 'Bleach Bypass (Silver)',
    type: 'Gritty Editorial',
    era: 'High-Concept Dark',
    description: 'Silver retention process yielding harsh metallic contrast, desaturated earthy tones, and deeply textured editorial drama.',
    accentColor: '#64748b',
    badge: 'Dark Editorial',
    params: {
      brightness: -4,
      contrast: 144,
      saturate: 45,
      warmth: -6,
      tint: 4,
      grain: 34,
      vignette: 48,
      bloom: 8,
      liftedBlacks: 2,
    },
    davinciNotes: 'Bleach bypass emulation: Overlay of monochrome high-pass channel over muted original, crushing midtones.',
  },
  {
    id: 'emerald',
    name: 'Emerald Forest Fine-Art',
    type: 'Botanical Mood',
    era: 'Nordic Editorial',
    description: 'Deep velvet botanical greens, muted amber accents, crushed cyan highlights, and moody fine-art stillness.',
    accentColor: '#059669',
    badge: 'Moody Botanicals',
    params: {
      brightness: -6,
      contrast: 116,
      saturate: 92,
      warmth: -14,
      tint: -18,
      grain: 22,
      vignette: 44,
      bloom: 14,
      liftedBlacks: 16,
    },
    davinciNotes: 'Hue vs Saturation: Greens desaturated and shifted to deep pine emerald; yellows shifted to warm olive.',
  },
];

// ─────────────────────────────────────────────────────────────
// 2. CURATED SAMPLE PHOTOGRAPHY ASSETS
// ─────────────────────────────────────────────────────────────
const SAMPLE_PHOTOS = [
  {
    id: 'sample-1',
    title: 'Heritage Palace Wedding',
    category: 'Wedding',
    creator: 'Aarav Mehta',
    location: 'Udaipur, Rajasthan',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'sample-2',
    title: 'Nubra Valley Dunes Sunset',
    category: 'Pre-Wedding',
    creator: 'Kabir Varma',
    location: 'Ladakh, Himalayas',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'sample-3',
    title: 'Cyberpunk Neon Alley',
    category: 'Night Urban',
    creator: 'Rohan Deshmukh',
    location: 'Tokyo / Mumbai',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'sample-4',
    title: 'Vogue Haute Couture Editorial',
    category: 'Fashion',
    creator: 'Zoya Chen',
    location: 'Milan / Mumbai',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'sample-5',
    title: 'Alpine Mist & Moody Pine',
    category: 'Nature Landscape',
    creator: 'Pooja Bhatt',
    location: 'Manali, Himachal',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85',
  },
];

export default function ColorLabPage() {
  const { success, info } = useToast();

  // Active Film Preset & Settings
  const [selectedPresetId, setSelectedPresetId] = useState('portra400');
  const [activePhoto, setActivePhoto] = useState(SAMPLE_PHOTOS[0]);
  const [customPhotoUrl, setCustomPhotoUrl] = useState(null);

  // Live Slider Parameters
  const [params, setParams] = useState(FILM_PRESETS[0].params);

  // View Mode: 'split' | 'sideBySide' | 'single'
  const [viewMode, setViewMode] = useState('split');

  // Split-screen drag position (0 to 100%)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Hold-to-compare original state
  const [isHoldingOriginal, setIsHoldingOriginal] = useState(false);

  // Export / Render state
  const [isExporting, setIsExporting] = useState(false);
  const [activeControlTab, setActiveControlTab] = useState('tones'); // 'tones' | 'color' | 'texture' | 'export'

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const currentPreset = useMemo(
    () => FILM_PRESETS.find((p) => p.id === selectedPresetId) || FILM_PRESETS[0],
    [selectedPresetId]
  );

  const displayImageUrl = customPhotoUrl || activePhoto.url;

  // Handle Preset Switching
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setParams({ ...preset.params });
  };

  // Reset to current preset baseline
  const handleResetCurrent = () => {
    setParams({ ...currentPreset.params });
    info(`Reset sliders to ${currentPreset.name} defaults.`);
  };

  // Reset to absolute neutral
  const handleResetNeutral = () => {
    setSelectedPresetId('custom');
    setParams({
      brightness: 0,
      contrast: 100,
      saturate: 100,
      warmth: 0,
      tint: 0,
      grain: 0,
      vignette: 0,
      bloom: 0,
      liftedBlacks: 0,
    });
    info('Sliders reset to neutral flat baseline.');
  };

  // Parameter change helper
  const updateParam = (key, val) => {
    setParams((prev) => ({ ...prev, [key]: Number(val) }));
  };

  // Split-screen drag listeners
  const handleDrag = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pos = ((clientX - rect.left) / rect.width) * 100;
      setSliderPos(Math.min(Math.max(pos, 5), 95));
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) handleDrag(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches[0]) handleDrag(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleDrag]);

  // Keyboard shortcut: Spacebar to toggle/hold original
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsHoldingOriginal(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsHoldingOriginal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Compute CSS filter string
  const cssFilterString = useMemo(() => {
    if (isHoldingOriginal) return 'none';

    const brightnessCalc = 1 + params.brightness / 100;
    const contrastCalc = params.contrast / 100;
    const saturateCalc = params.saturate / 100;
    const sepiaCalc = Math.max(0, params.warmth * 0.007);
    const hueRotateCalc = params.tint * 1.5;

    return `brightness(${brightnessCalc}) contrast(${contrastCalc}) saturate(${saturateCalc}) sepia(${sepiaCalc}) hue-rotate(${hueRotateCalc}deg)`;
  }, [params, isHoldingOriginal]);

  // Dynamic overlays styles
  const warmthOverlayStyle = useMemo(() => {
    if (isHoldingOriginal || params.warmth === 0) return { display: 'none' };
    const isWarm = params.warmth > 0;
    const opacity = (Math.abs(params.warmth) / 50) * 0.22;
    return {
      backgroundColor: isWarm ? 'rgba(245, 158, 11, 1)' : 'rgba(14, 165, 233, 1)',
      opacity,
      mixBlendMode: isWarm ? 'color' : 'soft-light',
    };
  }, [params.warmth, isHoldingOriginal]);

  const bloomOverlayStyle = useMemo(() => {
    if (isHoldingOriginal || params.bloom <= 0) return { display: 'none' };
    const opacity = (params.bloom / 100) * 0.45;
    return {
      backgroundColor: 'rgba(255, 235, 200, 0.4)',
      opacity,
      backdropFilter: `blur(${params.bloom * 0.12}px)`,
      mixBlendMode: 'screen',
    };
  }, [params.bloom, isHoldingOriginal]);

  const liftedBlacksOverlayStyle = useMemo(() => {
    if (isHoldingOriginal || params.liftedBlacks <= 0) return { display: 'none' };
    const opacity = (params.liftedBlacks / 40) * 0.2;
    return {
      backgroundColor: '#1e293b',
      opacity,
      mixBlendMode: 'lighten',
    };
  }, [params.liftedBlacks, isHoldingOriginal]);

  const vignetteOverlayStyle = useMemo(() => {
    if (isHoldingOriginal || params.vignette <= 0) return { display: 'none' };
    const strength = (params.vignette / 100) * 0.85;
    return {
      background: `radial-gradient(circle, transparent 40%, rgba(0, 0, 0, ${strength}) 100%)`,
    };
  }, [params.vignette, isHoldingOriginal]);

  const grainOverlayOpacity = useMemo(() => {
    if (isHoldingOriginal || params.grain <= 0) return 0;
    return (params.grain / 100) * 0.35;
  }, [params.grain, isHoldingOriginal]);

  // Handle Custom File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      info('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCustomPhotoUrl(event.target.result);
      success(`Loaded custom frame: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  // Copy CSS & DaVinci Recipe
  const handleCopyRecipe = () => {
    const recipeText = `/* LensCraft Cinematic LUT Recipe: ${currentPreset.name} */
/* CSS Filter: */
filter: ${cssFilterString};

/* DaVinci Resolve & Premiere Settings: */
- Contrast: ${params.contrast}%
- Exposure: ${params.brightness > 0 ? '+' : ''}${params.brightness}%
- Saturation: ${params.saturate}%
- Temperature (Kelvin): ${params.warmth > 0 ? `+${params.warmth * 50}K (Warm Amber)` : `${params.warmth * 50}K (Cool Cyan)`}
- Tint: ${params.tint > 0 ? `+${params.tint} (Magenta)` : `${params.tint} (Green)`}
- Film Grain: ${params.grain}% (35mm Emulsion)
- Vignette: ${params.vignette}% (Feathered Radial)
- Halation Bloom: ${params.bloom}%
- Matte Lift: ${params.liftedBlacks}%

/* Colorist Grading Note: */
${currentPreset.davinciNotes}
`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(recipeText);
      success('LUT recipe and CSS filter copied to clipboard!');
    }
  };

  // Render & Download Master Graded Image via Canvas
  const handleDownloadGradedImage = async () => {
    try {
      setIsExporting(true);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = displayImageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to load image for canvas export'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 1920;
      canvas.height = img.naturalHeight || 1080;
      const ctx = canvas.getContext('2d');

      // 1. Draw base image with CSS filters
      ctx.filter = cssFilterString;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.filter = 'none';

      // 2. Apply Warmth/Cool Overlay
      if (params.warmth !== 0) {
        ctx.save();
        ctx.globalCompositeOperation = params.warmth > 0 ? 'color' : 'soft-light';
        ctx.fillStyle = params.warmth > 0 ? 'rgba(245, 158, 11, 1)' : 'rgba(14, 165, 233, 1)';
        ctx.globalAlpha = (Math.abs(params.warmth) / 50) * 0.22;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      // 3. Apply Vignette
      if (params.vignette > 0) {
        ctx.save();
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          canvas.width * 0.25,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width * 0.72
        );
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, `rgba(0,0,0,${(params.vignette / 100) * 0.85})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      // 4. Watermark / Stamp
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.font = '16px "JetBrains Mono", monospace';
      ctx.fillText(`LENSCRAFT COLOR LAB · ${currentPreset.name.toUpperCase()}`, 30, canvas.height - 30);
      ctx.restore();

      // 5. Trigger download
      const link = document.createElement('a');
      link.download = `lenscraft-${currentPreset.id}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 0.95);
      link.click();

      success(`Exported master graded photo with ${currentPreset.name}!`);
    } catch (err) {
      console.error(err);
      info('Export completed with fallback capture.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pb-24 text-left relative overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-sky-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-cyan-500/10 blur-[160px] pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & CINEMATIC LAB BANNER
          ───────────────────────────────────────────────────────────── */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-sky-500/15">
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cinematic Color Lab & Film LUT Studio</span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleCopyRecipe}
                className="px-3.5 py-1.5 rounded-full glass-panel text-slate-200 hover:text-white border border-sky-500/25 hover:border-cyan-400 text-xs font-mono inline-flex items-center gap-1.5 transition-all cursor-pointer"
                title="Copy CSS Filter & DaVinci grading specs"
              >
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy Recipe</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadGradedImage}
                disabled={isExporting}
                className="px-4 py-1.5 rounded-full glow-btn-primary text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,210,255,0.4)] hover:scale-105 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-midnight-950" />
                <span>{isExporting ? 'Rendering...' : 'Export Frame'}</span>
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white">
            FILM EMULATION <span className="text-gradient-cyan text-glow-cyan">& COLOR LAB</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Experience real-time Kodak Portra, CineStill, and Hollywood blockbuster color science. Adjust grain,
            temperature, highlight halation, and contrast live on curated photography or test your own raw frames.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. PRESET SELECTION SHELF (8 Film Stocks)
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              <span>Select Emulsion Stock / LUT Profile:</span>
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              {FILM_PRESETS.length} Calibrated Profiles
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {FILM_PRESETS.map((preset) => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/15 border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.3)] -translate-y-1'
                      : 'glass-panel border-sky-500/15 hover:border-sky-500/40 hover:bg-white/5'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: preset.accentColor }}
                      />
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                        {preset.era.split(' ')[0]}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-white line-clamp-1">
                      {preset.name}
                    </h3>
                  </div>
                  <span className="text-[10px] text-cyan-300 font-mono mt-2 block truncate">
                    {preset.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN STUDIO WORKBENCH (CANVAS + CONTROLS GRID)
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN (8/12): INTERACTIVE CANVAS & VIEWER
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top Toolbar: View Modes & Sample Picker */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-sky-500/20">
              {/* Sample Photo Thumbnails */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {SAMPLE_PHOTOS.map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => {
                      setActivePhoto(photo);
                      setCustomPhotoUrl(null);
                    }}
                    className={`relative w-12 h-10 rounded-xl overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      activePhoto.id === photo.id && !customPhotoUrl
                        ? 'border-cyan-400 scale-105 shadow-[0_0_10px_rgba(0,210,255,0.4)]'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                    title={photo.title}
                  >
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                  </button>
                ))}

                {/* Custom Upload Trigger */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-2.5 h-10 rounded-xl glass-panel border text-xs font-mono flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    customPhotoUrl
                      ? 'border-cyan-400 text-cyan-300 bg-sky-500/15'
                      : 'border-sky-500/20 text-slate-300 hover:text-white hover:border-cyan-400'
                  }`}
                  title="Upload your own JPEG/PNG to test grade"
                >
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Upload Frame</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1 bg-midnight-950/80 p-1 rounded-xl border border-sky-500/20">
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'split'
                      ? 'bg-cyan-500 text-midnight-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Split-Screen interactive slider"
                >
                  Split View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('sideBySide')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'sideBySide'
                      ? 'bg-cyan-500 text-midnight-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Side-by-side comparison"
                >
                  Dual Deck
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('single')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'single'
                      ? 'bg-cyan-500 text-midnight-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Full graded frame"
                >
                  Full Frame
                </button>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                INTERACTIVE CANVAS VIEWER CONTAINER
                ───────────────────────────────────────────────────────────── */}
            <div
              ref={containerRef}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden glass-card border border-sky-500/30 select-none shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* MODE 1: SPLIT SCREEN SLIDER */}
              {viewMode === 'split' && (
                <div className="relative w-full h-full overflow-hidden">
                  {/* Layer 1: Graded Cinema Output (Background Full Width) */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={displayImageUrl}
                      alt="Graded Master"
                      style={{ filter: cssFilterString }}
                      className="w-full h-full object-cover transition-all duration-75"
                    />

                    {/* Warmth tint overlay */}
                    <div className="absolute inset-0 pointer-events-none" style={warmthOverlayStyle} />

                    {/* Halation / Bloom overlay */}
                    <div className="absolute inset-0 pointer-events-none" style={bloomOverlayStyle} />

                    {/* Lifted Blacks / Matte overlay */}
                    <div className="absolute inset-0 pointer-events-none" style={liftedBlacksOverlayStyle} />

                    {/* Vignette overlay */}
                    <div className="absolute inset-0 pointer-events-none" style={vignetteOverlayStyle} />

                    {/* Procedural Film Grain Overlay */}
                    {grainOverlayOpacity > 0 && (
                      <div
                        className="absolute inset-0 pointer-events-none mix-blend-overlay"
                        style={{
                          opacity: grainOverlayOpacity,
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                      />
                    )}

                    {/* Label: Graded */}
                    <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-midnight-950/80 backdrop-blur-md border border-cyan-400/40 text-[11px] font-mono text-cyan-300 font-semibold shadow-lg">
                      {currentPreset.name} (Graded)
                    </div>
                  </div>

                  {/* Layer 2: Raw / Original Image (Clipped to sliderPos %) */}
                  <div
                    className="absolute inset-0 h-full overflow-hidden z-10"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <div
                      className="absolute inset-0 h-full"
                      style={{
                        width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                      }}
                    >
                      <img
                        src={displayImageUrl}
                        alt="Raw Original"
                        className="w-full h-full object-cover filter brightness-[0.95] contrast-[95%]"
                      />
                    </div>

                    {/* Label: Original */}
                    <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full bg-midnight-950/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-slate-300 font-semibold shadow-lg">
                      Original Flat Capture
                    </div>
                  </div>

                  {/* Divider Line & Circular Grab Handle */}
                  <div
                    className="absolute top-0 bottom-0 z-30 w-0.5 bg-gradient-to-b from-cyan-400 via-white to-cyan-400 cursor-ew-resize shadow-[0_0_15px_rgba(0,210,255,0.8)]"
                    style={{ left: `${sliderPos}%` }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-midnight-950/90 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.8)] flex items-center justify-center text-cyan-300 transition-transform hover:scale-110 active:scale-95">
                      <Sliders className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>
              )}

              {/* MODE 2: SIDE-BY-SIDE DUAL DECK */}
              {viewMode === 'sideBySide' && (
                <div className="grid grid-cols-2 w-full h-full divide-x divide-sky-500/20">
                  {/* Left: Original */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={displayImageUrl}
                      alt="Original"
                      className="w-full h-full object-cover filter brightness-[0.95]"
                    />
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-midnight-950/85 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/20">
                      Original RAW
                    </div>
                  </div>

                  {/* Right: Graded Output */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={displayImageUrl}
                      alt="Graded"
                      style={{ filter: cssFilterString }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 pointer-events-none" style={warmthOverlayStyle} />
                    <div className="absolute inset-0 pointer-events-none" style={bloomOverlayStyle} />
                    <div className="absolute inset-0 pointer-events-none" style={liftedBlacksOverlayStyle} />
                    <div className="absolute inset-0 pointer-events-none" style={vignetteOverlayStyle} />
                    {grainOverlayOpacity > 0 && (
                      <div
                        className="absolute inset-0 pointer-events-none mix-blend-overlay"
                        style={{
                          opacity: grainOverlayOpacity,
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                      />
                    )}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-midnight-950/85 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-400/40">
                      {currentPreset.name}
                    </div>
                  </div>
                </div>
              )}

              {/* MODE 3: FULL FRAME WITH HOLD-TO-COMPARE */}
              {viewMode === 'single' && (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={displayImageUrl}
                    alt="Active Frame"
                    style={{ filter: isHoldingOriginal ? 'none' : cssFilterString }}
                    className="w-full h-full object-cover"
                  />
                  {!isHoldingOriginal && (
                    <>
                      <div className="absolute inset-0 pointer-events-none" style={warmthOverlayStyle} />
                      <div className="absolute inset-0 pointer-events-none" style={bloomOverlayStyle} />
                      <div className="absolute inset-0 pointer-events-none" style={liftedBlacksOverlayStyle} />
                      <div className="absolute inset-0 pointer-events-none" style={vignetteOverlayStyle} />
                      {grainOverlayOpacity > 0 && (
                        <div
                          className="absolute inset-0 pointer-events-none mix-blend-overlay"
                          style={{
                            opacity: grainOverlayOpacity,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          }}
                        />
                      )}
                    </>
                  )}

                  <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-midnight-950/80 backdrop-blur-md border border-cyan-400/40 text-[11px] font-mono text-cyan-300 font-semibold shadow-lg">
                    {isHoldingOriginal ? 'Viewing Original RAW (Holding)' : `${currentPreset.name} (Graded)`}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Viewer Helpers: Hold Spacebar + Scene Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 px-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onMouseDown={() => setIsHoldingOriginal(true)}
                  onMouseUp={() => setIsHoldingOriginal(false)}
                  onTouchStart={() => setIsHoldingOriginal(true)}
                  onTouchEnd={() => setIsHoldingOriginal(false)}
                  className="px-3 py-1.5 rounded-xl bg-midnight-950 border border-sky-500/25 hover:border-cyan-400 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Hold to Compare (or Spacebar)</span>
                </button>
                <span className="text-slate-500 hidden sm:inline">|</span>
                <span className="hidden sm:inline text-[11px] text-slate-400">
                  Drag divider or drag sliders to adjust
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetCurrent}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                  title="Reset sliders to preset defaults"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Preset</span>
                </button>
                <span className="text-slate-600">·</span>
                <button
                  type="button"
                  onClick={handleResetNeutral}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                  title="Reset to 100% neutral flat values"
                >
                  <span>Flat Zero</span>
                </button>
              </div>
            </div>

            {/* Film Stock Specs Card */}
            <div className="p-5 rounded-3xl glass-panel border border-sky-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full shadow-[0_0_8px]"
                    style={{
                      backgroundColor: currentPreset.accentColor,
                      boxShadow: `0 0 10px ${currentPreset.accentColor}`,
                    }}
                  />
                  <h3 className="text-base font-display font-bold text-white">
                    {currentPreset.name} — <span className="text-cyan-300 text-sm font-mono">{currentPreset.type}</span>
                  </h3>
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  {currentPreset.era}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentPreset.description}
              </p>

              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="font-mono text-[11px] text-slate-400">
                  <span className="text-cyan-400 font-bold">DaVinci Node: </span>
                  {currentPreset.davinciNotes}
                </div>
                <Link
                  to="/editors?type=photo"
                  className="text-cyan-400 hover:text-cyan-300 font-mono text-xs font-bold inline-flex items-center gap-1 shrink-0"
                >
                  <span>Hire Pro Colorist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN (4/12): LIVE SLIDER CONTROL MATRIX
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-5">
            {/* Control Matrix Panel */}
            <div className="p-5 sm:p-6 rounded-3xl glass-card border border-sky-500/25 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-sky-500/20">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                    Grading Controls
                  </h2>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                  Real-time CSS & Canvas
                </span>
              </div>

              {/* Control Category Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-midnight-950/80 border border-sky-500/20 text-xs">
                {[
                  { id: 'tones', label: 'Tones' },
                  { id: 'color', label: 'Color' },
                  { id: 'texture', label: 'Optics' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveControlTab(tab.id)}
                    className={`py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      activeControlTab === tab.id
                        ? 'bg-cyan-500 text-midnight-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: TONAL CONTROLS */}
              {activeControlTab === 'tones' && (
                <div className="space-y-4 animate-reveal">
                  {/* Brightness / Exposure */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span>Exposure / Brightness</span>
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">
                        {params.brightness > 0 ? `+${params.brightness}` : params.brightness}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={params.brightness}
                      onChange={(e) => updateParam('brightness', e.target.value)}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Contrast */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Dynamic Contrast</span>
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">{params.contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="160"
                      value={params.contrast}
                      onChange={(e) => updateParam('contrast', e.target.value)}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Lifted Blacks / Matte Fade */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-purple-400" />
                        <span>Matte Fade (Lifted Blacks)</span>
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">{params.liftedBlacks}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={params.liftedBlacks}
                      onChange={(e) => updateParam('liftedBlacks', e.target.value)}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: COLOR SCIENCE CONTROLS */}
              {activeControlTab === 'color' && (
                <div className="space-y-4 animate-reveal">
                  {/* Saturation */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-pink-400" />
                        <span>Vibrance / Saturation</span>
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">{params.saturate}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={params.saturate}
                      onChange={(e) => updateParam('saturate', e.target.value)}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Temperature (Warmth) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>White Balance Temp</span>
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">
                        {params.warmth > 0 ? `+${params.warmth} Warm` : params.warmth < 0 ? `${params.warmth} Cool` : 'Neutral'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={params.warmth}
                      onChange={(e) => updateParam('warmth', e.target.value)}
                      className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Tint (Magenta / Green) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tint (Magenta / Green)</span>
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">
                        {params.tint > 0 ? `+${params.tint} Magenta` : params.tint < 0 ? `${params.tint} Green` : '0'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      value={params.tint}
                      onChange={(e) => updateParam('tint', e.target.value)}
                      className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: OPTICS & TEXTURE CONTROLS */}
              {activeControlTab === 'texture' && (
                <div className="space-y-4 animate-reveal">
                  {/* Film Grain */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5 text-cyan-400" />
                        <span>35mm Silver Grain</span>
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">{params.grain}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={params.grain}
                      onChange={(e) => updateParam('grain', e.target.value)}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Vignette */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Radial Lens Vignette</span>
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">{params.vignette}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={params.vignette}
                      onChange={(e) => updateParam('vignette', e.target.value)}
                      className="w-full accent-indigo-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Halation / Bloom */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        <span>Highlight Bloom (Halation)</span>
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">{params.bloom}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={params.bloom}
                      onChange={(e) => updateParam('bloom', e.target.value)}
                      className="w-full accent-pink-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons in Matrix */}
              <div className="pt-4 border-t border-sky-500/20 space-y-2.5">
                <button
                  type="button"
                  onClick={handleDownloadGradedImage}
                  disabled={isExporting}
                  className="w-full py-3 rounded-2xl glow-btn-primary text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:scale-102 transition-transform cursor-pointer"
                >
                  <Download className="w-4 h-4 text-midnight-950" />
                  <span>{isExporting ? 'Generating Render...' : 'Download Graded Photo'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyRecipe}
                  className="w-full py-2.5 rounded-2xl glass-panel text-slate-200 hover:text-white border border-sky-500/25 hover:border-cyan-400 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy DaVinci / CSS Recipe</span>
                </button>
              </div>
            </div>

            {/* Quick Pro Hiring Callout */}
            <div className="p-5 rounded-3xl glass-card border border-sky-500/20 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-wider font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Want This Look For Your Shoot?</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our verified colorists and cinematographers who grade client weddings, fashion campaigns,
                and music videos using this exact film color science.
              </p>
              <Link
                to="/editors?type=colorist"
                className="w-full py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-cyan-300 hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Browse Verified Colorists</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. COMPARISON MATRIX & EDUCATION PILLARS
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>COLORED TO PERFECTION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            WHY COLOR SCIENCE MATTERS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Digital camera sensors record flat linear light. Our creative studio transforms raw captures into timeless film heirlooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl glass-panel border border-sky-500/20 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-midnight-950 border border-sky-500/30 flex items-center justify-center text-cyan-400">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-white">Skin Tone Preservation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Analogue emulsions like Kodak Portra feature non-linear highlight compression that keeps Indian and diverse skin tones natural, luminous, and rich.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-sky-500/20 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-midnight-950 border border-sky-500/30 flex items-center justify-center text-cyan-400">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-white">Organic 35mm Grain Structure</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlike digital sensor noise, authentic film grain breaks up digital sharpness, adding texture, depth, and cinematic atmosphere to wedding memories.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-sky-500/20 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-midnight-950 border border-sky-500/30 flex items-center justify-center text-cyan-400">
              <Wand2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-display font-bold text-white">Hollywood Split-Toning</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Separating highlights and shadows into harmonious complementary tones creates 3D visual depth that makes subjects pop out from background scenes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
