'use client';

import React from 'react';

type Props = {
  vinnumber: string;
  onChange: (value: string) => void;
};

export default function Vinnumber({ vinnumber, onChange }: Props) {
  return (
    <div className="ml-0 sm:ml-7 md:ml-7 lg:ml-7 xl:ml-7 mt-14 mb-7">
      <input
        style={{ outline: 'none' }}
        type="text"
        placeholder="Enter VIN number"
        name="vinnumber"
        autoComplete="off"
        value={vinnumber}
        onChange={(e) => onChange(e.target.value)}
        className="border-1 focus:ring-1 focus:ring-[#1252de] border-[#d1d1d1] py-4 w-[100%] sm:w-[45%] lg:w-[45%] md:w-[45%] xl:w-[45%]  rounded-[4px] px-3 ml-0  sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10"
      />
    </div>
  );
}
