const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");
const pool = new Pool();

async function testQuery() {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [2]);
    console.log(result.rows);
  } catch (err) {
    console.error("Error querying database:", err);
  } finally {
    await pool.end();
  }
}

testQuery();
