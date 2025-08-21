'use client';
import { Select, Modal, Input as AntInput } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineCall } from 'react-icons/md';
import { RiArrowRightWideLine } from "react-icons/ri";
import { ImPhone } from "react-icons/im";
import Flag from 'react-world-flags';

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
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<{ value: string; label: React.ReactNode }>();
  const [registationMon, setregistationMon] = useState('');

  const years = useMemo(() => Array.from({ length: 8 }, (_, i) => `${2026 - i}`), []);
  const [brands, setBrands] = useState<string[]>([]);
  const [brandsMap, setBrandsMap] = useState<Record<string, any>>({});
  const [models, setModels] = useState<string[]>([]);
  const [banks, setbanks] = useState<string[]>([]);
  const [banksValue, setBankValue] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("BH");
  const [phoneNumber, setPhoneNumber] = useState("");

  // CONTACT MODAL STATE
  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });

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
    setStep(Math.min(Math.max(next, 1), totalSteps));
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
    const payload = {
      year,
      company,
      manufacturer,
      model,
      brands: selectedBrandId,
      owner: '',
      banksValue,
      registationMon,
      contact,
    };
    try {
      const response = await axios.post('/api/quote', payload);
      if (response.data && response.data.id) setFormCompleted(true);
      onComplete(response.data.data);
    } catch (error) {
      console.error('Error while creating quote:', error);
    }
  };

  const allowedMonths = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const d = dayjs().startOf('month').add(i, 'month');
      return { label: d.format('MMMM YYYY'), value: d.format('YYYY-MM') };
    });
  }, []);

  const countries = [
    { code: 'BH', name: 'Bahrain' },
    { code: 'IN', name: 'India' },
    { code: 'AE', name: 'UAE' },
    { code: 'QA', name: 'Qatar' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'OM', name: 'Oman' },
  ];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };
  const totalSteps = 4;

  const handleBackClick = () => goToStep(step - 1);
  const handleNextClick = () => {
    if (step < totalSteps) goToStep(step + 1);
  };

  const handleMonthChange = (val: string) => {
    const idx = allowedMonths.findIndex((m) => m.value === val);
    setregistationMon(val);
    if (idx > 0) {
      setContactOpen(true);
    }
  };

  const isEmail = (s: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
  const isPhone = (s: string) =>
    /^[0-9+()\-\s]{6,}$/.test(s.trim());

  const contactValid =
    contact.name.trim().length > 1 &&
    isEmail(contact.email) &&
    isPhone(contact.phone);

  const closeContactModal = () => {
    setContactOpen(false);
    setregistationMon(allowedMonths[0]?.value || '');
  };

  const saveContactModal = () => {
    setContactOpen(false);
  };

  const canProceed = (() => {
    switch (step) {
      case 1: return Boolean(selectedBrandId);
      case 2: return Boolean(year);
      case 3: return Boolean(model);
      case 4: return Boolean(registationMon);
      default: return false;
    }
  })();

  const Step1 = (
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

  const Step2 = (
    <>
      <h2 className="text-[16px] font-[500] mb-3 text-gray-800">Select the car&apos;s year make</h2>
      <Select
        value={year}
        onChange={(val) => setYear(val)}
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

  const Step3 = (
    <>
      <h2 className="text-[16px] font-[500] mb-3 text-gray-800">Select the car model</h2>
      <Select
        value={model}
        onChange={(val) => setModel(val)}
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

  const Step4 = (
    <>
      <h2 className="text-[16px] font-[500] mb-3 text-gray-800">Select the car&apos;s registration month</h2>
      <Select
        value={registationMon}
        onChange={handleMonthChange}
        style={{ width: '100%', borderRadius: 8, height: 40 }}
        placeholder="Select month"
      >
        <Option value="">Select</Option>
        {allowedMonths.map((m) => (
          <Option key={m.value} value={m.value}>
            {m.label}
          </Option>
        ))}
      </Select>
      <ProgressBar step={step} totalSteps={totalSteps} />
    </>
  );

  const renderStep = () => {
    switch (step) {
      case 1: return Step1;
      case 2: return Step2;
      case 3: return Step3;
      default: return Step4;
    }
  };

  return (
    <motion.div
      className="relative mx-end w-[100%] sm:w-[380px] md:w-[380px] lg:w-[380px] xl:w-[380px] ml-0 sm:ml-16 md:ml-16 lg:ml-16 xl:ml-16
       pt-6 pb-2 border border-0 sm:!border sm:!border-[#d2d0d0] p-5 max-h-[300px] min-h-[250px] rounded-md xl:p-5"
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

          <div className=" justify-between mt-4 hidden md:flex lg:flex xl:flex sm:flex">
            <button
              type="button"
              onClick={handleBackClick}
              disabled={step === 1}
              className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100
                ${step === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 cursor-pointer'}`}
            >
              Back
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                disabled={!canProceed}
                onClick={handleNextClick}
                className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100 transition-colors duration-200
                  ${canProceed
                    ? 'bg-[#0067a1] text-white hover:bg-[#005780] cursor-pointer'
                    : 'bg-[#d0d0d0] text-gray-800 cursor-not-allowed'}`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canProceed}
                className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100 transition-colors duration-200
                  ${canProceed
                    ? 'bg-[#0067a1] text-white hover:bg-[#005780] cursor-pointer'
                    : 'bg-[#d0d0d0] text-gray-800 cursor-not-allowed'}`}
              >
                Add
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Contact Information Modal */}
      <Modal
        open={contactOpen}
        title=""
        footer={null}
        okButtonProps={{ disabled: !contactValid }}
        destroyOnClose
        onCancel={closeContactModal}
        className='w-[65%]'
      >
        <div className="p-6 mx-auto">
          <div className='flex items-start gap-0'>
            <div>
              <RiArrowRightWideLine size={21} className='mt-1 text-[#1252de]' />
            </div>
            <p className='font-semibold  text-[22px] text-center ' style={{ lineHeight: '1.3' }}>
              To complete your Insurance, we may ask for some additional information.</p>
          </div>

          <div className="mt-10 border border-[#88a8ee] rounded-[5px] py-3 flex items-center justify-between px-5">
            <div className='flex items-center gap-3'>
              <div className='bg-[#075e54] rounded-full h-11 w-11 flex justify-center items-center'>
                <FaWhatsapp size={22} className='text-white' />
              </div>
              <div>
                <p className='text-lg font-semibold'>WhatsApp Us</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='bg-[#ff6700] rounded-full h-11 w-11 flex justify-center items-center'>
                <MdOutlineCall size={20} className='text-white' />
              </div>
              <div>
                <p className="text-lg font-semibold">Call Us At</p>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center py-5 px-4 mt-4'>
            <span className='font-medium'>Or</span>
          </div>
          <div className='flex items-center justify-center gap-1'>
            <RiArrowRightWideLine size={17} className="font-semibold" color="#1252de" style={{ transform: 'scale(1.3)' }} />
            <p className='text-xl font-semibold'>Let us know how to reach you</p>
          </div>

          {/* Country Select Dropdown */}
          <div className="mt-7 flex justify-between items-center border px-3 rounded-[5px] border-[#002d97] w-[100%]">
            <div className="w-[6%]">
              {/* Flag icon */}
              <Flag code={selectedCountry} style={{ width: '20px', height: '16px' }} />
            </div>
            <div className="w-[92%]">
              <select
                className="w-full py-4 px-2 border-none"
                style={{ outline: 'none' }}
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    <Flag code={country.code} style={{ width: '20px', height: '16px', marginRight: '10px' }} />
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="mt-7 flex justify-between items-center border px-3 rounded-[5px] border-[#002d97] w-[100%]">
            <div className='w-[6%] '><ImPhone className='text-[#9f9d9d] mx-auto' /></div>
            <div className='w-[92%]'>
              <input
                type="text"
                className="w-full py-4 px-2 border-none"
                placeholder="Phone number"
                style={{ outline: 'none' }}
              />
            </div>
          </div>

          <div className='mt-7 flex justify-between items-center'>
            <div className='border py-3 px-3 w-[30%] rounded-[6px] text-[#9f9d9d] text-center'>Go Back</div>
            <div className=' py-3 px-3 w-[30%] bg-[#d0d0d0] text-[#9f9d9d] rounded-[6px] text-center flex items-center justify-center gap-2'>ok <RiArrowRightWideLine className='font-bold' /></div>
          </div>
        </div>
      </Modal>


    </motion.div>
  );
}

function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  const pct = (step / totalSteps) * 100;
  return (
    <div className="h-[9px] w-full bg-gray-200 rounded mt-4 overflow-hidden mt-[0%] sm:mt-[1px] md:mt-[1px] lg:mt-[1px] xl:mt-[17px]">
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
