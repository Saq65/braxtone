// app/api/otp/verify/route.ts
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

const OTP_VERIFY_URL = process.env.OTP_VERIFY_URL!; // e.g. https://test-aggregator.braxtone.com/api/otp/verify

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();
    if (!phone || !otp) {
      return NextResponse.json({ success: false, message: 'phone and otp are required' }, { status: 400 });
    }
    const payload = { contact: phone, otp: String(otp) };

    const resp = await fetch(OTP_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await resp.text();
    let data: any = {};
    try { data = JSON.parse(text); } catch {}

    if (!resp.ok) {
      console.error('OTP VERIFY external error', { status: resp.status, url: OTP_VERIFY_URL, payload, raw: text });
      return NextResponse.json(
        { success: false, message: data?.message || 'OTP verification failed', details: data },
        { status: resp.status }
      );
    }

    return NextResponse.json({ success: true, message: data?.message || 'OTP verified', verified: true });
  } catch (err) {
    console.error('OTP verify route error:', err);
    return NextResponse.json({ success: false, message: 'Server error verifying OTP' }, { status: 500 });
  }
}
