import React, { useState } from 'react';

type Props = {
  data: { id: number; value: string }[]; // Optional data prop if needed for VIN options
  onSelect: (selectedValue: string) => void; // Function to pass the selected VIN number back to the parent
  onNextClick: () => void; // Function to handle next step when the button is clicked
};

export default function Vinnumber({ data, onSelect, onNextClick }: Props) {
  const [vinnumber, setVinnumber] = useState<string>(''); // Store VIN number input

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinnumber(e.target.value); // Update VIN number as the user types
    onSelect(e.target.value); // Pass the updated VIN number back to the parent
  };

  const handleNextClick = () => {
    if (vinnumber) {
      onNextClick(); // Proceed to the next step
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
          onChange={handleInputChange} // Update VIN number on change
        />
      </div>


    </div>
  );
}
