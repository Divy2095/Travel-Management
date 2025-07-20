import React from "react";
import { TiPlus } from "react-icons/ti";
import AddNewTrip from "./components/AddNewTrip";
import AddNewDriver from "./components/AddNewDriver";
import AddNewVehicle from "./components/AddNewVehicle";
import ManageReviews from "./components/ManageReviews";
import ManageUsers from "./components/ManageUsers";
import { SlCalender } from "react-icons/sl";
import { IoPeople } from "react-icons/io5";
import { PiCurrencyInrBold } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import {
  FaBusAlt,
  FaTruck,
  FaTools,
  FaCheckCircle,
  FaStar,
  FaThumbsUp,
  FaEye,
  FaUsers,
  FaCheck,
  FaCalendarAlt,
} from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleStats, setVehicleStats] = useState({
    total: 0,
    available: 0,
    maintenance: 0,
  });
  const [loading, setLoading] = useState(true);

  const [drivers, setDrivers] = useState([]);
  const [driverStats, setDriverStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [loadingDrivers, setLoadingDrivers] = useState(true);

  // fetch VehicleData
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/vehicles");
      const result = await response.json();

      if (result.success) {
        setVehicles(result.data);

        // calculate Stats
        const availableCount = result.data.filter(
          (v) => v.status === "available"
        ).length;
        const maintenanceCount = result.data.filter(
          (v) => v.status === "maintenance"
        ).length;

        setVehicleStats({
          total: result.data.length,
          available: availableCount,
          maintenance: maintenanceCount,
        });
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle new Vehicle add
  const handleVehicleAdded = () => {
    fetchVehicles();
  };

  // Handle new Driver add
  const handleDriverAdded = () => {
    fetchDrivers();
  };

  useEffect(() => {
    fetchVehicles();
    fetchDrivers();
  }, []);

  // Driver Functions
  const fetchDrivers = async () => {
    try {
      setLoadingDrivers(true);
      const response = await fetch("http://localhost:3000/api/drivers");
      const result = await response.json();

      if (result.success) {
        setDrivers(result.data);

        const activeCount = result.data.filter(
          (d) => d.status === "active"
        ).length;
        const inactiveCount = result.data.filter(
          (d) => d.status === "inactive"
        ).length;

        setDriverStats({
          total: result.data.length,
          active: activeCount,
          inactive: inactiveCount,
        });
      }
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setLoadingDrivers(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Logo */}
          <h1 className="text-2xl font-bold text-sky-600">GoTravel Admin</h1>

          {/* Center: Nav Links */}
          <ul className="flex gap-6">
            <li className="hover:scale-105 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded">
              Trips
            </li>
            <li className="hover:scale-105 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded">
              Drivers
            </li>
            <li className="hover:scale-105 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded">
              Vehicles
            </li>
            <li className="hover:scale-105 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded">
              Users
            </li>
            <li className="hover:scale-105 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded">
              Reviews
            </li>
            <li className="hover:scale-105 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded">
              Cities
            </li>
          </ul>

          {/* Right: Logout */}
          <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-col px-12 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Trip Management
          </h2>
          <p className="text-gray-600">
            Create and manage your travel experiences
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {/* Add New Trip Component */}
          <AddNewTrip />

          {/* Quick Stats Cards */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <SlCalender className="text-blue-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Trips</p>
                <p className="text-2xl font-bold text-gray-800">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <IoPeople className="text-emerald-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">156</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center">
              <div className="bg-violet-100 p-3 rounded-full mr-4">
                <PiCurrencyInrBold className="text-violet-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-gray-800">₹12,450</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trips Section */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800">
              Recent Trips
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-center py-8">
              No trips created yet. Add your first trip!
            </p>
          </div>
        </div>

        {/* NEW DRIVER MANAGEMENT SECTION */}
        {/* NEW DRIVER MANAGEMENT SECTION */}
        <div className="mt-12">
          {/* Driver Section Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Driver Management
            </h2>
            <p className="text-gray-600">
              Manage your driver team and assignments
            </p>
          </div>

          {/* Driver Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {/* Add New Driver Component */}
            <AddNewDriver onDriverAdded={handleDriverAdded} />

            {/* Driver Stats Cards */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 text-xl">
                    <GrUserManager />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Active Drivers</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {loadingDrivers ? "..." : driverStats.active}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <span className="text-blue-600 text-xl">
                    <IoMdDoneAll />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Inactive</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {loadingDrivers ? "..." : driverStats.inactive}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <span className="text-orange-600 text-xl">
                    <FaBusAlt />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Drivers</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {loadingDrivers ? "..." : driverStats.total}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Drivers Section */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Recent Drivers
              </h3>
            </div>
            <div className="p-6">
              {loadingDrivers ? (
                <p className="text-center">Loading...</p>
              ) : drivers.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No drivers registered yet. Add your first driver!
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="w-full h-16 border-b border-gray-200">
                        <th className="text-left pl-4">Name</th>
                        <th className="text-left">Phone</th>
                        <th className="text-left">License #</th>
                        <th className="text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drivers.slice(0, 5).map((driver) => (
                        <tr
                          key={driver.id}
                          className="h-14 border-b hover:bg-gray-50"
                        >
                          <td className="pl-4">{driver.name}</td>
                          <td>{driver.phone}</td>
                          <td>{driver.license_number}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                driver.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {driver.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* VEHICLE MANAGEMENT SECTION */}
        <div className="mt-12">
          {/* Vehicle Section Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Vehicle Management
            </h2>
            <p className="text-gray-600">
              Monitor and maintain your vehicle fleet
            </p>
          </div>

          {/* Vehicle Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {/* Add New Vehicle Component */}
            <AddNewVehicle onVehicleAdded={handleVehicleAdded} />

            {/* Vehicle Stats Cards */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <span className="text-blue-600 text-xl">
                    <FaTruck />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Vehicles</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {loading ? "..." : vehicleStats.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 text-xl">
                    <FaCheckCircle />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Available</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {loading ? "..." : vehicleStats.available}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <span className="text-orange-600 text-xl">
                    <FaTools />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Under Maintenance</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {loading ? "..." : vehicleStats.maintenance}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Vehicles Section */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Recent Vehicles
              </h3>
            </div>
            <div className="p-6">
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : vehicles.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No vehicles registered yet. Add your first vehicle!
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="w-full h-16 border-b border-gray-200">
                        <th className="text-left pl-4">Vehicle #</th>
                        <th className="text-left">Type</th>
                        <th className="text-left">Model</th>
                        <th className="text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.slice(0, 5).map((vehicle) => (
                        <tr
                          key={vehicle.id}
                          className="h-14 border-b hover:bg-gray-50"
                        >
                          <td className="pl-4">{vehicle.vehicle_number}</td>
                          <td>{vehicle.type}</td>
                          <td>{vehicle.model}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                vehicle.status === "available"
                                  ? "bg-green-100 text-green-700"
                                  : vehicle.status === "maintenance"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {vehicle.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* USER MANAGEMENT SECTION */}
        <div className="mt-12">
          {/* User Section Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              User Management
            </h2>
            <p className="text-gray-600">
              Manage customer accounts and profiles
            </p>
          </div>

          {/* User Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {/* Manage Users Component */}
            <ManageUsers />

            {/* User Stats Cards */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <span className="text-purple-600 text-xl">
                    <FaUsers />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-gray-800">1,247</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 text-xl">
                    <FaCheck />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-gray-800">1,089</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <span className="text-blue-600 text-xl">
                    <FaCalendarAlt />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">New This Month</p>
                  <p className="text-2xl font-bold text-gray-800">89</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Users Section */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Recent Users
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-center py-8">
                No new users yet. Customer registrations will appear here!
              </p>
            </div>
          </div>
        </div>

        {/* REVIEW MANAGEMENT SECTION */}
        <div className="mt-12">
          {/* Review Section Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Review Management
            </h2>
            <p className="text-gray-600">
              View and manage customer feedback and reviews
            </p>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {/* Add New Review Component */}
            <ManageReviews />
            {/* Review Stats Cards */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <span className="text-yellow-600 text-xl">
                    <FaStar />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-800">4.5</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 text-xl">
                    <FaThumbsUp />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Positive Reviews</p>
                  <p className="text-2xl font-bold text-gray-800">89%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <span className="text-blue-600 text-xl">
                    <FaEye />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-800">245</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reviews Section */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Recent Reviews
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-center py-8">
                No reviews submitted yet. Customer feedback will appear here!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
