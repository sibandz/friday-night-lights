import { sql } from '@vercel/postgres';

// It's best practice to use an environment variable for the password.
// You can set this in your Vercel project settings.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'FNLHBC26';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Vercel's environment automatically parses JSON request bodies.
    // This check ensures the body is a valid object.
    const body = request.body;
    if (typeof body !== 'object' || body === null) {
      return response.status(400).json({ error: 'Bad Request: Invalid or missing JSON body.' });
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

    // Store the data in Vercel Postgres using a single key.
    const dataToSave = JSON.stringify({ teams, fixtures });
    await sql`
      INSERT INTO fnl_data (id, data)
      VALUES ('schedule', ${dataToSave})
      ON CONFLICT (id)
      DO UPDATE SET data = EXCLUDED.data;
    `;

    return response.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error in /api/save-data:', error);
    // Check for a common error: table not found
    if (error.message.includes('relation "fnl_data" does not exist')) {
        return response.status(500).json({ error: 'Database table not found. Please set up the database table.' });
    }
    return response.status(500).json({ error: 'Internal Server Error: ' + error.message });
  }
}
