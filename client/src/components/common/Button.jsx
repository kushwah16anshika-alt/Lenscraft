import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  ...props
}) => {
  const isButtonLoading = isLoading || loading;

  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-[0.98] select-none text-xs sm:text-sm tracking-wide';

  const variants = {
    primary:
      'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] border border-sky-300/30',
    secondary:
      'bg-slate-900/80 hover:bg-slate-800 text-sky-300 hover:text-white border border-sky-500/30 hover:border-sky-400/60 shadow-lg',
    outline:
      'bg-transparent hover:bg-sky-500/10 text-slate-200 hover:text-white border border-sky-500/30 hover:border-sky-400/60 shadow-xs backdrop-blur-md',
    ghost:
      'bg-transparent hover:bg-white/5 text-slate-400 hover:text-white',
    cyan:
      'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_25px_rgba(0,210,255,0.5)]',
    danger:
      'bg-red-600/90 hover:bg-red-500 text-white border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.4)]',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 rounded-lg',
    md: 'px-5 py-2.5 text-xs sm:text-sm gap-2 rounded-xl',
    lg: 'px-7 py-3.5 text-sm sm:text-base gap-2.5 font-bold rounded-2xl',
    xl: 'px-8 py-4 text-base gap-3 font-bold rounded-full',
    icon: 'p-2 rounded-xl',
  };

  return (
    <button
      type={type}
      disabled={disabled || isButtonLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isButtonLoading && <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />}
      {!isButtonLoading && leftIcon && <span className="shrink-0 transition-transform duration-200">{leftIcon}</span>}
      <span>{children}</span>
      {!isButtonLoading && rightIcon && <span className="shrink-0 transition-transform duration-200">{rightIcon}</span>}
    </button>
  );
};

export default Button;

