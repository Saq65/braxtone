'use client';

import { CardData } from '@/data/cardData';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  item: CardData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ServiceCard = ({ item, isSelected, onSelect }: ServiceCardProps) => {
  return (
    <div
      onClick={() => onSelect(item.id)}
      className={`relative group flex flex-col items-center justify-center text-center bg-white rounded-xl cursor-pointer transition-all
        p-10 sm:p-12 min-h-[260px] w-full md:max-w-[400px] mx-auto
        shadow-[2px_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[4px_6px_16px_-1px_rgba(71,160,245,0.10)]
        ${isSelected ? 'border-1 border-[#0067a3]' : 'border border-transparent'}`}
    >
      {/* Hover Image – slides in from left near bottom */}
      <img
        src="/asesst/images/Subtract.png"
        alt="Hover Decoration"
        className="absolute left-[-5px] bottom-[60px] w-[36px] transition-transform duration-300 ease-in-out opacity-0 group-hover:translate-x-[3px] group-hover:opacity-100"
      />

      {/* Selected animated label bar */}
      {isSelected && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            x: { duration: 0.6, ease: 'easeOut' },
            opacity: { delay: 0.5, duration: 0.3 }
          }}
          className="absolute bottom-[60px] left-0 w-68 flex items-center"
          style={{ height: '32px' }}
        >
          <div className="bg-[#0067a3] h-full flex-1 flex items-center justify-center text-white text-sm font-medium">
            {item.Name}
          </div>
          <div className="w-0 h-0 border-t-[14px] border-b-[14px] border-l-[11px] border-t-transparent border-b-transparent border-l-[#0067a3]" />
        </motion.div>
      )}

      {/* Card content */}
      <img src={item.image} alt={item.Name} />

      <h3 className="text-lg md:text-xl font-medium text-gray-800">{item.Name}</h3>

      {isSelected && (
        <div className="absolute bottom-0 left-0 w-full h-[42px] flex items-center">
          <div className="text-white text-base font-medium w-full py-1.5 rounded-b-md text-center relative z-10">
            {item.Name}
            {/* Optional decorative edge arrow – removed as requested */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
