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
        className="group relative rounded-lg overflow-hidden cursor-pointer aspect-square bg-zinc-100 border border-zinc-200 film-frame-marker shadow-subtle"
      >
        <img
          src={url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 text-left">
          <div className="flex justify-end">
            <span className="p-1.5 rounded-full bg-white text-zinc-900 shadow-xs">
              <Maximize2 className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-zinc-300 tracking-wider block mb-0.5">
              {category}
            </span>
            <h4 className="text-sm font-serif font-bold text-white leading-snug">{title}</h4>
            {description && <p className="text-[11px] text-zinc-300 line-clamp-2 mt-1">{description}</p>}
          </div>
        </div>

        {mediaType === 'video' && (
          <div className="absolute top-3 left-3 p-1.5 rounded-full bg-zinc-950/80 text-white backdrop-blur-xs">
            <Play className="w-3 h-3 fill-current text-white" />
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} size="lg">
        <div className="space-y-4">
          <div className="rounded-md overflow-hidden max-h-[70vh] flex items-center justify-center bg-zinc-950">
            <img src={url} alt={title} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
            <span>Category: <strong className="text-zinc-900">{category}</strong></span>
            <span>Medium: <strong className="text-zinc-900 uppercase">{mediaType}</strong></span>
          </div>
          {description && <p className="text-xs text-zinc-600 leading-relaxed">{description}</p>}
        </div>
      </Modal>
    </>
  );
};

export default PortfolioCard;
