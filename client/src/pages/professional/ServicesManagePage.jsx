import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, Clock } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import { usePlatform } from '../../hooks/usePlatform';
import { useToast } from '../../hooks/useToast';

const ServicesManagePage = () => {
  const { professionals, addService, deleteService } = usePlatform();
  const { success, error } = useToast();
  const currentPro = professionals[0] || {};
  const services = currentPro.services || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    price: '',
    pricingType: 'per_day',
    deliveryDays: 7,
    description: '',
  });

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newService.title.trim() || !newService.price) {
      error('Please enter a package title and price.');
      return;
    }

    addService(currentPro.id, {
      ...newService,
      price: Number(newService.price),
      deliveryDays: Number(newService.deliveryDays) || 7,
      inclusions: [
        'High-Resolution Retouched Deliverables',
        'Direct Cloud Gallery Access',
        'Commercial & Personal License',
      ],
    });

    setModalOpen(false);
    success('Service package created and published to your studio!');
    setNewService({ title: '', price: '', pricingType: 'per_day', deliveryDays: 7, description: '' });
  };

  const handleDelete = (serviceId) => {
    deleteService(currentPro.id, serviceId);
    success('Package removed from your studio offerings.');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block mb-1">
            Package Offerings
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight">
            Services & Tiered Packages ({services.length})
          </h1>
        </div>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Create Package
        </Button>
      </div>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <Card key={srv.id} className="p-6 bg-white border border-zinc-200 space-y-4 shadow-2xs">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-zinc-900">{srv.title}</h3>
                  <span className="text-xs text-zinc-500 font-medium flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" /> {srv.deliveryDays} days turnaround
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-base font-bold text-zinc-900">{formatCurrency(srv.price)}</span>
                    <span className="text-[11px] text-zinc-400 block">{formatPriceUnit(srv.pricingType)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(srv.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-zinc-400 hover:text-red-600 transition-colors ml-2"
                    title="Delete package"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">{srv.description}</p>

              {srv.inclusions && (
                <div className="space-y-1.5 pt-3 border-t border-zinc-100">
                  {srv.inclusions.map((inc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-xl border border-zinc-200">
          <p className="text-xs text-zinc-500 mb-3">No packages created yet.</p>
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
            Create First Package
          </Button>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New Service Package">
        <form onSubmit={handleAddService} className="space-y-4">
          <Input
            label="Package Title"
            required
            placeholder="e.g. Full Day Destination Wedding Package"
            value={newService.title}
            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Price (INR)"
              type="number"
              required
              placeholder="45000"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
            />
            <Input
              label="Turnaround (Days)"
              type="number"
              required
              placeholder="7"
              value={newService.deliveryDays}
              onChange={(e) => setNewService({ ...newService, deliveryDays: e.target.value })}
            />
          </div>
          <Textarea
            label="Description & Scope"
            rows={3}
            required
            placeholder="Describe equipment used, number of edited shots delivered..."
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          />
          <div className="pt-2 flex justify-end gap-2 border-t border-zinc-200">
            <Button variant="ghost" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Package
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServicesManagePage;
