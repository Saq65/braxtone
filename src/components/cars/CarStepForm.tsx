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
  owner: string;
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
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const manufacturers = ['5/40xi 4WD', '4/20i RWD', '3/10xi AWD'];
  const carTrim = ['NAVIGATION', 'ROADSTER', 'STD'];
  const registationMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];
  const Ownership = ['Cash / Fully owned', 'Installment'];
  const [owner, setOwner] = useState('');
  const [registationMon, setregistationMon] = useState('');
  const [trim, setCarTrim] = useState('');

  const totalSteps = 6;
  const [brands, setBrands] = useState<string[]>([]); useState([]);
  const [selectedBrand, setSelectedBrand] = useState<{ value: string; label: React.ReactNode } | undefined>(undefined);
  const [models, setModels] = useState<string[]>([]);
  const [brandsMap, setBrandsMap] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get('/api/brands');
        const allBrandsObj = res.data?.[0]?.brands || {};

        const brandList = Object.entries(allBrandsObj).map(([key, brand]: [string, any]) => ({
          _id: key, // use key like "toyota", "bmw"
          ...brand,
        }));
        setBrandsMap(allBrandsObj);
        setBrands(brandList);
      } catch (error) {
        console.error('Client fetch error:', error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (!selectedBrandId) return;

    const fetchModels = async () => {
      try {
        const res = await axios.get(`/api/car/model?brandID=${selectedBrandId}`);

        const data = res.data;
        const modelsList = Object.keys(data.models || {});


        setModels(modelsList);
      } catch (error) {
        console.error('Failed to fetch models:', error);
      }
    };

    fetchModels();
  }, [selectedBrandId]);

const handleSubmit = async () => {
  const payload = {
    year,
    company,
    manufacturer,
    model,
    brands: selectedBrandId,
    owner,
  };

  console.log("📤 Sending payload to API:", payload); 

  try {
    const response = await axios.post('/api/quote', payload);
    console.log("✅ Quote created successfully:", response.data);

    // Check if database saved it
    if (response.data && response.data.id) {
      console.log("💾 Saved to DB with ID:", response.data.id); // Step 3
    } else {
      console.warn("⚠️ API response did not return a valid ID.");
    }

    onComplete(response.data); // send to parent component if needed
  } catch (error: any) {
    console.error("❌ Error while creating quote:", error.response?.data || error.message); // Step 4
  }
};



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
            <h2 className="text-md font-medium mb-3 text-gray-800">Select the car's Brand</h2>
            <Select
              labelInValue
              value={
                selectedBrand
                  ? {
                    value: selectedBrand.value,
                    label: (
                      <div className="flex items-center gap-2">
                        <img
                          src={brandsMap[selectedBrand.value]?.brandImage}
                          alt={brandsMap[selectedBrand.value]?.brandName}
                          className="w-6 h-6 object-contain"
                        />
                        {brandsMap[selectedBrand.value]?.brandName}
                      </div>
                    ),
                  }
                  : undefined
              }
              onChange={(option) => {
                setSelectedBrand(option); // { value: 'audi', label: <...> }
                setSelectedBrandId(option.value); // use ID for API
              }}
              style={{ width: '100%', borderRadius: 8, height: 40 }}
              placeholder="Select Brand"
            >
              <Option value="" disabled>Select</Option>
              {Object.entries(brandsMap).map(([key, brand]: [string, any]) => (
                <Option key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <img src={brand.brandImage} alt={brand.brandName} className="w-6 h-6 object-contain" />
                    {brand.brandName}
                  </div>
                </Option>
              ))}
            </Select>


            <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">

              <ProgressBar step={step} totalSteps={totalSteps} />
              <StepNavigation canContinue={!!selectedBrandId} onBack={onCancel} onNext={() => setStep(2)} />
            </div>
          </>
        )}

        {step === 2 && (
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
              <StepNavigation canContinue={!!year} onBack={() => setStep(1)} onNext={() => setStep(3)} />
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
            <h2 className="text-md font-medium mb-3 text-gray-800">Select the car's trim</h2>
            <Select
              value={trim}
              onChange={setCarTrim}
              style={{ width: '100%', borderRadius: 8, height: 40 }}
              placeholder="Select car trim"
            >
              <Option value="">Select</Option>
              {carTrim.map((m) => (
                <Option key={m} value={m}>{m}</Option>
              ))}
            </Select>
            <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
              <ProgressBar step={step} totalSteps={totalSteps} />
              <StepNavigation canContinue={!!trim} onBack={() => setStep(3)} onNext={() => setStep(5)} />
            </div>
          </>
        )}


        {step === 5 && (
          <>
            <h2 className="text-md font-medium mb-3 text-gray-800">Select the car's registration month</h2>
            <Select
              value={registationMon}
              onChange={setregistationMon}
              style={{ width: '100%', borderRadius: 8, height: 40 }}
              placeholder="Select car trim"
            >
              <Option value="">Select</Option>
              {registationMonth.map((m) => (
                <Option key={m} value={m}>{m}</Option>
              ))}
            </Select>
            <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
              <ProgressBar step={step} totalSteps={totalSteps} />
              <StepNavigation canContinue={!!registationMon} onBack={() => setStep(4)} onNext={() => setStep(6)} />
            </div>
          </>
        )}


        {step === 6 && (
          <>
            <h2 className="text-md font-medium mb-3 text-gray-800">Select the car's ownership types</h2>
            <Select
              value={owner}
              onChange={setOwner}
              style={{ width: '100%', borderRadius: 8, height: 40 }}
              placeholder="Select Manufacturer"
            >
              <Option value="">Select</Option>
              {Ownership.map((m) => (
                <Option key={m} value={m}>{m}</Option>
              ))}
            </Select>
            <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
              <ProgressBar step={step} totalSteps={totalSteps} />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setStep(5)}
                  className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100"
                >
                  Back
                </button>
                <button
                  // onClick={() => onComplete({
                  //   year,
                  //   company,
                  //   manufacturer,
                  //   model,
                  //   brands: selectedBrandId,
                  //   owner,
                  // })}
                  onClick={handleSubmit}
                  disabled={!selectedBrandId}
                  className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100 transition-colors duration-200
                ${selectedBrandId ? 'bg-[#0067a1] text-white hover:bg-[#005780]' : 'bg-[#d0d0d0] text-gray-800 hover:bg-gray-300'}
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