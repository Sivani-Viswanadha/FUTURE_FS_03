require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(
  cors({
    origin:
      "https://future-fs-03-1796.vercel.app",
    methods: [
      "GET",
      "POST",
      "OPTIONS",
    ],
  })
);

app.use(express.json());

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Cafe server is running");
});

/* ==========================
   CONTACT API
========================== */
app.post("/api/contact", (req, res) => {
  const { name, email, message } =
    req.body;

  const query =
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.run(
    query,
    [name, email, message],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Database error",
        });
      }

      res.json({
        message:
          "Message sent successfully!",
      });
    }
  );
});

/* ==========================
   RESERVATION API
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

app.post("/api/reserve", (req, res) => {
  const {
    name,
    email,
    phone,
    date,
    time,
    guests,
  } = req.body;

  const query = `
    INSERT INTO reservations
    (name, email, phone, date, time, guests)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      name,
      email,
      phone,
      date,
      time,
      guests,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          error:
            "Failed to reserve table",
        });
      }

      res.json({
        message:
          "Table booked successfully!",
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});