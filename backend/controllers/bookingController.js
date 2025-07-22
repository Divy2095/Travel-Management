const db = require("../database/db");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const {
      tripId,
      userId,
      fullName,
      email,
      phone,
      emergencyContact,
      emergencyPhone,
      participants,
      specialRequests,
      totalAmount,
    } = req.body;

    // Validate required fields
    if (!tripId || !fullName || !email || !phone || !participants) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Check if trip exists and is available
    const tripQuery = `SELECT * FROM trips WHERE id = ?`;
    const [tripRows] = await db.execute(tripQuery, [tripId]);

    if (tripRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const trip = tripRows[0];

    // Check if trip date is in the future
    const tripDate = new Date(trip.date);
    const currentDate = new Date();

    if (tripDate <= currentDate) {
      return res.status(400).json({
        success: false,
        message: "Cannot book past trips",
      });
    }

    // Check if participants count is within limit
    if (participants > trip.max_participants) {
      return res.status(400).json({
        success: false,
        message: `Maximum ${trip.max_participants} participants allowed`,
      });
    }

    // Create the booking
    const bookingQuery = `
      INSERT INTO bookings (
        trip_id, user_id, full_name, email, phone, 
        emergency_contact, emergency_phone, participants, 
        special_requests, total_amount, booking_date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'pending')
    `;

    const [result] = await db.execute(bookingQuery, [
      tripId,
      userId || null,
      fullName,
      email,
      phone,
      emergencyContact || null,
      emergencyPhone || null,
      participants,
      specialRequests || null,
      totalAmount,
    ]);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        bookingId: result.insertId,
        tripId,
        fullName,
        participants,
        totalAmount,
        status: "pending",
      },
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all bookings (admin only)
const getAllBookings = async (req, res) => {
  try {
    const query = `
      SELECT 
        b.*,
        t.title as trip_title,
        t.date as trip_date,
        t.location_name as trip_location
      FROM bookings b
      LEFT JOIN trips t ON b.trip_id = t.id
      ORDER BY b.booking_date DESC
    `;

    const [rows] = await db.execute(query);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get bookings by user ID
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const query = `
      SELECT 
        b.*,
        t.title as trip_title,
        t.date as trip_date,
        t.location_name as trip_location,
        t.description as trip_description,
        t.price as trip_price
      FROM bookings b
      LEFT JOIN trips t ON b.trip_id = t.id
      WHERE b.user_id = ?
      ORDER BY b.booking_date DESC
    `;

    const [rows] = await db.execute(query, [userId]);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const query = `UPDATE bookings SET status = ? WHERE id = ?`;
    const [result] = await db.execute(query, [status, bookingId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete booking
const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const query = `DELETE FROM bookings WHERE id = ?`;
    const [result] = await db.execute(query, [bookingId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
};
