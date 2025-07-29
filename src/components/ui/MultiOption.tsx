'use client';

import { useState } from 'react';

type Props = {
  data: { id: number; value: string }[]; // Array of options
  onSelect: (selectedValue: string) => void; // Parent function to handle selected value
};

function MultiOption({ data, onSelect }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value); // Set the selected option
    onSelect(value); 
  };

 

  return (
    <div className='ml-7 mb-8'>
      {data.map(item => (
        <div
          key={item.id}
          onClick={() => handleOptionClick(item.value)}
          className={`w-[350px] border border-gray-300 py-4 gap-3 mt-5 rounded-md text-center font-semibold cursor-pointer hover:bg-gray-200 ${
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
