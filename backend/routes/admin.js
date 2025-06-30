const express = require("express");
const router = express.Router();
const adminInvite = require("../controllers/adminInvite");

router.post("/send-invite", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    await adminInvite(email);
    res.status(200).json({ success: true, message: "Invite sent successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
});

module.exports = router;
