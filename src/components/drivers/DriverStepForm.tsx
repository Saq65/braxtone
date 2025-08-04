'use client';

import { Select, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const { Option } = Select;

type Driver = {
  name: string;
  nationality: string;
  nationalId: string;
  age: string;
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
  const [nationality, setNationality] = useState('');
  const [nationalId, setnationalId] = useState('');
  const [whatAge, setwhatAge] = useState('');

  const Age = ['18 to 24 year', '25 - 34 year', '35 - 44 year', '45+'];
  const nationalities = [
    "Afghan",
    "Albanian",
    "Algerian",
    "American",
    "Andorran",
    "Angolan",
    "Argentine",
    "Armenian",
    "Australian",
    "Austrian",
    "Azerbaijani",
    "Bahraini",
    "Bangladeshi",
    "Belgian",
    "Brazilian",
    "British",
    "Bulgarian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Dutch",
    "Ecuadorian",
    "Egyptian",
    "Emirati",
    "English",
    "Estonian",
    "Ethiopian",
    "Finnish",
    "French",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Guatemalan",
    "Haitian",
    "Honduran",
    "Hungarian",
    "Icelandic",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakh",
    "Kenyan",
    "Kuwaiti",
    "Latvian",
    "Lebanese",
    "Libyan",
    "Lithuanian",
    "Luxembourgish",
    "Malaysian",
    "Malian",
    "Maltese",
    "Mexican",
    "Moroccan",
    "Nepalese",
    "New Zealander",
    "Nicaraguan",
    "Nigerian",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palestinian",
    "Panamanian",
    "Peruvian",
    "Philippine",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saudi",
    "Scottish",
    "Senegalese",
    "Serbian",
    "Singaporean",
    "Slovak",
    "Slovenian",
    "Somali",
    "South African",
    "South Korean",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tanzanian",
    "Thai",
    "Tunisian",
    "Turkish",
    "UAE",
    "USA",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbek",
    "Venezuelan",
    "Vietnamese",
    "Welsh",
    "Yemeni",
    "Zambian",
    "Zimbabwean",
  ];

  const totalSteps = 4;

  const handleSubmitDriver = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    const payload = {
      name,
      nationality,
      nationalId,
      whatAge,
    };
    console.log("Sending payload driver to API:", payload);
    try {
      const response = await axios.post('/api/quote', payload);
      console.log("Quote created successfully:", response.data);

      if (response.data && response.data.id) {
        console.log("Saved to DB with ID:", response.data.id);
      } else {
        console.warn("API response did not return a valid ID.");
      }

      onComplete(response.data.data);
    } catch (error: any) {
      console.error("Error while creating quote:", error.response?.data || error.message);
    }
  }
  return (
    <div className=''>
      {/* <button className="w-[100%] sm:w-[380px] md:w-[380px] lg:w-[380px] xl:w-[380px] ml-0 sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10 border border-dashed border-gray-400 p-8 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
        + Add Driver
      </button> */}

      <div className="relative mx-end w-[100%] sm:w-[380px] md:w-[380px] lg:w-[380px] 
      xl:w-[380px] ml-0 sm:ml-8 md:ml-8 lg:ml-8 xl:ml-8 pt-6 pb-2 
      border border-0 sm:!border sm:!border-[#d2d0d0]  p-4 h-[260px] rounded-md mt-8">
        <button
          onClick={onCancel}
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ×
        </button>
        <form method="post" onSubmit={handleSubmitDriver}>
          {step === 1 && (
            <>
              <h2 className="text-md font-medium mb-3 text-gray-800">Enter drivers fullname</h2>
              <div>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="mb-4"
                  size="large"
                />
              </div>
              <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
                <ProgressBar step={step} totalSteps={totalSteps} />
                <StepNavigation
                  canContinue={!!name}
                  onBack={onCancel}
                  onNext={() => setStep(2)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-md font-medium mb-3 text-gray-800">What is your nationality?</h2>

              <Select
                showSearch
                value={nationality}
                onChange={(value) => setNationality(value)}
                placeholder="Select Nationality"
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const label = (option?.label ?? option?.children) as string;
                  return label.toLowerCase().includes(input.toLowerCase());
                }}
                style={{ width: '100%', height: '40px', borderRadius: '8px' }}
                className="mb-4"
              >
                <Option value="">Select</Option>
                {nationalities.map((nat) => (
                  <Option key={nat} value={nat}>
                    {nat}
                  </Option>
                ))}
              </Select>

              <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
                <ProgressBar step={step} totalSteps={totalSteps} />
                <StepNavigation
                  canContinue={!!nationality}
                  onBack={() => setStep(1)}
                  onNext={() => setStep(3)}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-md font-medium mb-3 text-gray-800">What is your national id?</h2>
              <Input
                value={nationalId}
                onChange={(e) => setnationalId(e.target.value)}
                placeholder="National Id"
                className="mb-4"
                size="large"
              />

              <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
                <ProgressBar step={step} totalSteps={totalSteps} />
                <StepNavigation
                  canContinue={!!nationalId}
                  onBack={() => setStep(2)}
                  onNext={() => setStep(4)}
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-md font-medium mb-3 text-gray-800">What is your age?</h2>
              <Select
                value={whatAge}
                onChange={(value) => setwhatAge(value)}
                placeholder="Select Experience Level"
                style={{ width: '100%', height: '40px', borderRadius: '8px' }}
                className="mb-4"
              >
                <Option value="">Select</Option>
                {Age.map((exp) => (
                  <Option key={exp} value={exp}>
                    {exp}
                  </Option>
                ))}
              </Select>
              <div className="fixed top-[81%] w-[90%] sm:static sm:w-auto sm:block">
                <ProgressBar step={step} totalSteps={totalSteps} />
                {/* <StepNavigation
                canContinue={!!whatAge}
                onBack={() => setStep(3)}
                onNext={() => setStep(5)}
              /> */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setStep(5)}
                    className="rounded-md w-[140px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100"
                  >
                    Back
                  </button>
                  <button
                    // onClick={() =>
                    //   onComplete({ name, licenseNumber, vehicleType, experienceLevel })
                    // }
                    // onClick={handleSubmitDriver}
                    type='submit'
                    disabled={!whatAge}
                    className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100 transition-colors duration-200
               ${whatAge
                        ? 'cursor-pointer bg-[#0067a1] text-white hover:bg-[#005780]'
                        : ' bg-[#d0d0d0] text-gray-800 hover:bg-gray-300'}
               `}
                  >
                    Add
                  </button>

                </div>
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
        className={`rounded-md w-[140px] py-4 mt-3 text-sm border border-gray-100
        ${canContinue
            ? 'cursor-pointer bg-[#0067a1] text-white hover:bg-[#005780]'
            : ' bg-[#d0d0d0] text-gray-800 hover:bg-gray-300'}
          `}
      >
        Next
      </button>


    </div>
  );
}