import React from "react";
import {
  FaEdit,
  FaTrash,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaIdCard,
} from "react-icons/fa";

const RecentDrivers = ({ drivers, onEdit, onDelete }) => {
  if (!drivers || drivers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaUser className="text-green-500" />
          Recent Drivers
        </h3>
        <p className="text-gray-500 text-center py-8">No drivers available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaUser className="text-green-500" />
        Recent Drivers
      </h3>
      <div className="space-y-4">
        {drivers.slice(0, 5).map((driver) => (
          <div
            key={driver.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {driver.name}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-blue-500" />
                    <span>{driver.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-green-500" />
                    <span>{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaIdCard className="text-purple-500" />
                    <span>{driver.license_number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span>{driver.rating || "N/A"} rating</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      driver.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {driver.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onEdit(driver)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                  title="Edit Driver"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(driver)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  title="Delete Driver"
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

export default RecentDrivers;
