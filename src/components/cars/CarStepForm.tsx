'use client'

import { Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const { Option } = Select;

type Car = {
  year: string;
  manufacturer: string;
  company: string;
  model: string;
  brands: string;
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
  // const [brand, setBrands] = useState('');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');

  // const brands = ['Nissan', 'Toyoto', 'GMC', 'Honda', 'Hyundai'];
  const years = Array.from({ length: 8 }, (_, i) => `${2026 - i}`);
  const companies = ['Acura', 'BMW', 'Audi', 'Toyota'];
  // const models = ['copper', 'sample1', 'sample2'];
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const manufacturers = ['5/40xi 4WD', '4/20i RWD', '3/10xi AWD'];

  const totalSteps = 5;
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("select");
  const [models, setModels] = useState<string[]>([]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get('/api/brands');

        const allBrandsObj = res.data?.[0]?.brands || {};
        const brandList = Object.values(allBrandsObj);

        setBrands(brandList);
      } catch (error) {
        console.error('Client fetch error:', error);
      }
    };

    fetchBrands();
  }, []);

useEffect(() => {
  const fetchModels = async () => {
    if (!selectedBrandId) return;
    try {
      const res = await axios.get(`/api/car/model?brandID=${selectedBrandId}`);
      const modelData = res.data?.models || {};
      const modelList = Object.values(modelData).map((m: any) => m.modelName);
      setModels(modelList);
    } catch (error) {
      console.error('Failed to fetch models:', error);
    }
  };
  fetchModels();
}, [selectedBrandId]);



  console.log(brands, "jafok")

  return (
    <div className="relative mx-end w-[100%] sm:w-[380px] md:w-[380px] lg:w-[380px] 
      xl:w-[380px] ml-0 sm:ml-16 md:ml-16 lg:ml-16 xl:ml-16 pt-6 pb-2 
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
          <h2 className="text-md font-medium mb-3 text-gray-800">Select the car's Brand</h2>
   <Select
  value={selectedBrandId}
  onChange={(value) => setSelectedBrandId(value)}
  style={{ width: '100%', borderRadius: 8, height: 40 }}
  placeholder="Select Brand"
  optionLabelProp="label"
>
  <Option value="" disabled>Select</Option>
  {brands.map((b: any) => (
    <Option key={b._id} value={b._id} label={b.brandName}>
      <div className="flex items-center gap-2">
        <img src={b.brandImage} alt={b.brandName} className="w-6 h-6 object-contain" />
        {b.brandName}
      </div>
    </Option>
  ))}
</Select>


          <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
            <ProgressBar step={step} totalSteps={totalSteps} />
            <StepNavigation canContinue={!!selectedBrand} onBack={() => setStep(2)} onNext={() => setStep(4)} />
          </div>
        </>
      )}

      {step === 4 && (
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
            <StepNavigation canContinue={!!model} onBack={() => setStep(3)} onNext={() => setStep(5)} />
          </div>
        </>
      )}


      {step === 5 && (
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

      {/* {step === 5 && (
        <>
          <h2 className="text-md font-medium mb-3 text-gray-800">Select the car's Brand</h2>
          <Select
            value={selectedBrand}
            onChange={setSelectedBrand}
            style={{ width: '100%', borderRadius: 8, height: 40 }}
            placeholder="Select Brand"
            optionLabelProp="label"
          >
            <Option value="__none__" disabled>Select</Option>
            {brands.map((b: any) => (
              <Option key={b.brandName} value={b.brandName} label={b.brandName}>
                <div className="flex items-center gap-2">
                  <img src={b.brandImage} alt={b.brandName} className="w-6 h-6 object-contain" />
                  {b.brandName}
                </div>
              </Option>
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
                onClick={() => onComplete({ year, company, manufacturer, model, brands: selectedBrand })}
                disabled={!selectedBrand}
                className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100 transition-colors duration-200
                ${selectedBrand ? 'bg-[#0067a1] text-white hover:bg-[#005780]' : 'bg-[#d0d0d0] text-gray-800 hover:bg-gray-300'}
              `}
              >
                Add
              </button>
            </div>
          </div>
        </>
      )} */}
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
