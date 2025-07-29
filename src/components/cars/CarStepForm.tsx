'use client'

import { Select } from 'antd';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

const { Option } = Select;

type Car = {
  year: string;
  manufacturer: string;
  company: string;
  model: string;
  brand: string;
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
  const [brand, setBrands] = useState('');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');

  const brands = ['Nissan', 'Toyoto', 'GMC', 'Honda', 'Hyundai'];
  const years = Array.from({ length: 8 }, (_, i) => `${2026 - i}`);
  const companies = ['Acura', 'BMW', 'Audi', 'Toyota'];
  const models = ['copper', 'sample1', 'sample2'];
  const manufacturers = ['5/40xi 4WD', '4/20i RWD', '3/10xi AWD'];

  const totalSteps = 5;

  return (
    <div className="relative mx-end w-[100%] sm:w-[380px] md:w-[380px] lg:w-[380px] 
      xl:w-[380px] ml-0 sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10pt-6 pb-2 
      border border-0 sm:!border sm:!border-[#d2d0d0]  p-4 h-[260px] rounded-md mt-8">

      <button
        onClick={onCancel}
        className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        ×
      </button>

      {step === 1 && (
        <>
          <h2 className="text-md font-medium mb-3 text-gray-800">Select the production year</h2>
          <Select
            value={year}
            onChange={setYear}
            style={{ width: '100%', borderRadius: 8, height: 40 }}
            placeholder="Select Year"
          >
            <Option value="">Select</Option>
            {years.map((y) => (
              <Option key={y} value={y}>{y}</Option>
            ))}
          </Select>
          <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
            <ProgressBar step={step} totalSteps={totalSteps} />
            <StepNavigation canContinue={!!year} onBack={onCancel} onNext={() => setStep(2)} />
          </div>

        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-md font-medium mb-3 text-gray-800">Select the car manufacturing company</h2>
          <Select
            value={company}
            onChange={setCompany}
            style={{ width: '100%', borderRadius: 8, height: 40 }}
            placeholder="Select Company"
          >
            <Option value="">Select</Option>
            {companies.map((c) => (
              <Option key={c} value={c}>{c}</Option>
            ))}
          </Select>
          <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
            <ProgressBar step={step} totalSteps={totalSteps} />
            <StepNavigation canContinue={!!company} onBack={() => setStep(1)} onNext={() => setStep(3)} />
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-md font-medium mb-3 text-gray-800">Select the car model</h2>
          <Select
            value={model}
            onChange={setModel}
            style={{ width: '100%', borderRadius: 8, height: 40 }}
            placeholder="Select Model"
          >
            <Option value="">Select</Option>
            {models.map((m) => (
              <Option key={m} value={m}>{m}</Option>
            ))}
          </Select>
          <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
            <ProgressBar step={step} totalSteps={totalSteps} />
            <StepNavigation canContinue={!!model} onBack={() => setStep(2)} onNext={() => setStep(4)} />
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h2 className="text-md font-medium mb-3 text-gray-800">Select the car body style</h2>
          <Select
            value={manufacturer}
            onChange={setManufacturer}
            style={{ width: '100%', borderRadius: 8, height: 40 }}
            placeholder="Select Manufacturer"
          >
            <Option value="">Select</Option>
            {manufacturers.map((m) => (
              <Option key={m} value={m}>{m}</Option>
            ))}
          </Select>
          <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
            <ProgressBar step={step} totalSteps={totalSteps} />
            <StepNavigation canContinue={!!manufacturer} onBack={() => setStep(3)} onNext={() => setStep(5)} />
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <h2 className="text-md font-medium mb-3 text-gray-800">Select the car's Brand</h2>
          <Select
            value={brand}
            onChange={setBrands}
            style={{ width: '100%', borderRadius: 8, height: 40 }}
            placeholder="Select Brand"
          >
            <Option value="">Select</Option>
            {brands.map((b) => (
              <Option key={b} value={b}>{b}</Option>
            ))}
          </Select>
          <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">

            <ProgressBar step={step} totalSteps={totalSteps} />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(4)}
                className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100"
              >
                Back
              </button>
              <button
                onClick={() => onComplete({ year, company, manufacturer, model, brand })}
                disabled={!brand}
                className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100 transition-colors duration-200
                ${brand ? 'bg-[#0067a1] text-white hover:bg-[#005780]' : 'bg-[#d0d0d0] text-gray-800 hover:bg-gray-300'}
              `}
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}
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
        className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100"
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={!canContinue}
        className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100 transition-colors duration-200
          ${canContinue ? 'bg-[#0067a1] text-white hover:bg-[#005780]' : 'bg-[#d0d0d0] text-gray-800 hover:bg-gray-300'}
        `}
      >
        Next
      </button>
    </div>
  );
}
