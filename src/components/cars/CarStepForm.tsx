'use client'

import { Select } from 'antd';
import { useState } from 'react';

const { Option } = Select;

type Car = {
  year: string;
  manufacturer: string;
  company: string;
  model: string;
};

export default function CarStepForm({
  onComplete,
  onCancel,
}: {
  onComplete: (car: Car) => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(1);
  const [year, setYear] = useState('');
  const [company, setCompany] = useState('');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');

  const years = Array.from({ length: 8 }, (_, i) => `${2026 - i}`);
  const companies = ['Acura', 'BMW', 'Audi', 'Toyota'];
  const models = ['copper', 'sample1', 'sample2'];
  const manufacturers = ['5/40xi 4WD', '4/20i RWD', '3/10xi AWD'];

  const handleChange = (value: string) => {
    setYear(value);
  };

  const totalSteps = 4;

  return (
    <div className=''>
      <button className="w-[100%] sm:w-[380px] md:w-[380px] lg:w-[380px] xl:w-[380px] ml-0 sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10 border border-dashed border-gray-400 p-8 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
        + Add car
      </button>

      <div className="relative mx-end w-[100%] sm:w-[380px] md:w-[380px]  pt-6 pb-2 border border-[#d2d0d0] p-4 h-[260px] rounded-md mt-8 ml-0 sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10">
        <button
          onClick={onCancel}
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ×
        </button>

        {step === 1 && (
          <>
            <h2 className="text-md font-medium mb-3 text-gray-800">Select the production year</h2>
            <div className="relative mb-4">
              <Select
                value={year}
                onChange={handleChange}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  padding: '2px',
                  height: '40px',
                  border: 'none',
                }}
                placeholder="Select Year"
                className="custom-dropdown outline-none focus-none no-focus-border"
             
              >
                <Option value="">Select</Option>
                {years.map((y) => (
                  <Option key={y} value={y}>
                    {y}
                  </Option>
                ))}
              </Select>

            </div>

            <ProgressBar step={step} totalSteps={totalSteps} />

            <StepNavigation
              canContinue={!!year}
              onBack={onCancel}
              onNext={() => setStep(2)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-md font-medium mb-3 text-gray-800">Select the car manufacturing company</h2>
            <div className="relative mb-4">
              <Select
                value={company}
                onChange={(e) => setCompany(e)}
                style={{ width: '100%', borderRadius: '8px', padding: '2px', height: '40px', border: 'none' }}
                placeholder="Select Company"
              >
                <Option value="">Select</Option>
                {companies.map((c) => (
                  <Option key={c} value={c}>
                    {c}
                  </Option>
                ))}
              </Select>
            </div>

            <ProgressBar step={step} totalSteps={totalSteps} />

            <StepNavigation
              canContinue={!!company}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-md font-medium mb-3 text-gray-800">Select the car model</h2>
            <div className="relative mb-4">
              <Select
                value={model}
                onChange={(e) => setModel(e)}
                style={{ width: '100%', borderRadius: '8px', padding: '2px', height: '40px', border: 'none' }}
                placeholder="Select Model"
              >
                <Option value="">Select</Option>
                {models.map((m) => (
                  <Option key={m} value={m}>
                    {m}
                  </Option>
                ))}
              </Select>
            </div>

            <ProgressBar step={step} totalSteps={totalSteps} />

            <StepNavigation
              canContinue={!!model}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-md font-medium mb-3 text-gray-800">Select the car body style</h2>
            <div className="relative mb-4">
              <Select
                value={manufacturer}
                onChange={(e) => setManufacturer(e)}
                style={{ width: '100%', borderRadius: '8px', padding: '2px', height: '40px', border: 'none' }}
                placeholder="Select Manufacturer"
              >
                <Option value="">Select</Option>
                {manufacturers.map((m) => (
                  <Option key={m} value={m}>
                    {m}
                  </Option>
                ))}
              </Select>
            </div>

            <ProgressBar step={step} totalSteps={totalSteps} />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(3)}
                className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100"
              >
                Back
              </button>
              <button
                onClick={() => onComplete({ year, company, manufacturer, model })}
                disabled={!manufacturer}
                className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-800 hover:bg-[#0067a1] hover:text-white border border-gray-100 cursor-pointer  bg-[#d0d0d0]"
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

