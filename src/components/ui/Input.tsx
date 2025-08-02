import React from 'react'
import { RiMapPin2Line } from 'react-icons/ri'

interface InputProps {
    value: string;
    onChange: (val: string) => void;
}

const Input = ({ value, onChange }: InputProps) => {
    return (
        <div className=''>
            <div
                className="max-w-[380px] sm:max-w-full flex items-center rounded border border-gray-300
             focus-within:outline-none focus-within:ring-1 focus-within:ring-[#ff8533]
             shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] hover:shadow-md transition-shadow duration-200
             lg:max-w-[800px] xl:max-w-[960px]"
            >
                <span className="px-3">
                    <RiMapPin2Line size={20} color="#afafaf" />
                </span>
                <input
                    type="text"
                    placeholder="ENTER ADDRESS, CITY, STATE"
                    className="w-sm px-2 py-3 outline-none border-none focus:outline-none sm:w-xl"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

        </div>
    )
}

export default Input;