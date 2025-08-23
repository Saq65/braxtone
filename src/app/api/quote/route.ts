// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const response = await fetch('https://test-aggregator.braxtone.com/api/quote', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body),
//     });

//     const externalData = await response.json();

//     console.log('Braxtone Response:', externalData); 

//     return NextResponse.json({
//       success: true,
//       message: 'Quote received.',
//       otp: externalData.otp,
//       data: body,
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Invalid request.' },
//       { status: 400 }
//     );
//   }
// }
// app/api/quote/route.ts
// app/api/quote/route.ts
import { NextResponse } from 'next/server';
import { saveTxn } from '@/app/lib/otpStroe'; // optional if you use txnId like before

export async function POST(req: Request) {
  try {
    const incoming = await req.json();

    // 🔐 If Braxtone needs auth, uncomment and set env var:
    // const AUTH = process.env.BRAXTONE_API_KEY;
    // const headers: Record<string, string> = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${AUTH}`,
    // };

    // 👉 Adjust payload mapping here if Braxtone expects different key names.
    // For now we forward as-is:
    const payload = incoming;

    const upstream = await fetch('https://test-aggregator.braxtone.com/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' /*, ...headers */ },
        Authorization: `Bearer ${process.env.BRAXTONE_API_KEY}`,

      body: JSON.stringify(payload),
    });

    // Read raw text so we can forward non-JSON too (HTML, plain text, etc.)
    const raw = await upstream.text();

    // Log everything server-side for dev
    console.log('[QUOTE] sent payload:', payload);
    console.log('[QUOTE] provider status:', upstream.status, upstream.statusText);
    console.log('[QUOTE] provider body:', raw);

    // If provider rejected, forward their status & body verbatim
    if (!upstream.ok) {
      return new NextResponse(raw, {
        status: upstream.status,
        headers: { 'Content-Type': upstream.headers.get('content-type') || 'text/plain' },
      });
    }

    // If success, try to parse JSON and capture a transaction id (if any)
    let json: any = null;
    try { json = JSON.parse(raw); } catch {}
    const txnId =
      json?.transactionId ??
      json?.data?.transactionId ??
      json?.requestId ??
      json?.data?.requestId;

    const phone = incoming?.phone;
    if (phone && txnId) {
      saveTxn(String(phone), String(txnId));
    }

    // Return the provider success payload as-is to your client
    return new NextResponse(raw, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json' },
    });
  } catch (err) {
    console.error('[QUOTE] route error:', err);
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }
}
