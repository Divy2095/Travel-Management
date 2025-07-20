const express = require("express");
const router = express.Router();
const db = require("../database/db");
const fileUpload = require("express-fileupload");
const { CloudinaryUpload } = require("../utils/Cloudinary");

// Middleware to handle file uploads
router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Get all trips
router.get("/", (req, res) => {
  const query = `
    SELECT t.*, l.name as location_name 
    FROM trips t
    LEFT JOIN locations l ON t.location_id = l.id
    ORDER BY t.id DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching trips",
        error: err.message,
      });
    }
    res.json({ success: true, data: results });
  });
});

// Get all locations (for dropdown)
router.get("/locations", (req, res) => {
  const query = `
    SELECT l.id, l.name, l.address, l.pincode, l.city_id, c.name AS city_name
    FROM locations l
    LEFT JOIN cities c ON l.city_id = c.id
    WHERE c.id IS NOT NULL;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching locations:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    return res.json({
      success: true,
      data: results,
    });
  });
});

// Add new trip (with Cloudinary)
router.post("/", async (req, res) => {
  const {
    title,
    description,
    date,
    location_id,
    price,
    duration,
    max_participants,
    status,
    entry_by,
  } = req.body;

  // Validate required fields
  if (!title || !description || !date) {
    return res.status(400).json({
      success: false,
      message: "Title, description, and date are required.",
    });
  }

  // Validate location exists if provided
  if (location_id && location_id !== "null") {
    try {
      const [location] = await db
        .promise()
        .query("SELECT id FROM locations WHERE id = ?", [location_id]);
      if (!location.length) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID provided.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error validating location",
        error: err.message,
      });
    }
  }

  let imageUrl = null;

  // Upload image to Cloudinary
  try {
    if (req.files && req.files.image) {
      const cloudRes = await CloudinaryUpload(req.files.image, "trips");
      imageUrl = cloudRes.secure_url;
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: err.message,
    });
  }

  // Prepare trip data
  const tripData = {
    title,
    description,
    date,
    image: imageUrl,
    location_id: location_id && location_id !== "null" ? location_id : null,
    price: price ? parseFloat(price) : null,
    duration: duration || null,
    max_participants: max_participants || 10,
    status: status || "active",
    entry_by: entry_by || "admin",
  };

  // Insert into database
  db.query("INSERT INTO trips SET ?", tripData, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to add trip",
        error: err.sqlMessage || err.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Trip added successfully",
      tripId: result.insertId,
      image: imageUrl,
    });
  });
});

module.exports = router;
