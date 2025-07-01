const express = require("express");
const db = require("./database/db");
const mysql = require("mysql2");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const fileUpload = require("express-fileupload");
const tripRoutes = require("./routes/tripRoutes");
const locationRoutes = require("./routes/locationRoutes");
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  createParentPath: true,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  },
  abortOnLimit: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api", locationRoutes);

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
