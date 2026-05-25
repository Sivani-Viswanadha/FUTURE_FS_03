const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// database location
const dbPath = path.join(__dirname, "../data/cafe.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log(
      "Database connection failed:",
      err.message
    );
  } else {
    console.log("Connected to database");
  }
});

// Create table automatically
db.run(`
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
)
`);

module.exports = db;