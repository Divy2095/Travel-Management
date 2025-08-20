import React, { useState, useEffect } from "react";
import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

const DriverMoney = ({ driverId, driverName }) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState({
    total_credit: 0,
    total_debit: 0,
    balance: 0,
  });
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    description: "",
    trip_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch transactions and balance
  const fetchData = async () => {
    try {
      const [transactionsRes, balanceRes] = await Promise.all([
        axios.get(`/api/driver-money/${driverId}/transactions`),
        axios.get(`/api/driver-money/${driverId}/balance`),
      ]);

      // Ensure transactions is always an array
      const transactionsData = Array.isArray(transactionsRes.data)
        ? transactionsRes.data
        : [];

      setTransactions(transactionsData);
      setBalance(
        balanceRes.data || { total_credit: 0, total_debit: 0, balance: 0 }
      );
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTransactions([]);
      setBalance({ total_credit: 0, total_debit: 0, balance: 0 });
      setError(error.response?.data?.error || "Failed to fetch data");
    }
  };

  useEffect(() => {
    if (driverId) {
      fetchData();
    }
  }, [driverId]);

  // Handle adding new money
  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (!newTransaction.amount || !newTransaction.description) {
      setError("Please fill in both amount and description");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("/api/driver-money/add", {
        driverId: driverId,
        amount: parseFloat(newTransaction.amount),
        description: newTransaction.description,
        tripId: newTransaction.trip_id || null,
      });

      if (response.data && response.status === 200) {
        setNewTransaction({ amount: "", description: "", trip_id: "" });
        await fetchData();
        setError(null);
      } else {
        throw new Error(response.data?.message || "Failed to add money");
      }
    } catch (error) {
      console.error("Error adding money:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to add money. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle recording expense
  const handleRecordExpense = async (e) => {
    e.preventDefault();
    if (!newTransaction.amount || !newTransaction.description) {
      setError("Please fill in both amount and description");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("/api/driver-money/expense", {
        driverId: driverId,
        amount: parseFloat(newTransaction.amount),
        description: newTransaction.description,
        tripId: newTransaction.trip_id || null,
      });

      if (response.data && response.status === 200) {
        setNewTransaction({ amount: "", description: "", trip_id: "" });
        await fetchData();
        setError(null);
      } else {
        throw new Error(response.data?.message || "Failed to record expense");
      }
    } catch (error) {
      console.error("Error recording expense:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to record expense. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Money Management - {driverName}
      </h2>

      {/* Balance Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-semibold">Total Credit</h3>
          <p className="text-xl">₹{balance.total_credit}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3 className="font-semibold">Total Debit</h3>
          <p className="text-xl">₹{balance.total_debit}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-semibold">Current Balance</h3>
          <p className="text-xl">₹{balance.balance}</p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Add Transaction Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-4">Add New Transaction</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded"
            required
            min="0"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                amount: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded"
            required
            value={newTransaction.description}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                description: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Trip ID (optional)"
            className="border p-2 rounded"
            value={newTransaction.trip_id}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                trip_id: e.target.value || null,
              })
            }
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddMoney}
              disabled={
                loading || !newTransaction.amount || !newTransaction.description
              }
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Add Money"}
            </button>
            <button
              type="button"
              onClick={handleRecordExpense}
              disabled={
                loading || !newTransaction.amount || !newTransaction.description
              }
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Record Expense"}
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded shadow">
        <h3 className="font-semibold p-4 border-b">Transaction History</h3>
        <div className="overflow-x-auto">
          {transactions.length === 0 ? (
            <p className="text-center p-4 text-gray-500">
              No transactions found
            </p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Type</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Trip</th>
                  <th className="p-4 text-left">Added By</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(transactions) &&
                  transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t">
                      <td className="p-4">
                        {new Date(
                          transaction.transaction_date
                        ).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded ${
                            transaction.transaction_type === "credit"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.transaction_type}
                        </span>
                      </td>
                      <td className="p-4">₹{transaction.amount}</td>
                      <td className="p-4">{transaction.description}</td>
                      <td className="p-4">{transaction.trip_title || "-"}</td>
                      <td className="p-4">{transaction.entry_by}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverMoney;
