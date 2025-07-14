const express = require("express");
const sendAdminInvite = require("../controllers/adminInvite");
const router = express.Router();

// Route to send admin invite
router.post("/send-invite", async (req, res) => {
  try {
    console.log("=== ADMIN INVITE ROUTE HIT ===");
    console.log("Request body:", req.body);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const result = await sendAdminInvite(email);

    res.status(200).json({
      success: true,
      message: "Admin invitation sent successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Error in admin invite route:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send admin invitation",
    });
  }
});

module.exports = router;
