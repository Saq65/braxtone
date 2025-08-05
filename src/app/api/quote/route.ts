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
      otp: externalData.otp, // May be undefined
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
