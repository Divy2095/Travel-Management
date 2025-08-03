const db = require("../database/db");
const { generateToken, processPayment } = require("../utils/Braintree");

/**
 * @desc    Generate Braintree client token
 * @route   GET /api/bookings/client_token
 * @access  Public
 */
exports.getClientToken = async (req, res) => {
  try {
    const token = await generateToken();
    res.json({
      success: true,
      clientToken: token,
    });
  } catch (error) {
    console.error("Error generating client token:", error);
    res.status(500).json({
      success: false,
      message: "Error generating payment token",
      error: error.message,
    });
  }
};

/**
 * @desc    Create new booking with payment processing
 * @route   POST /api/bookings
 * @access  Public
 */
exports.createBooking = async (req, res) => {
  console.log("hii", req.body);
  console.log(req.body);
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
      payment_nonce,
    } = req.body;

    // Validate required fields
    if (
      !tripId ||
      !fullName ||
      !email ||
      !phone ||
      !participants ||
      !payment_nonce
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Get trip details
    const [trip] = await db
      .promise()
      .query("SELECT price, max_participants FROM trips WHERE id = ?", [
        tripId,
      ]);

    if (!trip || !trip[0]) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // Validate participants
    if (participants > trip[0].max_participants) {
      return res.status(400).json({
        success: false,
        message: `Maximum ${trip[0].max_participants} participants allowed`,
      });
    }

    const total_amount = Number(trip[0].price) * Number(participants);

    // Process payment
    console.log(
      "Processing payment with amount:",
      total_amount,
      "and nonce:",
      payment_nonce
    );
    const paymentResult = await processPayment(payment_nonce, total_amount);
    console.log("paymentResult", paymentResult);
    if (!paymentResult.success) {
      return res.status(400).json({
        success: false,
        message: paymentResult.message || "Payment processing failed",
        transaction: paymentResult.transaction,
      });
    }

    // Create booking
    const query = `
      INSERT INTO bookings (
        trip_id, user_id, full_name, email, phone,
        emergency_contact, emergency_phone, participants,
        special_requests, total_amount, status, payment_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      tripId,
      userId || null,
      fullName,
      email,
      phone,
      emergencyContact || null,
      emergencyPhone || null,
      participants,
      specialRequests || null,
      total_amount,
      "confirmed",
      paymentResult.transaction.id,
    ];

    const [result] = await db.promise().query(query, values);

    // Get booking details for response
    const [booking] = await db.promise().query(
      `SELECT b.*, t.title as trip_title, t.date as trip_date
       FROM bookings b
       JOIN trips t ON b.trip_id = t.id
       WHERE b.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Booking and payment processed successfully",
      data: {
        bookingId: result.insertId,
        booking: booking[0],
        payment: {
          id: paymentResult.transaction.id,
          amount: total_amount,
          status: paymentResult.transaction.status,
        },
      },
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all bookings (admin only)
 * @route   GET /api/bookings
 * @access  Private/Admin
 */
exports.getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT b.*, t.title as trip_title, t.date as trip_date,
             u.name as user_name, u.email as user_email
      FROM bookings b
      JOIN trips t ON b.trip_id = t.id
      LEFT JOIN users u ON b.user_id = u.id
    `;
    console.log(query);

    let countQuery = "SELECT COUNT(*) as total FROM bookings";
    const queryParams = [];
    const countParams = [];

    if (status) {
      query += " WHERE b.status = ?";
      countQuery += " WHERE status = ?";
      queryParams.push(status);
      countParams.push(status);
    }

    query += " ORDER BY b.booking_date DESC LIMIT ? OFFSET ?";
    queryParams.push(parseInt(limit));
    queryParams.push(parseInt(offset));
    console.log();

    const [bookings] = await db.promise().query(query, queryParams);
    const [[count]] = await db.promise().query(countQuery, countParams);
    console.log(bookings);

    res.json({
      success: true,
      count: count.total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count.total / limit),
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};

/**
 * @desc    Get bookings by user ID
 * @route   GET /api/bookings/user/:userId
 * @access  Private
 */
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;

    let query = `
      SELECT b.*, t.title as trip_title, t.date as trip_date, t.image as trip_image
      FROM bookings b
      JOIN trips t ON b.trip_id = t.id
      WHERE b.user_id = ?
    `;

    const queryParams = [userId];

    if (status) {
      query += " AND b.status = ?";
      queryParams.push(status);
    }

    query += " ORDER BY b.booking_date DESC";

    const [bookings] = await db.promise().query(query, queryParams);

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user bookings",
      error: error.message,
    });
  }
};

/**
 * @desc    Get single booking by ID
 * @route   GET /api/bookings/:id
 * @access  Private
 */
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT b.*, t.title as trip_title, t.date as trip_date,
             t.description as trip_description, t.price as trip_price,
             t.max_participants as trip_capacity, t.image as trip_image,
             u.name as user_name, u.email as user_email, u.phone as user_phone
      FROM bookings b
      JOIN trips t ON b.trip_id = t.id
      LEFT JOIN users u ON b.user_id = u.id
      WHERE b.id = ?
    `;

    const [booking] = await db.promise().query(query, [id]);

    if (!booking || booking.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      data: booking[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: error.message,
    });
  }
};

/**
 * @desc    Update booking status
 * @route   PUT /api/bookings/:id/status
 * @access  Private/Admin
 */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // First check if booking exists
    const [booking] = await db
      .promise()
      .query("SELECT * FROM bookings WHERE id = ?", [id]);

    if (!booking || booking.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const query = "UPDATE bookings SET status = ? WHERE id = ?";
    await db.promise().query(query, [status, id]);

    res.json({
      success: true,
      message: "Booking status updated successfully",
      data: { id, status },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating booking status",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete booking
 * @route   DELETE /api/bookings/:id
 * @access  Private/Admin
 */
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // First check if booking exists
    const [booking] = await db
      .promise()
      .query("SELECT * FROM bookings WHERE id = ?", [id]);

    if (!booking || booking.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await db.promise().query("DELETE FROM bookings WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Booking deleted successfully",
      data: { id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting booking",
      error: error.message,
    });
  }
};

/**
 * @desc    Get booking statistics
 * @route   GET /api/bookings/stats
 * @access  Private/Admin
 */
exports.getBookingStats = async (req, res) => {
  try {
    const [stats] = await db.promise().query(`
      SELECT
        COUNT(*) as totalBookings,
        SUM(total_amount) as totalRevenue,
        AVG(total_amount) as averageBookingValue,
        status,
        COUNT(CASE WHEN DATE(booking_date) = CURDATE() THEN 1 END) as todayBookings,
        SUM(CASE WHEN DATE(booking_date) = CURDATE() THEN total_amount ELSE 0 END) as todayRevenue
      FROM bookings
      GROUP BY status
    `);

    const [monthlyStats] = await db.promise().query(`
      SELECT
        DATE_FORMAT(booking_date, '%Y-%m') as month,
        COUNT(*) as bookingsCount,
        SUM(total_amount) as monthlyRevenue
      FROM bookings
      WHERE booking_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(booking_date, '%Y-%m')
      ORDER BY month ASC
    `);

    res.json({
      success: true,
      data: {
        summary: stats,
        monthlyTrends: monthlyStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking statistics",
      error: error.message,
    });
  }
};
