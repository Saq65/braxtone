import React from 'react'
import { FaEye } from 'react-icons/fa';
import {  IoMail, IoPerson } from 'react-icons/io5';
import { LuLockKeyhole } from "react-icons/lu";

type Props = {}

const Registration = (props: Props) => {
  return (
    <div>
      <div className='border border-[#d2d2d2] rounded-[5px] p-5 mt-16 ml-6 mr-6 shadow'>
        <div>
          <p className='text-lg font-semibold text-center '>Register Your Braxtone Account</p>
        </div>
        <div className='mt-4 flex flex-col items-center gap-y-[20px]'>

          <div className='flex items-center gap-1 border w-[100%] px-2 border-[#002d97] rounded-[8px]'>
            <span>
              <IoPerson className='text-[#9f9d9d]' />
            </span>
            <div className='w-full'>
              <input type="text" className='border-none py-3 px-3 w-[100%] outline-none' value={"saqlain"} />
            </div>
          </div>

          <div className='flex items-center gap-1 border w-[100%] px-2 border-[#002d97] rounded-[8px]'>
            <span>
              <IoMail className='text-[#9f9d9d]' />
            </span>
            <div className='w-full'>
              <input type="text" className='border-none py-3 px-3 w-[100%] outline-none' value={"saqlain@gmail.com"} />
            </div>
          </div>

          <div className='flex items-center gap-1 border w-[100%] px-2 border-[#d2d2d2] rounded-[8px]'>
            <span>
              <LuLockKeyhole className='text-[#9f9d9d]' />
            </span>
            <div className='w-full'>
              <input type="text" className='border-none py-3 px-3 w-[100%] outline-none' placeholder='Create a password' />
            </div>
            <span className='w-[10%]'>
              <FaEye className='text-[#9f9d9d]' />
            </span>
          </div>

             <div className='flex items-center gap-1 border w-[100%] px-2 border-[#d2d2d2] rounded-[8px]'>
            <span>
              <LuLockKeyhole className='text-[#9f9d9d]' />
            </span>
            <div className='w-full'>
              <input type="text" className='border-none py-3 px-3 w-[100%] outline-none' placeholder='Re-enter password' />
            </div>
            <span className='w-[10%]'>
              <FaEye className='text-[#9f9d9d]' />
            </span>
          </div>

          <div className='flex items-center gap-8 mt-5'>
            <div>
               <button className='bg-[#002d97] text-white py-2 px-4 rounded'>Go Back</button>
            </div>
            <div>
              <button className='bg-[#002d97] text-white py-2 px-4 rounded'>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration;