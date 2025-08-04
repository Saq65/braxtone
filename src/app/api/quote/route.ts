// src/app/api/quote/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Example: validate or process the incoming data
    console.log('Received quote request:', body);

    // Respond back
    return NextResponse.json({ success: true, message: 'Quote received.', data: body });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }
}
