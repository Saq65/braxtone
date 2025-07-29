'use client';

import { useState } from 'react';
import DriverStepForm from './DriverStepForm';
import DriverstepMob from '@/components/mobile/DriverstepMob';

type Driver = {
  name: string;
  licenseNumber: string;
  vehicleType: string;
  experienceLevel: string;
};

type AddDriverCardProps = {
  onClick: () => void;
  onComplete: (driver: Driver) => void;
};

export default function AddDriverCard({ onClick, onComplete }: AddDriverCardProps) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
    onClick();
  };

  return (
    <>
      <div className='hidden sm:block'>
        {showForm ? (
          <DriverStepForm
            onCancel={() => setShowForm(false)}
            onComplete={(driver) => {
              onComplete({
                name: driver.name,
                licenseNumber: driver.licenseNumber,
                vehicleType: driver.vehicleType,
                experienceLevel: driver.experienceLevel,
              });
              setShowForm(false);
            }}
          />
        ) : (
          <button
            onClick={handleClick}
            className="sm:ml-7 ml-0 w-auto border border-dashed p-6 rounded text-center text-gray-800 font-semibold hover:bg-gray-50 cursor-pointer w-[80%] sm:w-[380px] md:w-[380px] lg:w-[380px] xl:w-[380px]"
          >
            + Add driver
          </button>
        )}

      </div>


      <div className="block sm:hidden w-full">
        <DriverstepMob
          onComplete={(driver) => {
            onComplete(driver);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      </div>


    </>
  );
}
