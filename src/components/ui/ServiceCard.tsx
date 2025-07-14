'use client';

import { CardData } from '@/data/cardData';

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
        shadow-[2px_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[4px_6px_16px_-1px_rgba(71,160,245,0.10)]`}
    >
      <img
        src="/asesst/images/Subtract.png"
        alt="Hover Decoration"
        className="absolute left-[-5px] bottom-[60px] w-[36px] transition-transform duration-300 ease-in-out opacity-0 group-hover:translate-x-[3px] group-hover:opacity-100"
      />

      {isSelected && (
        <img
          src="/asesst/images/Subtract-2.png"
          alt="Selected Decoration"
          className="absolute left-[-48px] bottom-[15px] w-[42px]"
        />
      )}

      <img src={item.image} alt={item.Name} />

      <h3 className="text-lg md:text-xl font-medium text-gray-800">{item.Name}</h3>

      {isSelected && (
        <div className="absolute bottom-0 left-0 w-full h-[42px] flex items-center">
          <div className="text-white text-base font-medium w-full py-1.5 rounded-b-md text-center relative z-10">
            {item.Name}
            <span
              className="absolute right-0 top-0 bottom-0 w-0 h-0 border-y-[21px] border-l-[14px] border-y-transparent border-l-white"
              style={{ right: '-14px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
