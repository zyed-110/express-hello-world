const express = require("express");
const { Pool } = require("pg");  // PostgreSQL client
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection (use Supabase credentials here)
const pool = new Pool({
  host: process.env.DB_HOST,     // e.g. db.abcd.supabase.co
  port: 5432,
  user: process.env.DB_USER,     // e.g. postgres
  password: process.env.DB_PASS, // your Supabase password
  database: process.env.DB_NAME, // usually "postgres"
  ssl: { rejectUnauthorized: false }
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello from Render + Supabase!");
});

// Test DB connection
app.get("/dbtest", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
