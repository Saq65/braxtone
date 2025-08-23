'use client';

import { CardData } from '@/data/cardData';
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import Checkbox from 'antd/es/checkbox/Checkbox';

interface ServiceCardProps {
  item: CardData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ServiceCard = ({ item, isSelected, onSelect }: ServiceCardProps) => {
  return (
    <>

      <div
        onClick={() => onSelect(item.id)}
        className={`relative overflow-hidden group flex flex-col items-center justify-center text-center bg-white rounded-[6px] cursor-pointer transition-all
        p-4 sm:p-6 md:p-8 h-[160px] sm:h-[220px] md:h-[260px] w-full md:max-w-[300px] md:gap-3 md:justify-center mx-auto border-1 border-[#d2d2d2]
        shadow-[2px_4px_12px_-2px_rgba(0,1,0.2,0.2)]  hover:shadow-[0_0_2px_0_#FF6700CC]

        ${isSelected ? 'border-1 border-[var(--primary2)]' : '  shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}`}
      >
        <Image
          src="/asesst/images/Subtract2.png"
          alt="Hover Decoration"
          className="absolute left-[-6px] bottom-[52px] w-[36px] transition-transform duration-300 ease-in-out opacity-0 group-hover:translate-x-[3px] group-hover:opacity-100"
          width={20}
          height={5}
        />

        {isSelected && (
          <motion.div
            initial={{ x: -500, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              x: { duration: 0.2, ease: 'easeOut' },
              opacity: { delay: 0.1, duration: 0.3 }
            }}
            className="absolute bottom-[35px] sm:bottom-[58px] md:bottom-[56px] lg:bottom-[56px]  xl:bottom-[56px] left-0 flex items-center"
          >

            <div
              className="bg-[var(--primary2)] flex items-center justify-center text-white font-medium
                 h-[26px] sm:h-[28px] md:h-[32px]  
                 w-35 sm:w-54 md:w-66 
                 text-[10px] sm:text-xs md:text-sm "
            >
              {item.Name}
            </div>

            <div
              className="
              w-0 h-0 
              border-t-[13px] border-b-[13px] border-l-[10px] 
              sm:border-t-[14px] sm:border-b-[14px] sm:border-l-[11px]
              md:border-t-[16px] md:border-b-[16px] md:border-l-[13px]
              border-t-transparent border-b-transparent border-l-[#ff6700]"
            />
          </motion.div>
        )}

        <div className='absolute top-2 right-5'>
          <Checkbox
            checked={isSelected}
        
          >
          </Checkbox>
        </div>
        <div className=''>
          <Image
            src={item.image}
            alt={item.Name}
            className="w-[40px] sm:w-[60px] md:w-[70px] lg:w-[90px]"
            width={100}
            height={100}
          />
        </div>


        <h3 className="text-[11.2px]  sm:text-sm md:text-base lg:text-lg font-medium text-gray-800 mt-3">
          {item.Name}
        </h3>

      </div>
    </>

  );
};

export default ServiceCard;
