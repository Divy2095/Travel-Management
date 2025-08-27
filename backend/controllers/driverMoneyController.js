const db = require("../database/db");

// Add money to driver's account
exports.addMoney = (req, res) => {
  const { driverId, amount, description, tripId } = req.body;

  if (!driverId || !amount || !description) {
    return res.status(400).json({
      error:
        "Missing required fields: driverId, amount, and description are required",
    });
  }

  const entry_by = req.user?.email || "admin";

  const query = `
        INSERT INTO driver_money (driver_id, amount, transaction_type, description, trip_id, entry_by)
        VALUES (?, ?, 'credit', ?, ?, ?)
    `;

  db.query(
    query,
    [driverId, amount, description, tripId || null, entry_by],
    (err, result) => {
      if (err) {
        console.error("Error adding money:", err);
        return res.status(500).json({ error: "Failed to add money" });
      }
      res.json({ success: true, id: result.insertId });
    }
  );
};

// Record money spent by driver
exports.recordExpense = (req, res) => {
  const { driverId, amount, description, tripId } = req.body;

  if (!driverId || !amount || !description) {
    return res.status(400).json({
      error:
        "Missing required fields: driverId, amount, and description are required",
    });
  }

  const entry_by = req.user?.email || "admin";

  const query = `
        INSERT INTO driver_money (driver_id, amount, transaction_type, description, trip_id, entry_by)
        VALUES (?, ?, 'debit', ?, ?, ?)
    `;

  db.query(
    query,
    [driverId, amount, description, tripId || null, entry_by],
    (err, result) => {
      if (err) {
        console.error("Error recording expense:", err);
        return res.status(500).json({ error: "Failed to record expense" });
      }
      res.json({ success: true, id: result.insertId });
    }
  );
};

// Get driver's money transactions
exports.getTransactions = (req, res) => {
  const { driverId } = req.params;

  if (!driverId) {
    return res.status(400).json({ error: "Driver ID is required" });
  }

  const query = `
        SELECT 
            dm.*,
            d.name as driver_name,
            t.title as trip_title
        FROM driver_money dm
        LEFT JOIN drivers d ON d.id = dm.driver_id
        LEFT JOIN trips t ON t.id = dm.trip_id
        WHERE dm.driver_id = ?
        ORDER BY dm.transaction_date DESC
    `;

  try {
    db.query(query, [driverId], (err, results) => {
      if (err) {
        console.error("Error fetching transactions:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch transactions: " + err.message });
      }
      // If no results, return empty array instead of null
      res.json(results || []);
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

// Get driver's balance
exports.getBalance = (req, res) => {
  const { driverId } = req.params;

  if (!driverId) {
    return res.status(400).json({ error: "Driver ID is required" });
  }

  const query = `
        SELECT 
            COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE 0 END), 0) as total_credit,
            COALESCE(SUM(CASE WHEN transaction_type = 'debit' THEN amount ELSE 0 END), 0) as total_debit,
            COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) as balance
        FROM driver_money
        WHERE driver_id = ?
    `;

  try {
    db.query(query, [driverId], (err, results) => {
      if (err) {
        console.error("Error fetching balance:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch balance: " + err.message });
      }
      // Return zero balances if no results
      res.json(results[0] || { total_credit: 0, total_debit: 0, balance: 0 });
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error: " + error.message });
  }
};

// Update transaction
exports.updateTransaction = (req, res) => {
  const { id } = req.params;
  const { amount, description, transaction_type } = req.body;

  console.log("Update controller called with:", {
    id,
    body: req.body,
    params: req.params,
  });

  if (!id) {
    return res.status(400).json({ error: "Transaction ID is required" });
  }

  if (!amount || !description || !transaction_type) {
    return res.status(400).json({
      error:
        "Missing required fields: amount, description, and transaction_type are required",
    });
  }

  const query = `
    UPDATE driver_money 
    SET amount = ?, description = ?, transaction_type = ?
    WHERE id = ?
  `;

  console.log("Executing query:", query, [
    amount,
    description,
    transaction_type,
    id,
  ]);

  db.query(
    query,
    [amount, description, transaction_type, id],
    (err, result) => {
      if (err) {
        console.error("Error updating transaction:", err);
        return res
          .status(500)
          .json({ error: "Failed to update transaction: " + err.message });
      }
      console.log("Update result:", result);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json({ success: true, message: "Transaction updated successfully" });
    }
  );
};

// Delete transaction
exports.deleteTransaction = (req, res) => {
  const { id } = req.params;
  console.log(
    "[deleteTransaction] Attempting to delete transaction with id:",
    id
  );

  if (!id) {
    console.log("[deleteTransaction] No ID provided");
    return res.status(400).json({ error: "Transaction ID is required" });
  }

  const query = `DELETE FROM driver_money WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("[deleteTransaction] Database error:", err);
      return res.status(500).json({ error: "Failed to delete transaction" });
    }

    console.log("[deleteTransaction] Query result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ success: true, message: "Transaction deleted successfully" });
  });
};
