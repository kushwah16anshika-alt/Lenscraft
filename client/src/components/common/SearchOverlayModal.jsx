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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-[#080808]/90 backdrop-blur-xl animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#111111] border border-[#262626] rounded-lg shadow-2xl p-6 md:p-8 z-10 animate-reveal">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#A39E93] hover:text-[#FBF9F5] p-1.5 rounded-full hover:bg-[#171717] transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Discovery Engine
          </p>
          <h2 className="text-2xl md:text-3xl font-editorial text-[#FBF9F5]">
            WHAT ARE YOU LOOKING FOR?
          </h2>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#171717] border border-[#262626] p-2 rounded-md focus-within:border-[#C5A059] transition-all">
            <div className="md:col-span-7 flex items-center px-3 gap-3 border-b md:border-b-0 md:border-r border-[#262626] pb-2 md:pb-0">
              <Search className="w-5 h-5 text-[#C5A059] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search photographer, videographer, editor, wedding..."
                className="w-full bg-transparent text-sm md:text-base text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none"
              />
            </div>
            <div className="md:col-span-3 flex items-center px-3 gap-2">
              <MapPin className="w-4 h-4 text-[#A39E93] shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (e.g. Mumbai)"
                className="w-full bg-transparent text-sm text-[#FBF9F5] placeholder-[#6B665E] focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full h-full py-2.5 px-4 gold-btn text-xs uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Live Matching Results */}
        {liveResults.length > 0 && (
          <div className="mt-6 pt-6 border-t border-[#262626]">
            <p className="text-xs uppercase tracking-wider text-[#A39E93] mb-3">Matching Creators</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {liveResults.map((creator) => (
                <div
                  key={creator.id}
                  onClick={() => {
                    onClose();
                    navigate(`/professional/${creator.id}`);
                  }}
                  className="flex items-center gap-3 p-2.5 bg-[#171717] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#C5A059]/40 rounded cursor-pointer transition-all"
                >
                  <img
                    src={creator.avatar || creator.coverImage}
                    alt={creator.name}
                    className="w-11 h-11 rounded object-cover border border-[#262626]"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-[#FBF9F5] truncate">{creator.name}</h4>
                    <p className="text-xs text-[#C5A059] truncate">{creator.category} · {creator.location}</p>
                  </div>
                  <span className="text-xs text-[#A39E93] font-mono">₹{(creator.startingPrice || 15000).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Tags */}
        <div className="mt-6 pt-6 border-t border-[#262626]">
          <p className="text-xs uppercase tracking-wider text-[#A39E93] mb-3">Popular Searches</p>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1.5 text-xs text-[#EAE6DF] bg-[#171717] hover:bg-[#222222] border border-[#262626] hover:border-[#C5A059] rounded transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Quick Links */}
        <div className="mt-6 pt-6 border-t border-[#262626]">
          <p className="text-xs uppercase tracking-wider text-[#A39E93] mb-3">Browse Disciplines</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categorySuggestions.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.path)}
                  className="p-3 bg-[#171717] hover:bg-[#1C1C1C] border border-[#262626] hover:border-[#C5A059] rounded text-left group transition-all"
                >
                  <IconComponent className="w-4 h-4 text-[#C5A059] mb-1.5 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-semibold text-[#FBF9F5] group-hover:text-[#C5A059] transition-colors">{cat.name}</p>
                  <p className="text-[10px] text-[#A39E93] truncate mt-0.5">{cat.desc}</p>
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
