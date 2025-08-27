'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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

const phoneDigitsRegex = /^[0-9]{7,15}$/;
const otpRegex = /^[0-9]{6}$/;

type FormValues = {
  country: string;
  mobileNumber: string;
  name: string;
  email: string;
  otpRequested: boolean;
  otpDigits: string[];
};

export type OtpValidationHandle = { submit: () => void };

type Props = {
  onSubmitData: (data: { country: string; phone: string; name: string; email: string; otp: string }) => void;
  sendOtpUrl?: string;   // default: /api/quote
  verifyOtpUrl?: string; // default: /api/quote
  sendOtpExtra?: Record<string, unknown>;
  verifyOtpExtra?: Record<string, unknown>;
};

const validationSchema = Yup.object({
  country: Yup.string().required('Select your country'),
  mobileNumber: Yup.string().required('Phone is required').matches(phoneDigitsRegex, 'Enter 7–15 digits'),
  name: Yup.string().trim().when('otpRequested', { is: true, then: s => s.required('Full name is required'), otherwise: s => s.notRequired() }),
  email: Yup.string().trim().email('Invalid email').when('otpRequested', { is: true, then: s => s.required('Email is required'), otherwise: s => s.notRequired() }),
  otpDigits: Yup.array()
    .of(Yup.string().matches(/^\d?$/, 'Digits only'))
    .length(6)
    .test('otp-required', 'Enter the 6-digit OTP', function (arr) {
      const { otpRequested } = this.parent as FormValues;
      if (!otpRequested) return true;
      return otpRegex.test((arr || []).join(''));
    }),
});

const OtpValidation = forwardRef<OtpValidationHandle, Props>(
  (
    {
      onSubmitData,
      sendOtpUrl = '/api/quote',
      verifyOtpUrl = '/api/quote',
      sendOtpExtra,
      verifyOtpExtra,
    },
    ref
  ) => {
    const [filtered, setFiltered] = useState<Country[]>(COUNTRIES);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cooldown, setCooldown] = useState(0);
const [devOtp, setDevOtp] = useState<string | null>(null);

    useEffect(() => {
      if (!cooldown) return;
      const t = setInterval(() => setCooldown((s) => (s > 0 ? s - 1 : 0)), 1000);
      return () => clearInterval(t);
    }, [cooldown]);

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
      onSubmit: async (values) => {
        setError(null);

        const contact = `${values.country}${values.mobileNumber}`.trim();
        const otp = values.otpDigits.join('').trim();

        if (!/^\+\d{7,15}$/.test(contact)) {
          setError('Phone must include country code, e.g. +97336432517');
          return;
        }
        if (!otpRegex.test(otp)) {
          setError('Enter the 6-digit OTP');
          return;
        }

        try {
          setVerifying(true);

          // ✅ Do NOT send OTP to /api/quote. Only mark as verified.
          await axios.post(
            verifyOtpUrl,
            {
              contact,
              OTPVerification: true,
              ...(verifyOtpExtra || {}),
            }
          );

          onSubmitData({
            country: values.country,
            phone: values.mobileNumber,
            name: values.name,
            email: values.email,
            otp, // you can keep this for your local state/logs, but it’s not sent to the vendor here
          });
        } catch (e: any) {
          const d = e?.response?.data;
          const nested =
            Array.isArray(d?.details?.details) ? d.details.details[0]?.message :
              Array.isArray(d?.details) ? d.details[0]?.message : undefined;
          const msg = nested || d?.message || d?.error || e?.message || 'Failed to verify OTP';
          setError(msg);
        } finally {
          setVerifying(false);
        }
      },
    });

    useImperativeHandle(ref, () => ({ submit: () => formik.submitForm() }), [formik]);

    const handleSearch = (q: string) => {
      const s = q.toLowerCase();
      setFiltered(COUNTRIES.filter((c) => `${c.name} ${c.code}`.toLowerCase().includes(s)));
    };

    const handleSendOtp = async () => {
      setError(null);

      await formik.validateForm();
      if (formik.errors.country || formik.errors.mobileNumber) return;
      if (!phoneDigitsRegex.test(formik.values.mobileNumber)) return;
      if (cooldown > 0) return;

      const contact = `${formik.values.country}${formik.values.mobileNumber}`.trim();
      if (!/^\+\d{7,15}$/.test(contact)) {
        setError('Phone must include country code, e.g. +97336432517');
        return;
      }

      try {
        setSending(true);

        // ✅ Create quote draft / trigger OTP by marking as not verified
        const r = await axios.post(
          sendOtpUrl,
          {
            contact,
            OTPVerification: false,
            ...(sendOtpExtra || {}),
          }
        );
        if (r?.data?.devOtp && /^\d{6}$/.test(r.data.devOtp)) {
          setDevOtp(r.data.devOtp);
          formik.setFieldValue('otpDigits', r.data.devOtp.split(''), false);
        }

        const ok = r?.data?.success && (r?.data?.otpSent ?? true);
        if (ok) {
          if (r?.data?.message) console.info(r.data.message);
          formik.setFieldValue('otpRequested', true, false);
          formik.setFieldTouched('otpDigits', true, false);
          setCooldown(60);
          setTimeout(() => inputsRef.current[0]?.focus(), 0);
        } else {
          setError(r?.data?.message || 'Failed to send OTP');
        }
      } catch (e: any) {
        const { status, data } = e?.response || {};
        const nested =
          Array.isArray(data?.details?.details) ? data.details.details[0]?.message :
            Array.isArray(data?.details) ? data.details[0]?.message : undefined;
        setError(nested || (typeof data === 'string' ? data : data?.message) || `Send failed [${status}]`);
        console.group('OTP send error');
        console.log('status:', status);
        console.log('data:', data);
        console.log('sent body:', { contact, ...(sendOtpExtra || {}) });
        console.groupEnd();
      } finally {
        setSending(false);
      }
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
      } else if (e.key === 'ArrowLeft' && i > 0) {
        inputsRef.current[i - 1]?.focus();
      } else if (e.key === 'ArrowRight' && i < 5) {
        inputsRef.current[i + 1]?.focus();
      }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      const txt = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      if (!txt) return;
      const next = txt.split('').concat(Array(6).fill('')).slice(0, 6);
      formik.setFieldValue('otpDigits', next, true);
      const last = Math.min(txt.length, 6) - 1;
      if (last >= 0) inputsRef.current[last]?.focus();
      e.preventDefault();
    };

    const otpError =
      formik.touched.otpDigits &&
      formik.values.otpRequested &&
      (!formik.values.otpDigits.join('') || formik.errors.otpDigits);

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="p-1 flex flex-col gap-y-[14px]">
          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">{error}</div>
          ) : null}

          <div className="ml-0 sm:ml-17 md:ml-17 lg:ml-17 xl:ml-17 overflow-hidden">
            <Select
              showSearch
              placeholder="Select your country"
              value={formik.values.country || undefined}
              onChange={(val) => formik.setFieldValue('country', val)}
              onSearch={handleSearch}
              filterOption={false}
              style={{ height: 50 }}
              className="w-[100%] sm:w-[48.7%] md:w-[48.7%] lg:w-[46%] xl:w-[46%] h-[50px] ml-0 sm:ml-12 xl:ml-12 lg:ml-12 outline-none shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]"
              options={filtered.map((c) => ({ label: `${c.name} (${c.code})`, value: c.code }))}
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-sm ml-0 sm:ml-12">{formik.errors.country}</p>
            )}
          </div>

          <div className="flex items-center justify-between py-3 px-2 gap-2 border border-gray-300 focus-within:ring-1 focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px] hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
            <div className="text-gray-600 whitespace-nowrap pr-1">{formik.values.country || '+XX'}</div>
            <input
              type="tel"
              inputMode="numeric"
              className="border-0 w-full outline-none"
              placeholder="Phone number"
              name="mobileNumber"
              value={formik.values.mobileNumber}
              onChange={(e) => formik.setFieldValue('mobileNumber', e.target.value.replace(/\D/g, ''))}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              className="w-[38%] text-[#002d97] hover:underline font-medium disabled:opacity-50"
              onClick={handleSendOtp}
              disabled={sending || cooldown > 0 || !formik.values.country || !formik.values.mobileNumber}
            >
              {sending ? 'Sending…' : cooldown > 0 ? `Resend in ${cooldown}s` : 'Send OTP'}
            </button>
          </div>
          {formik.touched.mobileNumber && formik.errors.mobileNumber && (
            <p className="text-red-500 text-sm sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17">{formik.errors.mobileNumber}</p>
          )}

          {formik.values.otpRequested && (
            <div
              onPaste={handleOtpPaste}
              className="flex items-center justify-between py-3 gap-2 sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 rounded-[6px] w-[100%] lg:w-[42.8%] xl:w-[42.8%]"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="border border-gray-300 focus-within:ring-1 focus-within:ring-[#002d97] shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] hover:shadow-md transition-shadow duration-200"
                >
                  <input
                    ref={(el) => { inputsRef.current[i] = el; }}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 outline-none text-center"
                    inputMode="numeric"
                    autoComplete={i === 0 ? 'one-time-code' : undefined}
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

          {/* Optional name/email UI (not sent to vendor in send/verify) */}
          <div className="flex items-center py-3 px-2 gap-2 border border-gray-300 focus-within:ring-1 focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px] hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
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

          <div className="flex items-center py-3 px-2 gap-2 border border-gray-300 focus-within:ring-1 focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)] rounded-[6px] hover:shadow-md transition-shadow duration-200 w-[100%] lg:w-[42.8%] xl:w-[42.8%]">
            <input
              type="email"
              name="email"
              autoComplete="off"
              className="border-0 w-full outline-none"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={formik.values.otpRequested}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17">{formik.errors.email}</p>
          )}

          {/* Hidden submit for parent ref */}
          <button type="submit" style={{ display: 'none' }} disabled={verifying} />
          {verifying ? <div className="text-sm text-gray-600 sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17">Verifying…</div> : null}
        </div>
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">{error}</div>
        ) : null}

        {devOtp && ( // ✅ add here
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm px-3 py-2 rounded">
            DEV OTP: <b>{devOtp}</b> (test mode)
          </div>
        )}

      </form>
    );
  }
);

OtpValidation.displayName = 'OtpValidation';
export default OtpValidation;
