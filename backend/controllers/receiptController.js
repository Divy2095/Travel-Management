const db = require("../database/db");

/**
 * @desc    Generate receipt voucher for a booking
 * @route   GET /api/bookings/:id/receipt
 * @access  Private
 */
exports.generateReceiptVoucher = async (req, res) => {
  try {
    const { id } = req.params;

    // Get detailed booking information
    const query = `
            SELECT 
                b.*,
                t.title as trip_title,
                t.date as trip_date,
                t.description as trip_description,
                t.price as trip_price,
                u.name as user_name,
                u.email as user_email
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

    const bookingData = booking[0];

    // Format dates properly
    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      return isNaN(d.getTime()) ? null : d.toISOString();
    };

    // Create receipt data
    const receiptData = {
      receiptNumber: `RCV-${bookingData.id}-${Date.now()}`,
      issueDate: new Date().toISOString(),
      bookingDetails: {
        bookingId: bookingData.id,
        bookingDate: formatDate(bookingData.booking_date),
        tripTitle: bookingData.trip_title,
        tripDate: formatDate(bookingData.trip_date),
        participants: bookingData.participants,
        status: bookingData.status,
      },
      customerDetails: {
        name: bookingData.full_name,
        email: bookingData.email,
        phone: bookingData.phone,
      },
      paymentDetails: {
        amount: bookingData.total_amount,
        paymentId: bookingData.payment_id,
        paymentDate: formatDate(bookingData.created_at),
      },
    };

    res.json({
      success: true,
      data: receiptData,
    });
  } catch (error) {
    console.error("Error generating receipt:", error);
    res.status(500).json({
      success: false,
      message: "Error generating receipt voucher",
      error: error.message,
    });
  }
};
