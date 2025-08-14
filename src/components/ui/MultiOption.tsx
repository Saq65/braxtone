'use client';

import { useState } from 'react';

type Props = {
  data: { id: number; value: string }[];
  onSelect: (selectedValue: string) => void;
};

function MultiOption({ data, onSelect }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    onSelect(value); 
  };

 

  return (
    <div className='sm:ml-7 mb-8 md:ml-7 xl:ml-7 ml-0'>
      {data.map(item => (
        <div
          key={item.id}
          onClick={() => handleOptionClick(item.value)}
          className={`max-w-[370px] min-w-auto border border-gray-300 py-4 gap-3 mt-5 rounded-md text-center font-[600] cursor-pointer hover:bg-gray-200 ${
            selectedOption === item.value ? 'bg-gray-200' : 'bg-white text-gray-700'
          }`}
        >
          {item.value}
        </div>  
      ))}
      
     
    </div>
  );
}

export default MultiOption;
