'use client';

import CarStepForm from './CarStepForm';
import CarstepMob from '../mobile/CarstepMob';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // ✅ Import

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
        <AnimatePresence>
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
              }}

            >
              <CarStepForm
                onCancel={() => setShowForm(false)}
                onComplete={(car) => {
                  onComplete(car);
                  setShowForm(false);
                }}
              />
            </motion.div>
          ) : (
            <motion.button
              key="button"
              onClick={handleClick}
              className="ml-0 sm:ml-7 w-auto border border-dashed p-6 rounded text-center text-gray-800 font-semibold hover:bg-gray-50 cursor-pointer w-[80%] sm:w-[380px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              + Add cars
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile version */}
      <div className="block sm:hidden w-full">
        <CarstepMob onComplete={onComplete} />
      </div>
    </>
  );
}
