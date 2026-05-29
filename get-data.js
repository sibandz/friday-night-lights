import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', ['GET']);
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Fetch the data from Vercel KV.
    const data = await kv.get('fnl-data');

    // If no data is found (e.g., first time running), return empty arrays.
    // This ensures the frontend doesn't break and correctly shows the "No fixtures" message.
    const responseData = data || { teams: [], fixtures: [] };

    // Add caching headers for performance.
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return response.status(200).json(responseData);
  } catch (error) {
    console.error('Error in /api/get-data:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}