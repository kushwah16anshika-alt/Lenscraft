import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258]">
            {label}
          </label>
        )}
        <div className="relative rounded-md">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8276]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={`w-full rounded-md bg-white border ${
              error ? 'border-[#99453F] focus:ring-[#99453F] focus:border-[#99453F]' : 'border-[#E5E0D8] focus:border-[#171717] focus:ring-1 focus:ring-[#171717]'
            } px-3.5 py-2.5 text-sm text-[#171717] placeholder-[#8C8276] transition-all focus:outline-none ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C8276]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-[#99453F] mt-1 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-[#6B6258] mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
