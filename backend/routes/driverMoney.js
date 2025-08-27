const express = require("express");
const router = express.Router();
const { checkAdminAuth } = require("../middleware/authMiddleware");
const driverMoneyController = require("../controllers/driverMoneyController");

// Add money to driver's account
router.post("/add", driverMoneyController.addMoney);

// Record money spent by driver
router.post("/expense", driverMoneyController.recordExpense);

// Get driver's transactions
router.get("/:driverId/transactions", driverMoneyController.getTransactions);

// Get driver's balance
router.get("/:driverId/balance", driverMoneyController.getBalance);

// Update transaction
router.put("/update/:id", async (req, res) => {
  try {
    console.log("[Update Route] Params:", req.params);
    console.log("[Update Route] Body:", req.body);
    await driverMoneyController.updateTransaction(req, res);
  } catch (error) {
    console.error("[Update Route] Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete transaction
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log("[Delete Route] Params:", req.params);
    console.log("[Delete Route] Request URL:", req.originalUrl);
    await driverMoneyController.deleteTransaction(req, res);
  } catch (error) {
    console.error("[Delete Route] Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
