import React, { useState } from "react";
import {
  FaUsers,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaBan,
  FaCheck,
} from "react-icons/fa";

const ManageUsers = () => {
  const [showModal, setShowModal] = useState(false);

  // Sample users data (this would come from API)
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      joinDate: "2024-01-15",
      totalBookings: 5,
      status: "active",
      lastLogin: "2024-01-20",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      phone: "+91 9876543211",
      joinDate: "2024-01-10",
      totalBookings: 3,
      status: "active",
      lastLogin: "2024-01-18",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 9876543212",
      joinDate: "2024-01-05",
      totalBookings: 0,
      status: "suspended",
      lastLogin: "2024-01-12",
    },
  ];

  return (
    <>
      {/* Manage Users Card */}
      <div
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
      >
        <div className="flex flex-col items-center text-white">
          <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4">
            <FaUsers className="text-4xl" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
          <p className="text-center text-purple-100">
            View and manage customer accounts
          </p>
        </div>
      </div>

      {/* Users Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">User Management</h2>
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
              {/* Filter and Search */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">
                    All Users
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    Active
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    Suspended
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    New
                  </button>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-700 border-b">
                        User
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 border-b">
                        Contact
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 border-b">
                        Join Date
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 border-b">
                        Bookings
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 border-b">
                        Status
                      </th>
                      <th className="text-left p-4 font-semibold text-gray-700 border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 border-b">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-100 p-2 rounded-full">
                              <FaUser className="text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                {user.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                ID: {user.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <FaEnvelope className="mr-2" />
                              {user.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <FaPhone className="mr-2" />
                              {user.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b">
                          <div className="text-sm text-gray-600">
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-2" />
                              {user.joinDate}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Last: {user.lastLogin}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b">
                          <div className="text-center">
                            <span className="text-2xl font-bold text-purple-600">
                              {user.totalBookings}
                            </span>
                            <p className="text-xs text-gray-500">trips</p>
                          </div>
                        </td>
                        <td className="p-4 border-b">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : user.status === "suspended"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-4 border-b">
                          <div className="flex space-x-2">
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Edit User"
                            >
                              <FaEdit />
                            </button>
                            {user.status === "active" ? (
                              <button
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Suspend User"
                              >
                                <FaBan />
                              </button>
                            ) : (
                              <button
                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                title="Activate User"
                              >
                                <FaCheck />
                              </button>
                            )}
                            <button
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {users.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">👤</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No Users Found
                  </h3>
                  <p className="text-gray-500">
                    Users will appear here once they register
                  </p>
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Showing 1 to {users.length} of {users.length} users
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUsers;
