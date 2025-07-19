const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Get all Trips
router.get("/", (req, res) => {
  db.query("SELECT * FROM trips ORDER BY id DESC", (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error while fetching trips data.",
      });
    }
    res.json({
      success: true,
      data: results,
    });
  });
});

// Add a New Trip
router.post("/", (req, res) => {
  const {
    title,
    description,
    date,
    image,
    location_id,
    price,
    duration,
    max_participants,
    status,
    entry_by,
  } = req.body;

  if (!title || !description || !date || !image) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }

  const sql = `
    INSERT INTO trips
    (title, description, date, image, location_id, price, duration, max_participants, status, entry_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      description,
      date,
      image,
      location_id || null,
      price || null,
      duration || null,
      max_participants || 10,
      status || "active",
      entry_by || "admin",
    ],
    (err, result) => {
      if (err) {
        console.error("Database error adding trip:", err);
        return res.status(500).json({
            success: false,
            message: "Error adding trip",
            error: err.sqlMessage || err.message || err,
          });
      }
      return res
        .status(201)
        .json({
          success: true,
          message: "Trip added successfully",
          tripId: result.insertId,
        });
    }
  );
});

module.exports = router;
