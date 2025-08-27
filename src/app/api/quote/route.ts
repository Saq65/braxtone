import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch('https://test-aggregator.braxtone.com/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const externalData = await response.json();

    console.log('Braxtone Response:', externalData); 

    return NextResponse.json({
      success: true,
      message: 'Quote received.',
      otp: externalData.otp,
      data: body,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Invalid request.' },
      { status: 400 }
    );
  }
}

// app/api/quote/route.ts

// import { NextResponse } from 'next/server';

// export const runtime = 'nodejs';
// export const dynamic = 'force-dynamic';
// const QUOTE_URL = 'https://test-aggregator.braxtone.com/api/quote';

// function makeOtp() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// export async function POST(req: Request) {
//   try {
//     const incoming = await req.json();
//     const isSendStage = incoming?.OTPVerification === false;
//     const contact = incoming?.contact;

//     // Forward minimal payload to vendor
//     const payload = { contact, OTPVerification: !!incoming?.OTPVerification };

//     const resp = await fetch(QUOTE_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     const raw = await resp.text();
//     let external: any = {};
//     try { external = raw ? JSON.parse(raw) : {}; } catch {}

//     if (!resp.ok) {
//       return NextResponse.json(
//         { success: false, message: external?.message || `Upstream ${resp.status}`, details: external || raw },
//         { status: resp.status }
//       );
//     }

//     const devOtp = (process.env.NODE_ENV !== 'production' && isSendStage) ? makeOtp() : undefined;

//     return NextResponse.json({
//       success: true,
//       otpSent: isSendStage,
//       message: isSendStage ? 'OTP sent' : 'OTP verified / quote updated',
//       ...(devOtp ? { devOtp } : {}),
//       data: external,
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, message: 'Invalid request', details: String(err?.message || err) },
//       { status: 400 }
//     );
//   }
// }
