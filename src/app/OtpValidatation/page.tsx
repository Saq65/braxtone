'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select';

export default function BestDealForm() {
  const countryCodes = [
    { label: '🇧🇭 Bahrain (+973)', value: '+973' },
    { label: '🇺🇸 United States (+1)', value: '+1' },
    { label: '🇬🇧 United Kingdom (+44)', value: '+44' },
    { label: '🇮🇳 India (+91)', value: '+91' },
    { label: '🇦🇪 UAE (+971)', value: '+971' },
    { label: '🇸🇦 Saudi Arabia (+966)', value: '+966' },
    { label: '🇨🇦 Canada (+1)', value: '+1' },
    { label: '🇩🇪 Germany (+49)', value: '+49' },
    { label: '🇫🇷 France (+33)', value: '+33' },
    { label: '🇯🇵 Japan (+81)', value: '+81' },
    { label: '🇨🇳 China (+86)', value: '+86' },
  ];

const [selectedCode, setSelectedCode] = useState<{ label: string; value: string } | null>(countryCodes[0]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpStatus, setOtpStatus] = useState({ message: '', success: false });
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOTP = async () => {
    if (!phone.trim()) {
      setOtpStatus({ message: 'Phone number is required', success: false });
      return;
    }

    setLoading(true);
    setOtpStatus({ message: '', success: false });

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: `${selectedCode.value}${phone.trim()}` }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('OTP:', data.otp);
        setOtpStatus({ message: 'OTP sent successfully!', success: true });
        setTimer(30);
      } else {
        setOtpStatus({ message: data.message || 'Failed to send OTP', success: false });
      }
    } catch (error) {
      setOtpStatus({ message: 'Error sending OTP', success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center">
        <img src="/profile.jpg" alt="Profile" className="w-20 h-20 rounded-full object-cover" />
        <h2 className="text-xl font-semibold mt-4 text-center">
          Grab It! We've Struck You Our Best Deal
        </h2>
        <div className="w-20 h-1 bg-blue-600 mt-2 rounded" />
      </div>

      <div className="bg-orange-600 text-white text-center py-6 px-10 mt-6 rounded shadow-md">
        <p className="text-sm font-semibold">Your Price Is</p>
        <h3 className="text-2xl font-bold mt-2">XX + VAT</h3>
      </div>

      <form
        className="mt-8 w-full max-w-md space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex border border-gray-300 rounded overflow-hidden">
          <div className="w-48">
            <Select
              options={countryCodes}
              value={selectedCode}
              onChange={(option) => option && setSelectedCode(option)}
              className="text-sm"
              classNamePrefix="react-select"
              isSearchable
            />
          </div>
          <input
            type="tel"
            placeholder="Contact No"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 px-3 py-2 focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={loading || timer > 0}
            className="px-4 text-blue-600 text-sm disabled:opacity-50"
          >
            {loading ? 'Sending...' : timer > 0 ? `Resend in ${timer}s` : 'SEND OTP'}
          </button>
        </div>

        {otpStatus.message && (
          <p className={`text-sm ${otpStatus.success ? 'text-green-600' : 'text-red-600'}`}>
            {otpStatus.message}
          </p>
        )}

        <input
          type="email"
          placeholder="Email (Optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
        />

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </form>

    </div>
  );
}
