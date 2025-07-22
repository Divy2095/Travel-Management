const db = require("../database/db");
const path = require("path");
const fs = require("fs");
const { error } = require("console");

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const query = `
            SELECT t.*, l.name as location_name, l.address as location_address,
             c.name as city_name, c.state as city_state
            FROM trips t
            LEFT JOIN locations l ON t.location_id = l.id
            LEFT JOIN cities c ON l.city_id = c.id
            ORDER BY t.created_at DESC
        `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch trips.",
          error: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Trip fetched successfully.",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error fetching trips: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trips.",
      error: error.message,
    });
  }
};

// Add new trip
exports.addTrip = async (req, res) => {
  console.log("hii");
  try {
    const {
      title,
      description,
      date,
      location_id,
      price,
      duration,
      max_participants,
      status,
    } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and date are required.",
      });
    }

    let imagePath = null;
    // Handle file upload
    if (req.file) {
      imagePath = /uploads/${req.file.filename};
    }

    // Insert trip
    const insertTripQuery = `
                            INSERT INTO trips (
                            title, description, date, location_id, price, 
                            duration, max_participants, status, imagePath,
                            entry_by, entry_date )
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    const tripParams = [
      title,
      description,
      date,
      location_id || null,
      price || null,
      duration || null,
      max_participants || 10,
      status || "active",
      imagePath,
      req.body.entry_by, // must come from frontend
    ];

    db.query(insertTripQuery, tripParams, (tripErr, tripResult) => {
      if (tripErr) {
        console.error("Database error: ", tripErr);
        return res.status(500).json({
          success: false,
          message: "Failed to add trip.",
          error: tripErr.message,
        });
      }

      return res.status(201).json({
        success: true,
        message: "Trip added successfully.",
        data: {
          id: tripResult.insertId,
          title,
          description,
          date,
          location_id: location_id || null,
          price: price || null,
          duration: duration || null,
          max_participants: max_participants || 10,
          status: status || "active",
          imagePath,
        },
      });
    });
  } catch (error) {
    console.error("Error adding trip:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add trip",
      error: error.message,
    });
  }
};

// Update Trip
exports.updateTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const {
      title,
      description,
      date,
      location_id,
      price,
      duration,
      max_participants,
      status,
    } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and date are required.",
      });
    }

    // Check if trip exists and get current image
    const checkTripQuery = "SELECT imagePath FROM trips WHERE id = ?";
    db.query(checkTripQuery, [tripId], (checkErr, checkResults) => {
      if (checkErr) {
        return res.status(500).json({
          success: false,
          message: "Database error while checking trip.",
          error: checkErr.message,
        });
      }

      if (checkResults.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Trip not found.",
        });
      }

      let imagePath = checkResults[0].imagePath;

      // If new image is uploaded , update path.
      if (req.file) {
        // Delete old image if exists
        if (imagePath) {
          const oldImagePath = path.join(__dirname, "..", imagePath);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        imagePath = /uploads/${req.file.filename};
      }

      // Update trip
      const updateTripQuery = `
                              UPDATE trips
                              SET title = ?, description = ?, date = ?, location_id = ?,
                              price = ?, duration = ?, max_participants = ?, status = ?, imagePath = ?,
                              update_by = ?, update_date = NOW() WHERE id = ?`;

      const tripParams = [
        title,
        description,
        date,
        location_id || null,
        price || null,
        duration || null,
        max_participants || 10,
        status || "active",
        imagePath,
        req.body.update_by, // from frontend
        tripId,
      ];

      db.query(updateTripQuery, tripParams, (tripErr, tripResult) => {
        if (tripErr) {
          console.error("Database error: ", tripErr);
          return res.status(500).json({
            success: false,
            message: "Failed to update trip.",
            error: tripErr.message,
          });
        }

        return res.status(200).json({
          success: true,
          message: "Trip updated successfully.",
        });
      });
    });
  } catch (error) {
    console.error("Error updating trip:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update trip.",
      error: error.message,
    });
  }
};

// Delete trip
exports.deleteTrip = async (req, res) => {
  try {
    const tripId = req.params.id;

    // check if trip exists and get image path
    const checkTripQuery = "SELECT imagePath FROM trips WHERE id = ?";
    db.query(checkTripQuery, [tripId], (checkErr, checkResults) => {
      if (checkErr) {
        return res.status(500).json({
          success: false,
          message: "Database error while checking.",
          error: checkErr.message,
        });
      }

      if (checkResults.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Trip not found.",
        });
      }

      const imagePath = checkResults[0].imagePath;

      // Delete trip
      const deleteTripQuery = "DELETE FROM trips WHERE id = ?";
      db.query(deleteTripQuery, [tripId], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error("Database error: ", deleteErr);
          return res.status(500).json({
            success: false,
            message: "Failed to delete trip.",
            error: deleteErr.message,
          });
        }

        // Delete image file if exists
        if (imagePath) {
          const imageFilePath = path.join(__dirname, "..", imagePath);
          if (fs.existsSync(imageFilePath)) {
            fs.unlinkSync(imageFilePath);
          }
        }

        return res.status(200).json({
          success: true,
          message: "Trip deleted successfully.",
        });
      });
    });
  } catch (error) {
    console.error("Error deleting trip: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete trip.",
      error: error.message,
    });
  }
};

// Get trip by Id
exports.getTripById = async (req, res) => {
  try {
    const tripId = req.params.id;
    const query = `
            SELECT t.*, l.name as location_name, l.address as location_address,
            c.name as city_name, c.state as city_state
            FROM trips t
            LEFT JOIN locations l ON t.location_id = l.id
            LEFT JOIN cities c ON l.city_id = c.id
            WHERE t.id = ?
        `;

    db.query(query, [tripId], (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch trip.",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Trip not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Trip fetched successfully.",
        data: results[0],
      });
    });
  } catch (error) {
    console.error("Error fetching trip:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trip.",
      error: error.message,
    });
  }
};

// Get Trips by Status
exports.getTripByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const query = `
      SELECT t.*, l.name as location_name, l.address as location_address,
             c.name as city_name, c.state as city_state
      FROM trips t
      LEFT JOIN locations l ON t.location_id = l.id
      LEFT JOIN cities c ON l.city_id = c.id
      WHERE t.status = ?
      ORDER BY t.created_at DESC
    `;

    db.query(query, [status], (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch trips by status.",
          error: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: ${status} trips fetched successfully.,
        data: results,
      });
    });
  } catch (error) {
    console.error("Error fetching trips by status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trips by status.",
      error: error.message,
    });
  }
};

// Get Upcoming Trips