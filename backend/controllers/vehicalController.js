const db = require("../database/db");

exports.getAllVehicals = async (req, res) => {
  try {
    const query = `
        SELECT v.*, d.name as driver_name 
        FROM vehicles v 
        LEFT JOIN drivers d ON v.id = d.assigned_vehicle_id 
        ORDER BY v.created_at DESC;`;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch Vehicles",
          error: err.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Vehicles fetched Successfully.",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error fetching vehicles: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Vehicles.",
      error: error.message,
    });
  }
};

// Add new Vehicle
exports.addVehicle = async (req, res) => {
  try {
    const { vehicle_number, type, model, capacity, status } = req.body;

    if (!vehicle_number || !type || !model) {
      return res.status(400).json({
        success: false,
        message: "Vehicle nunmber , type and model are required.",
      });
    }

    // check if vehicle number already exists
    const checkQuery = "SELECT id FROM vehicles WHERE vehicle_number = ?";
    db.query(checkQuery, [vehicle_number], (checkErr, checkResults) => {
      if (checkErr) {
        return res.status(500).json({
          success: false,
          message: "Database error while checking vehicle.",
          error: checkErr.message,
        });
      }

      if (checkResults.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Vehicle with this number already exists.",
        });
      }

      // Insert new Vehicle
      const insertQuery = `INSERT INTO vehicles 
                          (vehicle_number, type, model, capacity, status, entry_by, entry_date)
                          VALUES (?, ?, ?, ?, ?, ?, NOW())`;
      const params = [
        vehicle_number,
        type,
        model,
        capacity || null,
        status || "available",
        req.body.entry_by, // This must be passed from frontend
      ];

      db.query(insertQuery, params, (err, results) => {
        if (err) {
          console.error("Database error: ", err);
          return res.status(500).json({
            success: false,
            message: "Failed to add new Vehicle",
            error: err.message,
          });
        }

        return res.status(200).json({
          success: true,
          message: "Vehicle added successfully.",
          data: {
            id: results.insertId,
            vehicle_number,
            type,
            model,
            capacity: capacity || null,
            status: status || "available",
          },
        });
      });
    });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add vehicle",
      error: error.message,
    });
  }
};

// Update Vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const { vehicle_number, type, model, capacity, status } = req.body;

    if (!vehicle_number || !type || !model) {
      return res.status(400).json({
        success: false,
        message: "Vehicle number, type and model required.",
      });
    }

    const query = `UPDATE vehicles
                  SET vehicle_number=?, type=?, model=?, capacity=?, status=?, update_by=?, update_date=NOW()
                  WHERE id=?`;

    const params = [
      vehicle_number,
      type,
      model,
      capacity || null,
      status || "available",
      req.body.update_by, // Pass this from frontend
      vehicleId,
    ];

    db.query(query, params, (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({
          success: false,
          message: "Failed to update vehicle.",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Vehicle updated successfully.",
      });
    });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update vehicle",
      error: error.message,
    });
  }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;

    // check if vehicle is assigned to any driver
    const checkQuery = "SELECT id FROM drivers WHERE assigned_vehicle_id = ?";
    db.query(checkQuery, [vehicleId], (checkErr, checkResults) => {
      if (checkErr) {
        return res.status(400).json({
          success: false,
          message: "Can't delete vehicle. It is assigned to a driver.",
        });
      }

      // Delete Vehicle
      const deleteQuery = "DELETE FROM vehicles WHERE id = ?";
      db.query(deleteQuery, [vehicleId], (deleteErr, deleteResult) => {
        if (deleteErr) {
          console.error("Database error: ", deleteErr);
          return res.status(500).json({
            success: false,
            message: "Failed to delete vehicle.",
            error: deleteErr.message,
          });
        }
        if (deleteResult.affectedRows === 0) {
          return res.status(404).json({
            success: false,
            message: "Vehicle not found.",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Vehicle deleted Successfully.",
        });
      });
    });
  } catch (error) {
    console.error("Error deleting vehicle: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete vehicle.",
      error: error.message,
    });
  }
};
