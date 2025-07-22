import React from "react";
import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

const RecentTrips = ({ trips, onEdit, onDelete }) => {
  if (!trips || trips.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          Recent Trips
        </h3>
        <p className="text-gray-500 text-center py-8">No trips available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaCalendarAlt className="text-blue-500" />
        Recent Trips
      </h3>
      <div className="space-y-4">
        {trips.slice(0, 5).map((trip) => (
          <div
            key={trip.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {trip.title}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{trip.location_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-green-500" />
                    <span>{trip.max_participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRupeeSign className="text-yellow-500" />
                    <span>₹{trip.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>{new Date(trip.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onEdit(trip)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                  title="Edit Trip"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(trip)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  title="Delete Trip"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrips;
