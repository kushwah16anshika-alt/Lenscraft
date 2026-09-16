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
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
            {label}
          </label>
        )}
        <div className="relative rounded-md">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={`w-full rounded-md bg-white border ${
              error ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900'
            } px-3.5 py-2 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-zinc-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
