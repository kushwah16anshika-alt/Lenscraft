import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Camera,
  Video,
  Film,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Button from './Button';
import Avatar from './Avatar';

const OCCASIONS = [
  { id: 'wedding', label: 'Royal Wedding & Destination', role: ROLES.PHOTOGRAPHER, icon: Camera },
  { id: 'pre-wedding', label: 'Cinematic Pre-Wedding', role: ROLES.VIDEOGRAPHER, icon: Video },
  { id: 'commercial', label: 'Commercial & Brand Campaign', role: ROLES.PHOTOGRAPHER, icon: Camera },
  { id: 'reels', label: 'Viral Reels & Social Retainer', role: ROLES.EDITOR, icon: Film },
  { id: 'fashion', label: 'Fashion & Editorial Portrait', role: ROLES.PHOTOGRAPHER, icon: Camera },
  { id: 'music-video', label: 'Music Video & Cinematic Film', role: ROLES.VIDEOGRAPHER, icon: Video },
];

const AESTHETICS = [
  {
    id: 'cinematic',
    title: 'Cinematic 35mm & Warm Tones',
    description: 'Rich contrast, golden hour warmth, film grain, and anamorphic flares.',
    tag: 'Trending',
  },
  {
    id: 'fine-art',
    title: 'Editorial Fine-Art & Pastel',
    description: 'Soft natural light, airy pastel hues, delicate skin tones, and romantic framing.',
    tag: 'Classic',
  },
  {
    id: 'bold-fashion',
    title: 'High-Fashion & Studio Lighting',
    description: 'Crisp studio strobes, dynamic geometry, deep blacks, and punchy saturated colors.',
    tag: 'Commercial',
  },
  {
    id: 'documentary',
    title: 'Candid Documentary Storytelling',
    description: 'Unobtrusive raw emotion, genuine unposed laughter, and journalistic spontaneity.',
    tag: 'Story-First',
  },
];

const CITIES = ['All Locations', 'Mumbai', 'Bengaluru', 'New Delhi', 'Jaipur', 'Pune', 'Goa', 'Hyderabad', 'Bhopal', 'Indore'];

const AiMatchmakerModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [naturalQuery, setNaturalQuery] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('wedding');
  const [selectedAesthetic, setSelectedAesthetic] = useState('cinematic');
  const [selectedCity, setSelectedCity] = useState('All Locations');
  const [budgetTier, setBudgetTier] = useState('standard'); // budget, standard, luxury
  const [maxBudget, setMaxBudget] = useState(null);
  const [includeDrone, setIncludeDrone] = useState(true);
  const [fastTeaser, setFastTeaser] = useState(true);

  if (!isOpen) return null;

  // Natural Language Query Parser
  const handleNaturalSearch = (e) => {
    e.preventDefault();
    if (!naturalQuery.trim()) return;

    const lower = naturalQuery.toLowerCase();

    // 1. Detect City
    const matchedCity = CITIES.find((c) => c !== 'All Locations' && lower.includes(c.toLowerCase()));
    if (matchedCity) setSelectedCity(matchedCity);

    // 2. Detect Occasion
    if (lower.includes('wedding') || lower.includes('shaadi') || lower.includes('marriage')) {
      setSelectedOccasion('wedding');
    } else if (lower.includes('pre-wedding') || lower.includes('engagement') || lower.includes('couple')) {
      setSelectedOccasion('pre-wedding');
    } else if (lower.includes('fashion') || lower.includes('model') || lower.includes('editorial')) {
      setSelectedOccasion('fashion');
    } else if (lower.includes('commercial') || lower.includes('brand') || lower.includes('product')) {
      setSelectedOccasion('commercial');
    } else if (lower.includes('reel') || lower.includes('edit') || lower.includes('color')) {
      setSelectedOccasion('reels');
    }

    // 3. Detect Aesthetic
    if (lower.includes('cinematic') || lower.includes('film') || lower.includes('warm')) {
      setSelectedAesthetic('cinematic');
    } else if (lower.includes('fine art') || lower.includes('pastel') || lower.includes('light')) {
      setSelectedAesthetic('fine-art');
    } else if (lower.includes('studio') || lower.includes('flash') || lower.includes('bold')) {
      setSelectedAesthetic('bold-fashion');
    }

    // 4. Detect Budget Numbers (e.g. 30000, 30k, 50,000)
    const budgetMatch = lower.match(/(?:under|below|budget|within|upto|₹|rs\.?)\s*(\d+[\d,]*\s*k?)/i) || lower.match(/(\d+000)/);
    if (budgetMatch) {
      let numStr = budgetMatch[1].replace(/,/g, '').toLowerCase();
      let parsedNum = 0;
      if (numStr.endsWith('k')) {
        parsedNum = parseFloat(numStr) * 1000;
      } else {
        parsedNum = parseFloat(numStr);
      }
      if (parsedNum > 0) {
        setMaxBudget(parsedNum);
        if (parsedNum <= 25000) setBudgetTier('budget');
        else if (parsedNum <= 60000) setBudgetTier('standard');
        else setBudgetTier('luxury');
      }
    }

    // Jump straight to results step 4
    setStep(4);
  };

  // Find target matches based on selections
  const occasionObj = OCCASIONS.find((o) => o.id === selectedOccasion) || OCCASIONS[0];
  
  const getMatchedCreators = () => {
    let list = MOCK_PROFESSIONALS.filter((p) => {
      const city = typeof p.location === 'object' ? p.location.city : p.location;
      if (selectedCity !== 'All Locations' && city && !city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }
      if (maxBudget && p.startingPrice && p.startingPrice > maxBudget * 1.15) {
        return false;
      }
      return true;
    });

    if (list.length === 0) {
      list = MOCK_PROFESSIONALS;
    }

    // Sort matching highest ratings
    return list.slice(0, 3).map((creator, idx) => {
      const matchScore = 98 - idx * 3;
      return {
        ...creator,
        matchScore,
      };
    });
  };

  const matches = getMatchedCreators();

  const handleResetAndClose = () => {
    setStep(1);
    setNaturalQuery('');
    setMaxBudget(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02040a]/85 backdrop-blur-xl animate-fade-in text-left">
      <div className="relative w-full max-w-2xl bg-[#080e22]/95 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-900/90 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white leading-none">
                AI Creator Matchmaker
              </h3>
              <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider block mt-1">
                Step {step} of 4 — {step === 1 ? 'Occasion' : step === 2 ? 'Visual Style' : step === 3 ? 'Parameters' : 'Curated Matches'}
              </span>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-900 shrink-0">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* STEP 1: Occasion & Discipline OR Smart Prompt */}
          {step === 1 && (
            <div className="space-y-5 animate-slide-up">
              {/* Natural AI Query Prompt Input */}
              <form onSubmit={handleNaturalSearch} className="p-4 rounded-2xl bg-midnight-950/80 border border-cyan-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Smart Natural Language Match</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Wedding photographer in Bhopal under ₹30,000 with cinematic style..."
                    value={naturalQuery}
                    onChange={(e) => setNaturalQuery(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-midnight-900 border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl glow-btn-primary text-xs uppercase font-mono font-bold tracking-wider shrink-0"
                  >
                    Match Creators
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-400">
                  <span>Try:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setNaturalQuery('Wedding photographer in Bhopal under ₹30,000 with cinematic style');
                    }}
                    className="text-cyan-400 hover:underline cursor-pointer"
                  >
                    "Wedding photographer in Bhopal under ₹30,000"
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setNaturalQuery('4K Pre-Wedding drone cinematographer in Goa');
                    }}
                    className="text-cyan-400 hover:underline cursor-pointer"
                  >
                    "Pre-Wedding in Goa"
                  </button>
                </div>
              </form>

              <div className="relative flex items-center justify-center py-1">
                <div className="w-full border-t border-sky-500/15" />
                <span className="bg-[#080e22] px-3 text-[10px] uppercase font-mono text-slate-500 tracking-widest relative">
                  OR CHOOSE STEP BY STEP
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-white">
                  What kind of project or shoot are you planning?
                </h4>
                <p className="text-xs text-slate-400">
                  Select your shoot medium to connect with specialized professionals.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {OCCASIONS.map((occ) => {
                  const Icon = occ.icon;
                  const isSelected = selectedOccasion === occ.id;
                  return (
                    <div
                      key={occ.id}
                      onClick={() => setSelectedOccasion(occ.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'border-cyan-500/80 bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/10'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <h5 className="text-xs font-bold truncate">{occ.label}</h5>
                        <span
                          className={`text-[10px] uppercase font-semibold tracking-wider block ${
                            isSelected ? 'text-cyan-300' : 'text-slate-500'
                          }`}
                        >
                          {ROLE_LABELS[occ.role]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Visual Aesthetic & Mood */}
          {step === 2 && (
            <div className="space-y-4 animate-slide-up">
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-white">
                  Choose your desired visual aesthetic & tone
                </h4>
                <p className="text-xs text-slate-400">
                  Our algorithm matches creators who consistently produce your chosen color science and framing style.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {AESTHETICS.map((aes) => {
                  const isSelected = selectedAesthetic === aes.id;
                  return (
                    <div
                      key={aes.id}
                      onClick={() => setSelectedAesthetic(aes.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? 'border-cyan-500/80 bg-cyan-500/10 text-white shadow-lg shadow-cyan-500/10'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-bold leading-snug">{aes.title}</h5>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider shrink-0 ${
                            isSelected ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/30' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {aes.tag}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] leading-relaxed line-clamp-2 ${
                          isSelected ? 'text-slate-200' : 'text-slate-400'
                        }`}
                      >
                        {aes.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Location, Crew & Timeline */}
          {step === 3 && (
            <div className="space-y-5 animate-slide-up">
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-bold text-white">
                  Shoot Location & Production Requirements
                </h4>
                <p className="text-xs text-slate-400">
                  Tailor location and gear preferences to pinpoint certified studios.
                </p>
              </div>

              {/* City Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Primary Location / City
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all truncate ${
                        selectedCity === city
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Budget Expectation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'budget', label: 'Essential', range: '₹10k–₹25k' },
                    { id: 'standard', label: 'Signature', range: '₹25k–₹60k' },
                    { id: 'luxury', label: 'Master / Luxury', range: '₹60k+' },
                  ].map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => setBudgetTier(tier.id)}
                      className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${
                        budgetTier === tier.id
                          ? 'border-cyan-500/80 bg-cyan-500/10 text-white font-bold shadow-md'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold block">{tier.label}</span>
                      <span className="text-[10px] text-cyan-400 font-mono">{tier.range}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Addon Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label
                  onClick={() => setIncludeDrone(!includeDrone)}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    includeDrone ? 'border-cyan-500/60 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={includeDrone}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Include 4K Drone Aerials</span>
                    <span className="text-[10px] text-slate-400">Licensed DGCA pilot coverage</span>
                  </div>
                </label>

                <label
                  onClick={() => setFastTeaser(!fastTeaser)}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    fastTeaser ? 'border-cyan-500/60 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={fastTeaser}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">48h Fast Social Teaser</span>
                    <span className="text-[10px] text-slate-400">Quick turnaround for Instagram</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Matched Creators Results */}
          {step === 4 && (
            <div className="space-y-5 animate-slide-up">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">
                    Your Top Matched Visual Artists
                  </h4>
                  <p className="text-xs text-slate-400">
                    Ranked by aesthetic alignment, verified gear, and location availability.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>Escrow Ready</span>
                </span>
              </div>

              <div className="space-y-3.5">
                {matches.map((creator) => (
                  <div
                    key={creator.id}
                    className="p-4 rounded-xl glass-card hover:border-cyan-500/50 transition-all shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <Avatar
                        src={creator.avatar}
                        name={creator.name}
                        size="lg"
                        className="shrink-0 ring-2 ring-cyan-500/30"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">{creator.name}</h5>
                          {creator.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-cyan-400" title="Verified Roster" />
                          )}
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500 text-slate-950">
                            {creator.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{creator.tagline}</p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {creator.rating} ({creator.reviewCount} reviews)
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            {creator.location?.city}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="text-xs font-bold text-white">
                          ₹{creator.startingPrice?.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 block">Starting rate</span>
                      </div>

                      <Link
                        to={`/professionals/${creator.id}`}
                        onClick={handleResetAndClose}
                      >
                        <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                          View Studio
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between shrink-0">
          {step > 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep(step - 1)}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Back
            </Button>
          ) : (
            <span className="text-[11px] text-slate-500">Takes less than 1 minute</span>
          )}

          {step < 4 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setStep(step + 1)}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleResetAndClose();
                navigate('/photographers');
              }}
            >
              Explore Full Catalog
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiMatchmakerModal;
