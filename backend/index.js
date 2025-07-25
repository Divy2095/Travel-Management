const express = require("express");
const db = require("./database/db");
// const mysql = require("mysql2");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const vehicleRoutes = require("./routes/vehicles");
const driverRoutes = require("./routes/drivers");
const tripRoutes = require("./routes/trips");
const bookingRoutes = require("./routes/bookings");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error while retriving user data.",
      });
    }
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started running on Port ${PORT}`);
});
