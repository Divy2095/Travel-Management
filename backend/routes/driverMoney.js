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

module.exports = router;
