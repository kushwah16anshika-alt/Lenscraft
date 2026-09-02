import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, Clock } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import { MOCK_PROFESSIONALS } from '../../constants/mockData';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';
import { useToast } from '../../hooks/useToast';

const ServicesManagePage = () => {
  const { success } = useToast();
  const [services, setServices] = useState(MOCK_PROFESSIONALS[0]?.services || []);
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
    setServices([
      ...services,
      {
        id: `srv-${Date.now()}`,
        ...newService,
        price: Number(newService.price),
        inclusions: ['4K Raw Deliverables', 'Color Graded Gallery', 'Full Commercial License'],
      },
    ]);
    setModalOpen(false);
    success('Service package created and published!');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
            Package Offerings
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            Services & Tiered Packages
          </h1>
        </div>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          Create Package
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <Card key={srv.id} className="p-6 bg-white border border-[#E5E0D8] space-y-4 shadow-2xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-serif font-bold text-[#171717]">{srv.title}</h3>
                <span className="text-xs text-[#B88A5A] font-semibold flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {srv.deliveryDays} days turnaround
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-[#171717]">{formatCurrency(srv.price)}</span>
                <span className="text-[10px] text-[#6B6258] block">{formatPriceUnit(srv.pricingType)}</span>
              </div>
            </div>

            <p className="text-xs text-[#6B6258] leading-relaxed">{srv.description}</p>

            {srv.inclusions && (
              <div className="space-y-1.5 pt-3 border-t border-[#E5E0D8]">
                {srv.inclusions.map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#171717]">
                    <Check className="w-3.5 h-3.5 text-[#3D7055]" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

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
          <div className="pt-2 flex justify-end gap-2 border-t border-[#E5E0D8]">
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
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
