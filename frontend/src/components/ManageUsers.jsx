import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUsers,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaBan,
  FaCheck,
} from "react-icons/fa";

const ManageUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    if (showModal) {
      fetchUsers();
    }
  }, [showModal]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/auth/users/${userId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        fetchUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error updating user status");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/api/auth/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        fetchUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting user");
    }
  };

  const filteredUsers = users
    .filter((user) => {
      if (filter === "all") return true;
      return user.status === filter;
    })
    .filter((user) => {
      if (!searchQuery) return true;
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* Manage Users Card */}
      <div
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-8 shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-purple-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative flex flex-col items-center">
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm mb-4 group-hover:bg-white/30 transition-colors">
            <FaUsers className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Manage Users
          </h3>
          <p className="text-purple-100 text-center">
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
              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              )}

              {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {/* Filter and Search */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg ${
                      filter === "all"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    All Users
                  </button>
                  <button
                    onClick={() => setFilter("active")}
                    className={`px-4 py-2 rounded-lg ${
                      filter === "active"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter("suspended")}
                    className={`px-4 py-2 rounded-lg ${
                      filter === "suspended"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Suspended
                  </button>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                    {currentUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 border-b">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={user.image}
                                alt={user.name}
                                className="h-full w-full object-cover"
                              />
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
                          </div>
                        </td>
                        <td className="p-4 border-b">
                          <div className="text-sm text-gray-600">
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-2" />
                              {new Date(user.entry_date).toLocaleDateString()}
                            </div>
                            {user.last_activity && (
                              <div className="text-xs text-gray-500 mt-1">
                                Last activity:{" "}
                                {new Date(
                                  user.last_activity
                                ).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 border-b">
                          <div className="text-center">
                            <span className="text-2xl font-bold text-purple-600">
                              {user.total_bookings || 0}
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
                            {user.status
                              ? user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)
                              : "Active"}
                          </span>
                        </td>
                        <td className="p-4 border-b">
                          <div className="flex space-x-2">
                            {user.status === "active" ? (
                              <button
                                onClick={() =>
                                  handleStatusChange(user.id, "suspended")
                                }
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Suspend User"
                              >
                                <FaBan />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleStatusChange(user.id, "active")
                                }
                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                title="Activate User"
                              >
                                <FaCheck />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(user.id)}
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
              {!loading && currentUsers.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">👤</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No Users Found
                  </h3>
                  <p className="text-gray-500">
                    {searchQuery
                      ? "No users match your search criteria"
                      : "Users will appear here once they register"}
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Showing {indexOfFirstUser + 1} to{" "}
                    {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                    {filteredUsers.length} users
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          currentPage === i + 1
                            ? "bg-purple-500 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageUsers;
