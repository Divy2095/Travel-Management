import React from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaRupeeSign,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const RecentBookings = ({
  bookings,
  onEdit,
  onDelete,
  onView,
  onUpdateStatus,
}) => {
  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          Recent Bookings
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trip
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participants
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings && bookings.length > 0 ? (
              bookings.slice(0, 10).map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{booking.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaUser className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.full_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.trip_title || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.participants}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <FaRupeeSign className="mr-1" />
                      {booking.total_amount?.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(booking.booking_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onView(booking)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              onUpdateStatus(booking.id, "confirmed")
                            }
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-100"
                            title="Confirm Booking"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() =>
                              onUpdateStatus(booking.id, "cancelled")
                            }
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100"
                            title="Cancel Booking"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => onEdit(booking)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-100"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(booking)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <FaCalendarAlt className="mx-auto text-4xl mb-4 opacity-50" />
                    <p className="text-lg font-medium">No bookings found</p>
                    <p className="text-sm">
                      Bookings will appear here once customers start booking
                      trips
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {bookings && bookings.length > 10 && (
        <div className="px-6 py-4 bg-gray-50 border-t">
          <p className="text-sm text-gray-500 text-center">
            Showing 10 of {bookings.length} bookings
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentBookings;
