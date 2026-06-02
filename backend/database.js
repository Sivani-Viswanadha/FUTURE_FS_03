const sqlite3 =
  require("sqlite3").verbose();

const path =
  require("path");

/* ==========================
   DATABASE LOCATION
========================== */

const dbPath =
  path.join(
    __dirname,
    "cafe.db"
  );

const db =
  new sqlite3.Database(
    dbPath,
    (err) => {
      if (err) {
        console.log(
          "Database connection failed:",
          err.message
        );
      } else {
        console.log(
          "Connected to database"
        );
      }
    }
  );

/* ==========================
   CONTACT TABLE
========================== */

db.run(`
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
)
`);

/* ==========================
   RESERVATIONS TABLE
========================== */

db.run(`
CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  guests INTEGER NOT NULL
)
`);

module.exports =
  db;