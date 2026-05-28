import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Fetch all teams and fixtures, ordered for consistency
    const { rows: teams } = await sql`SELECT * FROM teams ORDER BY id;`;
    const { rows: fixtures } = await sql`SELECT * FROM fixtures ORDER BY date, time;`;
    
    return response.status(200).json({ teams, fixtures });
  } catch (error) {
    // A common error is that the tables don't exist yet.
    if (error.message.includes('relation "teams" does not exist') || error.message.includes('relation "fixtures" does not exist')) {
      console.log("Tables not found. Awaiting setup.");
      return response.status(200).json({ teams: [], fixtures: [] });
    }
    console.error('Error fetching data from Vercel Postgres:', error);
    return response.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}