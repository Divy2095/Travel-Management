const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/bookingController");

// Create a new booking
router.post("/", createBooking);

// Get all bookings (admin only)
router.get("/", getAllBookings);

// Get bookings by user ID
router.get("/user/:userId", getUserBookings);

// Update booking status
router.put("/:bookingId/status", updateBookingStatus);

// Delete booking
router.delete("/:bookingId", deleteBooking);

module.exports = router;
