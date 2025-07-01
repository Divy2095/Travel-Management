import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTripId, setCurrentTripId] = useState(null);
  const [trips, setTrips] = useState([]);
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tripData, setTripData] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
    location_id: "",
    price: "",
    duration: "",
    max_participants: 10
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchTrips();
    fetchCities();
    fetchLocations();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/trips");
      if (res.data.success) {
        setTrips(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Failed to fetch trips");
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cities");
      if (res.data.success) {
        setCities(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/locations");
      if (res.data.success) {
        setLocations(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setTripData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!editMode && (!tripData.title || !tripData.description || !tripData.date || !tripData.image)) {
      toast.error("Please fill all required fields and select an image");
      return;
    }

    if (editMode && (!tripData.title || !tripData.description || !tripData.date)) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", tripData.title);
    formData.append("description", tripData.description);
    formData.append("date", tripData.date);
    formData.append("location_id", tripData.location_id || "");
    formData.append("price", tripData.price || "");
    formData.append("duration", tripData.duration || "");
    formData.append("max_participants", tripData.max_participants || 10);
    
    if (tripData.image) {
      formData.append("image", tripData.image);
    }

    try {
      let res;
      if (editMode) {
        res = await axios.put(`http://localhost:3000/api/trips/${currentTripId}`, formData, {
          timeout: 10000,
        });
      } else {
        res = await axios.post("http://localhost:3000/api/trips/add", formData, {
          timeout: 10000,
        });
      }

      toast.success(res.data.message);
      setTripData({ 
        title: "", 
        description: "", 
        date: "", 
        image: null, 
        location_id: "",
        price: "",
        duration: "",
        max_participants: 10
      });
      setShowModal(false);
      setEditMode(false);
      setCurrentTripId(null);
      fetchTrips();
    } catch (err) {
      console.error("Operation error:", err);
      if (err.code === "ERR_NETWORK") {
        toast.error("Cannot connect to server.");
      } else if (err.response) {
        toast.error(err.response.data.message || "Server error occurred");
      } else {
        toast.error("Operation failed. Please try again.");
      }
    }
  };

  const handleEdit = (trip) => {
    setEditMode(true);
    setCurrentTripId(trip.id);
    setTripData({
      title: trip.title,
      description: trip.description,
      date: trip.date.split('T')[0],
      image: null,
      location_id: trip.location_id || "",
      price: trip.price || "",
      duration: trip.duration || "",
      max_participants: trip.max_participants || 10
    });
    setShowModal(true);
  };

  const handleDelete = async (tripId) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        const res = await axios.delete(`http://localhost:3000/api/trips/${tripId}`);
        toast.success(res.data.message);
        fetchTrips();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete trip");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentTripId(null);
    setTripData({ 
      title: "", 
      description: "", 
      date: "", 
      image: null, 
      location_id: "",
      price: "",
      duration: "",
      max_participants: 10
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - keep existing header */}
      <header className="fixed top-0 w-full bg-white shadow-md z-40 flex justify-between items-center px-4 md:px-10 py-4">
        <div className="text-2xl font-bold text-amber-500">GoTravel Admin</div>
      </header>

      {/* Main Content */}
      <main className={`pt-20 px-4 md:px-10 ${showModal ? 'blur-sm' : ''}`}>
        <section id="trips" className="py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-3xl font-bold text-gray-800">Trips Management</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors shadow-md flex items-center gap-2"
            >
              <span className="text-lg">➕</span>
              Add New Trip
            </button>
          </div>

          {/* Trips Grid */}
          {loading ? (
            <div className="text-center py-8">Loading trips...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No trips found. Add your first trip!
                </div>
              ) : (
                trips.map((trip) => (
                  <div key={trip.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={`http://localhost:3000${trip.imagePath}`}
                      alt={trip.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                      }}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
                      <p className="text-gray-600 mb-2 line-clamp-2">{trip.description}</p>
                      <div className="space-y-1 text-sm text-gray-500 mb-4">
                        <div>📅 {new Date(trip.date).toLocaleDateString()}</div>
                        {trip.price && <div>💰 ${trip.price}</div>}
                        {trip.duration && <div>⏱️ {trip.duration}</div>}
                        {trip.location_name && <div>📍 {trip.location_name}</div>}
                        <div>👥 Max: {trip.max_participants}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded ${
                          trip.status === 'active' ? 'bg-green-100 text-green-800' : 
                          trip.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {trip.status}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(trip)}
                            className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(trip.id)}
                            className="text-red-500 hover:text-red-700 px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>

      {/* Enhanced Modal with more fields */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto transform transition-all max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-amber-500 text-white px-6 py-4 rounded-t-xl">
              <h2 className="text-2xl font-bold">
                {editMode ? 'Edit Trip' : 'Add New Trip'}
              </h2>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trip Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={tripData.title}
                    onChange={handleChange}
                    placeholder="Enter trip title"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={tripData.description}
                    onChange={handleChange}
                    placeholder="Enter trip description"
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={tripData.date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={tripData.price}
                      onChange={handleChange}
                      placeholder="100.00"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={tripData.duration}
                      onChange={handleChange}
                      placeholder="3 days, 2 nights"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      name="max_participants"
                      value={tripData.max_participants}
                      onChange={handleChange}
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    name="location_id"
                    value={tripData.location_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name} - {location.address}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trip Image {editMode && '(Optional)'}
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                    required={!editMode}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    {editMode ? 'Update Trip' : 'Add Trip'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;