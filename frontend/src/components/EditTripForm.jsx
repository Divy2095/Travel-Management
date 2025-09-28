import React, { useState,useEffect } from "react";

const EditTripForm = ({ trip,drivers = [], onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: trip.title || "",
    description: trip.description || "",
    price: trip.price || "",
    max_participants: trip.max_participants || "",
    date: trip.date ? new Date(trip.date).toISOString().split("T")[0] : "",
    location_name: trip.location_name || "",
    driver_id: trip.driver_id|| "",
  });
//const [drivers, setDrivers] = useState([]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log("drivers",drivers);
const handleDriverChange = async (e) => {
  const driver_id = e.target.value;
  setFormData({ ...formData, driver_id });

  if (driver_id) {
    try {
      const res = await fetch("http://localhost:3000/api/trips/assign-driver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trip_id: trip.id, driver_id }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message);
        setFormData({ ...formData, driver_id: "" });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to assign driver");
      setFormData({ ...formData, driver_id: "" });
    }
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...trip,
      ...formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Trip Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Participants
          </label>
          <input
            type="number"
            name="max_participants"
            value={formData.max_participants}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location_name"
            value={formData.location_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Assign Driver
  </label>
  <select
  name="driver_id"
  value={formData.driver_id || ""}
  onChange={handleDriverChange}
  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>
  {formData.driver_id && (
    <option value={formData.driver_id}>
      {drivers.find((d) => d.id === formData.driver_id)?.name ||
        "Assigned Driver"}
    </option>
  )}
  <option value="">Select Driver</option>
  {drivers
    .filter((d) => d.status === "active" && d.id !== formData.driver_id)
    .map((driver) => (
      <option key={driver.id} value={driver.id}>
        {driver.name} ({driver.phone})
      </option>
    ))}
</select>

</div>




      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTripForm;
