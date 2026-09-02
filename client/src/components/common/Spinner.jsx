import React from 'react';
import { Loader2, Aperture } from 'lucide-react';

const Spinner = ({ size = 'md', text, className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Aperture className={`${sizes[size] || sizes.md} animate-spin text-[#B88A5A] opacity-90`} />
      {text && <p className="text-xs font-semibold text-[#6B6258] uppercase tracking-wider">{text}</p>}
    </div>
  );
};

export const PageLoader = ({ text = 'Loading LensCraft...' }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Spinner size="lg" text={text} />
  </div>
);

export default Spinner;
