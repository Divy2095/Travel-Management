const express = require("express");
const router = express.Router();
const driverMoneyController = require("../controllers/driverMoneyController");

router.delete("/delete/:id", (req, res) => {
  console.log("[DELETE] Route hit with ID:", req.params.id);
  try {
    return driverMoneyController.deleteTransaction(req, res);
  } catch (error) {
    console.error("[DELETE] Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

router.put("/update/:id", (req, res) => {
  console.log("[UPDATE] Route hit with ID:", req.params.id);
  try {
    return driverMoneyController.updateTransaction(req, res);
  } catch (error) {
    console.error("[UPDATE] Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:driverId/transactions", driverMoneyController.getTransactions);
router.get("/:driverId/balance", driverMoneyController.getBalance);
router.post("/add", driverMoneyController.addMoney);
router.post("/expense", driverMoneyController.recordExpense);

module.exports = router;
