'use client';
import { Select } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { AnimatePresence, motion ,type Variants} from 'framer-motion';

const { Option } = Select;

type Car = {
  year: string;
  manufacturer: string;
  company: string;
  model: string;
  brands: string;
  owner: string;
  banksValue: string;
};

export default function CarStepForm({
  onComplete,
  onCancel,
}: {
  onComplete: (car: Car) => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1); 

  const [year, setYear] = useState('');
  const [company, setCompany] = useState('');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');

  const years = useMemo(() => Array.from({ length: 8 }, (_, i) => `${2026 - i}`), []);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [owner, setOwner] = useState('');
  const [registationMon, setregistationMon] = useState('');
  const [trim, setCarTrim] = useState('');

  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<{ value: string; label: React.ReactNode }>();
  const [models, setModels] = useState<string[]>([]);
  const [brandsMap, setBrandsMap] = useState<Record<string, any>>({});
  const [banks, setbanks] = useState<string[]>([]);
  const [banksValue, setBankValue] = useState('');
  const [bankSelected, setBankSelected] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);

  // Framer Motion variants using direction
const variants = {
  enter: (dir: 1 | -1) => ({ x: dir * 40, opacity: 0, filter: 'blur(4px)' }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring' as const, stiffness: 500, damping: 40 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (dir: 1 | -1) => ({
    x: dir * -40,
    opacity: 0,
    filter: 'blur(4px)',
    transition: { duration: 0.2 },
  }),
} satisfies Variants;
  const goToStep = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get('/api/brands');
        const allBrandsObj = res.data?.[0]?.brands || {};
        const brandList = Object.entries(allBrandsObj).map(([key, brand]: [string, any]) => ({ _id: key, ...brand }));
        setBrandsMap(allBrandsObj);
        setBrands(brandList as unknown as string[]);
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
    const fetchBanks = async () => {
      try {
        const res = await axios.get('/api/banks');
        const data = res.data;
        const bankList = Object.keys(data.banks || {});
        setbanks(bankList);
      } catch (error) {
        console.error('Client fetch error:', error);
      }
    };
    fetchBanks();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { year, company, manufacturer, model, brands: selectedBrandId, owner, banksValue };
    try {
      const response = await axios.post('/api/quote', payload);
      if (response.data && response.data.id) setFormCompleted(true);
      onComplete(response.data.data);
    } catch (error) {
      console.error('Error while creating quote:', error);
    }
  };

  const displayFormat = 'MMMM';
  const allowedMonths = useMemo(
    () => Array.from({ length: 3 }, (_, i) => dayjs().add(i, 'month').format(displayFormat)),
    []
  );

  const totalSteps = 4;

  const handleBackClick = () => {
    goToStep(Math.max(step - 1, 1));
  };

  // Step content as a function to keep JSX tidy
  const renderStep = () => {
    if (step === 1) {
      return (
        <>
          <h2 className="text-[17px] font-[500] mb-3 text-gray-800">Select the car&apos;s Brand</h2>
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
              goToStep(2);
            }}
            style={{ width: '100%', borderRadius: 8, height: 40, outline: 'none', borderColor: '#d9d9d9' }}
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
          <ProgressBar step={step} totalSteps={totalSteps} />
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <h2 className="text-[16px] font-[500] mb-3 text-gray-800">Select the car&apos;s year make</h2>
          <Select
            value={year}
            onChange={(val) => {
              setYear(val);
              goToStep(3);
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
      );
    }

    if (step === 3) {
      return (
        <>
          <h2 className="text-[16px] font-[500] mb-3 text-gray-800">Select the car model</h2>
          <Select
            value={model}
            onChange={(val) => {
              setModel(val);
              goToStep(4);
            }}
            style={{ width: '100%', borderRadius: 8, height: 40 }}
            placeholder="Select Model"
          >
            <Option value="">Select</Option>
            {models.map((m) => (
              <Option key={m} value={m}>{m}</Option>
            ))}
          </Select>
          <ProgressBar step={step} totalSteps={totalSteps} />
        </>
      );
    }

    // step === 4
    return (
      <>
        <h2 className="text-[16px] font-[500] mb-3 text-gray-800">Select the car&apos;s registration month</h2>
        <Select
          value={registationMon}
          onChange={setregistationMon}
          style={{ width: '100%', borderRadius: 8, height: 40 }}
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
            type="button"
            onClick={() => goToStep(3)}
            className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-100 border border-gray-100"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!registationMon}
            className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100 transition-colors duration-200 cursor-pointer
              ${registationMon ? 'bg-[#0067a1] text-white hover:bg-[#005780]' : 'bg-[#d0d0d0] text-gray-800 hover:bg-gray-300'}`}
          >
            Add
          </button>
        </div>
      </>
    );
  };

  return (
    <motion.div
      className="relative mx-end w-[100%] sm:w-[380px] md:w-[380px] lg:w-[380px] xl:w-[380px] ml-0 sm:ml-16 md:ml-16 lg:ml-16 xl:ml-16 pt-6 pb-2 border border-0 sm:!border sm:!border-[#d2d0d0] p-5 max-h-[300px] min-h-[250px] rounded-md"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex justify-between items-start">
        <div>
          <IoIosArrowBack className="text-md cursor-pointer" onClick={handleBackClick} />
        </div>
        <button onClick={onCancel} className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600 cursor-pointer">
          ×
        </button>
      </div>

      <div className="mt-6">
        <form method="post" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
}

function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  const pct = (step / totalSteps) * 100;
  return (
    <div className="h-[9px] w-full bg-gray-200 rounded mt-4 overflow-hidden">
      <motion.div
        className="h-full bg-[#0068a2]"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
