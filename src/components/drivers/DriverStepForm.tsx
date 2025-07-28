'use client';

import { Select, Input } from 'antd';
import { useState } from 'react';

const { Option } = Select;

type Driver = {
  name: string;
  licenseNumber: string;
  vehicleType: string;
  experienceLevel: string;
};

export default function DriverStepForm({
  onComplete,
  onCancel,
}: {
  onComplete: (driver: Driver) => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const vehicleTypes = ['Sedan', 'SUV', 'Truck', 'Van'];
  const experienceLevels = ['Beginner', 'Intermediate', 'Expert'];

  const totalSteps = 4;

  return (
    <div className=''>
      <button className="w-[100%] sm:w-[380px] md:w-[380px] lg:w-[380px] xl:w-[380px] ml-0 sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10 border border-dashed border-gray-400 p-8 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
        + Add Driver
      </button>

      <div className="relative mx-end w-[100%] sm:w-[380px] md:w-[380px] lg:w-[380px] xl:w-[380px] ml-0 sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10pt-6 pb-2 border border-[#d2d0d0] p-4 h-[260px] rounded-md mt-8">
        <button
          onClick={onCancel}
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ×
        </button>

        {step === 1 && (
          <>
            <h2 className="text-md font-medium mb-3 text-gray-800">Enter driver's fullname</h2>
            <div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="mb-4"
                size="large"
              />
            </div>

            <ProgressBar step={step} totalSteps={totalSteps} />
            <StepNavigation
              canContinue={!!name}
              onBack={onCancel}
              onNext={() => setStep(2)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-md font-medium mb-3 text-gray-800">Enter license number</h2>
            <Input
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="License Number"
              className="mb-4"
              size="large"
            />
            <ProgressBar step={step} totalSteps={totalSteps} />
            <StepNavigation
              canContinue={!!licenseNumber}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-md font-medium mb-3 text-gray-800">Select vehicle type</h2>
            <Select
              value={vehicleType}
              onChange={(value) => setVehicleType(value)}
              placeholder="Select Vehicle Type"
              style={{ width: '100%', height: '40px', borderRadius: '8px' }}
              className="mb-4"
            >
              <Option value="">Select</Option>
              {vehicleTypes.map((v) => (
                <Option key={v} value={v}>
                  {v}
                </Option>
              ))}
            </Select>
            <ProgressBar step={step} totalSteps={totalSteps} />
            <StepNavigation
              canContinue={!!vehicleType}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-md font-medium mb-3 text-gray-800">Select experience level</h2>
            <Select
              value={experienceLevel}
              onChange={(value) => setExperienceLevel(value)}
              placeholder="Select Experience Level"
              style={{ width: '100%', height: '40px', borderRadius: '8px' }}
              className="mb-4"
            >
              <Option value="">Select</Option>
              {experienceLevels.map((exp) => (
                <Option key={exp} value={exp}>
                  {exp}
                </Option>
              ))}
            </Select>
            <ProgressBar step={step} totalSteps={totalSteps} />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(3)}
                className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100"
              >
                Back
              </button>
              <button
                onClick={() =>
                  onComplete({ name, licenseNumber, vehicleType, experienceLevel })
                }
                disabled={!experienceLevel}
                className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-800 hover:bg-[#0067a1] hover:text-white border border-gray-100 bg-[#d0d0d0]"
              >
                Add
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="h-[6px] w-full bg-gray-200 rounded my-4">
      <div
        className="h-full bg-[#0068a2] rounded transition-all duration-300"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      />
    </div>
  );
}

function StepNavigation({
  onBack,
  onNext,
  canContinue,
}: {
  onBack: () => void;
  onNext: () => void;
  canContinue: boolean;
}) {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={onBack}
        className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100 cursor-pointer"
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={!canContinue}
        className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-800 hover:bg-[#0067a1] hover:text-white border border-gray-100 cursor-pointer bg-[#d0d0d0]"
      >
        Next
      </button>
    </div>
  );
}
