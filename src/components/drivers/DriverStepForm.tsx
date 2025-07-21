
'use client';

import React, { useState } from 'react';

type DriverStepFormProps = {
  onCancel: () => void;
  onComplete: (driver: { name: string }) => void;
};

const DriverStepForm = ({ onCancel, onComplete }: DriverStepFormProps) => {
  const [driverName, setDriverName] = useState('');

  const handleSubmit = () => {
    if (driverName) {
      onComplete({ name: driverName });
    }
  };

  return (
    <div className="w-[380px] border p-6 rounded-lg bg-white">
      <h3 className="text-xl mb-4">Add a New Driver</h3>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter driver name"
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)}
      />
      <div className="flex justify-between">
        <button onClick={onCancel} className="text-gray-500">
          Cancel
        </button>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Driver
        </button>
      </div>
    </div>
  );
};

export default DriverStepForm;
