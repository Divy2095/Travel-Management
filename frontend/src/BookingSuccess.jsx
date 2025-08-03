import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaPrint, FaEnvelope, FaHome } from "react-icons/fa";

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.bookingId) {
    navigate("/");
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    // Implement email functionality
    alert("Receipt will be sent to your email");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white text-center">
          <FaCheckCircle className="inline-block text-5xl mb-4" />
          <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
          <p className="mt-2">Thank you for your booking with ASMI Trips</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Booking Details</h2>
              <p>
                <span className="font-medium">Booking ID:</span>{" "}
                {state.bookingId}
              </p>
              <p>
                <span className="font-medium">Amount Paid:</span> ₹
                {state.amount.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Status:</span> Confirmed
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Next Steps</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>You'll receive a confirmation email</li>
                <li>Our team will contact you within 24 hours</li>
                <li>Prepare necessary documents for the trip</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="mb-2">
                <span className="font-medium">Trip:</span>{" "}
                {state.booking?.trip_title}
              </p>
              <p className="mb-2">
                <span className="font-medium">Date:</span>{" "}
                {new Date(state.booking?.trip_date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Participants:</span>{" "}
                {state.booking?.participants}
              </p>
            </div>
          </div>

          <div className="border-t pt-6 mt-6 flex flex-wrap gap-4 justify-center">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <FaPrint /> Print Receipt
            </button>
            <button
              onClick={handleEmail}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <FaEnvelope /> Email Receipt
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              <FaHome /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
