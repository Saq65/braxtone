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
    <div>
      <div>
        <input
          type="text"
          name="vinnumber"
          id="vinnumber"
          className="border p-3 shadow-sm rounded border-gray-400 w-2/4"
          placeholder="Enter VIN Number"
          value={vinnumber}
          onChange={handleInputChange}
        />
      </div>


    </div>
  );
}
