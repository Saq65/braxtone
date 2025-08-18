'use client';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Country = { name: string; code: string };
const COUNTRIES: Country[] = [
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

const phoneRegex = /^[0-9]{7,15}$/;
const otpRegex = /^[0-9]{6}$/;

type FormValues = {
  country: string;
  mobileNumber: string;
  name: string;
  email: string;
  otpRequested: boolean;
  otpDigits: string[]; // exactly 6
};

export type OtpValidationHandle = { submit: () => void };

type Props = {
  onSubmitData: (data: { country: string; phone: string; name: string; email: string; otp: string }) => void;
};

const validationSchema = Yup.object({
  country: Yup.string().required('Select your country'),
  mobileNumber: Yup.string()
    .required('Phone is required')
    .matches(phoneRegex, 'Enter a valid phone number (7–15 digits)'),
  name: Yup.string().trim().required('Full name is required'),
  email: Yup.string().trim().email('Invalid email').required('Email is required'),
  otpDigits: Yup.array()
    .of(Yup.string().matches(/^\d?$/, 'Digits only'))
    .length(6)
    .test('otp-required', 'Enter the 6-digit OTP', function (arr) {
      const { otpRequested } = this.parent as FormValues;
      if (!otpRequested) return true;
      return otpRegex.test((arr || []).join(''));
    }),
});

const OtpValidation = forwardRef<OtpValidationHandle, Props>(({ onSubmitData }, ref) => {
  const [filtered, setFiltered] = useState<Country[]>(COUNTRIES);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const formik = useFormik<FormValues>({
    initialValues: {
      country: '',
      mobileNumber: '',
      name: '',
      email: '',
      otpRequested: false,
      otpDigits: ['', '', '', '', '', ''],
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmitData({
        country: values.country,
        phone: values.mobileNumber,
        name: values.name,
        email: values.email,
        otp: values.otpDigits.join(''),
      });
    },
  });

  useImperativeHandle(ref, () => ({ submit: () => formik.submitForm() }), [formik]);

  const handleSearch = (q: string) => {
    const s = q.toLowerCase();
    setFiltered(COUNTRIES.filter(c => `${c.name} ${c.code}`.toLowerCase().includes(s)));
  };

  const handleSendOtp = async () => {
    // require minimal info before OTP
    await formik.validateForm();
    if (formik.errors.country || formik.errors.mobileNumber) return;
    formik.setFieldValue('otpRequested', true, false);
    inputsRef.current[0]?.focus();
  };

  const handleOtpChange = (val: string, i: number) => {
    const digit = val.replace(/\D/g, '').slice(0, 1);
    const next = [...formik.values.otpDigits];
    next[i] = digit;
    formik.setFieldValue('otpDigits', next, true);
    if (digit && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Backspace') {
      const next = [...formik.values.otpDigits];
      if (next[i]) {
        next[i] = '';
        formik.setFieldValue('otpDigits', next, true);
        return;
      }
      if (i > 0) inputsRef.current[i - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && i > 0) inputsRef.current[i - 1]?.focus();
    else if (e.key === 'ArrowRight' && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const otpError =
    formik.touched.otpDigits &&
    formik.values.otpRequested &&
    (!formik.values.otpDigits.join('') || formik.errors.otpDigits);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-1 flex flex-col gap-y-[14px]">

        {/* Country */}
        <div className="ml-0 sm:ml-17 md:ml-17 lg:ml-17 xl:ml-17">
          <Select
            showSearch
            placeholder="Select your country"
            value={formik.values.country || undefined}
            onChange={(val) => formik.setFieldValue('country', val)}
            onSearch={handleSearch}
            filterOption={false}
            style={{ height: 50 }}
            className="w-[100%] sm:w-[48.7%] md:w-[48.7%] lg:w-[46%] xl:w-[46%] h-[50px] ml-0 sm:ml-12 xl:ml-12 lg:ml-12 outline-none"
            options={filtered.map(c => ({ label: `${c.name} (${c.code})`, value: c.name }))}
          />
          {formik.touched.country && formik.errors.country && (
            <p className="text-red-500 text-sm ml-0 sm:ml-12">{formik.errors.country}</p>
          )}
        </div>

        {/* Phone + Send OTP */}
        <div className="flex items-center justify-between py-3 px-2 gap-2 border border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-[#002d97] 
          sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px] hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
          <input
            type="tel"
            inputMode="numeric"
            className="border-0 w-full outline-none"
            placeholder="Phone number"
            name="mobileNumber"
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type="button" className="w-[38%] text-[#002d97] hover:underline font-medium" onClick={handleSendOtp}>
            Send OTP
          </button>
        </div>
        {formik.touched.mobileNumber && formik.errors.mobileNumber && (
          <p className="text-red-500 text-sm sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17">{formik.errors.mobileNumber}</p>
        )}

        {/* OTP boxes (shown only after Send OTP) */}
        {formik.values.otpRequested && (
          <div className="flex items-center justify-between py-3 gap-2 sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 rounded-[6px] w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="border border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-[#002d97] shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] hover:shadow-md transition-shadow duration-200">
                <input
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 outline-none text-center"
                  inputMode="numeric"
                  value={formik.values.otpDigits[i]}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  onFocus={() => formik.setFieldTouched('otpDigits', true, false)}
                />
              </span>
            ))}
          </div>
        )}
        {otpError ? <p className="text-red-500 text-sm sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17">Enter the 6-digit OTP</p> : null}

        {/* Name */}
        <div className="flex items-center py-3 px-2 gap-2 border border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-[#002d97]
          sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px] hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
          <input
            type="text"
            name="name"
            autoComplete="off"
            className="border-0 w-full outline-none"
            placeholder="Full name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17">{formik.errors.name}</p>
        )}

        {/* Email */}
        <div className="flex items-center py-3 px-2 gap-2 border border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-[#002d97] sm:ml-7 
          md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px] hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
          <input
            type="email"
            name="email"
            autoComplete="off"
            className="border-0 w-full outline-none"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17">{formik.errors.email}</p>
        )}

        <button type="submit" style={{ display: 'none' }} />
      </div>
    </form>
  );
});

OtpValidation.displayName = 'OtpValidation';
export default OtpValidation;
