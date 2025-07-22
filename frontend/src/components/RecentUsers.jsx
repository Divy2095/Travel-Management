import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";

const RecentUsers = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaUser className="text-orange-500" />
          Recent Users
        </h3>
        <p className="text-gray-500 text-center py-8">No users available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaUser className="text-orange-500" />
        Recent Users
      </h3>
      <div className="space-y-4">
        {users.slice(0, 5).map((user) => (
          <div
            key={user.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {user.firstName} {user.lastName}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-blue-500" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-green-500" />
                    <span>{user.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-purple-500" />
                    <span>
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;
