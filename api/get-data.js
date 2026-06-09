import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', ['GET']);
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Fetch the data from Vercel Postgres.
    const { rows } = await sql`SELECT data FROM fnl_data WHERE id = 'schedule';`;

    // If no data is found (e.g., first time running), return empty arrays.
    const responseData = rows[0]?.data || { teams: [], fixtures: [], scores: [] };

    // Add caching headers for performance.
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return response.status(200).json(responseData);
  } catch (error) {
    console.error('Error in /api/get-data:', error);
    // Check for a common error: table not found
    if (error.message.includes('relation "fnl_data" does not exist')) {
        return response.status(500).json({ error: 'Database table not found. Please set up the database table.' });
    }
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
