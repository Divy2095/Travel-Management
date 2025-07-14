import React, { useState } from "react";
import {
  FaEye,
  FaStar,
  FaUser,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const ManageReviews = () => {
  const [showModal, setShowModal] = useState(false);

  // Sample reviews data (this would come from API)
  const reviews = [
    {
      id: 1,
      customerName: "John Doe",
      email: "john@example.com",
      destination: "Goa",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Excellent service! The driver was very professional and the vehicle was clean.",
      status: "pending",
    },
    {
      id: 2,
      customerName: "Sarah Smith",
      email: "sarah@example.com",
      destination: "Mumbai",
      rating: 4,
      date: "2024-01-10",
      comment: "Good experience overall. Punctual and comfortable journey.",
      status: "approved",
    },
  ];

  return (
    <>
      {/* View Reviews Card */}
      <div
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
      >
        <div className="flex flex-col items-center text-white">
          <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4">
            <FaEye className="text-4xl" />
          </div>
          <h3 className="text-xl font-semibold mb-2">View Reviews</h3>
          <p className="text-center text-yellow-100">
            View and manage customer feedback
          </p>
        </div>
      </div>

      {/* Reviews Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Filter Tabs */}
              <div className="flex space-x-4 mb-6">
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                  All Reviews
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  Pending
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  Approved
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  Rejected
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FaUser className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {review.customerName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {review.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            ({review.rating}/5)
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          <FaCalendarAlt className="inline mr-1" />
                          {review.date}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Trip to:</strong> {review.destination}
                      </p>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          review.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : review.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {review.status.charAt(0).toUpperCase() +
                          review.status.slice(1)}
                      </span>

                      {review.status === "pending" && (
                        <div className="flex space-x-2">
                          <button className="flex items-center px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            <FaCheck className="mr-1" />
                            Approve
                          </button>
                          <button className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                            <FaTimes className="mr-1" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {reviews.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-6xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-500">
                    Customer reviews will appear here once submitted
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageReviews;
