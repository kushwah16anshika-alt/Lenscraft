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
    <Card className={`p-5 glass-card border border-sky-500/20 shadow-xl ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-400">{title}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(0,210,255,0.2)]">
            <Icon className="w-4 h-4 stroke-[1.75]" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <h4 className="text-2xl font-mono font-bold text-white tracking-tight">{value}</h4>
        {trend && (
          <div
            className={`flex items-center gap-0.5 text-xs font-mono font-semibold ${
              trendPositive ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {trendPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </Card>
  );
};

export default StatCard;
