import React, { useState } from 'react';
import { Film, Search, Sparkles, Filter, Award, Zap } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import Button from '../../components/common/Button';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { ROLES } from '../../constants/roles';

const EditorsPage = () => {
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  const editors = MOCK_PROFESSIONALS.filter((p) => p.role === ROLES.EDITOR);

  const filtered = editors.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      p.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesSpecialty = specialtyFilter === 'all' || p.specialties.includes(specialtyFilter);

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-12 pb-24 text-left">
      {/* Header Banner */}
      <section className="bg-[#121212] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#242424]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C4683C] text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10">
            <Film className="w-3.5 h-3.5" />
            <span>Post-Production & Color Science</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Lead Video Editors & Master Colorists
          </h1>
          <p className="text-xs sm:text-sm text-[#8C8276] max-w-2xl leading-relaxed">
            High-retention viral reels editors, DaVinci Resolve colorists, sound designers, and YouTube video specialists with 48h turnarounds.
          </p>
        </div>
      </section>

      {/* Discovery & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-5 rounded-xl bg-white border border-[#E8E2D8] shadow-2xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C8276] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search software (DaVinci, Premiere, After Effects), formats (Reels, Podcasts)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] transition-all"
              />
            </div>

            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-xs focus:outline-none focus:border-[#121212] transition-all"
            >
              <option value="all">All Post-Production Specialties</option>
              <option value="Viral Reels & Shorts">Viral Reels & TikTok Shorts</option>
              <option value="DaVinci Color Grading">DaVinci Resolve Film Color Grading</option>
              <option value="Motion Graphic Titles">Kinetic Motion Graphics & VFX</option>
              <option value="Sound Design & SFX">Sound Design & Audio Mastering</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D8] text-xs text-[#6B6258]">
            <span className="font-semibold text-[#121212]">
              Showing {filtered.length} verified post-production specialist{filtered.length === 1 ? '' : 's'}
            </span>
            {(search || specialtyFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setSpecialtyFilter('all');
                }}
                className="text-xs font-bold text-[#C4683C] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-xl border border-[#E8E2D8] space-y-4">
            <Film className="w-10 h-10 text-[#8C8276] mx-auto opacity-50" />
            <h3 className="text-lg font-serif font-bold text-[#121212]">No video editors found</h3>
            <p className="text-xs text-[#6B6258] max-w-sm mx-auto">
              Try adjusting your search criteria to find available post-production editors.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearch(''); setSpecialtyFilter('all'); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((pro) => (
              <ProfessionalCard key={pro.id} professional={pro} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EditorsPage;
