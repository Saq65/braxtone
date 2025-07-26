'use client'
import React, { useState } from 'react';

type Props = {
  data: { id: number; value: string }[];
  onSelect: (selectedValue: string) => void;
  onNextClick: () => void; 
};

export default function Vinnumber({ data, onSelect, onNextClick }: Props) {
  const [vinnumber, setVinnumber] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinnumber(e.target.value);
    onSelect(e.target.value);
  };

  const handleNextClick = () => {
    if (vinnumber) {
      onNextClick();
    }
  };

  return (
    <div className='ml-7 mt-14 mb-7'>
      <div>
        <input
          type="text"
          name="vinnumber"
          id="vinnumber"
          className="border p-4 rounded border-gray-300 w-[350px] focus:outline-none focus:border-gray-600"
          placeholder="Enter VIN Number"
          value={vinnumber}
          onChange={handleInputChange}
        />
      </div>


    </div>
  );
}
