import { sql } from '@vercel/postgres';

// It's best practice to use an environment variable for the password.
// You can set this in your Vercel project settings.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'INTERHOUSE2025';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Explicitly parse the JSON body. Vercel's Node.js runtime provides the
    // body as a stream, which needs to be consumed.
    // If the body is not valid JSON, this will throw an error which is caught below.
    const body = await request.json();

    if (!body) {
      return response.status(400).json({ error: 'Bad Request: Missing request body' });
    }
    const { teams, fixtures, scores, password } = body;

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
    const dataToSave = JSON.stringify({ teams, fixtures, scores: scores || [] });
    await sql`
      INSERT INTO fnl_data (id, data)
      VALUES ('schedule', ${dataToSave})
      ON CONFLICT (id)
      DO UPDATE SET data = EXCLUDED.data;
    `;

    return response.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    // Log the full error for server-side debugging.
    // Be cautious logging the request body in production if it contains sensitive data.
    console.error('Error in /api/save-data:', {
      message: error.message,
      stack: error.stack,
    });

    // Handle JSON parsing errors specifically.
    if (error instanceof SyntaxError) {
      return response.status(400).json({ error: 'Bad Request: Invalid JSON format in request body.' });
    }

    // Provide a more specific error message to the client.
    if (error.message.includes('relation "fnl_data" does not exist')) {
      return response.status(500).json({
        error: 'Database table not found.',
        details: 'The "fnl_data" table does not exist. Please run the setup SQL command in your Vercel Postgres dashboard.',
      });
    }

    // Generic error for other cases.
    return response.status(500).json({ error: 'An unexpected server error occurred.', details: error.message });
  }
}
