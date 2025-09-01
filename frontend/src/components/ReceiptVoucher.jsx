import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const ReceiptVoucher = () => {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Helper function to safely format dates
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return format(date, "PPP");
    } catch (err) {
      console.error("Date formatting error:", err);
      return "Invalid Date";
    }
  };

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/receipts/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReceipt(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching receipt");
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!receipt) return <div>No receipt found</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg my-8 print:shadow-none">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Travel Receipt Voucher</h1>
        <p className="text-gray-600">Receipt Number: {receipt.receiptNumber}</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
          <div className="text-gray-700">
            <p>Name: {receipt.customerDetails.name}</p>
            <p>Email: {receipt.customerDetails.email}</p>
            <p>Phone: {receipt.customerDetails.phone}</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Booking Details</h2>
          <div className="text-gray-700">
            <p>Booking ID: {receipt.bookingDetails.bookingId}</p>
            <p>Date: {formatDate(receipt.bookingDetails.bookingDate)}</p>
            <p>Status: {receipt.bookingDetails.status}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Trip Details</h2>
        <div className="text-gray-700">
          <p>Trip: {receipt.bookingDetails.tripTitle}</p>
          <p>Date: {formatDate(receipt.bookingDetails.tripDate)}</p>
          <p>Number of Participants: {receipt.bookingDetails.participants}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
        <div className="text-gray-700">
          <p>Amount Paid: ₹{receipt.paymentDetails.amount}</p>
          <p>Payment ID: {receipt.paymentDetails.paymentId}</p>
          <p>Payment Date: {formatDate(receipt.paymentDetails.paymentDate)}</p>
        </div>
      </div>

      <div className="text-center mt-8 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Print Receipt
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          This is a computer-generated receipt and does not require a signature.
        </p>
      </div>
    </div>
  );
};

export default ReceiptVoucher;
