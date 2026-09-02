import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, SlidersHorizontal } from 'lucide-react';
import Button from './Button';

const SearchBar = ({
  onSearch,
  placeholder = 'Search by category, style, wedding, drone...',
  initialQuery = '',
  initialCity = '',
  showCityFilter = true,
  className = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ query, city });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-4xl p-2 rounded-lg bg-white border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-center gap-2 ${className}`}
    >
      {/* Search keyword input */}
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8276]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-[#171717] placeholder-[#8C8276] focus:outline-none"
        />
      </div>

      {showCityFilter && (
        <div className="hidden md:block w-px h-7 bg-[#E5E0D8]" />
      )}

      {/* City location input */}
      {showCityFilter && (
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8276]">
            <MapPin className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City or location (e.g. Mumbai, Goa)"
            className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-[#171717] placeholder-[#8C8276] focus:outline-none"
          />
        </div>
      )}

      {/* Search Button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full md:w-auto px-6 py-2.5 shrink-0 group"
        rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
      >
        Discover Talent
      </Button>
    </form>
  );
};

export default SearchBar;
