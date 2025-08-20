const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Get all drivers
router.get("/", (req, res) => {
  db.query("SELECT * FROM drivers ORDER BY id DESC", (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving drivers data.",
      });
    }
    res.json({
      success: true,
      data: results,
    });
  });
});

// Add a new driver
router.post("/", (req, res) => {
  let {
    name,
    email,
    phone,
    license_number,
    license_expiry,
    address,
    status,
    assigned_vehicle_id,
    profile_photo,
    rating,
    entry_by,
  } = req.body;

  // Basic Validation
  if (!name || !phone || !license_number || !license_expiry) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }

  // Handle optional fields
  if (!status) status = "active";
  if (!rating) rating = nunll;
  if (!assigned_vehicle_id) assigned_vehicle_id = null;

  const sql = `
        INSERT INTO drivers
        (name, email, phone, license_number, license_expiry, address, status, assigned_vehicle_id, profile_photo, rating, entry_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      name,
      email,
      phone,
      license_number,
      license_expiry,
      address,
      status,
      assigned_vehicle_id,
      profile_photo,
      rating,
      entry_by,
    ],
    (err, result) => {
      if (err) {
        console.error("Database error adding driver:", err);
        return res.status(500).json({
          success: false,
          message: "Error adding driver",
          error: err.sqlMessage || err.message || err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "Driver added successfully",
        driverId: result.insertId,
      });
    }
  );
});

// Delete a driver
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM drivers WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error deleting driver",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.json({
      success: true,
      message: "Driver deleted successfully",
    });
  });
});

// Update a driver
router.put("/:id", (req, res) => {
  const { id } = req.params;
  let {
    name,
    email,
    phone,
    license_number,
    license_expiry,
    address,
    status,
    assigned_vehicle_id,
    profile_photo,
    rating,
  } = req.body;

  // Basic validation
  if (!name || !phone || !license_number || !license_expiry) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }

  // Handle optional fields
  if (!status) status = "active";
  if (!rating) rating = null;
  if (!assigned_vehicle_id) assigned_vehicle_id = null;

  const driverData = {
    name,
    email,
    phone,
    license_number,
    license_expiry,
    address,
    status,
    assigned_vehicle_id,
    profile_photo,
    rating,
  };

  // Update in database
  db.query(
    "UPDATE drivers SET ? WHERE id = ?",
    [driverData, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error updating driver",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Driver not found",
        });
      }

      res.json({
        success: true,
        message: "Driver updated successfully",
      });
    }
  );
});

// Delete a driver
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM drivers WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error deleting driver",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.json({
      success: true,
      message: "Driver deleted successfully",
    });
  });
});

module.exports = router;
