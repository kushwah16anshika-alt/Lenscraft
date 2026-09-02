import React from 'react';
import { Link } from 'react-router-dom';
import { CREATIVE_CATEGORIES } from '../../constants/categories';
import { Compass, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';

const ServicesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-10">
      <div className="pb-6 border-b border-[#E5E0D8]">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-xs bg-[#FAF7F3] border border-[#E8DBCA] text-[#B88A5A] text-[10px] font-bold uppercase tracking-wider mb-2">
          <Compass className="w-3 h-3" />
          <span>Services Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">
          Creative Disciplines & Packages
        </h1>
        <p className="text-xs text-[#6B6258] max-w-2xl mt-1">
          Explore all specialty categories available for instant booking across top photography, videography, and post-production disciplines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CREATIVE_CATEGORIES.map((cat, idx) => (
          <div
            key={cat.id}
            className="p-6 rounded-md bg-white border border-[#E5E0D8] shadow-2xs hover:border-[#171717] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 rounded-sm overflow-hidden mb-4 bg-[#EEEAE4]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-xs bg-white/90 text-[#171717] font-serif font-bold text-[11px] shadow-2xs">
                  0{idx + 1}
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#B88A5A] uppercase tracking-wider block mb-1">
                {cat.count} Available
              </span>
              <h3 className="text-base font-serif font-bold text-[#171717] mb-2">{cat.name}</h3>
              <p className="text-xs text-[#6B6258] leading-relaxed mb-6">
                {cat.description}
              </p>
            </div>

            <Link
              to={`/${cat.role === 'editor' ? 'editors' : cat.role === 'videographer' ? 'videographers' : 'photographers'}?category=${cat.slug}`}
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between group-hover:bg-[#171717] group-hover:text-white group-hover:border-[#171717]"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                <span>Browse {cat.name}</span>
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
