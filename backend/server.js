require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const db =
  require("./database");

const app =
  express();

/* ==========================
   CORS
========================== */

app.use(
  cors({
    origin: [
      "https://future-fs-03-1796.vercel.app",
      "http://localhost:3000",
      "http://localhost:5500",
      "http://127.0.0.1:5500"
    ],
    methods: [
      "GET",
      "POST",
      "OPTIONS"
    ],
    credentials: true
  })
);

app.use(express.json());

const PORT =
  process.env.PORT ||
  3000;

/* ==========================
   TEST ROUTE
========================== */

app.get("/", (req, res) => {
  res.send(
    "Cafe server is running"
  );
});

/* ==========================
   CONTACT API
========================== */

app.post(
  "/api/contact",
  (req, res) => {
    const {
      name,
      email,
      message
    } = req.body;

    const query =
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.run(
      query,
      [
        name,
        email,
        message
      ],
      function (
        err
      ) {
        if (err) {
          console.error(
            err
          );

          return res
            .status(
              500
            )
            .json({
              error:
                "Database error"
            });
        }

        res.json({
          message:
            "Message sent successfully!"
        });
      }
    );
  }
);

/* ==========================
   RESERVATION TABLE
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

/* ==========================
   RESERVATION API
========================== */

app.post(
  "/api/reserve",
  (req, res) => {
    const {
      name,
      email,
      phone,
      date,
      time,
      guests
    } =
      req.body;

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
        guests
      ],
      function (
        err
      ) {
        if (err) {
          console.error(
            err
          );

          return res
            .status(
              500
            )
            .json({
              error:
                "Failed to reserve table"
            });
        }

        res.json({
          message:
            "Table booked successfully!"
        });
      }
    );
  }
);

/* ==========================
   SERVER
========================== */

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on port ${PORT}`
    );
  }
);