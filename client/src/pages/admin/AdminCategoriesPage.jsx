import React from 'react';
import { Plus, Tag } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { CREATIVE_CATEGORIES } from '../../constants/categories';

const AdminCategoriesPage = () => {
  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
            Taxonomy & Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            Creative Categories
          </h1>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CREATIVE_CATEGORIES.map((cat, idx) => (
          <Card key={cat.id} className="p-4 bg-white border border-[#E5E0D8] space-y-3 shadow-2xs">
            <div className="h-32 rounded-sm overflow-hidden bg-[#EEEAE4]">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#B88A5A]">{cat.role}</span>
              <h3 className="text-sm font-serif font-bold text-[#171717]">{cat.name}</h3>
              <p className="text-[11px] text-[#6B6258] mt-1">{cat.count}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
