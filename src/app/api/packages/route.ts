import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const response = await fetch('https://test-aggregator.braxtone.com/api/packages');
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
      },
    });
  } catch (err) {
    console.error('Fetch error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch packages' }), {
      status: 500,
    });
  }
}
