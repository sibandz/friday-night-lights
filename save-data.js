import { kv } from '@vercel/kv';

// For better security, set ADMIN_PASSWORD as an environment variable in your Vercel project.
const PASSWORD = process.env.ADMIN_PASSWORD || 'FNLHBC26';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { teams, fixtures, password } = request.body;

  if (password !== PASSWORD) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  if (!Array.isArray(teams) || !Array.isArray(fixtures)) {
    return response.status(400).json({ error: 'Invalid data format' });
  }

  try {
    await kv.set('fnl_teams', teams);
    await kv.set('fnl_fixtures', fixtures);
    
    return response.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data to Vercel KV:', error);
    return response.status(500).json({ error: 'Failed to save data' });
  }
}