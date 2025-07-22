'use client';

import { useState } from 'react';
import CarStepForm from './CarStepForm';

type AddCarCardProps = {
  onClick: () => void;
  onComplete: (car: { [key: string]: string }) => void;
};

export default function AddCarCard({ onClick, onComplete }: AddCarCardProps) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
    onClick();
  };

  return (
    <>
      {showForm ? (
        <CarStepForm
          onCancel={() => setShowForm(false)}
          onComplete={(car) => {
            onComplete(car);
            setShowForm(false);
          }}
        />
      ) : (
        <button
          onClick={handleClick}
          className="w-auto border border-dashed p-6 rounded text-center text-gray-800 font-semibold hover:bg-gray-50 cursor-pointer sm:w-[380px] md:w-[380px] lg:w-[380px] xl:w-[380px]"
        >
          + Add car
        </button>
      )}
    </>
  );
}
