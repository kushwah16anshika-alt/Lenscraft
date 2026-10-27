import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Package,
  IndianRupee,
  MapPin,
  Camera,
  Video,
  Film,
  CheckCircle2,
  Clock,
  RotateCcw,
  SlidersHorizontal,
  Star,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Calendar,
  Check,
  ChevronRight,
  Cpu,
} from 'lucide-react';
import recommendationService from '../../services/recommendationService';
import Avatar from '../../components/common/Avatar';
import BookingModal from '../../components/common/BookingModal';
import { formatCurrency } from '../../utils/formatters';

const POPULAR_BUDGETS = [10000, 15000, 20000, 25000, 35000, 50000];

const EVENT_TYPES = [
  'Wedding Photography',
  'Pre-Wedding Shoot',
  'Cinematic Videography',
  'Commercial & Brand Shoots',
  'Fashion & Portrait',
  'Reels & Short-Form Video',
  'Birthday & Family',
  'Corporate Events',
];

const CITIES = ['Bhopal', 'Mumbai', 'Bengaluru', 'Delhi', 'Indore'];

const STYLES = ['Candid', 'Traditional', 'Cinematic', 'Editorial', 'Modern', 'Drone'];

const SERVICE_ROLES = [
  { label: 'All Services', value: 'all', icon: Package },
  { label: 'Photographers', value: 'photographer', icon: Camera },
  { label: 'Videographers', value: 'videographer', icon: Video },
  { label: 'Video Editors', value: 'editor', icon: Film },
];

const SmartPackagesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Preferences State initialized from URL query params or realistic defaults
  const [eventType, setEventType] = useState(searchParams.get('event') || 'Wedding Photography');
  const [budget, setBudget] = useState(Number(searchParams.get('budget')) || 20000);
  const [location, setLocation] = useState(searchParams.get('location') || 'Bhopal');
  const [photographyStyle, setPhotographyStyle] = useState(searchParams.get('style') || 'Candid');
  const [requiredService, setRequiredService] = useState(searchParams.get('service') || 'all');
  const [strictBudget, setStrictBudget] = useState(searchParams.get('strict') === 'true');

  // Recommendation Results & UI State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [metadata, setMetadata] = useState(null);

  // Booking Modal State
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Fetch ML Recommendations
  const fetchSmartPackages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await recommendationService.getSmartPackages({
        eventType,
        budget: Number(budget),
        location,
        photographyStyle,
        requiredService,
        strictBudget,
      });

      if (response && response.data) {
        setRecommendations(response.data.recommendations || []);
        setMetadata({
          modelName: response.data.modelName,
          totalCandidates: response.data.totalCandidates,
          matchedCount: response.data.matchedCount,
          provider: response.data.provider,
          avgConfidence: response.data.mlConfidenceAverage,
        });
      } else {
        setRecommendations([]);
      }
    } catch (err) {
      console.error('Failed to load smart package recommendations:', err);
      setError(err.response?.data?.message || err.message || 'Unable to retrieve ML recommendations');
    } finally {
      setLoading(false);
    }
  };

  // Sync with URL params & execute on mount or change
  useEffect(() => {
    fetchSmartPackages();
  }, [eventType, budget, location, photographyStyle, requiredService, strictBudget]);

  const handleBookingClick = (pkg) => {
    setSelectedPackageForBooking(pkg);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen text-slate-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 1. Header Banner with Amber / Orange Gradient */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-900/20 border border-amber-500/25 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>Technology 4: Scikit-Learn ML Recommendation Engine</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Smart Package <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Suggestions</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Trained on real Lenscraft package attributes, deliverables, and service constraints. Our machine learning pipeline predicts the most compatible creative packages tailored to your exact budget and creative vision.
              </p>
            </div>

            {/* Switch to Photographer Matchmaker */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <Link
                to="/recommendations"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 transition-all hover:scale-105"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Photographer Matchmaker</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>
          </div>

          {/* Model Status Telemetry Bar */}
          {metadata && (
            <div className="relative z-10 mt-6 pt-5 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-medium text-slate-200">ML Model:</span>
                <span className="text-amber-300 font-mono">{metadata.modelName}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span>Evaluated: <strong className="text-slate-200">{metadata.totalCandidates} Packages</strong></span>
                <span>Matches: <strong className="text-emerald-300">{metadata.matchedCount} Eligible</strong></span>
                <span className="hidden sm:inline">Provider: <strong className="text-slate-200 uppercase">{metadata.provider}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* 2. Interactive Preference Controls Card */}
        <div className="bg-[#0b1329]/80 border border-slate-800 rounded-2xl p-5 sm:p-7 backdrop-blur-md shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-amber-400" />
              <span>Customize Your Creative Criteria</span>
            </h2>
            <button
              onClick={fetchSmartPackages}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Re-rank Packages</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Event Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-[#111c38] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Event City</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#111c38] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Photography Style */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Style Aesthetic</label>
              <select
                value={photographyStyle}
                onChange={(e) => setPhotographyStyle(e.target.value)}
                className="w-full bg-[#111c38] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              >
                {STYLES.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            {/* Creative Role */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">Service Category</label>
              <select
                value={requiredService}
                onChange={(e) => setRequiredService(e.target.value)}
                className="w-full bg-[#111c38] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              >
                {SERVICE_ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Range & Quick Budget Pills */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                <span>Target Budget: </span>
                <span className="text-amber-300 font-bold text-sm">₹{budget.toLocaleString('en-IN')}</span>
              </label>

              {/* Strict Budget Toggle */}
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={strictBudget}
                  onChange={(e) => setStrictBudget(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-900 w-4 h-4 cursor-pointer"
                />
                <span>Strict budget limit (hide packages above ₹{budget.toLocaleString('en-IN')})</span>
              </label>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            {/* Budget Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400">Quick Presets:</span>
              {POPULAR_BUDGETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setBudget(preset)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    budget === preset
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  ₹{(preset / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Results Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>ML-Ranked Packages</span>
              {!loading && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25">
                  {recommendations.length} found
                </span>
              )}
            </h2>
            <div className="text-xs text-slate-400 hidden sm:block">
              Ordered by Machine Learning predicted compatibility
            </div>
          </div>

          {/* Loading Skeletons */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-[#0b1329]/60 border border-slate-800/80 rounded-2xl overflow-hidden p-5 space-y-4 animate-pulse"
                >
                  <div className="h-44 bg-slate-800/60 rounded-xl" />
                  <div className="h-5 bg-slate-800/80 rounded w-3/4" />
                  <div className="h-4 bg-slate-800/50 rounded w-1/2" />
                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-slate-800/40 rounded w-full" />
                    <div className="h-3 bg-slate-800/40 rounded w-4/5" />
                  </div>
                  <div className="h-10 bg-slate-800/60 rounded-xl pt-2" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="p-8 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center space-y-4">
              <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Recommendation Engine Error</h3>
                <p className="text-sm text-slate-300">{error}</p>
              </div>
              <button
                onClick={fetchSmartPackages}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && recommendations.length === 0 && (
            <div className="p-12 rounded-2xl bg-[#0b1329]/60 border border-slate-800 text-center space-y-4">
              <Package className="w-12 h-12 text-slate-500 mx-auto" />
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-lg font-bold text-white">No Matching Packages Found</h3>
                <p className="text-sm text-slate-400">
                  {strictBudget
                    ? `No packages match under ₹${budget.toLocaleString('en-IN')} with strict filtering enabled. Try unchecking "Strict budget limit" or selecting a higher budget.`
                    : 'Try selecting a different event type or broadening your location preference.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setBudget(30000);
                  setStrictBudget(false);
                  setRequiredService('all');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all font-bold cursor-pointer"
              >
                Reset to Recommended Range
              </button>
            </div>
          )}

          {/* Real Recommended Package Cards */}
          {!loading && !error && recommendations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec) => {
                const pkg = rec.package;
                const isTop1 = rec.matchRank === 1;

                return (
                  <div
                    key={pkg.id || pkg.title}
                    className={`group relative flex flex-col justify-between bg-[#0b1329]/90 border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                      isTop1
                        ? 'border-amber-400/50 shadow-[0_10px_35px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/30'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Top Media & Badges */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={pkg.coverImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-black/40" />

                      {/* Rank & Match Score Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                            isTop1
                              ? 'bg-amber-500 text-slate-950 shadow-md'
                              : 'bg-black/60 text-slate-200 border border-white/10'
                          }`}
                        >
                          #{rec.matchRank} Match
                        </span>

                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-slate-950 shadow-md flex items-center gap-1 backdrop-blur-md">
                          <Sparkles className="w-3 h-3" />
                          <span>{rec.matchPercentage}% Compatible</span>
                        </span>
                      </div>

                      {/* Budget Badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md ${
                            rec.isWithinBudget
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {rec.isWithinBudget ? 'Within Budget' : 'Stretch Tier'}
                        </span>
                      </div>

                      {/* Package Category on image bottom */}
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                        <span className="px-2 py-0.5 rounded bg-black/60 text-slate-300 backdrop-blur-sm border border-white/10">
                          {pkg.category}
                        </span>
                        <span className="flex items-center gap-1 text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          <span>{pkg.deliveryDays}d delivery</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Title & Price */}
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                            {pkg.title}
                          </h3>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-xl sm:text-2xl font-display font-extrabold text-amber-400">
                              ₹{pkg.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-400 lowercase">
                              / {pkg.pricingType.replace('_', ' ')}
                            </span>
                          </div>
                        </div>

                        {/* Creator Information */}
                        <div className="flex items-center gap-3 pt-2 pb-2 border-y border-slate-800/80">
                          <Avatar
                            src={pkg.proAvatar}
                            name={pkg.proName}
                            size="sm"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-slate-200 truncate">{pkg.proName}</span>
                              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400">
                              <span className="flex items-center gap-0.5 text-amber-400 font-medium">
                                <Star className="w-3 h-3 fill-amber-400" />
                                {pkg.proRating.toFixed(1)}
                              </span>
                              <span>({pkg.proReviewCount || 0} reviews)</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                {pkg.proCity || 'Verified'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description snippet */}
                        {pkg.description && (
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {pkg.description}
                          </p>
                        )}

                        {/* Inclusions List */}
                        {pkg.inclusions && pkg.inclusions.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                              Verified Inclusions:
                            </span>
                            <div className="space-y-1">
                              {pkg.inclusions.slice(0, 3).map((inc, i) => (
                                <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span className="truncate">{inc}</span>
                                </div>
                              ))}
                              {pkg.inclusions.length > 3 && (
                                <span className="text-[11px] text-slate-400 pl-5 block">
                                  +{pkg.inclusions.length - 3} more inclusions
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Verified Recommendation Reasons */}
                        {rec.reasons && rec.reasons.length > 0 && (
                          <div className="rounded-xl bg-amber-500/5 border border-amber-500/15 p-3 space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              Why ML Picked This Package:
                            </span>
                            <ul className="space-y-1 text-xs text-slate-300">
                              {rec.reasons.slice(0, 2).map((reason, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                                  <span className="text-amber-400 mt-0.5">•</span>
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Card Action CTAs */}
                      <div className="pt-4 mt-auto border-t border-slate-800/80 flex items-center gap-2">
                        <button
                          onClick={() => handleBookingClick(pkg)}
                          className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-102 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Package</span>
                        </button>

                        {pkg.proId && (
                          <Link
                            to={`/professionals/${pkg.proId}`}
                            className="p-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                            title="View Creator Profile"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal Integration */}
      {selectedPackageForBooking && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => {
            setBookingModalOpen(false);
            setSelectedPackageForBooking(null);
          }}
          professional={{
            _id: selectedPackageForBooking.proId,
            user: {
              _id: selectedPackageForBooking.proId,
              name: selectedPackageForBooking.proName,
              avatar: { url: selectedPackageForBooking.proAvatar },
              location: { city: selectedPackageForBooking.proCity },
            },
            name: selectedPackageForBooking.proName,
            startingPrice: selectedPackageForBooking.price,
          }}
          initialService={{
            _id: selectedPackageForBooking.id,
            title: selectedPackageForBooking.title,
            price: selectedPackageForBooking.price,
            pricingType: selectedPackageForBooking.pricingType,
          }}
        />
      )}
    </div>
  );
};

export default SmartPackagesPage;
