
// This file acts as a secure backend proxy.
// In a Vercel project, creating a file inside the `/api` directory
// automatically turns it into a serverless function (an API endpoint).

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');

  if (!walletAddress) {
    return new Response(JSON.stringify({ error: 'walletAddress is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.LIMITLESS_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key is not configured on the server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const LIMITLESS_API_ENDPOINT = `https://api.limitless.exchange/api-v1/portfolio/trades?trader=${walletAddress}`;

  try {
    const apiResponse = await fetch(LIMITLESS_API_ENDPOINT, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('Limitless API error:', errorText);
      return new Response(JSON.stringify({ error: `Failed to fetch data from Limitless API. Status: ${apiResponse.status}` }), {
        status: apiResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await apiResponse.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });

  } catch (error) {
    console.error('Error in proxy function:', error);
    return new Response(JSON.stringify({ error: 'An internal server error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
