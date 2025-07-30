// route.ts
export async function GET() {
  try {
    const res = await fetch('https://test-aggregator.braxtone.com/api/car/brands');
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch brands' }), {
      status: 500,
    });
  }
}
