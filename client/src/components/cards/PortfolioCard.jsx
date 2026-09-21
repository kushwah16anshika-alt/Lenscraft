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
        className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square bg-[#0a122c] border border-sky-500/20 shadow-lg hover:border-cyan-400/50 hover:shadow-cyan-950/40 transition-all"
      >
        <img
          src={url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/95 via-[#030712]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-left">
          <div className="flex justify-end">
            <span className="p-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md shadow-md">
              <Maximize2 className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 tracking-wider block mb-0.5">
              {category}
            </span>
            <h4 className="text-sm font-bold text-slate-100 leading-snug">{title}</h4>
            {description && <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">{description}</p>}
          </div>
        </div>

        {mediaType === 'video' && (
          <div className="absolute top-3 left-3 p-2 rounded-full bg-black/70 border border-white/20 text-cyan-400 backdrop-blur-md">
            <Play className="w-3.5 h-3.5 fill-current" />
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} size="lg">
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden max-h-[70vh] flex items-center justify-center bg-[#050a18] border border-sky-500/20">
            <img src={url} alt={title} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Category: <strong className="text-cyan-300">{category}</strong></span>
            <span>Medium: <strong className="text-cyan-300 uppercase font-mono">{mediaType}</strong></span>
          </div>
          {description && <p className="text-xs text-slate-300 leading-relaxed">{description}</p>}
        </div>
      </Modal>
    </>
  );
};

export default PortfolioCard;
