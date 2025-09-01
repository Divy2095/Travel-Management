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
const moneyRoutes = require("./routes/moneyRoutes");
const receiptRoutes = require("./routes/receiptRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  if (req.method === "DELETE" || req.method === "PUT") {
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/driver-money", moneyRoutes);
app.use("/api/receipts", receiptRoutes);

// Debug: list all registered routes
app.get("/_debug/routes", (req, res) => {
  const routes = [];
  const stack = app._router.stack;
  stack.forEach((layer) => {
    if (layer.route && layer.route.path) {
      const methods = Object.keys(layer.route.methods).map((m) =>
        m.toUpperCase()
      );
      routes.push({ methods, path: layer.route.path });
    } else if (layer.name === "router" && layer.handle.stack) {
      layer.handle.stack.forEach((r) => {
        if (r.route) {
          const methods = Object.keys(r.route.methods).map((m) =>
            m.toUpperCase()
          );
          // Prepend mount path if exists
          let base = layer.regexp && layer.regexp.source;
          // Attempt to extract the mount path from the regexp
          let mount = "";
          if (layer.regexp && layer.regexp.source) {
            const match = layer.regexp.source.match(
              /\^\\\/(.*?)\\\/\?\(\?=\\\/?\)/
            );
            if (match && match[1]) mount = "/" + match[1];
          }
          routes.push({ methods, path: mount + r.route.path });
        }
      });
    }
  });
  res.json(routes);
});

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
