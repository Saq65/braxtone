import React, { useEffect, useState, useRef } from 'react';
import { Select } from 'antd';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { MdEmail } from "react-icons/md";
import { BiSearch } from 'react-icons/bi';
import { Option } from 'antd/es/mentions';
import axios from 'axios';

type Props = {};

const countries = [
    { name: 'Bahrain', code: '+973' },
    { name: 'UAE', code: '+971' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Kuwait', code: '+965' },
    { name: 'Qatar', code: '+974' },
    { name: 'Oman', code: '+968' },
    { name: 'India', code: '+91' },
    { name: 'Jordan', code: '+962' },
    { name: 'Iraq', code: '+964' },
    { name: 'Egypt', code: '+20' },
];

const OtpValidation = (props: Props) => {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [showOtp, setShowOtp] = useState(false);

    const inputs = useRef<(HTMLInputElement | null)[]>([]); // Reference to all OTP input fields

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        const filtered = countries.filter((country) =>
            country.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCountries(filtered);
    };

    const handleCountryChange = (value: string) => {
        setSelectedCountry(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.value) {
            // Focus on the next input if it's not the last one
            if (index < 5) {
                inputs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // If backspace is pressed, move to the previous input
        if (e.key === "Backspace" && index > 0 && !inputs.current[index]?.value) {
            inputs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        axios.post('/api/quote', { /* request body */ })
            .then(response => {
                console.log('OTP Data:', response.data);
            })
            .catch(error => {
                console.log('Error fetching OTP Data:', error);
            });
    }, []);

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="p-1 flex flex-col gap-y-[14px]">
                    <div className='ml-0 sm:ml-17 md:ml-17 lg:ml-17 xl:ml-17'>
                        <Select
                            showSearch
                            placeholder="Select your country"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            filterOption={false}
                            style={{ height: '50px' }}
                            className='w-[100%] sm:w-[48.7%] md:w-[48.7%] lg:w-[46%] xl:w-[46%] h-[50px] ml-0 sm:ml-12 xl:ml-12 lg:ml-12 outline-none'
                        >
                            {filteredCountries.map((country, index) => (
                                <Option className='p-10 outline-none' value={country.name} key={index}>
                                    {`${country.name} (${country.code})`}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex items-center justify-between py-3 px-2 gap-2 border border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-[#002d97] 
                    sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px] hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
                        <span className="w-[10%]"><FaPhoneAlt className="text-gray-400" size={16} /></span>
                        <input type="text" className="border-0 w-full outline-none" placeholder="Phone number" />
                        <span className="w-[38%] text-gray-400 font-normal" onClick={() => setShowOtp(true)} >Send OTP</span>
                    </div>

                    {showOtp && (
                        <div className="flex items-center justify-between py-3 gap-2 sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 rounded-[6px] w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
                            {[...Array(6)].map((_, index) => (
                                <span key={index} className="border border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-[#002d97] shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] hover:shadow-md transition-shadow duration-200">
                                    <input
                                        ref={(el) => (inputs.current[index] = el)} // Reference each input
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-12 outline-none text-center"
                                        inputMode="numeric"
                                        onChange={(e) => handleChange(e, index)} // Move focus on input change
                                        onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace behavior
                                    />
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center py-3 px-2 gap-2 border border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-[#002d97]
                     sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px] hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
                        <span><IoPerson className="text-gray-400" size={17} /></span>
                        <input type="text" className="border-0 w-full outline-none" placeholder="Full name" />
                    </div>

                    <div className="flex items-center py-3 px-2 gap-2 border border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-[#002d97] sm:ml-7 
                    md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px] hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
                        <span><MdEmail className="text-gray-400" size={17} /></span>
                        <input type="text" className="border-0 w-full outline-none" placeholder="Email" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OtpValidation;
