import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
  IndianRupee,
  Star,
  ShieldCheck,
  Zap,
  RefreshCw,
  SlidersHorizontal,
  AlertTriangle,
  Camera,
  ExternalLink,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { recommendationService } from '../../services/recommendationService';
import Avatar from './Avatar';
import BookingModal from './BookingModal';
import { formatCurrency } from '../../utils/formatters';

const EVENT_TYPES = [
  'Wedding',
  'Pre-Wedding',
  'Fashion',
  'Commercial',
  'Portrait',
  'Birthday',
  'Corporate',
  'Events',
];

const STYLES = [
  'Candid',
  'Traditional',
  'Cinematic',
  'Fashion',
  'Fine-Art',
  'Editorial',
  'Documentary',
  'Drone',
];

const POPULAR_CITIES = ['Bhopal', 'Indore', 'Mumbai', 'Delhi', 'Bengaluru', 'Jaipur', 'Goa'];
const BUDGET_PRESETS = [10000, 15000, 25000, 35000, 50000];

const AiMatchmakerModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // 5 Core Criteria State
  const [eventType, setEventType] = useState('Wedding');
  const [location, setLocation] = useState('Bhopal');
  const [maxBudget, setMaxBudget] = useState('15000');
  const [photographyStyle, setPhotographyStyle] = useState('Candid');
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [excludeUnavailable, setExcludeUnavailable] = useState(true);
  const [strictBudget, setStrictBudget] = useState(false);

  // Results & UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProForBooking, setSelectedProForBooking] = useState(null);

  // Quick Preset Autofill (matches the customer example requirements)
  const applyPresetExample = () => {
    setEventType('Wedding');
    setLocation('Bhopal');
    setMaxBudget('15000');
    setPhotographyStyle('Candid');
    setEventDate('2026-11-20');
    setExcludeUnavailable(true);
    setStrictBudget(false);
  };

  // Perform AI Recommendation query
  const handleFindMatches = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        eventType: eventType.trim(),
        location: location.trim(),
        maxBudget: maxBudget ? Number(maxBudget) : null,
        photographyStyle: photographyStyle.trim(),
        eventDate: eventDate || null,
        excludeUnavailable,
        strictBudget,
      };

      const res = await recommendationService.getRecommendations(payload);

      if (res.success && res.data) {
        setRecommendations(res.data.recommendations || []);
        setHasSearched(true);
      } else {
        throw new Error(res.message || 'Failed to retrieve recommendations');
      }
    } catch (err) {
      console.error('AI Recommendation query error:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Unable to query AI recommendations from database. Please check connection.'
      );
      setRecommendations([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  // Auto-search once when modal first opens if not searched yet
  useEffect(() => {
    if (isOpen && !hasSearched && recommendations.length === 0) {
      handleFindMatches();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOpenBooking = (pro) => {
    setSelectedProForBooking({
      id: pro.id,
      name: pro.name,
      avatar: pro.avatar,
      startingPrice: pro.displayPrice,
      packages: pro.bestMatchingPackage ? [pro.bestMatchingPackage] : [],
      location: pro.location,
    });
    setBookingModalOpen(true);
  };

  const navigateToFullEngine = () => {
    onClose();
    const query = new URLSearchParams({
      event: eventType,
      location: location,
      budget: maxBudget,
      style: photographyStyle,
      date: eventDate,
    }).toString();
    navigate(`/recommendations?${query}`);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#02040a]/85 backdrop-blur-xl animate-fade-in text-left">
        <div className="relative w-full max-w-4xl bg-[#080e22]/95 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col max-h-[92vh]">
          
          {/* Header */}
          <div className="px-5 sm:px-7 py-4 bg-slate-900/90 text-white flex items-center justify-between border-b border-sky-500/20 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-sky-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-white leading-tight">
                  AI Photographer Recommendation System
                </h3>
                <p className="text-[11px] text-cyan-300 font-mono">
                  Weighted Multi-Criteria Matching · Real-Time Availability · Transparent Scores
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={navigateToFullEngine}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer"
                title="Open full page with weight sliders"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Full Engine</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Helper Banner */}
          <div className="px-5 sm:px-7 py-2.5 bg-gradient-to-r from-sky-950/60 via-midnight-950 to-indigo-950/60 border-b border-sky-500/15 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider">Example:</span>
              <span className="text-slate-300">Wedding in Bhopal · Max ₹15,000 · Candid Style · Nov 20, 2026</span>
            </div>
            <button
              type="button"
              onClick={applyPresetExample}
              className="text-[11px] font-mono font-bold text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
            >
              Autofill Example Criteria
            </button>
          </div>

          {/* Modal Body: Two column layout on Desktop (Left: 5 Criteria Form, Right: Ranked MongoDB Results) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
            
            {/* LEFT: 5 Criteria Controls Form */}
            <form
              onSubmit={handleFindMatches}
              className="lg:col-span-5 p-5 sm:p-6 space-y-4 bg-[#050a18]/70 border-b lg:border-b-0 lg:border-r border-sky-500/15 text-slate-200 overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" />
                  <span>5-Criteria Inputs</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Live MongoDB Scoring</span>
              </div>

              {/* 1. Event Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  1. Event Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-midnight-900 border border-sky-500/25 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-midnight-950 text-white">
                      {type}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {['Wedding', 'Pre-Wedding', 'Fashion', 'Birthday'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setEventType(t)}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                        eventType === t
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>2. Target Location</span>
                  <MapPin className="w-3 h-3 text-cyan-400" />
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bhopal, Indore, Mumbai..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-midnight-900 border border-sky-500/25 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {POPULAR_CITIES.slice(0, 5).map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setLocation(city)}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                        location.toLowerCase() === city.toLowerCase()
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Maximum Budget */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    3. Maximum Budget (₹)
                  </label>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {maxBudget ? `₹${Number(maxBudget).toLocaleString('en-IN')}` : 'Any'}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 text-xs font-mono">₹</span>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    placeholder="15000"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 rounded-xl bg-midnight-900 border border-sky-500/25 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {BUDGET_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setMaxBudget(String(p))}
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-mono transition-all ${
                        Number(maxBudget) === p
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
                      }`}
                    >
                      ₹{(p / 1000)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Photography Style */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  4. Photography Style
                </label>
                <select
                  value={photographyStyle}
                  onChange={(e) => setPhotographyStyle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-midnight-900 border border-sky-500/25 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  {STYLES.map((style) => (
                    <option key={style} value={style} className="bg-midnight-950 text-white">
                      {style}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {['Candid', 'Traditional', 'Cinematic', 'Fine-Art'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setPhotographyStyle(s)}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                        photographyStyle === s
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Preferred Event Date */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>5. Preferred Event Date</span>
                  </label>
                  {eventDate && (
                    <button
                      type="button"
                      onClick={() => setEventDate('')}
                      className="text-[10px] text-slate-400 hover:text-rose-400 underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-midnight-900 border border-sky-500/25 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                />
              </div>

              {/* Strict Filters Toggle */}
              <div className="space-y-2 pt-1 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={excludeUnavailable}
                    onChange={(e) => setExcludeUnavailable(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
                  />
                  <span>Exclude confirmed booked / closed dates</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl glow-btn-primary text-xs uppercase font-mono font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.35)] cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Scoring Photographers...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Rank Photographers</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={navigateToFullEngine}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                  >
                    <span>Need custom weights for Style vs Budget? Open Full Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </form>

            {/* RIGHT: Ranked Recommendations Results */}
            <div className="lg:col-span-7 p-5 sm:p-6 overflow-y-auto space-y-4">
              
              <div className="flex items-center justify-between border-b border-sky-500/20 pb-3">
                <div>
                  <h4 className="text-sm sm:text-base font-display font-bold text-white flex items-center gap-2">
                    <span>Ranked Photographer Recommendations</span>
                    {recommendations.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono">
                        {recommendations.length} Found
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Ranked by Style Match (25%), Budget Compatibility (25%), Location Proximity (20%), Service (20%), Availability (10%).
                  </p>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="py-16 flex flex-col items-center justify-center gap-3 text-center">
                  <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
                  <p className="text-xs font-mono text-cyan-300">
                    Querying MongoDB & scoring photographers with weighted vectors...
                  </p>
                  <span className="text-[11px] text-slate-500 max-w-xs">
                    Checking style match, package price feasibility, travel distance, and active booking dates.
                  </span>
                </div>
              )}

              {/* Error State */}
              {!loading && error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-rose-200">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Error loading recommendations</span>
                  </div>
                  <p className="text-[11px] text-rose-300/90">{error}</p>
                  <button
                    type="button"
                    onClick={() => handleFindMatches()}
                    className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-white font-mono text-[10px] transition-colors"
                  >
                    Retry Query
                  </button>
                </div>
              )}

              {/* Empty Results State */}
              {!loading && !error && hasSearched && recommendations.length === 0 && (
                <div className="py-12 px-4 text-center rounded-2xl glass-card border border-white/10 space-y-3">
                  <Camera className="w-10 h-10 text-slate-500 mx-auto" />
                  <h5 className="text-sm font-bold text-white">No Photographers Met All Strict Requirements</h5>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Try increasing your maximum budget, clearing the specific date filter, or expanding the location to discover more creative artists.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setMaxBudget('35000');
                        setEventDate('');
                        setStrictBudget(false);
                        setExcludeUnavailable(false);
                      }}
                      className="px-4 py-2 rounded-xl glow-btn-primary text-xs font-mono uppercase"
                    >
                      Relax Constraints & Re-Rank
                    </button>
                  </div>
                </div>
              )}

              {/* Ranked Photographers List */}
              {!loading && !error && recommendations.length > 0 && (
                <div className="space-y-3.5">
                  {recommendations.map((creator, index) => {
                    const isTopRanked = index === 0;

                    return (
                      <div
                        key={creator.id}
                        className={`p-4 rounded-xl glass-card transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          isTopRanked
                            ? 'border-cyan-400/60 shadow-[0_0_20px_rgba(0,210,255,0.2)] bg-gradient-to-r from-sky-950/30 to-midnight-950'
                            : 'border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        {/* Photographer Info */}
                        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                          <div className="relative shrink-0">
                            <Avatar
                              src={creator.avatar || creator.coverImage}
                              name={creator.name}
                              size="lg"
                              className="ring-2 ring-cyan-500/30"
                            />
                            <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-midnight-950 border border-cyan-400 text-[10px] font-mono font-bold text-cyan-300 flex items-center justify-center">
                              #{index + 1}
                            </span>
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h5 className="text-sm font-bold text-white truncate">{creator.name}</h5>
                              {creator.isVerified && (
                                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" title="Verified Creator" />
                              )}
                              
                              {/* Overall Match Score Pill */}
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 shadow-sm">
                                {creator.overallScore}% Match
                              </span>

                              {/* Availability Status Badge */}
                              {creator.availabilityStatus === 'VERIFIED_AVAILABLE' && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                  ✓ Open on Date
                                </span>
                              )}
                              {creator.availabilityStatus === 'UNVERIFIED' && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                  ? Unverified Schedule
                                </span>
                              )}
                              {creator.availabilityStatus === 'UNAVAILABLE' && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                  ✕ Booked
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-400 line-clamp-1">{creator.tagline || creator.bio}</p>

                            <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-slate-400">
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                {creator.rating || 5.0} ({creator.reviewCount || 0})
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-cyan-400" />
                                {creator.location}
                              </span>
                              {creator.bestMatchingPackage?.title && (
                                <>
                                  <span>·</span>
                                  <span className="text-cyan-300 font-mono text-[10px] truncate max-w-[150px]">
                                    {creator.bestMatchingPackage.title}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Transparent Match Reasons Pills */}
                            {creator.matchReasons && creator.matchReasons.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {creator.matchReasons.slice(0, 2).map((reason, rIdx) => (
                                  <span
                                    key={rIdx}
                                    className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/10 text-slate-300 border border-sky-500/20"
                                  >
                                    {reason}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 shrink-0">
                          <div className="text-left sm:text-right">
                            <span className="text-xs font-bold text-white font-mono block">
                              ₹{(creator.displayPrice || creator.startingPrice || 0).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {creator.bestMatchingPackage ? 'Matched package' : 'Starting rate'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Link
                              to={`/professionals/${creator.id}`}
                              onClick={onClose}
                              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition-colors"
                            >
                              Studio
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleOpenBooking(creator)}
                              className="px-3 py-1.5 rounded-lg glow-btn-primary text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <span>Book</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Deep Engine CTA at bottom */}
                  <div className="pt-3 text-center border-t border-sky-500/15">
                    <button
                      type="button"
                      onClick={navigateToFullEngine}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Open Full Engine with Custom Weights Sliders & Mathematical Breakdown →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-5 sm:px-7 py-3 bg-slate-900/90 border-t border-sky-500/20 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-slate-400 font-mono">
              Lenscraft AI Engine v1.0 · Grounded in MongoDB Schemas
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={navigateToFullEngine}
                className="px-4 py-1.5 rounded-xl glow-btn-primary text-xs uppercase font-mono font-bold tracking-wider cursor-pointer"
              >
                Go to Dedicated Page
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal Integration */}
      {selectedProForBooking && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          professional={selectedProForBooking}
        />
      )}
    </>
  );
};

export default AiMatchmakerModal;
