'use client';

import { useState } from 'react';
import DriverStepForm from './DriverStepForm';


type AddDriverCardProps = {
  onClick: () => void;
  onComplete: (car: { [key: string]: string }) => void;
};
export default function AddDriverCard({ onClick,onComplete }:AddDriverCardProps ) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
    onClick();
  };

  return (
    <>
      {showForm ? (
        <DriverStepForm
          onCancel={() => setShowForm(false)}
          onComplete={(driver) => {
            console.log('Driver completed:', driver);
                        onComplete(driver);
            setShowForm(false);
          }}
        />
      ) : (
        <button
          onClick={handleClick}
          className="w-auto border border-dashed p-6 rounded text-center text-gray-500 hover:bg-gray-50 cursor-pointer sm:w-[380px] md:w-[380px] lg:w-[380px] xl:w-[380px]"
        >
          + Add driver
        </button>
      )}
    </>
  );
}
