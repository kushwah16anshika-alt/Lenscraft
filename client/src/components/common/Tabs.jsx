import React from 'react';

const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-zinc-200 pb-px ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 -mb-px ${
              isActive
                ? 'text-zinc-900 border-zinc-900 font-bold'
                : 'text-zinc-500 border-transparent hover:text-zinc-900 hover:border-zinc-300'
            }`}
          >
            {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
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
