// inside db/index.js
const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client({
    host: '3.136.22.167',
    port: 5432,
    database: 'juicebox-dev',
    user: 'postgres',
    password: 'Albino778899',
  })
module.exports = {
  client,
} 


async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);

    return rows;
  }
  
  // and export them
  module.exports = {
    client,
    getAllUsers,
    createUser,
  }

  async function createUser({ username, password }) {
    try {
      const result = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `, [username, password]);
  
      return result;
    } catch (error) {
      throw error;
    }
  }
