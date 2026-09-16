import React from 'react';
import Card from './Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendPositive = true,
  subtitle,
  className = '',
}) => {
  return (
    <Card className={`p-5 bg-white border border-zinc-200 shadow-subtle ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{title}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800">
            <Icon className="w-4 h-4 stroke-[1.75]" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <h4 className="text-2xl font-serif font-bold text-zinc-900 tracking-tight">{value}</h4>
        {trend && (
          <div
            className={`flex items-center gap-0.5 text-xs font-semibold ${
              trendPositive ? 'text-emerald-700' : 'text-red-700'
            }`}
          >
            {trendPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
    </Card>
  );
};

export default StatCard;
