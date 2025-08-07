'use client';
import React, { useState, useEffect } from 'react';

type ConfirmationProps = {
  country: string;
  phone: string;
  email: string;
  onChange: (field: string, value: string) => void;
};

const countries = [
  'India', 'United States', 'United Kingdom', 'Bahrain',
  'Saudi Arabia', 'UAE', 'Qatar', 'Kuwait'
];

const CommunicationForm = ({ country, phone, email, onChange }: ConfirmationProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const filtered = countries.filter(c =>
    c.toLowerCase().includes(country.toLowerCase())
  );

  const handleSelect = (selectedCountry: string) => {
    onChange('country', selectedCountry);
    setShowOptions(false);
  };

  return (
    <div>
      <div className="form-container w-75 ml-0 sm:ml-16 md:ml-16 lg:ml-16 xl:ml-16">
        <form action="#">
          <div className="flex flex-col gap-y-4">

            <div className="relative">
              <input
                type="text"
                value={country}
                onChange={(e) => {
                  onChange('country', e.target.value);
                  setShowOptions(true);
                }}
                onFocus={() => setShowOptions(true)}
                placeholder="Enter your country"
                className="py-3 px-5 w-full border border-[#d2d0d0] placeholder-gray-400 focus:outline-none focus:border-black rounded-md"
              />
              {showOptions && filtered.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md max-h-60 overflow-y-auto">
                  {filtered.map((c, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleSelect(c)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <input
                type="text"
                maxLength={10}
                value={phone}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="Enter contact number"
                className="py-3 px-5 w-full border border-[#d2d0d0] placeholder-gray-400 focus:outline-none focus:border-black rounded-md"
              />
            </div>

            <div>
              <input
                type='email'
                required
                value={email}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="Enter email"
                className="py-3 px-5 w-full border border-[#d2d0d0] placeholder-gray-400 focus:outline-none focus:border-black rounded-md"
              />
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunicationForm;
