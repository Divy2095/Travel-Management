import React from "react";
import { FaStar, FaUser, FaComment, FaCalendarAlt } from "react-icons/fa";

const RecentReviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          Recent Reviews
        </h3>
        <p className="text-gray-500 text-center py-8">No reviews available</p>
      </div>
    );
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${
              i < rating ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaStar className="text-yellow-500" />
        Recent Reviews
      </h3>
      <div className="space-y-4">
        {reviews.slice(0, 5).map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-500" />
                <span className="font-medium text-gray-900">
                  {review.user_name || "Anonymous"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-600">
                  ({review.rating}/5)
                </span>
              </div>
            </div>

            {review.review && (
              <div className="flex items-start gap-2 mb-2">
                <FaComment className="text-blue-500 mt-1 text-sm" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.review}
                </p>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
              <div className="flex items-center gap-1">
                <FaCalendarAlt />
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              {review.trip_name && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Trip: {review.trip_name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReviews;
