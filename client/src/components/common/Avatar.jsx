import React, { useState, useEffect } from 'react';

const Avatar = ({
  src,
  alt = 'Avatar',
  name = '',
  size = 'md',
  isOnline,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = typeof src === 'object' && src !== null ? src.url : src;

  useEffect(() => {
    setImgError(false);
  }, [imageUrl]);

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-13 h-13 text-base font-semibold',
    xl: 'w-18 h-18 text-xl font-bold font-serif',
    '2xl': 'w-24 h-24 text-2xl font-bold font-serif',
  };

  const getInitials = (fullName) => {
    if (!fullName) return '?';
    return fullName
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`relative inline-block shrink-0 ${sizes[size] || sizes.md} ${className}`}>
      {imageUrl && !imgError ? (
        <img
          src={imageUrl}
          alt={alt || name}
          className="w-full h-full object-cover rounded-full border border-sky-500/25 shadow-md shadow-black/40"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-500/10 text-cyan-300 flex items-center justify-center border border-sky-500/30 font-semibold shadow-inner">
          {getInitials(name)}
        </div>
      )}
      {isOnline !== undefined && (
        <span
          className={`absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full ring-2 ring-[#030712] ${
            isOnline ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-600'
          }`}
        />
      )}
    </div>
  );
};

export default Avatar;
