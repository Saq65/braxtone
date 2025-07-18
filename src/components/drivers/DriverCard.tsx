// DriverCard.tsx

'use client';

import React from 'react';

type DriverCardProps = {
  name: string;
  selected: boolean;
  onToggle: () => void;
};

const DriverCard = ({ name, selected, onToggle }: DriverCardProps) => {
  return (
    <div
      onClick={onToggle}
      className={`border p-4 rounded-lg cursor-pointer ${
        selected ? 'bg-blue-100' : 'bg-white'
      }`}
    >
      <h3 className="font-medium text-gray-800">{name}</h3>
    </div>
  );
};

export default DriverCard;
