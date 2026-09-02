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
      className={`rounded-lg overflow-hidden bg-white border border-[#E5E0D8] transition-all duration-300 ${
        hoverEffect
          ? 'cursor-pointer hover:border-[#D6CFC4] hover:-translate-y-0.5 hover:shadow-md'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-5 pb-4 border-b border-[#E5E0D8] flex items-center justify-between bg-white ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-5 pt-4 border-t border-[#E5E0D8] bg-[#F7F5F2]/60 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export default Card;
