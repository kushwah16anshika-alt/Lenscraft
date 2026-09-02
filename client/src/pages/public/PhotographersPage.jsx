import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import ProfessionalCard from '../../components/cards/ProfessionalCard';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { ROLES } from '../../constants/roles';

const PhotographersPage = () => {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  const photographers = MOCK_PROFESSIONALS.filter((p) => p.role === ROLES.PHOTOGRAPHER);

  const filtered = photographers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      p.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesCity = cityFilter === 'all' || p.location.city.toLowerCase() === cityFilter.toLowerCase();
    const matchesSpecialty = specialtyFilter === 'all' || p.specialties.includes(specialtyFilter);

    return matchesSearch && matchesCity && matchesSpecialty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#E5E0D8]">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-xs bg-[#FAF7F3] border border-[#E8DBCA] text-[#B88A5A] text-[10px] font-bold uppercase tracking-wider mb-2">
          <Camera className="w-3 h-3" />
          <span>Professional Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">
          Curated Photographers
        </h1>
        <p className="text-xs text-[#6B6258] max-w-2xl mt-1">
          Explore verified wedding, editorial, fashion, portrait, and commercial photographers ready to shoot your next project.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-md bg-white border border-[#E5E0D8] grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-2xs">
        <Input
          placeholder="Search by name, style, or equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          options={[
            { label: 'All Locations / Cities', value: 'all' },
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Bengaluru', value: 'Bengaluru' },
            { label: 'Delhi NCR', value: 'New Delhi' },
            { label: 'Pune', value: 'Pune' },
            { label: 'Goa', value: 'Goa' },
          ]}
        />
        <Select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
          options={[
            { label: 'All Photography Specialties', value: 'all' },
            { label: 'Royal Weddings', value: 'Royal Weddings' },
            { label: 'Pre-Wedding', value: 'Pre-Wedding' },
            { label: 'Candid Moments', value: 'Candid Moments' },
            { label: 'Drone Photography', value: 'Drone Photography' },
            { label: 'Product Commercials', value: 'Product Commercials' },
          ]}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((pro) => (
          <ProfessionalCard key={pro.id} professional={pro} />
        ))}
      </div>
    </div>
  );
};

export default PhotographersPage;
