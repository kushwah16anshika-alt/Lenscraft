import React, { useState } from 'react';
import { Play, Maximize2 } from 'lucide-react';
import Modal from '../common/Modal';

const PortfolioCard = ({ item }) => {
  const { title, category, url, mediaType = 'image', description } = item;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group relative rounded-md overflow-hidden cursor-pointer aspect-square bg-[#EEEAE4] border border-[#E5E0D8] film-frame-marker shadow-2xs"
      >
        <img
          src={url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-left">
          <div className="flex justify-end">
            <span className="p-1.5 rounded-full bg-white/90 text-[#171717] shadow-xs">
              <Maximize2 className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-[#B88A5A] tracking-wider block mb-0.5">
              {category}
            </span>
            <h4 className="text-sm font-serif font-bold text-white leading-snug">{title}</h4>
            {description && <p className="text-[11px] text-[#D6CFC4] line-clamp-2 mt-1">{description}</p>}
          </div>
        </div>

        {mediaType === 'video' && (
          <div className="absolute top-3 left-3 p-1.5 rounded-full bg-[#171717]/80 text-white backdrop-blur-xs">
            <Play className="w-3 h-3 fill-current text-[#B88A5A]" />
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} size="lg">
        <div className="space-y-4">
          <div className="rounded-md overflow-hidden max-h-[70vh] flex items-center justify-center bg-[#171717]">
            <img src={url} alt={title} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex items-center justify-between text-xs text-[#6B6258] pt-1">
            <span>Category: <strong className="text-[#171717]">{category}</strong></span>
            <span>Medium: <strong className="text-[#171717] uppercase">{mediaType}</strong></span>
          </div>
          {description && <p className="text-xs text-[#6B6258] leading-relaxed">{description}</p>}
        </div>
      </Modal>
    </>
  );
};

export default PortfolioCard;
