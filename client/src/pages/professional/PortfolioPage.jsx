import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, Eye, Sparkles } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const PortfolioPage = () => {
  const { professionals, addPortfolioItem, deletePortfolioItem } = usePlatform();
  const { success, error } = useToast();
  const currentPro = professionals[0] || {};
  const items = currentPro.portfolio || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Weddings',
    url: '',
    mediaType: 'image',
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.title.trim() || !newItem.url.trim()) {
      error('Please provide both a title and media URL.');
      return;
    }

    addPortfolioItem(currentPro.id, newItem);
    setModalOpen(false);
    success('Portfolio item published to your public gallery!');
    setNewItem({ title: '', category: 'Weddings', url: '', mediaType: 'image' });
  };

  const handleDelete = (id) => {
    deletePortfolioItem(currentPro.id, id);
    success('Portfolio media removed from public studio.');
  };

  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-500/15">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Media Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Studio Portfolio <span className="text-gradient-cyan">Gallery</span> ({items.length} items)
          </h1>
        </div>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Upload New Work
        </Button>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden glass-card border border-sky-500/20 shadow-lg">
              <div className="aspect-square bg-midnight-950 overflow-hidden">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex items-center justify-between bg-midnight-900/90 border-t border-sky-500/15">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold block">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-display font-bold text-white">{item.title}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                  title="Delete media"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center glass-card rounded-2xl border border-sky-500/20">
          <p className="text-xs text-slate-400 mb-3">No portfolio media uploaded yet.</p>
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
            Upload First Item
          </Button>
        </div>
      )}

      {/* Upload Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Upload Portfolio Media">
        <form onSubmit={handleAddItem} className="space-y-4">
          <Input
            label="Work / Shoot Title"
            required
            placeholder="e.g. Udaipur Palace Sunset Bridal Session"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <Input
            label="Media Image URL"
            required
            placeholder="https://images.unsplash.com/..."
            value={newItem.url}
            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
          />
          <Select
            label="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            options={[
              { label: 'Weddings', value: 'Weddings' },
              { label: 'Pre-Wedding', value: 'Pre-Wedding' },
              { label: 'Portraits & Fashion', value: 'Portraits' },
              { label: 'Commercial & Product', value: 'Commercial' },
              { label: 'Events & Parties', value: 'Events' },
            ]}
          />
          <div className="pt-3 flex justify-end gap-2 border-t border-sky-500/15">
            <Button variant="ghost" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save & Publish
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PortfolioPage;
