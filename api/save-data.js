import { kv } from '@vercel/kv';

// It's best practice to use an environment variable for the password.
// You can set this in your Vercel project settings.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'FNLHBC26';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { teams, fixtures, password } = request.body;

    if (password !== ADMIN_PASSWORD) {
      return response.status(401).json({ error: 'Unauthorized: Incorrect password' });
    }

    if (!Array.isArray(teams) || !Array.isArray(fixtures)) {
      return response.status(400).json({ error: 'Bad Request: Invalid data format' });
    }

    // Store the data in Vercel KV using a single key.
    await kv.set('fnl-data', { teams, fixtures });

    return response.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error in /api/save-data:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
