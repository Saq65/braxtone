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
                tabIndex={0}
                className='max-w-[380px] sm:max-w-full flex items-center rounded border border-gray-300 focus:outline-none lg:max-w-[800px] xl:max-w-[960px]
                focus-within:ring-0.8 focus-within:ring-sky-600 focus-within:border-sky-600 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]
                 hover:shadow-md transition-shadow duration-200 '
            >
                <span className='px-3'>
                    <RiMapPin2Line size={20} color='#afafaf' />
                </span>
                <input
                    type="text"
                    placeholder="ENTER ADDRESS, CITY, STATE"
                    className="w-sm px-2 py-3  outine-none border-none focus:outline-none sm:w-xl"
                    value={value}
                    onChange={(e) => onChange(e.target.value)} />
            </div>

        </div>
    )
}

export default Input;