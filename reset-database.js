import { sql } from '@vercel/postgres';
import { defaultTeams, defaultFixtures } from '../lib/data.js';

export default async function handler(request, response) {
  try {
    await sql`BEGIN`;

    // Create tables if they don't exist
    await sql`
      CREATE TABLE IF NOT EXISTS teams (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        sport VARCHAR(50) NOT NULL,
        division VARCHAR(50) NOT NULL
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS fixtures (
        id SERIAL PRIMARY KEY,
        sport VARCHAR(50) NOT NULL,
        division VARCHAR(50) NOT NULL,
        teamA VARCHAR(255) NOT NULL,
        teamB VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time VARCHAR(10) NOT NULL,
        status VARCHAR(20) NOT NULL,
        type VARCHAR(50),
        venue VARCHAR(100)
      );
    `;

    // Clear existing data
    await sql`TRUNCATE teams, fixtures RESTART IDENTITY;`;

    // Insert default teams
    for (const team of defaultTeams) {
      await sql`INSERT INTO teams (id, name, sport, division) VALUES (${team.id}, ${team.name}, ${team.sport}, ${team.division});`;
    }

    // Insert default fixtures
    for (const fx of defaultFixtures) {
      await sql`INSERT INTO fixtures (sport, division, teamA, teamB, date, time, status, type, venue) VALUES (${fx.sport}, ${fx.division}, ${fx.teamA}, ${fx.teamB}, ${fx.date}, ${fx.time}, ${fx.status}, ${fx.type}, ${fx.venue});`;
    }

    await sql`COMMIT`;
    return response.status(200).json({ message: 'Database has been reset with default data.' });
  } catch (error) {
    await sql`ROLLBACK`;
    return response.status(500).json({ error: error.message });
  }
}