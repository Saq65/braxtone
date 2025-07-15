'use client';

import { useState } from 'react';
import CarStepForm from './CarStepForm';

export default function AddCarCard({ onClick }: { onClick: () => void }) {
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
            console.log('Car completed:', car);
            setShowForm(false);
          }}
        />
      ) : (
        <button
          onClick={handleClick}
          className="w-[380px] border border-dashed p-6 rounded text-center text-gray-500 hover:bg-gray-50 cursor-pointer"
        >
          + Add car
        </button>
      )}
    </>
  );
}
