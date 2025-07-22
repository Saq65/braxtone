'use client';

import { useState } from 'react';

type Props = {
  data: { id: number; value: string }[];
  onSelect: (selectedValue: string) => void;
};

function MultiOption({ data, onSelect }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value); // Set the selected option
    onSelect(value); // Pass the selected value back to the parent component
  };

  return (
    <div>
      {data.map(item => (
        <div
          key={item.id}
          onClick={() => handleOptionClick(item.value)}
          className={`w-[350px] border border-gray-300 py-4 gap-3 mt-5 rounded-md text-center font-semibold cursor-pointer hover:bg-gray-200 ${
            selectedOption === item.value ? 'bg-gray-200 ' : 'bg-white text-gray-700'
          }`}
        >
          {item.value}
        </div>
      ))}
      
      {/* Next button: Enable only when an option is selected */}
      <div className="ml-20 mt-8">
        <button
          onClick={() => {}}
          className={`mt-4 px-10 font-semibold py-3 ${selectedOption ? 'bg-[#005684]' : 'bg-[#d0d0d0]'} rounded text-white`}
          disabled={!selectedOption}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default MultiOption;
