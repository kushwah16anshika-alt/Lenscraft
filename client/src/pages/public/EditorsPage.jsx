import React, { useState } from 'react';
import { Film, Search, RotateCcw } from 'lucide-react';
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
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-sm">
            <Film className="w-3.5 h-3.5 text-violet-400" />
            <span>Post-Production & Color Science</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
            Lead Video Editors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">Master Colorists</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            High-retention viral reels editors, DaVinci Resolve colorists, sound designers, and YouTube video specialists with 48h turnarounds.
          </p>
        </div>
      </section>

      {/* Discovery & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-6 rounded-2xl glass-panel space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search software (DaVinci, Premiere, After Effects), formats (Reels, Podcasts)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner"
              />
            </div>

            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/30 transition-all shadow-inner cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-slate-200">All Post-Production Specialties</option>
              <option value="Viral Reels & Shorts" className="bg-slate-900 text-slate-200">Viral Reels & TikTok Shorts</option>
              <option value="DaVinci Color Grading" className="bg-slate-900 text-slate-200">DaVinci Resolve Film Color Grading</option>
              <option value="Motion Graphic Titles" className="bg-slate-900 text-slate-200">Kinetic Motion Graphics & VFX</option>
              <option value="Sound Design & SFX" className="bg-slate-900 text-slate-200">Sound Design & Audio Mastering</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span>
              Showing <strong className="text-cyan-400 font-mono font-bold">{filtered.length}</strong> verified post-production specialist{filtered.length === 1 ? '' : 's'}
            </span>
            {(search || specialtyFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setSpecialtyFilter('all');
                }}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center glass-panel rounded-2xl space-y-4">
            <Film className="w-12 h-12 text-slate-500 mx-auto opacity-50 animate-pulse" />
            <h3 className="text-lg font-serif font-bold text-white">No video editors found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
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
