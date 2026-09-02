import React, { useState } from 'react';
import { Video } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { ROLES } from '../../constants/roles';

const VideographersPage = () => {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');

  const videographers = MOCK_PROFESSIONALS.filter((p) => p.role === ROLES.VIDEOGRAPHER);

  const filtered = videographers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase());
    const matchesCity = cityFilter === 'all' || p.location.city.toLowerCase() === cityFilter.toLowerCase();
    return matchesSearch && matchesCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-8">
      <div className="pb-6 border-b border-[#E5E0D8]">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-xs bg-[#FAF7F3] border border-[#E8DBCA] text-[#B88A5A] text-[10px] font-bold uppercase tracking-wider mb-2">
          <Video className="w-3 h-3" />
          <span>Cinematographers & DPs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">
          Curated Cinematographers
        </h1>
        <p className="text-xs text-[#6B6258] max-w-2xl mt-1">
          From 4K cinematic wedding trailers to multi-camera corporate streams, commercial brand ads, and music video productions.
        </p>
      </div>

      <div className="p-4 rounded-md bg-white border border-[#E5E0D8] grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-2xs">
        <Input
          placeholder="Search cinematic styles, cinema gear (RED, FX6, Drone)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          options={[
            { label: 'All Cities', value: 'all' },
            { label: 'Bengaluru', value: 'Bengaluru' },
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Delhi NCR', value: 'New Delhi' },
            { label: 'Goa', value: 'Goa' },
          ]}
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

export default VideographersPage;
