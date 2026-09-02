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
    <Card className={`p-5 bg-white border border-[#E5E0D8] ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6258]">{title}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-md bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A]">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <h4 className="text-2xl font-serif font-bold text-[#171717] tracking-tight">{value}</h4>
        {trend && (
          <div
            className={`flex items-center gap-0.5 text-xs font-semibold ${
              trendPositive ? 'text-[#3D7055]' : 'text-[#99453F]'
            }`}
          >
            {trendPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {subtitle && <p className="text-xs text-[#8C8276] mt-1">{subtitle}</p>}
    </Card>
  );
};

export default StatCard;
