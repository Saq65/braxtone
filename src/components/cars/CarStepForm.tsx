import { Select } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const { Option } = Select;

type Car = {
  year: string;
  manufacturer: string;
  company: string;
  model: string;
  brands: string;
  owner: string;
  banksValue: string;
}

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
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [owner, setOwner] = useState('');
  const [registationMon, setregistationMon] = useState('');
  const [trim, setCarTrim] = useState('');

  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<{ value: string; label: React.ReactNode } | undefined>(undefined);
  const [models, setModels] = useState<string[]>([]);
  const [brandsMap, setBrandsMap] = useState<Record<string, any>>({});
  const [banks, setbanks] = useState<string[]>([]);
  const [banksValue, setBankValue] = useState('');
  const [bankSelected, setBankSelected] = useState(false);
const [formCompleted, setFormCompleted] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get('/api/brands');
        const allBrandsObj = res.data?.[0]?.brands || {};
        const brandList = Object.entries(allBrandsObj).map(([key, brand]: [string, any]) => ({
          _id: key,
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

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get('/api/banks');
        const data = res.data;
        const bankList = Object.keys(data.banks || {});
        setbanks(bankList);
      } catch (error) {
        console.error('Client fetch error:', error);
      }
    };

    fetchBrands();
  }, []);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Your existing code for preparing the payload
  const payload = {
    year,
    company,
    manufacturer,
    model,
    brands: selectedBrandId,
    owner,
    banksValue,
  };

  try {
    const response = await axios.post('/api/quote', payload);
    console.log("Quote created successfully:", response.data);

    // Set form completed once the last step is done
    if (response.data && response.data.id) {
      setFormCompleted(true); // Mark the form as completed
    }
    onComplete(response.data.data);
  } catch (error) {
    console.error("Error while creating quote:", error);
  }
};


  const displayFormat = "MMMM";
  const allowedMonths = Array.from({ length: 3 }, (_, i) =>
    dayjs().add(i, "month").format(displayFormat)
  );

  const totalSteps = 4;

  // Handling the back step
  const handleBackClick = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="relative mx-end w-[100%] sm:w-[380px] md:w-[380px] lg:w-[380px] 
     xl:w-[380px] ml-0 sm:ml-16 md:ml-16 lg:ml-16 xl:ml-16 pt-6 pb-2 border border-0 sm:!border sm:!border-[#d2d0d0]
      p-5 h-[260px] rounded-md">
      <div className='flex justify-between items-start'>
        <div>
          <IoIosArrowBack
            className="text-md cursor-pointer"
            onClick={handleBackClick}
          />
        </div>
        <button
          onClick={onCancel}
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ×
        </button>
      </div>

      <div className='mt-6'>
        <form method='post' onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <h2 className="text-[17px] font-[500] mb-3 text-gray-800 ">Select the car's Brand</h2>
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
                  setSelectedBrand(option);
                  setSelectedBrandId(option.value);
                  setStep(2); // Manually advance to next step
                }}
                style={{ width: '100%', borderRadius: 8, height: 40, outline: 'none', borderColor: '#d9d9d9', }}
                placeholder="Select Brand"
              >
                <Option value="" disabled style={{
                  outline: 'none',
                  borderColor: '#d9d9d9',
                }}>Select</Option>
                {Object.entries(brandsMap).map(([key, brand]: [string, any]) => (
                  <Option key={key} value={key} style={{
                    outline: 'none',
                    borderColor: '#d9d9d9',
                  }}>
                    <div className="flex items-center gap-2">
                      <img src={brand.brandImage} alt={brand.brandName} className="w-6 h-6 object-contain" />
                      {brand.brandName}
                    </div>
                  </Option>
                ))}
              </Select>

              <ProgressBar step={step} totalSteps={totalSteps} />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-[16px] font-[500] mb-3 text-gray-800">Select the car's year make</h2>
              <Select
                value={year}
                onChange={(val) => {
                  setYear(val);
                  setStep(3);
                }}
                style={{ width: '100%', borderRadius: 8, height: 40 }}
                placeholder="Select Year"
              >
                <Option value="">Select</Option>
                {years.map((y) => (
                  <Option key={y} value={y}>{y}</Option>
                ))}
              </Select>
              <ProgressBar step={step} totalSteps={totalSteps} />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-[16px] font-[500] mb-3 text-gray-800">Select the car model</h2>
              <Select
                value={model}
                onChange={(val) => {
                  setModel(val);
                  setStep(4);
                }} style={{ width: '100%', borderRadius: 8, height: 40 }}
                placeholder="Select Model"
              >
                <Option value="">Select</Option>
                {models.map((m) => (
                  <Option key={m} value={m}>{m}</Option>
                ))}
              </Select>
              <ProgressBar step={step} totalSteps={totalSteps} />
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-[16px] font-[500] mb-3 text-gray-800">
                Select the car's registration month
              </h2>

              <Select
                value={registationMon}
                onChange={setregistationMon}
                style={{ width: "100%", borderRadius: 8, height: 40 }}
                placeholder="Select car trim"
              >
                <Option value="">Select</Option>
                {allowedMonths.map((m) => (
                  <Option key={m} value={m}>
                    {m}
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
                  type='submit'
                  disabled={!registationMon}
                  className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100 transition-colors duration-200
                  ${registationMon ? 'bg-[#0067a1] text-white hover:bg-[#005780]' : 'bg-[#d0d0d0] text-gray-800 hover:bg-gray-300'}`}
                >
                  Add
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="h-[9px] w-full bg-gray-200 rounded mt-4">
      <div
        className="h-full bg-[#0068a2]  rounded transition-all duration-300 mt-[170%] sm:mt-6 md:mt-12 lg:mt-12 xl:mt-12"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      />
    </div>
  );
}
