import React, { useState } from 'react';

type Props = {
  data: { id: number; value: string }[];
  onSelect: (selectedValue: string) => void;
  onNextClick: () => void;
};

export default function Vinnumber({ data, onSelect, onNextClick }: Props) {
  const [vinnumber, setVinnumber] = useState<string>(''); // Track VIN input value

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinnumber(e.target.value); // Update VIN number state
  };

  const handleNextClick = () => {
    if (vinnumber) {
      onNextClick(); // Trigger onNextClick when VIN is filled
    }
  };
  
  return (
    <div>
      <div>
        <input
          type="text"
          name="vinnumber"
          id="vinnumber"
          className="border p-3 shadow-sm rounded border-gray-400 w-2/4"
          placeholder="Nissan 370Z VIN"
          value={vinnumber}
          onChange={handleInputChange}

        />
      </div>
      <div className="ml-20 mt-8">
        <button
          onClick={handleNextClick} 
          className={`mt-4 px-10 font-semibold py-3 ${vinnumber ? 'bg-[#005684]' : 'bg-[#d0d0d0]'} rounded text-white`}
          disabled={!vinnumber} 
        >
          Next →
        </button>
      </div>
    </div>
  );
}
