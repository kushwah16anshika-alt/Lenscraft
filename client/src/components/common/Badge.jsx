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
    default: 'bg-white/5 text-slate-300 border-white/10',
    bronze: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    charcoal: 'bg-sky-500/10 text-cyan-300 border-sky-500/25',
    success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    info: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
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
