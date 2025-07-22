import React from "react";
import { FaSignOutAlt, FaBell } from "react-icons/fa";

const AdminHeader = ({ onLogout }) => {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.firstName
    ? `${user.firstName} ${user.lastName}`
    : "Admin User";
  const userEmail = user.email || "admin@example.com";

  // Generate dicebear avatar URL
  const avatarUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${userName}&backgroundColor=c0392b,e74c3c,9b59b6,8e44ad,3498db,2980b9,1abc9c,16a085,27ae60,2ecc71,f39c12,e67e22,95a5a6,7f8c8d&textColor=ffffff`;

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your travel business</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <FaBell className="text-xl" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt={userName}
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-600">{userEmail}</p>
            </div>
          </div>{" "}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
