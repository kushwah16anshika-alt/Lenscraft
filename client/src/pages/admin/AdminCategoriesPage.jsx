import React, { useState } from 'react';
import { Plus, Tag, Trash2, Sparkles } from 'lucide-react';
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
    <div className="space-y-6 text-left animate-reveal">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-500/15">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Taxonomy & Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Creative <span className="text-gradient-cyan">Categories</span> ({categories.length})
          </h1>
        </div>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Card key={cat.id} className="p-4 glass-card border border-sky-500/20 space-y-3 shadow-xl">
            <div className="h-36 rounded-xl overflow-hidden bg-midnight-950">
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold block">{cat.role}</span>
                <h3 className="text-sm font-display font-bold text-white mt-0.5">{cat.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{cat.count || 'Active Catalog'}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
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
          <div className="pt-3 flex justify-end gap-2 border-t border-sky-500/15">
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
