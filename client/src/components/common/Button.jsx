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
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-md active:scale-[0.99] select-none text-sm tracking-tight';

  const variants = {
    primary:
      'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-900 shadow-xs focus:ring-zinc-900',
    secondary:
      'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 focus:ring-zinc-900',
    outline:
      'bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 hover:border-zinc-900 focus:ring-zinc-900 shadow-xs',
    ghost:
      'bg-transparent hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 focus:ring-zinc-300',
    bronze:
      'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-900 shadow-xs',
    bronzeOutline:
      'bg-transparent hover:bg-zinc-100 text-zinc-900 border border-zinc-300 hover:border-zinc-900',
    danger:
      'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 shadow-xs',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-2.5 text-sm sm:text-base gap-2.5 font-semibold',
    xl: 'px-7 py-3 text-base gap-3 font-semibold',
    icon: 'p-2',
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
