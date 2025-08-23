// app/api/otp/verify/route.ts
import { NextResponse } from 'next/server';
import { getTxn, clear } from '@/app/lib/otpStroe';

export async function POST(req: Request) {
  const { phone, otp } = await req.json().catch(() => ({}));
  if (!phone || !otp) {
    return NextResponse.json({ message: 'phone and otp are required' }, { status: 400 });
  }

  const txnId = getTxn(phone);

  const upstream = await fetch('https://test-aggregator.braxtone.com/api/<verify-endpoint>', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' /*, Authorization: `Bearer ${process.env.BRAXTONE_API_KEY}`*/ },
    body: JSON.stringify(txnId ? { phone, otp, transactionId: txnId } : { phone, otp }),
  });

  const raw = await upstream.text();
  console.log('[VERIFY] status:', upstream.status, upstream.statusText);
  console.log('[VERIFY] body:', raw);

  if (!upstream.ok) {
    return new NextResponse(raw, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('content-type') || 'text/plain' },
    });
  }

  clear(phone);
  return new NextResponse(raw, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json' },
  });
}
