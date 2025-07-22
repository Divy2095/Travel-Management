import React, { useState, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import {
  FaEdit,
  FaTrash,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCar,
  FaStar,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const AddNewDriver = ({ onDriverAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    license_number: "",
    license_expiry: "",
    address: "",
    status: "active",
    assigned_vehicle_id: "",
    profile_photo: "",
    rating: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch Drivers
  const fetchDrivers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/drivers");
      const result = await response.json();
      if (result.success) {
        setDrivers(result.data);
      }
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Handle Edit Driver
  const handleEdit = (driver) => {
    setSelectedDriver(driver);
    setFormData({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      license_number: driver.license_number,
      license_expiry: driver.license_expiry,
      address: driver.address,
      status: driver.status,
      assigned_vehicle_id: driver.assigned_vehicle_id || "",
      profile_photo: driver.profile_photo || "",
      rating: driver.rating || "",
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // Handle Delete Driver
  const handleDelete = async (driverId) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/drivers/${driverId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchDrivers();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete driver");
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
      alert("Failed to delete driver");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const url = isEditMode
        ? `http://localhost:3000/api/drivers/${selectedDriver.id}`
        : "http://localhost:3000/api/drivers";

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          [isEditMode ? "update_by" : "entry_by"]: "admin", // Or get from user context
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server responded with ${response.status}: ${errorText}`);
        throw new Error(`Server error: ${response.status}`);
      }
      const result = await response.json();

      if (result.success) {
        alert("Driver added successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          license_number: "",
          license_expiry: "",
          address: "",
          status: "active",
          assigned_vehicle_id: "",
          profile_photo: "",
          rating: "",
        });
        setIsModalOpen(false);

        if (onDriverAdded) {
          onDriverAdded();
        }
      } else {
        alert(result.message || "Failed to add driver");
      }
    } catch (error) {
      console.error("Error adding driver:", error);
      alert("Error adding driver");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Add Driver Card */}
      <div
        onClick={() => {
          setIsEditMode(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            license_number: "",
            license_expiry: "",
            address: "",
            status: "active",
            assigned_vehicle_id: "",
            profile_photo: "",
            rating: "",
          });
          setIsModalOpen(true);
        }}
        className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-8 shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-emerald-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative flex flex-col items-center">
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm mb-4 group-hover:bg-white/30 transition-colors">
            <TiPlus className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Add New Driver
          </h3>
          <p className="text-emerald-100 text-center">
            Register a new driver in the system
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditMode ? "Edit Driver" : "Add New Driver"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
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
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    License Number
                  </label>
                  <input
                    type="text"
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    License Expiry
                  </label>
                  <input
                    type="date"
                    name="license_expiry"
                    value={formData.license_expiry}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assigned Vehicle ID
                  </label>
                  <input
                    type="text"
                    name="assigned_vehicle_id"
                    value={formData.assigned_vehicle_id}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Photo URL
                  </label>
                  <input
                    type="text"
                    name="profile_photo"
                    value={formData.profile_photo}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
                >
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Adding..."
                    : isEditMode
                    ? "Update Driver"
                    : "Add Driver"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewDriver;
