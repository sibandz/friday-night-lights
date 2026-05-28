import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const teams = await kv.get('fnl_teams');
    const fixtures = await kv.get('fnl_fixtures');
    
    return response.status(200).json({ teams, fixtures });
  } catch (error) {
    console.error('Error fetching data from Vercel KV:', error);
    return response.status(500).json({ error: 'Failed to fetch data' });
  }
}