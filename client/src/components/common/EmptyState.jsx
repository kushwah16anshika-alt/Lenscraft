import React from 'react';
import { Camera, FolderOpen } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = Camera,
  title = 'No records found',
  description = 'There are currently no items to display in this view.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-lg bg-white border border-[#E5E0D8] ${className}`}>
      <div className="w-14 h-14 rounded-full bg-[#FAF7F3] border border-[#E8DBCA] flex items-center justify-center text-[#B88A5A] mb-4 shadow-2xs">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-base font-serif font-bold text-[#171717] mb-1">{title}</h3>
      <p className="text-xs text-[#6B6258] max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
