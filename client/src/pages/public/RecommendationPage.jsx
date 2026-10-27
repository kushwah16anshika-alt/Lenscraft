import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Camera,
  MapPin,
  Calendar,
  IndianRupee,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Star,
  RefreshCw,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { recommendationService } from '../../services/recommendationService';
import Avatar from '../../components/common/Avatar';
import BookingModal from '../../components/common/BookingModal';
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

const DEFAULT_WEIGHTS = {
  style: 0.25,
  budget: 0.25,
  location: 0.2,
  service: 0.2,
  availability: 0.1,
};

const RecommendationPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Form criteria state
  const [eventType, setEventType] = useState(searchParams.get('event') || 'Wedding');
  const [location, setLocation] = useState(searchParams.get('location') || 'Bhopal');
  const [maxBudget, setMaxBudget] = useState(searchParams.get('budget') || '15000');
  const [photographyStyle, setPhotographyStyle] = useState(searchParams.get('style') || 'Candid');
  const [eventDate, setEventDate] = useState(searchParams.get('date') || '2026-11-20');
  const [strictBudget, setStrictBudget] = useState(false);
  const [excludeUnavailable, setExcludeUnavailable] = useState(true);

  // Advanced configurable weights state
  const [showAdvancedWeights, setShowAdvancedWeights] = useState(false);
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);

  // Results & UI state
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedCriteria, setSearchedCriteria] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const [selectedProfessionalForBooking, setSelectedProfessionalForBooking] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Fetch recommendations
  const handleSearch = async (e) => {
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
        weights,
        strictBudget,
        excludeUnavailable,
      };

      const res = await recommendationService.getRecommendations(payload);
      if (res.success && res.data) {
        setRecommendations(res.data.recommendations || []);
        setSearchedCriteria(res.data.criteria);
      } else {
        setRecommendations([]);
      }
    } catch (err) {
      console.error('Failed to get recommendations:', err);
      setError(err.message || 'Failed to retrieve recommendations from server.');
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  // Run initial recommendation query on page load
  useEffect(() => {
    handleSearch();
  }, []);

  const toggleCardExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBookCreator = (prof) => {
    setSelectedProfessionalForBooking(prof);
    setBookingModalOpen(true);
  };

  const resetWeights = () => {
    setWeights(DEFAULT_WEIGHTS);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pb-28 text-left relative selection:bg-cyan-500/30">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Header */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-sky-500/15 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-4 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Technology 1: AI Photographer Recommendation Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
            MATCH WITH YOUR <span className="text-gradient-cyan text-glow-cyan">IDEAL PHOTOGRAPHER</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Content-based weighted scoring that analyzes actual photographer portfolio specialties,
            MongoDB package pricing, geographic proximity, and live verified date availability.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Recommendation Query Form (4 Cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-sky-500/25 shadow-2xl shadow-cyan-950/20 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-white font-display font-bold text-base">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <span>Search Criteria</span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                Live Engine
              </span>
            </div>

            <form onSubmit={handleSearch} className="space-y-4 text-xs">
              {/* Event Type */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span>Event / Occasion</span>
                  <span className="text-[11px] text-slate-500">Required</span>
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white focus:outline-none focus:border-cyan-400 cursor-pointer text-xs"
                >
                  {EVENT_TYPES.map((ev) => (
                    <option key={ev} value={ev} className="bg-[#080e22] text-white">
                      {ev}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Location / City</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bhopal, Indore, Mumbai..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                />
                {/* Popular City Quick Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {POPULAR_CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setLocation(city)}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-mono transition-colors ${
                        location.toLowerCase() === city.toLowerCase()
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                          : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photography Style */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Photography Style</span>
                  </span>
                </label>
                <select
                  value={photographyStyle}
                  onChange={(e) => setPhotographyStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white focus:outline-none focus:border-cyan-400 cursor-pointer text-xs"
                >
                  {STYLES.map((st) => (
                    <option key={st} value={st} className="bg-[#080e22] text-white">
                      {st} Style
                    </option>
                  ))}
                </select>
              </div>

              {/* Maximum Budget */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Maximum Budget (₹)</span>
                  </span>
                  {maxBudget && (
                    <span className="text-cyan-400 font-mono font-bold">
                      ₹{Number(maxBudget).toLocaleString('en-IN')}
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  placeholder="e.g. 15000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-mono"
                />
                {/* Budget Quick Preset Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {BUDGET_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setMaxBudget(String(p))}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-mono transition-colors ${
                        Number(maxBudget) === p
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                          : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      ₹{(p / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Event Date */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Preferred Event Date</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Live Availability Check</span>
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white focus:outline-none focus:border-cyan-400 text-xs font-mono"
                />
              </div>

              {/* Constraints Toggles */}
              <div className="pt-2 space-y-2 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={excludeUnavailable}
                    onChange={(e) => setExcludeUnavailable(e.target.checked)}
                    className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500/30 bg-slate-900"
                  />
                  <span>Exclude creators unavailable on selected date</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={strictBudget}
                    onChange={(e) => setStrictBudget(e.target.checked)}
                    className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500/30 bg-slate-900"
                  />
                  <span>Strict budget constraint (no over-budget margin)</span>
                </label>
              </div>

              {/* Collapsible Advanced Weights */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAdvancedWeights(!showAdvancedWeights)}
                  className="w-full flex items-center justify-between text-slate-400 hover:text-cyan-300 transition-colors py-1 cursor-pointer"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
                    Configurable Model Weights
                  </span>
                  {showAdvancedWeights ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showAdvancedWeights && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-midnight-950/80 border border-sky-500/20 space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Scoring Weight Distribution</span>
                      <button
                        type="button"
                        onClick={resetWeights}
                        className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[10px]"
                      >
                        <RefreshCw className="w-2.5 h-2.5" /> Reset
                      </button>
                    </div>

                    {[
                      { key: 'style', label: 'Style Match Weight' },
                      { key: 'budget', label: 'Budget Weight' },
                      { key: 'location', label: 'Location Weight' },
                      { key: 'service', label: 'Service Match Weight' },
                      { key: 'availability', label: 'Availability Weight' },
                    ].map(({ key, label }) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-slate-300">
                          <span>{label}</span>
                          <span className="text-cyan-400 font-bold">{Math.round(weights[key] * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={weights[key]}
                          onChange={(e) =>
                            setWeights((prev) => ({
                              ...prev,
                              [key]: parseFloat(e.target.value),
                            }))
                          }
                          className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl glow-btn-primary font-bold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(0,210,255,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-midnight-950" />
                    <span>Analyzing MongoDB Vector Data...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-midnight-950" />
                    <span>Calculate Best Photographer Matches</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </aside>

        {/* Right Column: Ranked Results (8 Cols) */}
        <main className="lg:col-span-8 space-y-6">
          {/* Query Summary Banner */}
          {searchedCriteria && (
            <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-sky-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-mono">Matched for:</span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
                  {searchedCriteria.eventType || 'Any Event'}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
                  {searchedCriteria.location || 'Any City'}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
                  {searchedCriteria.photographyStyle || 'Any Style'}
                </span>
                {searchedCriteria.maxBudget && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono font-semibold">
                    ≤ ₹{searchedCriteria.maxBudget.toLocaleString('en-IN')}
                  </span>
                )}
                {searchedCriteria.eventDate && (
                  <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-mono font-semibold">
                    {searchedCriteria.eventDate}
                  </span>
                )}
              </div>

              <span className="text-slate-400 font-mono text-[11px]">
                Found <strong className="text-white">{recommendations.length}</strong> matching creators
              </span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
              <div>
                <strong className="block font-semibold">Query Execution Notice</strong>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl glass-card border border-sky-500/15 animate-pulse space-y-4"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-slate-800" />
                    <div className="flex-1 space-y-2.5">
                      <div className="h-5 w-48 bg-slate-800 rounded" />
                      <div className="h-3 w-64 bg-slate-800/60 rounded" />
                      <div className="h-4 w-32 bg-slate-800/40 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty Results State */}
          {!loading && recommendations.length === 0 && !error && (
            <div className="p-10 rounded-3xl glass-panel border border-sky-500/20 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mx-auto flex items-center justify-center text-cyan-400">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-display font-bold text-white">No Direct Matches Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                No photographers met your exact filter combination. Try increasing your maximum budget,
                broadening your location search to neighboring cities, or unchecking the strict availability filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMaxBudget('25000');
                  setExcludeUnavailable(false);
                  handleSearch();
                }}
                className="px-5 py-2.5 rounded-full glow-btn-primary text-xs font-bold font-mono uppercase tracking-wider"
              >
                Expand Search Scope
              </button>
            </div>
          )}

          {/* Ranked Photographers List */}
          {!loading && recommendations.length > 0 && (
            <div className="space-y-5">
              {recommendations.map((prof, idx) => {
                const isExpanded = !!expandedCards[prof.id];
                const score = prof.overallScore || 0;
                const isTopMatch = idx === 0 && score >= 90;

                return (
                  <div
                    key={prof.id}
                    className={`group relative rounded-3xl glass-card border transition-all duration-300 overflow-hidden ${
                      isTopMatch
                        ? 'border-cyan-400/60 shadow-[0_0_30px_rgba(0,210,255,0.22)]'
                        : 'border-sky-500/20 hover:border-sky-400/40 shadow-xl'
                    }`}
                  >
                    {/* Top Match Ribbon */}
                    {isTopMatch && (
                      <div className="bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-midnight-950 px-4 py-1.5 text-[11px] font-display font-extrabold uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 fill-midnight-950" />
                          #1 Optimal Match — Highest Weighted Recommendation
                        </span>
                        <span className="font-mono">{score}% Match Score</span>
                      </div>
                    )}

                    <div className="p-5 sm:p-6 space-y-5">
                      {/* Top Row: Creator Avatar, Info, and Overall Score Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <Link to={`/professionals/${prof.id}`} className="shrink-0 relative group/avatar">
                            <img
                              src={prof.coverImage}
                              alt={prof.name}
                              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-sky-500/30 group-hover/avatar:border-cyan-400 transition-colors shadow-md"
                            />
                            {prof.isVerified && (
                              <div
                                className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#030712] border border-cyan-400 text-cyan-400"
                                title="Verified Creator"
                              >
                                <ShieldCheck className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </Link>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500 font-mono text-xs">#{idx + 1}</span>
                              <Link
                                to={`/professionals/${prof.id}`}
                                className="font-display font-bold text-lg sm:text-xl text-white hover:text-cyan-300 transition-colors truncate"
                              >
                                {prof.name}
                              </Link>
                            </div>

                            <p className="text-xs text-cyan-400/90 font-medium line-clamp-1">
                              {prof.profile?.tagline || 'Capturing moments, telling stories.'}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                                {prof.city}, India
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <strong className="text-white">
                                  {(prof.profile?.rating || 5.0).toFixed(1)}
                                </strong>
                                <span className="text-slate-500">
                                  ({prof.profile?.reviewCount || 0} reviews)
                                </span>
                              </span>
                              <span className="text-slate-500 font-mono text-[11px]">
                                {prof.profile?.experienceYears || 1} yrs exp
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Overall Score Dial */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                            <span className="text-2xl font-display font-black text-gradient-cyan">
                              {score}%
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 block text-right leading-tight">
                              Match
                              <br />
                              Score
                            </span>
                          </div>

                          {/* Availability Pill */}
                          <div>
                            {prof.availabilityStatus === 'VERIFIED_AVAILABLE' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Verified Available
                              </span>
                            )}
                            {prof.availabilityStatus === 'UNVERIFIED' && (
                              <span
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full"
                                title="No schedule on file in MongoDB. Verification needed."
                              >
                                <AlertTriangle className="w-3 h-3 text-amber-400" />
                                Availability Unverified
                              </span>
                            )}
                            {prof.availabilityStatus === 'UNAVAILABLE' && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-rose-300 bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                                <XCircle className="w-3 h-3 text-rose-400" />
                                Unavailable on Date
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Package Pricing & Details Row */}
                      <div className="p-3.5 rounded-2xl bg-[#060b19]/90 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                            <span className="font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                              Best Matching Package:
                            </span>
                            <span className="text-white font-medium">
                              {prof.bestMatchingPackage?.title || 'Standard Photography Shoot'}
                            </span>
                          </div>
                          {prof.bestMatchingPackage?.description && (
                            <p className="text-[11px] text-slate-400 line-clamp-1">
                              {prof.bestMatchingPackage.description}
                            </p>
                          )}
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-lg font-mono font-bold text-cyan-300">
                            ₹{prof.displayPrice?.toLocaleString('en-IN')}
                            <span className="text-xs text-slate-500 font-normal font-sans ml-1">
                              / {prof.priceUnit || 'shoot'}
                            </span>
                          </div>
                          {searchedCriteria?.maxBudget && (
                            <div className="text-[10px] font-mono text-slate-400">
                              {prof.displayPrice <= searchedCriteria.maxBudget ? (
                                <span className="text-emerald-400">
                                  ✓ Within ₹{searchedCriteria.maxBudget.toLocaleString('en-IN')} budget
                                </span>
                              ) : (
                                <span className="text-amber-400">
                                  +₹
                                  {(prof.displayPrice - searchedCriteria.maxBudget).toLocaleString(
                                    'en-IN'
                                  )}{' '}
                                  above budget
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Match Reasons Highlights */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          Why This Photographer Matches You:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {prof.matchReasons.map((reason, rIdx) => (
                            <li
                              key={rIdx}
                              className="flex items-start gap-2 text-slate-300 bg-white/[0.02] p-2 rounded-xl border border-white/5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Transparent Scoring Accordion Button */}
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleCardExpand(prof.id)}
                          className="w-full flex items-center justify-between py-2 text-xs text-slate-400 hover:text-cyan-300 border-t border-white/10 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
                            <Layers className="w-3.5 h-3.5 text-cyan-400" />
                            {isExpanded ? 'Hide Transparent Score Breakdown' : 'View Full Transparent Score Breakdown'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        {/* Expanded Breakdown */}
                        {isExpanded && (
                          <div className="pt-3 pb-2 space-y-3.5 text-xs border-t border-white/5 animate-fade-in">
                            <p className="text-[11px] text-slate-400">
                              Lenscraft content-based scoring computes normalized weights across 5 verified criteria:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {/* Style */}
                              <div className="p-3 rounded-xl bg-midnight-950/70 border border-white/10 space-y-1.5">
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-slate-300 font-medium">Style Match</span>
                                  <span className="text-cyan-400 font-mono font-bold">
                                    {prof.componentScores.style.score}% (wt:{' '}
                                    {prof.componentScores.style.weight})
                                  </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-cyan-400"
                                    style={{ width: `${prof.componentScores.style.score}%` }}
                                  />
                                </div>
                                <p className="text-[10px] text-slate-400">
                                  {prof.componentScores.style.explanation}
                                </p>
                              </div>

                              {/* Budget */}
                              <div className="p-3 rounded-xl bg-midnight-950/70 border border-white/10 space-y-1.5">
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-slate-300 font-medium">Budget Compatibility</span>
                                  <span className="text-cyan-400 font-mono font-bold">
                                    {prof.componentScores.budget.score}% (wt:{' '}
                                    {prof.componentScores.budget.weight})
                                  </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-cyan-400"
                                    style={{ width: `${prof.componentScores.budget.score}%` }}
                                  />
                                </div>
                                <p className="text-[10px] text-slate-400">
                                  {prof.componentScores.budget.explanation}
                                </p>
                              </div>

                              {/* Location */}
                              <div className="p-3 rounded-xl bg-midnight-950/70 border border-white/10 space-y-1.5">
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-slate-300 font-medium">Location Proximity</span>
                                  <span className="text-cyan-400 font-mono font-bold">
                                    {prof.componentScores.location.score}% (wt:{' '}
                                    {prof.componentScores.location.weight})
                                  </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-cyan-400"
                                    style={{ width: `${prof.componentScores.location.score}%` }}
                                  />
                                </div>
                                <p className="text-[10px] text-slate-400">
                                  {prof.componentScores.location.explanation}
                                </p>
                              </div>

                              {/* Service */}
                              <div className="p-3 rounded-xl bg-midnight-950/70 border border-white/10 space-y-1.5">
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-slate-300 font-medium">Service & Catalog Match</span>
                                  <span className="text-cyan-400 font-mono font-bold">
                                    {prof.componentScores.service.score}% (wt:{' '}
                                    {prof.componentScores.service.weight})
                                  </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-cyan-400"
                                    style={{ width: `${prof.componentScores.service.score}%` }}
                                  />
                                </div>
                                <p className="text-[10px] text-slate-400">
                                  {prof.componentScores.service.explanation}
                                </p>
                              </div>

                              {/* Availability */}
                              <div className="p-3 rounded-xl bg-midnight-950/70 border border-white/10 space-y-1.5 sm:col-span-2">
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-slate-300 font-medium">Schedule Verification</span>
                                  <span className="text-cyan-400 font-mono font-bold">
                                    {prof.componentScores.availability.score}% (wt:{' '}
                                    {prof.componentScores.availability.weight})
                                  </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${
                                      prof.availabilityStatus === 'VERIFIED_AVAILABLE'
                                        ? 'bg-emerald-400'
                                        : prof.availabilityStatus === 'UNVERIFIED'
                                        ? 'bg-amber-400'
                                        : 'bg-rose-400'
                                    }`}
                                    style={{ width: `${prof.componentScores.availability.score}%` }}
                                  />
                                </div>
                                <p className="text-[10px] text-slate-400">
                                  {prof.componentScores.availability.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action CTAs */}
                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                        <Link
                          to={`/professionals/${prof.id}`}
                          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-sky-500/10 text-slate-200 hover:text-cyan-300 border border-white/10 hover:border-sky-500/40 text-xs font-semibold transition-all flex items-center gap-1.5"
                        >
                          <span>View Full Profile</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleBookCreator(prof)}
                          className="px-5 py-2 rounded-xl glow-btn-primary text-xs uppercase tracking-wider font-bold text-center transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:scale-102 cursor-pointer flex items-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5 text-midnight-950" />
                          <span>Book This Creator</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Booking Modal */}
      {selectedProfessionalForBooking && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          professional={selectedProfessionalForBooking}
        />
      )}
    </div>
  );
};

export default RecommendationPage;
