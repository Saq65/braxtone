
'use client';

import React from 'react';

type AddDriverCardProps = {
  onClick: () => void;
};

const AddDriverCard = ({ onClick }: AddDriverCardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-[380px] border border-dashed p-6 rounded-4 text-center text-gray-500 hover:bg-gray-50 cursor-pointer"
    >
      + Add Driver
    </div>
  );
};

export default AddDriverCard;
