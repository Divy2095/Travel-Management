import React from "react";
import {
  FaCar,
  FaRoute,
  FaUsers,
  FaStar,
  FaTachometerAlt,
} from "react-icons/fa";

const StatsCard = ({ icon: Icon, title, value, subtitle, color, bgColor }) => (
  <div
    className={`${bgColor} p-6 rounded-xl shadow-lg border-l-4 ${color} transform hover:scale-105 transition-all duration-300`}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div
        className={`p-4 rounded-full ${color.replace(
          "border-l-",
          "bg-"
        )} bg-opacity-20`}
      >
        <Icon className={`text-2xl ${color.replace("border-l-", "text-")}`} />
      </div>
    </div>
  </div>
);

const StatsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatsCard
        icon={FaRoute}
        title="Total Trips"
        value={stats.totalTrips}
        subtitle="Available trips"
        color="border-l-blue-500"
        bgColor="bg-blue-50"
      />
      <StatsCard
        icon={FaCar}
        title="Total Drivers"
        value={stats.totalDrivers}
        subtitle="Active drivers"
        color="border-l-green-500"
        bgColor="bg-green-50"
      />
      <StatsCard
        icon={FaTachometerAlt}
        title="Total Vehicles"
        value={stats.totalVehicles}
        subtitle="Fleet size"
        color="border-l-purple-500"
        bgColor="bg-purple-50"
      />
      <StatsCard
        icon={FaUsers}
        title="Total Users"
        value={stats.totalUsers}
        subtitle="Registered users"
        color="border-l-orange-500"
        bgColor="bg-orange-50"
      />
      <StatsCard
        icon={FaStar}
        title="Total Reviews"
        value={stats.totalReviews}
        subtitle="Customer feedback"
        color="border-l-yellow-500"
        bgColor="bg-yellow-50"
      />
    </div>
  );
};

export default StatsSection;
