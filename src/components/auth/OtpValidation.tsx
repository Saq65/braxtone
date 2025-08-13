import { Input } from 'antd'
import React from 'react'
import { BiPhone, BiSearch } from 'react-icons/bi'

type Props = {}

const OtpValidation = (props: Props) => {
    return (
        <div>

            <div className='p-1 flex flex-col gap-y-[14px]'>
                <div className='flex items-center py-3 px-2 gap-2  border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px]
                             hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-full xl:w-full'>
                    <span><BiSearch className='text-gray-400' size={20} /></span>
                    <input type='text' className='border-0 w-full outline-none' placeholder='Search your country' />
                </div>
                <div className='flex items-center py-3 px-2 gap-2  border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px]
                             hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-full xl:w-full'>
                    <span><BiPhone className='text-gray-400' size={20} /></span>
                    <input type='text' className='border-0 w-full outline-none' placeholder='Phone number' />
                </div>
                <div className='flex items-center py-3 px-2 gap-2  border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px]
                             hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-full xl:w-full'>
                    <span><BiPhone className='text-gray-400' size={20} /></span>
                    <input type='text' className='border-0 w-full outline-none' placeholder='Full name' />
                </div>
                <div className='flex items-center py-3 px-2 gap-2  border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px]
                             hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-full xl:w-full'>
                    <span><BiPhone className='text-gray-400' size={20} /></span>
                    <input type='text' className='border-0 w-full outline-none' placeholder='Email' />
                </div>
            </div>
        </div>
    )
}

export default OtpValidation