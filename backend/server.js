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
    origin: true,
    methods: [
      "GET",
      "POST",
      "OPTIONS"
    ]
  })
);

/* ==========================
   MIDDLEWARE
========================== */

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

    // Validation
    if (
      !name ||
      !email ||
      !message
    ) {
      return res
        .status(400)
        .json({
          error:
            "Please fill all fields"
        });
    }

    const query =
      `
      INSERT INTO contacts
      (name, email, message)
      VALUES (?, ?, ?)
    `;

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
            "Contact DB Error:",
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

    // Validation
    if (
      !name ||
      !email ||
      !phone ||
      !date ||
      !time ||
      !guests
    ) {
      return res
        .status(400)
        .json({
          error:
            "Please fill all fields"
        });
    }

    const query =
      `
      INSERT INTO reservations
      (
        name,
        email,
        phone,
        date,
        time,
        guests
      )
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
            "Reservation DB Error:",
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