const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Get all vehicles
router.get("/", (req, res) => {
  db.query("SELECT * FROM vehicles ORDER BY id DESC", (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving vehicles data",
      });
    }
    res.json({
      success: true,
      data: results,
    });
  });
});

// Add a new Vehicle
router.post("/", (req, res) => {
  let { vehicle_number, type, model, capacity, status, entry_by } = req.body;
  // Log incoming data for debugging
  console.log("Received vehicle data:", req.body);

  // Basic validation
  if (!vehicle_number || !type || !model || !status || !entry_by) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }
  // Validate status value
  const validStatuses = ["available", "in_use", "maintenance"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value.",
    });
  }
  // Handle capacity as null if empty or not a number
  if (capacity === undefined || capacity === null || capacity === "") {
    capacity = null;
  } else {
    capacity = Number(capacity);
    if (isNaN(capacity)) capacity = null;
  }

  // Validate vehicle_number is unique
  db.query(
    "SELECT * FROM vehicles WHERE vehicle_number = ?",
    [vehicle_number],
    (err, results) => {
      if (err) {
        console.error("Database error checking vehicle number:", err);
        return res.status(500).json({
          success: false,
          message: "Database error checking vehicle number",
        });
      }
      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Vehicle number already exists",
        });
      }
      // Insert new vehicle
      const sql = `
      INSERT INTO vehicles 
      (vehicle_number, type, model, capacity, status, entry_by) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
      db.query(
        sql,
        [vehicle_number, type, model, capacity, status, entry_by],
        (err, result) => {
          if (err) {
            console.error("Database error adding vehicle:", err);
            return res.status(500).json({
              success: false,
              message: "Error adding vehicle",
              error: err.sqlMessage || err.message || err,
            });
          }
          return res.status(201).json({
            success: true,
            message: "Vehicle added successfully",
            vehicleId: result.insertId,
          });
        }
      );
    }
  );
});

module.exports = router;
