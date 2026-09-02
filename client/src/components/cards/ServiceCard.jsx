import React from 'react';
import { Check, Clock, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency, formatPriceUnit } from '../../utils/formatters';

const ServiceCard = ({ service, onBook }) => {
  const {
    id,
    title,
    price,
    pricingType,
    deliveryDays,
    description,
    inclusions = [],
  } = service;

  return (
    <Card className="flex flex-col h-full bg-white border border-[#E5E0D8] p-6 justify-between text-left shadow-2xs">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2 pb-3 border-b border-[#E5E0D8]">
          <h4 className="text-base font-serif font-bold text-[#171717]">{title}</h4>
          <div className="text-right shrink-0">
            <span className="text-base font-bold text-[#171717]">
              {formatCurrency(price)}
            </span>
            <span className="text-[10px] text-[#6B6258] uppercase tracking-wider block font-semibold">
              {formatPriceUnit(pricingType)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#6B6258] mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#B88A5A]" />
            <span>{deliveryDays} days turnaround</span>
          </div>
        </div>

        <p className="text-xs text-[#6B6258] mb-4 leading-relaxed">{description}</p>

        {/* Inclusions */}
        {inclusions.length > 0 && (
          <div className="space-y-1.5 pt-3 border-t border-[#E5E0D8] mb-5">
            <span className="text-[10px] font-bold uppercase text-[#8C8276] tracking-wider block mb-1">
              Package Deliverables:
            </span>
            {inclusions.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#171717]">
                <Check className="w-3.5 h-3.5 text-[#3D7055] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        variant="primary"
        size="sm"
        className="w-full justify-center mt-2 group"
        onClick={() => onBook && onBook(service)}
        rightIcon={<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
      >
        Book Package
      </Button>
    </Card>
  );
};

export default ServiceCard;
