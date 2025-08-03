const express = require("express");
const router = express.Router();
const db = require("../database/db");
const {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
  getClientToken,
  getBookingById,
  getBookingStats,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

// Debug middleware to log all booking requests
router.use((req, res, next) => {
  console.log(`Booking route accessed: ${req.method} ${req.path}`);
  next();
});

// Public routes
router.get(
  "/client_token",
  (req, res, next) => {
    console.log("Client token request received");
    next();
  },
  getClientToken
);

router.post(
  "/",
  (req, res, next) => {
    console.log("Booking creation request received");
    console.log("Request body:", req.body); // Log the incoming request body
    next();
  },
  createBooking
);

// Protected routes
router.get(
  "/user/:userId",
  protect,
  (req, res, next) => {
    console.log(`Fetching bookings for user ${req.params.userId}`);
    next();
  },
  getUserBookings
);

router.get(
  "/:id",
  protect,
  (req, res, next) => {
    console.log(`Fetching booking with ID ${req.params.id}`);
    next();
  },
  getBookingById
);

// Admin routes with enhanced logging
router.get(
  "/",
  protect,
  admin,
  (req, res, next) => {
    console.log("Admin fetching all bookings");
    next();
  },
  getAllBookings
);

router.get(
  "/stats",
  protect,
  admin,
  (req, res, next) => {
    console.log("Admin fetching booking stats");
    next();
  },
  getBookingStats
);

router.put(
  "/:id/status",
  protect,
  admin,
  (req, res, next) => {
    console.log(`Admin updating status for booking ${req.params.id}`);
    console.log("New status:", req.body.status);
    next();
  },
  updateBookingStatus
);

router.delete(
  "/:id",
  protect,
  admin,
  (req, res, next) => {
    console.log(`Admin deleting booking ${req.params.id}`);
    next();
  },
  deleteBooking
);

// Error handling middleware specific to booking routes
router.use((err, req, res, next) => {
  console.error("Booking route error:", err);
  res.status(500).json({
    success: false,
    message: "Booking route error",
    error: err.message,
  });
});

module.exports = router;
