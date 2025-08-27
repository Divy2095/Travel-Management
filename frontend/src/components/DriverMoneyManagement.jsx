import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DriverMoneyManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("credit");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState({
    total_credit: 0,
    total_debit: 0,
    balance: 0,
  });
  const [editTransaction, setEditTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Fetch drivers on component mount
  useEffect(() => {
    fetchDrivers();
  }, []);

  // Fetch transactions when driver is selected
  useEffect(() => {
    if (selectedDriver) {
      fetchTransactions();
      fetchBalance();
    }
  }, [selectedDriver]);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/drivers");
      // Handle both possible response structures
      const driversData = response.data?.data || response.data || [];
      setDrivers(Array.isArray(driversData) ? driversData : []);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      toast.error("Failed to fetch drivers");
      setDrivers([]); // Set to empty array on error
    }
  };

  const fetchTransactions = async () => {
    try {
      console.log("Fetching transactions for driver:", selectedDriver);
      const response = await axios.get(
        `http://localhost:3000/api/driver-money/${selectedDriver}/transactions`
      );
      console.log("Transactions response:", response.data);
      setTransactions(response.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch transactions"
      );
      setTransactions([]);
    }
  };

  const fetchBalance = async () => {
    try {
      console.log("Fetching balance for driver:", selectedDriver);
      const response = await axios.get(
        `http://localhost:3000/api/driver-money/${selectedDriver}/balance`
      );
      console.log("Balance response:", response.data);
      setBalance(
        response.data || {
          total_credit: 0,
          total_debit: 0,
          balance: 0,
        }
      );
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch balance"
      );
      setBalance({
        total_credit: 0,
        total_debit: 0,
        balance: 0,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTransaction) {
        // Handle edit
        console.log("Editing transaction:", editTransaction.id);
        const url = `http://localhost:3000/api/driver-money/update/${editTransaction.id}`;
        const data = {
          amount: parseFloat(amount),
          description,
          transaction_type: transactionType,
          driver_id: selectedDriver,
        };
        const response = await axios.put(url, data);
        if (response.data.success) {
          toast.success("Transaction updated successfully");
          setEditTransaction(null);
        } else {
          throw new Error(
            response.data.error || "Failed to update transaction"
          );
        }
      } else {
        // Handle new transaction
        const endpoint =
          transactionType === "credit"
            ? "/api/driver-money/add"
            : "/api/driver-money/expense";
        const response = await axios.post(`http://localhost:3000${endpoint}`, {
          driverId: selectedDriver,
          amount: parseFloat(amount),
          description,
        });
        if (response.data.success) {
          toast.success("Transaction recorded successfully");
        } else {
          throw new Error(
            response.data.error || "Failed to create transaction"
          );
        }
      }

      setAmount("");
      setDescription("");
      setTransactionType("credit");
      setIsEditModalOpen(false);
      fetchTransactions();
      fetchBalance();
    } catch (error) {
      toast.error(
        editTransaction
          ? "Failed to update transaction"
          : "Failed to record transaction"
      );
    }
  };

  const handleEdit = (transaction) => {
    console.log("Editing transaction:", transaction);
    setEditTransaction(transaction);
    setAmount(transaction.amount.toString());
    setDescription(transaction.description);
    setTransactionType(transaction.transaction_type);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (transaction) => {
    if (!transaction || !transaction.id) {
      toast.error("Invalid transaction data");
      return;
    }

    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        console.log("Deleting transaction:", transaction.id);
        const response = await axios.delete(
          `http://localhost:3000/api/driver-money/delete/${transaction.id}`
        );

        if (response.data.success) {
          toast.success("Transaction deleted successfully");
          await fetchTransactions();
          await fetchBalance();
        } else {
          throw new Error(
            response.data.error || "Failed to delete transaction"
          );
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete transaction");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditTransaction(null);
    setAmount("");
    setDescription("");
    setTransactionType("credit");
    setIsEditModalOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const exportToExcel = () => {
    try {
      // Get the current driver's name
      const currentDriver = drivers.find(
        (d) => d.id.toString() === selectedDriver.toString()
      );
      const fileName = `${currentDriver?.name || "Driver"}_Transactions_${
        new Date().toISOString().split("T")[0]
      }.csv`;

      // Prepare CSV content
      const headers = ["Date", "Type", "Amount (₹)", "Description", "Added By"];
      const rows = transactions.map((t) => [
        formatDate(t.transaction_date),
        t.transaction_type === "credit" ? "Credit" : "Debit",
        t.amount,
        t.description,
        t.entry_by,
      ]);

      // Add summary section
      rows.push(
        [], // Empty row
        ["Summary"],
        ["Total Credit", "", balance.total_credit],
        ["Total Debit", "", balance.total_debit],
        ["Current Balance", "", balance.balance]
      );

      // Convert to CSV string
      const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
          row
            .map((cell) => {
              // If cell contains comma or line break, wrap in quotes
              if (
                cell &&
                (cell.toString().includes(",") ||
                  cell.toString().includes("\n"))
              ) {
                return `"${cell}"`;
              }
              return cell;
            })
            .join(",")
        ),
      ].join("\r\n");

      // Create blob and trigger download
      // Add BOM to handle Excel UTF-8 properly
      const BOM = "\uFEFF";
      const blob = new Blob([BOM + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Transaction data exported successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export transaction data");
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Driver Money Management</h2>

      {/* Transaction Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {editTransaction ? "Edit Transaction" : "Record Transaction"}
          </h3>
          {editTransaction && (
            <button
              onClick={handleCancelEdit}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel Edit
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Select Driver</label>
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Transaction Type</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="credit">Credit (Give Money)</option>
              <option value="debit">Debit (Record Expense)</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Record Transaction
          </button>
        </form>
      </div>

      {/* Balance Summary */}
      {selectedDriver && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Balance Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-gray-600">Total Credit</p>
              <p className="text-xl font-bold text-green-600">
                ₹{balance.total_credit}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Total Debit</p>
              <p className="text-xl font-bold text-red-600">
                ₹{balance.total_debit}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Current Balance</p>
              <p
                className={`text-xl font-bold ${
                  balance.balance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{balance.balance}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Transactions History */}
      {selectedDriver && transactions.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Transaction History</h3>
            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Export to Excel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Added By</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="px-4 py-2">
                      {formatDate(transaction.transaction_date)}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          transaction.transaction_type === "credit"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.transaction_type === "credit"
                          ? "Credit"
                          : "Debit"}
                      </span>
                    </td>
                    <td className="px-4 py-2">₹{transaction.amount}</td>
                    <td className="px-4 py-2">{transaction.description}</td>
                    <td className="px-4 py-2">{transaction.entry_by}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            console.log(
                              "Delete button clicked for transaction:",
                              transaction
                            );
                            handleDelete(transaction);
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverMoneyManagement;
