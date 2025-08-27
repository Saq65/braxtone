// app/api/otp/send/route.ts
import { NextResponse } from 'next/server';

// Make sure this route runs on Node (not Edge)
export const runtime = 'nodejs';
// Avoid caching while debugging
export const dynamic = 'force-dynamic';

const OTP_SEND_URL = process.env.OTP_SEND_URL; // e.g. https://test-aggregator.braxtone.com/api/otp
console.log('OTP_SEND_URL=', process.env.OTP_SEND_URL);

export async function POST(req: Request) {
    try {
        if (!OTP_SEND_URL || !/^https?:\/\//i.test(OTP_SEND_URL)) {
            console.error('OTP_SEND_URL missing or invalid:', OTP_SEND_URL);
            return NextResponse.json(
                {
                    success: false,
                    message: 'Server is not configured: OTP_SEND_URL is missing/invalid',
                    details: { OTP_SEND_URL },
                },
                { status: 500 }
            );
        }

        const { phone, channel = 'sms' } = await req.json();

        if (!phone) {
            return NextResponse.json(
                { success: false, message: 'phone is required' },
                { status: 400 }
            );
        }

        const payload: Record<string, any> = { contact: phone, channel };

        const API_KEY = process.env.BRAXTONE_API_KEY;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BRAXTONE_API_KEY}`,
        };

        const resp = await fetch(OTP_SEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // headers, // use this if you added auth above
            body: JSON.stringify(payload),
        });

        const raw = await resp.text();
        let data: any = {};
        try { data = JSON.parse(raw); } catch { /* raw may be non-JSON */ }

        if (!resp.ok) {
            console.error('OTP SEND upstream error', {
                status: resp.status,
                url: OTP_SEND_URL,
                payload,
                raw,
            });
            return NextResponse.json(
                {
                    success: false,
                    message: data?.message || `Failed to send OTP (upstream ${resp.status})`,
                    details: data || raw,
                },
                { status: resp.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: data?.message || 'OTP sent',
            otpSent: true,
            // DO NOT return actual OTP to the client
        });
    } catch (err: any) {
        console.error('OTP send route crash:', err?.message || err);
        return NextResponse.json(
            {
                success: false,
                message: 'Server error sending OTP',
                details: { error: String(err?.message || err) },
            },
            { status: 500 }
        );
    }
}
