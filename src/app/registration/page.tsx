'use client';

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMail, IoPerson } from 'react-icons/io5';
import { LuLockKeyhole } from 'react-icons/lu';

type Props = {};

const Registration = (props: Props) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const eyeBtnBase =
    'w-[10%] sm:w-[5%] xl:w-[5%] lg:w-[5%] flex items-center justify-center';

  return (
    <div className="flex justify-center items-center">
      <div className="border border-[#d2d2d2] rounded-[5px] p-5 mt-16 sm:mt-20 lg:mt-23 xl:mt-26 ml-6 mr-6 shadow w-[100%] sm:w-[35%] md:w-[30%] lg:w-[30%] xl:w-[30%]">
        <p className="text-lg font-semibold text-center">Register Your Braxtone Account</p>

        <div className="mt-4 flex flex-col items-center gap-y-[20px] sm:p-5">
          {/* Name */}
          <div className="flex items-center gap-1 border w-[100%] px-2 border-[#002d97] rounded-[8px]">
            <IoPerson className="text-[#9f9d9d]" />
            <input type="text" className="border-none py-3 px-3 w-[100%] outline-none" defaultValue="saqlain" />
          </div>

          {/* Email */}
          <div className="flex items-center gap-1 border w-[100%] px-2 border-[#002d97] rounded-[8px]">
            <IoMail className="text-[#9f9d9d]" />
            <input type="email" className="border-none py-3 px-3 w-[100%] outline-none" defaultValue="saqlain@gmail.com" />
          </div>

          {/* Password */}
          <div className="flex items-center gap-1 border w-[100%] px-2 border-[#d2d2d2] rounded-[8px]">
            <LuLockKeyhole className="text-[#9f9d9d]" />
            <input
              type={showPwd ? 'text' : 'password'}
              className="border-none py-3 px-3 w-[100%] outline-none"
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              aria-label={showPwd ? 'Hide password' : 'Show password'}
              onClick={() => setShowPwd((s) => !s)}
              disabled={!password}
              className={`${eyeBtnBase} ${!password ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
            >
              {showPwd ? <FaEyeSlash className="text-[#9f9d9d]" /> : <FaEye className="text-[#9f9d9d]" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center gap-1 border w-[100%] px-2 border-[#d2d2d2] rounded-[8px]">
            <LuLockKeyhole className="text-[#9f9d9d]" />
            <input
              type={showConfirm ? 'text' : 'password'}
              className="border-none py-3 px-3 w-[100%] outline-none"
              placeholder="Re-enter password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
              onClick={() => setShowConfirm((s) => !s)}
              disabled={!confirm}
              className={`${eyeBtnBase} ${!confirm ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
            >
              {showConfirm ? <FaEyeSlash className="text-[#9f9d9d]" /> : <FaEye className="text-[#9f9d9d]" />}
            </button>
          </div>

          <div className="flex items-center gap-8 mt-5">
            <button className="bg-[#002d97] text-white py-2 px-4 rounded">Go Back</button>
            <button className="bg-[#002d97] text-white py-2 px-4 rounded">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
