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
  