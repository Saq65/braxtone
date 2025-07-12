'use client';

import { CardData } from '@/data/cardData';
import * as Icons from 'react-icons/fa';

interface ServiceCardProps {
  item: CardData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ServiceCard = ({ item, isSelected, onSelect }: ServiceCardProps) => {
  // const Icon = Icons[item.icon as keyof typeof Icons];

  return (
    <div
      onClick={() => onSelect(item.id)}
      className={`relative flex flex-col items-center justify-center text-center bg-white rounded-xl cursor-pointer transition-all
        p-10 sm:p-12 min-h-[290px] w-full md:max-w-[400px] mx-auto
        shadow-[2px_4px_12px_-1px_rgba(0,0,0,0.08)] hover:shadow-[4px_6px_16px_-1px_rgba(0,0,0,0.12)]`}
    >
      {/* {Icon && <Icon className="text-6xl md:text-7xl text-gray-400 mb-6" />} */}
      <img src={item.image} alt={item.Name} />

      <h3 className="text-lg md:text-xl font-medium text-gray-800">{item.Name}</h3>

      {isSelected && (
        <div className="absolute bottom-0 left-0 w-full h-[42px] flex items-center">
          <div className="bg-[#0067a3] text-white text-base font-medium w-full py-1.5 rounded-b-md text-center relative z-10">
            {item.Name}
            <span
              className="absolute right-0 top-0 bottom-0 w-0 h-0 border-y-[21px] border-l-[14px] border-y-transparent border-l-white"
              style={{ right: '-14px' }}
            />
          </div>
        </div>
      )}
{/* 
      {SubIcon && (
        <div className="mt-3 text-gray-400">
          <SubIcon className="inline-block text-2xl" />
        </div>
      )} */}
    </div>
  );
};

export default ServiceCard;
