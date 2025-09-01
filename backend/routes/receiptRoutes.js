const express = require("express");
const router = express.Router();
const { generateReceiptVoucher } = require("../controllers/receiptController");
const { protect } = require("../middleware/authMiddleware");

// Protected route to generate receipt voucher
router.get("/:id", protect, generateReceiptVoucher);

module.exports = router;
