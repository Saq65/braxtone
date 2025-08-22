import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { IoCheckmark } from 'react-icons/io5';

type ConfirmationProps = {
    nationalId: string;
    numberPlate: string;
    onChange: (field: string, value: string) => void;
    selectedPackageName?: string;
};

const PersonalDetails = ({ nationalId, numberPlate, selectedPackageName, onChange }: ConfirmationProps) => {
    const [showExpiryDate, setShowExpiryDate] = useState(false);

    return (
        <div>
            <div className="form-container w-75 ml-0 sm:ml-18 md:ml-18 lg:ml-18 xl:ml-18 mt-10">

                <div className='w-[330px] py-3 border border-green-400 rounded-sm bg-[rgb(220,231,220)] mb-4 flex items-center flex gap-2 items-center'>
                    <div className='w-4 h-4 rounded-full bg-green-500 flex items-center justify-center ml-2'>
                        <IoCheckmark color='white' size={12} />
                    </div>
                    <p> {selectedPackageName || 'No Package Selected'}</p>
                </div>

                <form action="#">
                    <div className="flex flex-col gap-y-4">
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
                                onChange={(e) => {
                                    onChange('numberPlate', e.target.value);
                                    setShowExpiryDate(true);
                                }}
                                placeholder="Plate Number"
                                className="py-3 px-5 w-[330px] border bg-white border-[#d2d0d0] placeholder-gray-400 focus:outline-none focus:border-black rounded-sm"
                            />
                        </div>

                        <div>
                            {showExpiryDate && (
                                <>
                                    <input
                                        type="text"
                                        required
                                        value={"31/08/2025"} 
                                        onChange={(e) => onChange('numberPlate', e.target.value)}
                                        placeholder="Current policy expiry date"
                                        className="py-3 px-5 w-[330px] border bg-white border-[#d2d0d0] placeholder-gray-400 focus:outline-none focus:border-black rounded-sm"
                                    />
                                </>
                            )}
                        </div>

                        <div className='flex items-start gap-4'>
                            <span>
                                <Checkbox />
                            </span>
                            <span className='font-[400]'>I confirm the CPR and Plate Number are correct and authorized for use</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalDetails;
