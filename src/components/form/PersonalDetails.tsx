'use client';
import React, { useState } from 'react';


type ConfirmationProps = {
    nationality: string;
    nationalId: string;
    numberPlate: string;
    onChange: (field: string, value: string) => void;
};

const countries = [
    'India', 'United States', 'United Kingdom', 'Bahrain',
    'Saudi Arabia', 'UAE', 'Qatar', 'Kuwait'
];

const PersonalDetails = ({ nationality, nationalId, numberPlate, onChange }: ConfirmationProps) => {
    const [showOptions, setShowOptions] = useState(false);
    const filtered = countries.filter(c =>
        c.toLowerCase().includes(nationality.toLowerCase())
    );

    const handleSelect = (selectedCountry: string) => {
        onChange('nationality', selectedCountry); // ✅ correct field now
        setShowOptions(false);
    };


    return (
        <div>
            <div className="form-container w-75 ml-18 mt-10">

                <div className='w-[330px] py-3 border border-gray-300 rounded-sm bg-white mb-4 '>
                    <p className='ml-4'>Medgulf Takaful Basic</p>
                </div>
                <form action="#">
                    <div className="flex flex-col gap-y-4">

                        <div className="relative">
                            <input
                                type="text"
                                value={nationality}
                                onChange={(e) => {
                                    onChange('nationality', e.target.value);
                                    setShowOptions(true);
                                }}
                                onFocus={() => setShowOptions(true)}
                                placeholder="Enter your nationality"
                                className="py-3 px-5 w-[330px] border bg-white border-[#d2d0d0] placeholder-gray-400 focus:outline-none focus:border-black rounded-sm"
                            />
                            {showOptions && filtered.length > 0 && (
                                <ul className="absolute z-10 w-[330px] bg-white border border-gray-200 rounded-md mt-1 shadow-md max-h-60 overflow-y-auto">
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

                        <div className="">
                            <input
                                type="text"
                                maxLength={10}
                                value={nationalId}
                                onChange={(e) => onChange('nationalId', e.target.value)}
                                placeholder="Enter ID number"
                                className="py-3 px-5 border bg-white border-[#d2d0d0] w-[330px] placeholder-gray-400 focus:outline-none focus:border-black rounded-sm"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                required
                                value={numberPlate}
                                onChange={(e) => onChange('numberPlate', e.target.value)}
                                placeholder="Plate Number"
                                className="py-3 px-5 w-[330px] border bg-white border-[#d2d0d0] placeholder-gray-400 focus:outline-none focus:border-black rounded-sm"
                            />
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalDetails;
