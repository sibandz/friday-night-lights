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
    // Parse body - handle different formats
    let body = request.body;
    
    if (typeof body === 'string') {
      body = JSON.parse(body);
    } else if (!body || typeof body !== 'object') {
      // If body is not set, try to read from stream
      body = await new Promise((resolve, reject) => {
        let data = '';
        request.on('data', chunk => { data += chunk; });
        request.on('end', () => {
          try {
            resolve(data ? JSON.parse(data) : {});
          } catch (err) {
            reject(new Error(`Failed to parse JSON body: ${err.message}`));
          }
        });
        request.on('error', reject);
      });
    }

    const { teams, fixtures, password } = body;

    if (!password) {
      return response.status(400).json({ error: 'Missing password' });
    }

    if (password !== ADMIN_PASSWORD) {
      return response.status(401).json({ error: 'Unauthorized: Incorrect password' });
    }

    if (!Array.isArray(teams) || !Array.isArray(fixtures)) {
      return response.status(400).json({ error: 'Bad Request: Invalid data format' });
    }

    // Store the data in Vercel KV using a single key.
    try {
      await kv.set('fnl-data', { teams, fixtures });
    } catch (kvError) {
      console.error('KV Database Error:', kvError);
      console.error('KV Error Details:', {
        message: kvError.message,
        code: kvError.code,
        stack: kvError.stack
      });
      return response.status(500).json({ error: 'KV Database Error: ' + kvError.message });
    }

    return response.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error in /api/save-data:', error);
    console.error('Error Details:', {
      message: error.message,
      stack: error.stack,
      body: JSON.stringify(body)
    });
    return response.status(500).json({ error: 'Internal Server Error: ' + error.message });
  }
}
