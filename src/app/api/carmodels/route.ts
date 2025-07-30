// app/api/car/model/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandID = searchParams.get('brandID');

    if (!brandID) {
      return new Response(JSON.stringify({ error: 'brandID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const externalUrl = `https://test-aggregator.braxtone.com/api/car/model?brandID=${brandID}`;
    const response = await fetch(externalUrl, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from external API. Status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // only for development or testing
      },
    });
  } catch (error) {
    console.error('API error:', (error as Error).message);
    return new Response(JSON.stringify({ error: 'Failed to fetch models' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
