// app/api/car/model/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const brandID = searchParams.get('brandID');

  if (!brandID) {
    return new Response(JSON.stringify({ error: 'brandID is required' }), { status: 400 });
  }

  try {
    const externalUrl = `https://test-aggregator.braxtone.com/api/car/model?brandID=${brandID}`;
    const externalRes = await fetch(externalUrl);

    if (!externalRes.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from upstream' }), { status: 502 });
    }

    const data = await externalRes.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
