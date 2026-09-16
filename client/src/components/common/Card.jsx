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
      className={`rounded-lg overflow-hidden bg-white border border-zinc-200 transition-all duration-200 ${
        hoverEffect
          ? 'cursor-pointer hover:border-zinc-900 hover:shadow-soft'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-5 pb-4 border-b border-zinc-200 flex items-center justify-between bg-white ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-5 pt-4 border-t border-zinc-200 bg-zinc-50/70 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export default Card;
