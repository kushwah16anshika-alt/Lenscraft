import React, { forwardRef } from 'react';

const Select = forwardRef(
  ({ label, error, helperText, options = [], className = '', id, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`w-full rounded-md bg-white border ${
            error ? 'border-red-500' : 'border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900'
          } px-3.5 py-2 text-sm text-zinc-900 transition-all focus:outline-none ${className}`}
          {...props}
        >
          {children ? (
            children
          ) : (
            options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-zinc-900">
                {opt.label}
              </option>
            ))
          )}
        </select>
        {error && <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-zinc-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
