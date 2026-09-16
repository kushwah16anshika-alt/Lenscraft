import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-medium uppercase tracking-wider rounded-md border shrink-0';

  const variants = {
    default: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    bronze: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    charcoal: 'bg-zinc-900 text-white border-zinc-900',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    purple: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-0.5 text-[11px] gap-1.5',
    lg: 'px-3 py-1 text-xs gap-2',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      )}
      {children}
    </span>
  );
};

export default Badge;
