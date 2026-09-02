import React, { forwardRef } from 'react';

const Select = forwardRef(
  ({ label, error, helperText, options = [], className = '', id, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-[#6B6258]">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`w-full rounded-md bg-white border ${
            error ? 'border-[#99453F]' : 'border-[#E5E0D8] focus:border-[#171717] focus:ring-1 focus:ring-[#171717]'
          } px-3.5 py-2.5 text-sm text-[#171717] transition-all focus:outline-none ${className}`}
          {...props}
        >
          {children ? (
            children
          ) : (
            options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-[#171717]">
                {opt.label}
              </option>
            ))
          )}
        </select>
        {error && <p className="text-xs text-[#99453F] mt-1 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-[#6B6258] mt-1">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
