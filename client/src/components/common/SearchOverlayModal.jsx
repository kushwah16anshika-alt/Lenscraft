import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Sparkles, ArrowRight, Camera, Film, Wand2, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlatform } from '../../context/PlatformContext';

const popularTags = [
  'Wedding Photographer',
  'Pre-Wedding',
  'Fashion Shoot',
  'Product Campaign',
  'Editorial Portrait',
  'Commercial Video',
  'Music Video Editor',
  'Drone Cinematography'
];

const categorySuggestions = [
  { name: 'Photography', icon: Camera, path: '/photographers', desc: 'Portraits, Weddings, Commercial & Fashion' },
  { name: 'Videography', icon: Film, path: '/videographers', desc: 'Films, Ads, Reels & Documentaries' },
  { name: 'Photo Editing', icon: Wand2, path: '/editors?type=photo', desc: 'Color Grading, Retouching & Compositing' },
  { name: 'Video Editing', icon: Video, path: '/editors?type=video', desc: 'Pacing, SFX, Motion Graphics & Grading' },
];

const SearchOverlayModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { professionals, searchFilters, setSearchFilters } = usePlatform();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setSearchFilters(prev => ({
      ...prev,
      search: query,
      city: location
    }));
    onClose();
    navigate('/explore');
  };

  const handleTagClick = (tag) => {
    setSearchFilters(prev => ({
      ...prev,
      search: tag
    }));
    onClose();
    navigate('/explore');
  };

  const handleCategoryClick = (path) => {
    onClose();
    navigate(path);
  };

  // Quick live matches
  const liveResults = query.trim()
    ? professionals.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.specialties?.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
        p.location.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-[#02040a]/85 backdrop-blur-2xl animate-fade-in text-left">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#080e22]/95 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/60 p-6 md:p-8 z-10 animate-slide-up backdrop-blur-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Discovery Engine
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
            WHAT ARE YOU LOOKING FOR?
          </h2>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 glass-card border border-sky-500/25 p-2 rounded-2xl focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all">
            <div className="md:col-span-7 flex items-center px-3 gap-3 border-b md:border-b-0 md:border-r border-sky-500/20 pb-2 md:pb-0">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search photographer, videographer, editor, wedding..."
                className="w-full bg-transparent text-sm md:text-base text-slate-100 placeholder-slate-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-3 flex items-center px-3 gap-2">
              <MapPin className="w-4 h-4 text-cyan-400/70 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (e.g. Mumbai)"
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full h-full py-2.5 px-4 glow-btn-primary text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-1"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Live Matching Results */}
        {liveResults.length > 0 && (
          <div className="mt-6 pt-6 border-t border-sky-500/20">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-medium">Matching Creators</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {liveResults.map((creator) => (
                <div
                  key={creator.id}
                  onClick={() => {
                    onClose();
                    navigate(`/professional/${creator.id}`);
                  }}
                  className="flex items-center gap-3 p-2.5 glass-card hover:bg-sky-500/10 border border-sky-500/20 hover:border-cyan-400/50 rounded-2xl cursor-pointer transition-all"
                >
                  <img
                    src={creator.avatar || creator.coverImage}
                    alt={creator.name}
                    className="w-11 h-11 rounded-xl object-cover border border-sky-500/30"
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <h4 className="text-sm font-semibold text-slate-100 truncate">{creator.name}</h4>
                    <p className="text-xs text-cyan-400 truncate">{creator.category} · {creator.location}</p>
                  </div>
                  <span className="text-xs text-slate-300 font-mono">₹{(creator.startingPrice || 15000).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Tags */}
        <div className="mt-6 pt-6 border-t border-sky-500/20">
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-medium">Popular Searches</p>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1.5 text-xs text-slate-300 bg-white/5 hover:bg-sky-500/15 border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 rounded-xl transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Quick Links */}
        <div className="mt-6 pt-6 border-t border-sky-500/20">
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-medium">Browse Disciplines</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categorySuggestions.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.path)}
                  className="p-3.5 glass-card hover:bg-sky-500/10 border border-sky-500/20 hover:border-cyan-400/50 rounded-2xl text-left group transition-all"
                >
                  <IconComponent className="w-4 h-4 text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">{cat.name}</p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{cat.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlayModal;
