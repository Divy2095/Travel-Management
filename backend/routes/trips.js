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

// Get all trips
router.get("/", (req, res) => {
  const query = `
    SELECT 
    t.*, 
    l.name AS location_name,
    d.name AS driver_name,
    d.phone AS driver_phone,
    d.status AS driver_status
  FROM trips t
  LEFT JOIN locations l ON t.location_id = l.id
  LEFT JOIN drivers d ON t.driver_id = d.id
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

// Get single trip by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = `
      select  t.*, 
    l.name AS location_name,
    d.name AS driver_name,
    d.phone AS driver_phone,
    d.status AS driver_status
  FROM trips t
  LEFT JOIN locations l ON t.location_id = l.id
  LEFT JOIN drivers d ON t.driver_id = d.id
  WHERE t.id = ?
  `;
  console.log("query bbe fetch trip",query);
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching trip",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.json({ success: true, data: results[0] });
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
    driver_id,
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
console.log("logged in user",req.user?.id);
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
    entry_by:  entry_by ? entry_by : req.user?.id || 1,
    driver_id:driver_id,
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

     const tripId = result.insertId;
     //update driver status 
     if (driver_id) {
      db.query("UPDATE drivers SET status = 'on_trip' WHERE id = ?", [driver_id], (err2) => {
          if (err2) {console.error("Error updating driver status:", err2);
             return res.status(500).json({
          success: false,
          message: "Trip created, but failed to update driver status",
          tripId,})
          }
      })
     }

    return res.status(201).json({
      success: true,
      message: "Trip added successfully",
      tripId: result.insertId,
      image: imageUrl,
    });
  });
});

// Update a trip
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    date,
    location_id,
    price,
    duration,
    max_participants,
    status,
    driver_id, // Make sure driver_id is passed in req.body if needed
  } = req.body;

  // Validate required fields
  if (!title || !description || !date) {
    return res.status(400).json({
      success: false,
      message: "Title, description, and date are required.",
    });
  }

  let imageUrl = null;

  // Handle image upload if provided
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
    location_id: location_id && location_id !== "null" ? location_id : null,
    price: price ? parseFloat(price) : null,
    duration: duration || null,
    max_participants: max_participants || 10,
    status: status || "active",
    driver_id: driver_id || null,
  };

  // Add image only if a new one was uploaded
  if (imageUrl) {
    tripData.image = imageUrl;
  }

  // Update trip in database
  db.query("UPDATE trips SET ? WHERE id = ?", [tripData, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update trip",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // Now update driver status based on trip date
    const tripDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // compare only date part

    if (driver_id) {
      if (tripDate > today) {
        // Future trip -> driver on_trip
        db.query(
          "UPDATE drivers SET status='on_trip' WHERE id = ?",
          [driver_id],
          (err) => {
            if (err) console.error("Error updating driver status (on_trip):", err);
          }
        );
      } else if (tripDate < today) {
        // Past trip -> driver available, remove driver assignment
        db.query("UPDATE drivers SET status='active' WHERE id = ?", [driver_id], (err) => {
          if (err) console.error("Error updating driver status (active):", err);
        });

        // Remove driver from trip
        db.query("UPDATE trips SET driver_id = NULL WHERE id = ?", [id], (err) => {
          if (err) console.error("Error removing driver from past trip:", err);
        });
      }
    }

    res.json({
      success: true,
      message: "Trip updated successfully",
    });
  });
});


// Delete a trip
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // First get the driver_id for this trip
  db.query("SELECT driver_id FROM trips WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching trip driver",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const driverId = results[0].driver_id;

    // Delete the trip
    db.query("DELETE FROM trips WHERE id = ?", [id], (err2, result) => {
      if (err2) {
        return res.status(500).json({
          success: false,
          message: "Error deleting trip",
          error: err2.message,
        });
      }

      // Reset driver status if driver was assigned
      if (driverId) {
        db.query("UPDATE drivers SET status = 'active' WHERE id = ?", [driverId], (err3) => {
          if (err3) {
            return res.status(500).json({
              success: false,
              message: "Trip deleted but failed to reset driver status",
              error: err3.message,
            });
          }

          return res.json({
            success: true,
            message: "Trip deleted and driver status reset to active",
          });
        });
      } else {
        return res.json({
          success: true,
          message: "Trip deleted successfully (no driver assigned)",
        });
      }
    });
  });
});


//to assign driver to trip
// Assign driver to trip and update status
router.post("/assign-driver", (req, res) => {
  const { trip_id, driver_id } = req.body;

  if (!trip_id || !driver_id)
    return res.status(400).json({ success: false, message: "Trip ID and Driver ID required" });

  // Check if driver exists and is active
  db.query("SELECT status FROM drivers WHERE id = ?", [driver_id], (err, driver) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!driver.length) return res.status(404).json({ success: false, message: "Driver not found" });
    if (driver[0].status !== "active")
      return res.status(400).json({ success: false, message: "Driver is not available" });

    // Check if trip already has a driver
    db.query("SELECT driver_id FROM trips WHERE id = ?", [trip_id], (err2, tripData) => {
      if (err2) return res.status(500).json({ success: false, message: err2.message });

      const oldDriverId = tripData[0].driver_id;

      // Update trip with new driver
      db.query(
        "UPDATE trips SET driver_id = ?, trip_status = 'scheduled' WHERE id = ?",
        [driver_id, trip_id],
        (err3) => {
          if (err3) return res.status(500).json({ success: false, message: err3.message });

          // Update new driver status
          db.query("UPDATE drivers SET status = 'on_trip' WHERE id = ?", [driver_id], (err4) => {
            if (err4) return res.status(500).json({ success: false, message: err4.message });

            // Reset old driver status if exists
            if (oldDriverId) {
              db.query("UPDATE drivers SET status = 'active' WHERE id = ?", [oldDriverId], (err5) => {
                if (err5) console.error("Error resetting old driver status:", err5.message);
              });
            }

            return res.json({ success: true, message: "Driver assigned to trip successfully" });
          });
        }
      );
    });
  });
});



module.exports = router;
