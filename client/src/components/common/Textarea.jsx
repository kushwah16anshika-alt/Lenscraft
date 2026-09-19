import React, { forwardRef } from 'react';

const Textarea = forwardRef(
  ({ label, error, helperText, rows = 4, className = '', id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={`w-full rounded-xl bg-slate-900/80 border ${
            error
              ? 'border-red-500/80 focus:ring-1 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-800 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30'
          } px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 transition-all focus:outline-none backdrop-blur-md shadow-inner ${className}`}
          {...props}
        />
        {error && <p className="text-[11px] text-red-400 mt-1 font-medium">{error}</p>}
        {helperText && !error && <p className="text-[11px] text-slate-400 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
