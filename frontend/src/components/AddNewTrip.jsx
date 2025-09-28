import React, { useState, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaClock,
  FaUsers,
  FaImage,
} from "react-icons/fa";

const AddNewTrip = ({ refreshTrips }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [locations, setLocations] = useState([]);
  //for driver set 
  const [drivers, setDrivers] = useState([]);
const [selectedDriver, setSelectedDriver] = useState("");
//get user id
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id; 

  // Fetch locations from backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/trips/locations");
        const json = await res.json();
        console.log("Fetched Locations:", json);
        const driverRes = await fetch("http://localhost:3000/api/drivers");
      const driverJson = await driverRes.json();
      console.log("fetched driver data:",driverJson);
     if (Array.isArray(driverJson)) {
  setDrivers(driverJson);
} else if (driverJson.success && Array.isArray(driverJson.data)) {
  setDrivers(driverJson.data);
} else {
  setDrivers([]);
}
        if (json.success) {
          setLocations(json.data || []);
        } else {
          setLocations([]);
        }
      } catch (err) {
        console.error("Failed to fetch locations:", err);
      }
    };
    fetchLocations();
  }, []);

  // Handle trip form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData(e.target);

      // Add any default values
      if (!formData.get("status")) {
        formData.append("status", "active");
      }

      if (!formData.get("max_participants")) {
        formData.append("max_participants", "10");
      }
      
      // ✅ Add selected driver here
    formData.append("driver_id", selectedDriver);
    console.log("form data of trip ", formData);
    
      const response = await fetch("http://localhost:3000/api/trips", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create trip");
      }

      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        // refreshTrips();
      }, 1500);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Add Trip Button Card */}
      <div
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl p-8 shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-sky-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-sky-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative flex flex-col items-center">
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm mb-4 group-hover:bg-white/30 transition-colors">
            <TiPlus className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Add New Trip
          </h3>
          <p className="text-sky-100 text-center">
            Create amazing travel experiences for your customers
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Create New Trip</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setError(null);
                    setSuccess(false);
                  }}
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

            <div className="p-6">
              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  Trip created successfully!
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Trip Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter trip title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your trip..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Date and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaCalendarAlt className="inline mr-2" />
                      Trip Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaDollarSign className="inline mr-2" />
                      Price per Person
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Duration and Max Participants */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaClock className="inline mr-2" />
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      placeholder="e.g., 3 days, 2 nights"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUsers className="inline mr-2" />
                      Max Participants
                    </label>
                    <input
                      type="number"
                      name="max_participants"
                      defaultValue="10"
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Location Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkerAlt className="inline mr-2" />
                    Location
                  </label>
                  <select
                    name="location_id"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="">Select a location (optional)</option>
                    {locations.length > 0 ? (
                      locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name} - {location.address}
                        </option>
                      ))
                    ) : (
                      <option disabled>No locations available</option>
                    )}
                  </select>
                </div>
                {/* Driver Dropdown */}
                <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Assign Driver
  </label>
  <select
    value={selectedDriver}
    onChange={(e) => setSelectedDriver(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
  >
    <option value="">Select Driver</option>
    {drivers
      .filter((d) => d.status === "active")
      .map((driver) => (
        <option key={driver.id} value={driver.id}>
          {driver.name} ({driver.phone})
        </option>
      ))}
  </select>
</div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaImage className="inline mr-2" />
                    Trip Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                  />
                </div>

                {/* Hidden field */}
                {/* <input type="hidden" name="entry_by" value="admin" /> */}
                 {/* Hidden field for entry_by */}
                 <input type="hidden" name="entry_by" value={userId || ""} />

                {/* Form Actions */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setError(null);
                      setSuccess(false);
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg hover:from-sky-600 hover:to-sky-700 transition-colors disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Trip"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewTrip;
