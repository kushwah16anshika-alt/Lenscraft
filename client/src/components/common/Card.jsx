import React from 'react';

const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glass = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl overflow-hidden glass-card border border-sky-500/20 text-slate-100 transition-all duration-300 ${
        hoverEffect
          ? 'cursor-pointer hover:border-cyan-400 hover:shadow-[0_10px_30px_rgba(0,210,255,0.15)]'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-5 pb-4 border-b border-sky-500/15 flex items-center justify-between bg-midnight-900/60 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-5 pt-4 border-t border-sky-500/15 bg-midnight-950/60 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export default Card;
