'use client';
import { useState, useEffect } from 'react';

type CarRunMilesProps = {
  max: number;
  unitLabel: string;
  min?: number;
  defaultValue?: number;
  onSelect: (value: number) => void; // ✅ emit selected value
};

export default function ProgressBar({
  max,
  unitLabel,
  min = 0,
  defaultValue = 0,
  onSelect,
}: CarRunMilesProps) {
  const [value, setValue] = useState(defaultValue);
  const [position, setPosition] = useState(0);

  const updateSlider = (newValue: number) => {
    const numVal = Number(newValue);
    setValue(numVal);
    onSelect(numVal); // ✅ send value to parent
    const percent = (numVal - min) / (max - min);
    setPosition(percent * 100);
  };

  useEffect(() => {
    updateSlider(defaultValue);
  }, [defaultValue]);

  return (
    <div className="ml-3">
      <div className="relative w-full mx-auto mt-20">
        <div
          className="w-[150px] text-gray-500 text-center absolute top-[-35px] left-0 transform -translate-x-1/2 bg-gray-200 p-2 rounded-lg"
          style={{ left: `${position}%` }}
        >
          {value.toLocaleString()} {unitLabel}
        </div>

        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => updateSlider(Number(e.target.value))}
          className="w-[330px] lg:w-[380px] h-2 bg-blue-300 rounded-full appearance-none"
          style={{
            background: `linear-gradient(to right, #4B5563 ${position}%, rgb(209, 213, 219) ${position}%)`,
          }}
        />
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 25px;
          height: 25px;
          background: white;
          border: 2px rgba(145, 141, 141, 0.2);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
