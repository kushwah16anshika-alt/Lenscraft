import React from 'react';
import { Check, Clock, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';

const ServiceCard = ({ service, onBook }) => {
  const {
    title,
    price,
    pricingType,
    deliveryDays,
    description,
    inclusions = [],
  } = service;

  return (
    <Card className="flex flex-col h-full glass-card border border-sky-500/20 p-6 justify-between text-left hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-950/40 transition-all group/card">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3 pb-3 border-b border-sky-500/15">
          <h4 className="text-base font-bold text-slate-100 group-hover/card:text-cyan-300 transition-colors">{title}</h4>
          <div className="text-right shrink-0">
            <span className="text-base font-bold text-cyan-300 font-mono">
              {formatCurrency(price)}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              {formatPriceUnit(pricingType)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{deliveryDays} days turnaround</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">{description}</p>

        {/* Inclusions */}
        {inclusions.length > 0 && (
          <div className="space-y-1.5 pt-3 border-t border-sky-500/15 mb-5">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
              Package Deliverables:
            </span>
            {inclusions.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        variant="primary"
        size="sm"
        className="w-full justify-center mt-2 glow-btn-primary group"
        onClick={() => onBook && onBook(service)}
        rightIcon={<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
      >
        Book Package
      </Button>
    </Card>
  );
};

export default ServiceCard;
