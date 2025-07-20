import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";

const AddNewVehicle = ({ onVehicleAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_number: "",
    type: "",
    model: "",
    capacity: "",
    status: "available",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          entry_by: "admin", // You might want to get this from user context
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server responded with ${response.status}: ${errorText}`);
        throw new Error(`Server error: ${response.status}`);
      }
      const result = await response.json();

      if (result.success) {
        alert("Vehicle added successfully!");
        setFormData({
          vehicle_number: "",
          type: "",
          model: "",
          capacity: "",
          status: "available",
        });
        setIsModalOpen(false);

        // Call the callback function to refresh parent component
        if (onVehicleAdded) {
          onVehicleAdded();
        }
      } else {
        alert(result.message || "Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("Error adding vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl p-8 shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-violet-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-violet-400 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative flex flex-col items-center">
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm mb-4 group-hover:bg-white/30 transition-colors">
            <TiPlus className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Add New Vehicle
          </h3>
          <p className="text-violet-100 text-center">
            Register a new vehicle in the system
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Vehicle
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    name="vehicle_number"
                    value={formData.vehicle_number}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  >
                    <option value="available">Available</option>
                    <option value="in_use">In Use</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
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
                  className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
                >
                  {loading ? "Adding..." : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewVehicle;
