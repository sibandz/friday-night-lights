import { sql } from '@vercel/postgres';

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
    // Use a transaction to ensure all operations succeed or none do.
    await sql`BEGIN`;

    // Clear out the old data completely.
    await sql`TRUNCATE teams, fixtures RESTART IDENTITY;`;

    // Insert all the new teams.
    for (const team of teams) {
      await sql`INSERT INTO teams (id, name, sport, division) VALUES (${team.id}, ${team.name}, ${team.sport}, ${team.division});`;
    }

    // Insert all the new fixtures.
    for (const fx of fixtures) {
      await sql`INSERT INTO fixtures (sport, division, teamA, teamB, date, time, status, type, venue) VALUES (${fx.sport}, ${fx.division}, ${fx.teamA}, ${fx.teamB}, ${fx.date}, ${fx.time}, ${fx.status}, ${fx.type}, ${fx.venue});`;
    }

    // Commit the transaction.
    await sql`COMMIT`;
    
    return response.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    await sql`ROLLBACK`; // Roll back the transaction on error
    console.error('Error saving data to Vercel Postgres:', error);
    return response.status(500).json({ error: 'Failed to save data', details: error.message });
  }
}