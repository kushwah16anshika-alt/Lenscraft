import React, { useState } from 'react';
import { Film } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import Input from '../../components/common/Input';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { ROLES } from '../../constants/roles';

const EditorsPage = () => {
  const [search, setSearch] = useState('');

  const editors = MOCK_PROFESSIONALS.filter((p) => p.role === ROLES.EDITOR);

  const filtered = editors.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-8">
      <div className="pb-6 border-b border-[#E5E0D8]">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-xs bg-[#FAF7F3] border border-[#E8DBCA] text-[#B88A5A] text-[10px] font-bold uppercase tracking-wider mb-2">
          <Film className="w-3 h-3" />
          <span>Post-Production Specialists</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">
          Curated Video Editors & Colorists
        </h1>
        <p className="text-xs text-[#6B6258] max-w-2xl mt-1">
          Hook-focused viral reel editors, DaVinci Resolve colorists, sound designers, and YouTube video specialists with lightning-fast turnaround.
        </p>
      </div>

      <div className="p-4 rounded-md bg-white border border-[#E5E0D8] shadow-2xs">
        <Input
          placeholder="Search editing software (DaVinci, Premiere, After Effects), formats (Reels, Podcasts)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((pro) => (
          <ProfessionalCard key={pro.id} professional={pro} />
        ))}
      </div>
    </div>
  );
};

export default EditorsPage;
