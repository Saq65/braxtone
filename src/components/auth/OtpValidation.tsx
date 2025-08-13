import { Input } from 'antd'
import React from 'react'
import { BiPhone, BiSearch } from 'react-icons/bi'
import { CiMail } from 'react-icons/ci'
import { IoPerson } from 'react-icons/io5'

type Props = {}

const OtpValidation = (props: Props) => {
    return (
        <div>

            <div className='p-1 flex flex-col gap-y-[14px]'>
                <div className='flex items-center py-3 px-2 gap-2  border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px]
                             hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[48%] xl:w-[45%]'>
                    <span><BiSearch className='text-gray-400' size={20} /></span>
                    <input type='text' className='border-0 w-full outline-none' placeholder='Search your country' />
                </div>
                <div className='flex items-center justify-between py-3 px-2 gap-2  border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px]
                             hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[48%] xl:w-[45%]'>
                    <span className='w-[10%]'><BiPhone className='text-gray-400' size={20} /></span>
                    <input type='text' className='border-0 w-full outline-none' placeholder='Phone number' />
                    <span className='w-[38%] text-gray-400 font-normal'>Send OTP</span>
                </div>
                <div className='flex items-center justify-between py-3 px-2 gap-2  
                              sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17  rounded-[6px]
                             w-[100%] lg:w-[48%] xl:w-[45%]'>
                    <span className=' border border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97]  shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]
                             hover:shadow-md transition-shadow duration-200 
                             '>
                        <input type="text" name="" id="" maxLength={1} className='w-12 h-12 outline-none text-center' />
                    </span>
                    <span className=' border border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97]  shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]
                             hover:shadow-md transition-shadow duration-200 
                             '>
                        <input type="text" name="" id="" maxLength={1} className='w-12 h-12 outline-none text-center' />
                    </span>
                    <span className=' border border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97]  shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]
                             hover:shadow-md transition-shadow duration-200 
                             '>
                        <input type="text" name="" id="" maxLength={1} className='w-12 h-12 outline-none text-center' />
                    </span>
                    <span className=' border border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97]  shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]
                             hover:shadow-md transition-shadow duration-200 
                             '>
                        <input type="text" name="" id="" maxLength={1} className='w-12 h-12 outline-none text-center' />
                    </span>
                    <span className=' border border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97]  shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]
                             hover:shadow-md transition-shadow duration-200 
                             '>
                        <input type="text" name="" id="" maxLength={1} className='w-12 h-12 outline-none text-center' />
                    </span>
                    <span className=' border border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97]  shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]
                             hover:shadow-md transition-shadow duration-200 
                             '>
                        <input type="text" name="" id="" maxLength={1} className='w-12 h-12 outline-none text-center' />
                    </span>
                </div>

                <div className='flex items-center py-3 px-2 gap-2  border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px]
                             hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[48%] xl:w-[45%]'>
                    <span><IoPerson className='text-gray-400' size={20} /></span>
                    <input type='text' className='border-0 w-full outline-none' placeholder='Full name' />
                </div>
                <div className='flex items-center py-3 px-2 gap-2  border border-gray-300 focus-within:outline-none focus-within:ring-1
                             focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px]
                             hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[48%] xl:w-[45%]'>
                    <span><CiMail className='text-gray-400' size={20} /></span>
                    <input type='text' className='border-0 w-full outline-none' placeholder='Email' />
                </div>
            </div>
        </div>
    )
}

export default OtpValidation