import React from "react";
import {
  FaEdit,
  FaTrash,
  FaCar,
  FaGasPump,
  FaUsers,
  FaCalendarAlt,
  FaIdCard,
} from "react-icons/fa";

const RecentVehicles = ({ vehicles, onEdit, onDelete }) => {
  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaCar className="text-purple-500" />
          Recent Vehicles
        </h3>
        <p className="text-gray-500 text-center py-8">No vehicles available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaCar className="text-purple-500" />
        Recent Vehicles
      </h3>
      <div className="space-y-4">
        {vehicles.slice(0, 5).map((vehicle) => (
          <div
            key={vehicle.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {vehicle.make} {vehicle.model}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaIdCard className="text-green-500" />
                    <span>{vehicle.license_plate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-purple-500" />
                    <span>{vehicle.capacity} seats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaGasPump className="text-orange-500" />
                    <span>{vehicle.fuel_type}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      vehicle.status === "available"
                        ? "bg-green-100 text-green-800"
                        : vehicle.status === "in_use"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onEdit(vehicle)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                  title="Edit Vehicle"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(vehicle)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  title="Delete Vehicle"
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

export default RecentVehicles;
