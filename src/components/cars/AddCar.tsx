'use client';

import CarStepForm from './CarStepForm';
import CarstepMob from '../mobile/CarstepMob';
import { useState } from 'react';

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
      {/* Desktop version */}
      <div className="hidden sm:block">
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
            className="ml-0 sm:ml-7 w-auto border border-dashed p-6 rounded text-center text-gray-800 font-semibold hover:bg-gray-50 cursor-pointer w-[80%] sm:w-[380px]"
          >
            + Add cars
          </button>
        )}
      </div>

      {/* Mobile version - render drawer logic component always */}
      <div className="block sm:hidden w-full">
        <CarstepMob onComplete={onComplete} />
      </div>
    </>
  );
}
