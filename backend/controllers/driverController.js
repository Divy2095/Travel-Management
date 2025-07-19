const db = require("../database/db");

// Get all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    const query = `
      SELECT d.*, v.vehicle_number, v.type as vehicle_type, v.model as vehicle_model
      FROM drivers d
      LEFT JOIN vehicles v ON d.assigned_vehicle_id = v.id
      ORDER BY d.joined_date DESC
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch drivers.",
          error: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Drivers fetched successfully.",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error fetching drivers: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch drivers.",
      error: error.message,
    });
  }
};

// Add new Driver
exports.addDriver = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      license_number,
      license_expiry,
      address,
      status,
      assigned_vehicle_id,
      rating,
    } = req.body;

    if (!name || !phone || !license_number || !license_expiry) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, license number and license expiry are required.",
      });
    }

    // Check if email already exists (if provided)
    if (email) {
      const checkEmailQuery = "SELECT id FROM drivers WHERE email = ?";
      const emailCheck = await new Promise((resolve, reject) => {
        db.query(checkEmailQuery, [email], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      if (emailCheck.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already exists.",
        });
      }
    }

    // Check if license number already exists
    const checkLicenseQuery = "SELECT id FROM drivers WHERE license_number = ?";
    db.query(
      checkLicenseQuery,
      [license_number],
      (licenseErr, licenseResults) => {
        if (licenseErr) {
          return res.status(500).json({
            success: false,
            message: "Database error while checking license.",
            error: licenseErr.message,
          });
        }

        if (licenseResults.length > 0) {
          return res.status(400).json({
            success: false,
            message: "License number already exists.",
          });
        }

        // Insert driver
        const insertDriverQuery = `INSERT INTO drivers (
                                  name, email, phone, license_number, license_expiry, 
                                  address, status, assigned_vehicle_id, rating, entry_by, entry_date ) 
                                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());`;

        const driverParams = [
          name,
          email || null,
          phone,
          license_number,
          license_expiry,
          address || null,
          status || "active",
          assigned_vehicle_id || null,
          rating || null,
          req.body.entry_by, // pass from frontend
        ];

        db.query(insertDriverQuery, driverParams, (driverErr, driverResult) => {
          if (driverErr) {
            console.error("Database error: ", driverErr);
            return res.status(500).json({
              success: false,
              message: "Failed to add driver.",
              error: driverErr.message,
            });
          }

          return res.status(201).json({
            success: true,
            message: "Driver added successfully.",
            data: {
              id: driverResult.insertId,
              name,
              email: email || null,
              phone,
              license_number,
              license_expiry,
              address: address || null,
              status: status || "active",
              assigned_vehicle_id: assigned_vehicle_id || null,
              rating: rating || null,
            },
          });
        });
      }
    );
  } catch (error) {
    console.error("Error adding driver:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add driver",
      error: error.message,
    });
  }
};

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    const driverId = req.params.id;
    const {
      name,
      email,
      phone,
      license_number,
      license_expiry,
      address,
      status,
      assigned_vehicle_id,
      rating,
    } = req.body;

    if (!name || !phone || !license_number || !license_expiry) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, license number and license expiry are required.",
      });
    }

    // Check if driver exists
    const checkDriverQuery = "SELECT id FROM drivers WHERE id = ?";
    db.query(checkDriverQuery, [driverId], (checkErr, checkResults) => {
      if (checkErr) {
        return res.status(500).json({
          success: false,
          message: "Database error while checking driver.",
          error: checkErr.message,
        });
      }

      if (checkResults.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Driver not found.",
        });
      }

      // Update driver
      const updateDriverQuery = `UPDATE drivers
                                SET name = ?, email = ?, phone = ?, license_number = ?,
                                license_expiry = ?, address = ?, status = ?, 
                                assigned_vehicle_id = ?, rating = ?, update_by = ?, update_date = NOW()
                                WHERE id = ?`;

      const driverParams = [
        name,
        email || null,
        phone,
        license_number,
        license_expiry,
        address || null,
        status || "active",
        assigned_vehicle_id || null,
        rating || null,
        req.body.update_by, // pass from frontend
        driverId,
      ];

      db.query(updateDriverQuery, driverParams, (driverErr, driverResult) => {
        if (driverErr) {
          console.error("Database error: ", driverErr);
          return res.status(500).json({
            success: false,
            message: "Failed to update driver.",
            error: driverErr.message,
          });
        }

        return res.status(200).json({
          success: true,
          message: "Driver updated successfully.",
        });
      });
    });
  } catch (error) {
    console.error("Error updating driver: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update driver.",
      error: error.message,
    });
  }
};

// Delete driver
exports.deleteDriver = async (req, res) => {
  try {
    const driverId = req.params.id; // ✅ FIXED: Changed from req.driverParams.id

    // Check if driver exists
    const checkDriverQuery = "SELECT id FROM drivers WHERE id = ?";
    db.query(checkDriverQuery, [driverId], (checkErr, checkResults) => {
      if (checkErr) {
        return res.status(500).json({
          success: false,
          message: "Database error while checking driver.",
          error: checkErr.message,
        });
      }

      if (checkResults.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Driver not found.",
        });
      }

      // Delete driver
      const deleteDriverQuery = "DELETE FROM drivers WHERE id = ?";
      db.query(
        deleteDriverQuery,
        [driverId],
        (deleteDriverErr, deleteDriverResult) => {
          if (deleteDriverErr) {
            console.error("Database error: ", deleteDriverErr);
            return res.status(500).json({
              success: false,
              message: "Failed to delete driver.",
              error: deleteDriverErr.message,
            });
          }

          return res.status(200).json({
            success: true,
            message: "Driver deleted successfully.",
          });
        }
      );
    });
  } catch (error) {
    console.error("Error deleting driver: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete driver.",
      error: error.message,
    });
  }
};

// Get available vehicles for assignment
exports.getAvailableVehicles = async (req, res) => {
  try {
    const query = `
      SELECT v.* 
      FROM vehicles v
      LEFT JOIN drivers d ON v.id = d.assigned_vehicle_id
      WHERE d.assigned_vehicle_id IS NULL AND v.status = 'available'
      ORDER BY v.vehicle_number
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch available vehicles.", // ✅ FIXED: Message
          error: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Available vehicles fetched successfully.",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error fetching available vehicles: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch available vehicles.",
      error: error.message,
    });
  }
};

// Get driver by ID
exports.getDriverById = async (req, res) => {
  try {
    const driverId = req.params.id;
    const query = `
      SELECT d.*, v.vehicle_number, v.type as vehicle_type, v.model as vehicle_model
      FROM drivers d
      LEFT JOIN vehicles v ON d.assigned_vehicle_id = v.id
      WHERE d.id = ?
    `;

    db.query(query, [driverId], (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch driver.",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Driver not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Driver fetched successfully.",
        data: results[0],
      });
    });
  } catch (error) {
    console.error("Error fetching driver: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch driver.",
      error: error.message,
    });
  }
};
