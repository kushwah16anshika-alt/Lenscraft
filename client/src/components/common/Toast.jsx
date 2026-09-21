import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', duration = 4000, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-cyan-400 shrink-0" />,
  };

  const typeBorders = {
    success: 'border-emerald-500/30 shadow-emerald-950/40',
    error: 'border-rose-500/30 shadow-rose-950/40',
    warning: 'border-amber-500/30 shadow-amber-950/40',
    info: 'border-cyan-500/30 shadow-cyan-950/40',
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${typeBorders[type] || typeBorders.info} bg-[#0a122c]/90 shadow-2xl backdrop-blur-xl min-w-[280px] max-w-md animate-slide-up text-left`}
    >
      {icons[type]}
      <p className="text-xs font-medium text-slate-100 flex-1 leading-snug">{message}</p>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default Toast;
