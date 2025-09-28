const express = require("express");
const sendAdminInvite = require("../controllers/adminInvite");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const db = require("../database/db");
// Route to send admin invite
router.post("/send-invite", async (req, res) => {
  try {
    console.log("=== ADMIN INVITE ROUTE ===");
    console.log("Request body:", req.body);
    
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const result = await sendAdminInvite(email);
    
    res.status(200).json({
      success: true,
      message: "Admin invitation sent successfully!",
      data: result
    });
    
  } catch (error) {
    console.error("Error in admin invite route:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send admin invitation"
    });
  }
});

//to fetch recent user
// routes/admin.js
router.get("/recent-users", protect, admin, (req, res) => {
  const adminId = req.user?.id;
  if (!adminId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const query = `
    SELECT DISTINCT u.id, u.name, u.email, u.status, u.entry_date
    FROM users u
    JOIN bookings b ON b.user_id = u.id
    JOIN trips t ON b.trip_id = t.id
    WHERE t.entry_by = ?
  `;

  db.query(query, [adminId], (err, users) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    console.log("recent users", users);
    res.json({ success: true, users });
  });
});


module.exports = router;