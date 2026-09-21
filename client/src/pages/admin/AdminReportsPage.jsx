import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import EmptyState from '../../components/common/EmptyState';

const AdminReportsPage = () => {
  return (
    <div className="space-y-6 text-left animate-reveal">
      <div className="pb-4 border-b border-sky-500/15">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Trust & Safety</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          Disputes & Resolution <span className="text-gradient-cyan">Queue</span>
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
