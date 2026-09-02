import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-semibold uppercase tracking-wider rounded-sm border shrink-0';

  const variants = {
    default: 'bg-[#EEEAE4] text-[#6B6258] border-[#E5E0D8]',
    bronze: 'bg-[#FAF7F3] text-[#B88A5A] border-[#E8DBCA]',
    charcoal: 'bg-[#171717] text-white border-[#171717]',
    success: 'bg-[#EDF5F0] text-[#3D7055] border-[#D4E8DC]',
    warning: 'bg-[#FBF5EB] text-[#9B6E28] border-[#F2E0C4]',
    danger: 'bg-[#FDF2F1] text-[#99453F] border-[#F8D4D2]',
    info: 'bg-[#EFF4F8] text-[#3B5B75] border-[#D5E2EC]',
    purple: 'bg-[#F6F2F8] text-[#6B4E71] border-[#E5DBE8]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-[11px] gap-1.5',
    lg: 'px-3 py-1.5 text-xs gap-2',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
      )}
      {children}
    </span>
  );
};

export default Badge;
