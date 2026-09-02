import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';

const AdminReportsPage = () => {
  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b border-[#E5E0D8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B88A5A] block mb-1">
          Trust & Safety
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          Disputes & Resolution Queue
        </h1>
      </div>

      <EmptyState
        icon={ShieldCheck}
        title="Zero Active Disputes"
        description="All creator deliveries, advance milestones, and shoot dates are currently in good standing."
      />
    </div>
  );
};

export default AdminReportsPage;
