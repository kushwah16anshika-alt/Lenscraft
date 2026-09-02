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
    success: <CheckCircle2 className="w-4 h-4 text-[#3D7055] shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-[#99453F] shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-[#9B6E28] shrink-0" />,
    info: <Info className="w-4 h-4 text-[#3B5B75] shrink-0" />,
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-md border border-[#E5E0D8] bg-white shadow-lg min-w-[280px] max-w-md animate-slide-up text-left"
    >
      {icons[type]}
      <p className="text-xs font-medium text-[#171717] flex-1 leading-snug">{message}</p>
      <button
        onClick={onClose}
        className="text-[#8C8276] hover:text-[#171717] p-1 rounded transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default Toast;
