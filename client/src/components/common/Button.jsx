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
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F7F5F2] disabled:opacity-50 disabled:cursor-not-allowed rounded-md active:scale-[0.99] select-none text-sm tracking-tight';

  const variants = {
    primary:
      'bg-[#171717] hover:bg-[#262626] text-white border border-[#171717] shadow-sm hover:shadow focus:ring-[#171717]',
    secondary:
      'bg-transparent hover:bg-[#EEEAE4] text-[#171717] border border-[#171717] focus:ring-[#171717]',
    outline:
      'bg-white hover:bg-[#F7F5F2] text-[#171717] border border-[#E5E0D8] hover:border-[#171717] focus:ring-[#B88A5A] shadow-2xs',
    ghost:
      'bg-transparent hover:bg-[#EEEAE4] text-[#6B6258] hover:text-[#171717] focus:ring-[#E5E0D8]',
    bronze:
      'bg-[#B88A5A] hover:bg-[#A37748] text-white border border-[#B88A5A] focus:ring-[#B88A5A] shadow-sm',
    bronzeOutline:
      'bg-transparent hover:bg-[#B88A5A]/10 text-[#B88A5A] border border-[#B88A5A] focus:ring-[#B88A5A]',
    danger:
      'bg-[#99453F] hover:bg-[#853B36] text-white focus:ring-[#99453F] shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
    xl: 'px-7 py-3.5 text-base gap-3 font-semibold',
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
