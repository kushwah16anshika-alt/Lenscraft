import React, { forwardRef } from 'react';

const Textarea = forwardRef(
  ({ label, error, helperText, rows = 4, className = '', id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={`w-full rounded-md bg-white border ${
            error ? 'border-red-500' : 'border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900'
          } px-3.5 py-2 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:outline-none ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-zinc-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
