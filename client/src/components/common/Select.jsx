import React, { forwardRef } from 'react';

const Select = forwardRef(
  ({ label, error, helperText, options = [], className = '', id, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="block text-[11px] font-semibold uppercase font-mono tracking-wider text-slate-300">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`w-full rounded-xl bg-slate-900/90 border ${
            error ? 'border-red-500' : 'border-sky-500/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40'
          } px-3.5 py-2.5 text-xs sm:text-sm text-white transition-all focus:outline-none backdrop-blur-md ${className}`}
          {...props}
        >
          {children ? (
            children
          ) : (
            options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-midnight-900 text-white">
                {opt.label}
              </option>
            ))
          )}
        </select>
        {error && <p className="text-xs text-red-400 mt-1 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-slate-400 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
