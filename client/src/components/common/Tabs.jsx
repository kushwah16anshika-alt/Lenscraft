import React from 'react';

const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-800/80 pb-px ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 -mb-px rounded-t-lg ${
              isActive
                ? 'text-cyan-400 border-cyan-400 font-bold bg-cyan-500/10 shadow-[0_4px_12px_rgba(6,182,212,0.15)]'
                : 'text-slate-400 border-transparent hover:text-white hover:border-slate-700 hover:bg-white/5'
            }`}
          >
            {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
