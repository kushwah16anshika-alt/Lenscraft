import React, { useState } from 'react';
import { Plus, Tag, Trash2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const AdminCategoriesPage = () => {
  const { categories, addCategory, deleteCategory } = usePlatform();
  const { success, error } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({
    name: '',
    role: 'photographer',
    image: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) {
      error('Please enter a category title.');
      return;
    }

    addCategory(newCat);
    setModalOpen(false);
    success(`Creative category "${newCat.name}" added to catalog.`);
    setNewCat({ name: '', role: 'photographer', image: '' });
  };

  const handleDelete = (id, name) => {
    deleteCategory(id);
    success(`Category "${name}" removed.`);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
            Taxonomy & Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            Creative Categories ({categories.length})
          </h1>
        </div>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Card key={cat.id} className="p-4 bg-white border border-[#E5E0D8] space-y-3 shadow-2xs">
            <div className="h-36 rounded-sm overflow-hidden bg-[#EEEAE4]">
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B88A5A]">{cat.role}</span>
                <h3 className="text-sm font-serif font-bold text-[#171717]">{cat.name}</h3>
                <p className="text-[11px] text-[#6B6258] mt-0.5">{cat.count || 'Active Catalog'}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-1.5 rounded hover:bg-[#FDF2F1] text-[#6B6258] hover:text-[#99453F] transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Category Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Taxonomy Category">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Category Name"
            placeholder="e.g. Architectural & Real Estate Photography"
            value={newCat.name}
            onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
            required
          />
          <Select
            label="Creative Discipline"
            value={newCat.role}
            onChange={(e) => setNewCat({ ...newCat, role: e.target.value })}
            options={[
              { label: 'Photographer', value: 'photographer' },
              { label: 'Videographer', value: 'videographer' },
              { label: 'Video Editor', value: 'editor' },
            ]}
          />
          <Input
            label="Cover Image URL (Unsplash or CDN)"
            placeholder="https://images.unsplash.com/..."
            value={newCat.image}
            onChange={(e) => setNewCat({ ...newCat, image: e.target.value })}
          />
          <div className="pt-2 flex justify-end gap-2 border-t border-[#E5E0D8]">
            <Button variant="ghost" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCategoriesPage;
