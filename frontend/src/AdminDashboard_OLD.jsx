// import React, { useState, useEffect } from "react";
// import { TiPlus } from "react-icons/ti";
// import AddNewTrip from "./components/AddNewTrip";
// import AddNewDriver from "./components/AddNewDriver";
// import AddNewVehicle from "./components/AddNewVehicle";
// import ManageReviews from "./components/ManageReviews";
// import ManageUsers from "./components/ManageUsers";
// import { SlCalender } from "react-icons/sl";
// import { IoPeople } from "react-icons/io5";
// import { PiCurrencyInrBold } from "react-icons/pi";
// import { GrUserManager } from "react-icons/gr";
// import { IoMdDoneAll } from "react-icons/io";
// import {
//   FaBusAlt,
//   FaTruck,
//   FaTools,
//   FaCheckCircle,
//   FaStar,
//   FaThumbsUp,
//   FaEye,
//   FaUsers,
//   FaCheck,
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaImage,
//   FaUserFriends,
//   FaMoneyBillWave,
//   FaEdit,
//   FaTrash,
// } from "react-icons/fa";

// // Edit Trip Form Component
// const EditTripForm = ({ trip, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     title: trip.title || "",
//     description: trip.description || "",
//     price: trip.price || "",
//     max_participants: trip.max_participants || "",
//     date: trip.date ? new Date(trip.date).toISOString().split("T")[0] : "",
//     location_name: trip.location_name || "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({
//       ...trip,
//       ...formData,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Trip Title
//         </label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Description
//         </label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           rows="3"
//           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Price (₹)
//           </label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Max Participants
//           </label>
//           <input
//             type="number"
//             name="max_participants"
//             value={formData.max_participants}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             required
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Date
//           </label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Location
//           </label>
//           <input
//             type="text"
//             name="location_name"
//             value={formData.location_name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className="flex gap-3 pt-4">
//         <button
//           type="submit"
//           className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//         >
//           Save Changes
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// // Edit Driver Form Component
// const EditDriverForm = ({ driver, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     name: driver.name || "",
//     phone: driver.phone || "",
//     license_number: driver.license_number || "",
//     status: driver.status || "active",
//     email: driver.email || "",
//     experience: driver.experience || "",
//     rating: driver.rating || "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({
//       ...driver,
//       ...formData,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Driver Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             License Number
//           </label>
//           <input
//             type="text"
//             name="license_number"
//             value={formData.license_number}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//             required
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Experience (years)
//           </label>
//           <input
//             type="number"
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Status
//           </label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//             required
//           >
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Rating (1-5)
//           </label>
//           <input
//             type="number"
//             name="rating"
//             min="1"
//             max="5"
//             step="0.1"
//             value={formData.rating}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className="flex gap-3 pt-4">
//         <button
//           type="submit"
//           className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//         >
//           Save Changes
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// // Edit Vehicle Form Component
// const EditVehicleForm = ({ vehicle, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     vehicle_number: vehicle.vehicle_number || "",
//     type: vehicle.type || "",
//     model: vehicle.model || "",
//     status: vehicle.status || "available",
//     capacity: vehicle.capacity || "",
//     year: vehicle.year || "",
//     color: vehicle.color || "",
//     fuel_type: vehicle.fuel_type || "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({
//       ...vehicle,
//       ...formData,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Vehicle Number
//         </label>
//         <input
//           type="text"
//           name="vehicle_number"
//           value={formData.vehicle_number}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           required
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Vehicle Type
//           </label>
//           <select
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             required
//           >
//             <option value="">Select Type</option>
//             <option value="bus">Bus</option>
//             <option value="car">Car</option>
//             <option value="van">Van</option>
//             <option value="truck">Truck</option>
//             <option value="suv">SUV</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Model
//           </label>
//           <input
//             type="text"
//             name="model"
//             value={formData.model}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             required
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Capacity (seats)
//           </label>
//           <input
//             type="number"
//             name="capacity"
//             value={formData.capacity}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Year
//           </label>
//           <input
//             type="number"
//             name="year"
//             min="1990"
//             max="2030"
//             value={formData.year}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Color
//           </label>
//           <input
//             type="text"
//             name="color"
//             value={formData.color}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Fuel Type
//           </label>
//           <select
//             name="fuel_type"
//             value={formData.fuel_type}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="">Select Fuel Type</option>
//             <option value="petrol">Petrol</option>
//             <option value="diesel">Diesel</option>
//             <option value="electric">Electric</option>
//             <option value="hybrid">Hybrid</option>
//             <option value="cng">CNG</option>
//           </select>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Status
//         </label>
//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           required
//         >
//           <option value="available">Available</option>
//           <option value="maintenance">Maintenance</option>
//           <option value="in-use">In Use</option>
//         </select>
//       </div>

//       <div className="flex gap-3 pt-4">
//         <button
//           type="submit"
//           className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//         >
//           Save Changes
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// const AdminDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   // User Avatar Component
//   const UserAvatar = ({ user }) => {
//     const [imageError, setImageError] = useState(false);

//     // Generate fallback avatar URL using Dicebear
//     const fallbackAvatar = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
//       user?.name || "Admin User"
//     )}`;

//     return (
//       <img
//         src={imageError ? fallbackAvatar : user?.image || fallbackAvatar}
//         alt={user?.name || "Admin"}
//         onError={() => setImageError(true)}
//         className="w-10 h-10 rounded-full object-cover border-2 border-sky-500"
//       />
//     );
//   };
//   const [vehicles, setVehicles] = useState([]);
//   const [vehicleStats, setVehicleStats] = useState({
//     total: 0,
//     available: 0,
//     maintenance: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   const [drivers, setDrivers] = useState([]);
//   const [driverStats, setDriverStats] = useState({
//     total: 0,
//     active: 0,
//     inactive: 0,
//   });
//   const [loadingDrivers, setLoadingDrivers] = useState(true);

//   // Trip States
//   const [trips, setTrips] = useState([]);
//   const [tripStats, setTripStats] = useState({
//     total: 0,
//     upcoming: 0,
//     completed: 0,
//     totalRevenue: 0,
//   });
//   const [loadingTrips, setLoadingTrips] = useState(true);

//   // Edit and Delete States
//   const [editingTrip, setEditingTrip] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [tripToDelete, setTripToDelete] = useState(null);

//   // Driver Edit and Delete States
//   const [editingDriver, setEditingDriver] = useState(null);
//   const [showEditDriverModal, setShowEditDriverModal] = useState(false);
//   const [showDeleteDriverModal, setShowDeleteDriverModal] = useState(false);
//   const [driverToDelete, setDriverToDelete] = useState(null);

//   // Vehicle Edit and Delete States
//   const [editingVehicle, setEditingVehicle] = useState(null);
//   const [showEditVehicleModal, setShowEditVehicleModal] = useState(false);
//   const [showDeleteVehicleModal, setShowDeleteVehicleModal] = useState(false);
//   const [vehicleToDelete, setVehicleToDelete] = useState(null);

//   // fetch VehicleData
//   const fetchVehicles = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/api/vehicles");
//       const result = await response.json();

//       if (result.success) {
//         setVehicles(result.data);

//         // calculate Stats
//         const availableCount = result.data.filter(
//           (v) => v.status === "available"
//         ).length;
//         const maintenanceCount = result.data.filter(
//           (v) => v.status === "maintenance"
//         ).length;

//         setVehicleStats({
//           total: result.data.length,
//           available: availableCount,
//           maintenance: maintenanceCount,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle new Vehicle add
//   const handleVehicleAdded = () => {
//     fetchVehicles();
//   };

//   // Handle new Driver add
//   const handleDriverAdded = () => {
//     fetchDrivers();
//   };

//   // Fetch Trip Data and Calculate Statistics
//   const fetchTripStats = async () => {
//     try {
//       setLoadingTrips(true);
//       const response = await fetch("http://localhost:3000/api/trips");
//       const result = await response.json();

//       if (result.success) {
//         const today = new Date();
//         // Sort trips by date, most recent first
//         const sortedTrips = result.data.sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );
//         setTrips(sortedTrips);

//         const stats = {
//           total: result.data.length,
//           upcoming: result.data.filter((trip) => new Date(trip.date) > today)
//             .length,
//           completed: result.data.filter((trip) => new Date(trip.date) < today)
//             .length,
//           totalRevenue: result.data.reduce(
//             (total, trip) => total + (parseFloat(trip.price) || 0),
//             0
//           ),
//         };

//         setTripStats(stats);
//       }
//     } catch (error) {
//       console.error("Error fetching trips:", error);
//     } finally {
//       setLoadingTrips(false);
//     }
//   };

//   // Trip Management Functions
//   const handleEditTrip = (trip) => {
//     setEditingTrip(trip);
//     setShowEditModal(true);
//   };

//   const handleDeleteTrip = (trip) => {
//     setTripToDelete(trip);
//     setShowDeleteModal(true);
//   };

//   const confirmDeleteTrip = async () => {
//     if (!tripToDelete) return;

//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/trips/${tripToDelete.id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const result = await response.json();

//       if (result.success) {
//         // Refresh trips data
//         await fetchTripStats();
//         setShowDeleteModal(false);
//         setTripToDelete(null);
//         // You can add a toast notification here if you have one
//         alert("Trip deleted successfully!");
//       } else {
//         alert("Failed to delete trip: " + (result.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Error deleting trip:", error);
//       alert("Error deleting trip. Please try again.");
//     }
//   };

//   const handleSaveTrip = async (updatedTrip) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/trips/${updatedTrip.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedTrip),
//         }
//       );
//       const result = await response.json();

//       if (result.success) {
//         // Refresh trips data
//         await fetchTripStats();
//         setShowEditModal(false);
//         setEditingTrip(null);
//         // You can add a toast notification here if you have one
//         alert("Trip updated successfully!");
//       } else {
//         alert("Failed to update trip: " + (result.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Error updating trip:", error);
//       alert("Error updating trip. Please try again.");
//     }
//   };

//   // Driver Management Functions
//   const handleEditDriver = (driver) => {
//     setEditingDriver(driver);
//     setShowEditDriverModal(true);
//   };

//   const handleDeleteDriver = (driver) => {
//     setDriverToDelete(driver);
//     setShowDeleteDriverModal(true);
//   };

//   const confirmDeleteDriver = async () => {
//     if (!driverToDelete) return;

//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/drivers/${driverToDelete.id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const result = await response.json();

//       if (result.success) {
//         // Refresh drivers data
//         await fetchDrivers();
//         setShowDeleteDriverModal(false);
//         setDriverToDelete(null);
//         alert("Driver deleted successfully!");
//       } else {
//         alert(
//           "Failed to delete driver: " + (result.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting driver:", error);
//       alert("Error deleting driver. Please try again.");
//     }
//   };

//   const handleSaveDriver = async (updatedDriver) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/drivers/${updatedDriver.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedDriver),
//         }
//       );
//       const result = await response.json();

//       if (result.success) {
//         // Refresh drivers data
//         await fetchDrivers();
//         setShowEditDriverModal(false);
//         setEditingDriver(null);
//         alert("Driver updated successfully!");
//       } else {
//         alert(
//           "Failed to update driver: " + (result.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error updating driver:", error);
//       alert("Error updating driver. Please try again.");
//     }
//   };

//   // Vehicle Management Functions
//   const handleEditVehicle = (vehicle) => {
//     setEditingVehicle(vehicle);
//     setShowEditVehicleModal(true);
//   };

//   const handleDeleteVehicle = (vehicle) => {
//     setVehicleToDelete(vehicle);
//     setShowDeleteVehicleModal(true);
//   };

//   const confirmDeleteVehicle = async () => {
//     if (!vehicleToDelete) return;

//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/vehicles/${vehicleToDelete.id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const result = await response.json();

//       if (result.success) {
//         // Refresh vehicles data
//         await fetchVehicles();
//         setShowDeleteVehicleModal(false);
//         setVehicleToDelete(null);
//         alert("Vehicle deleted successfully!");
//       } else {
//         alert(
//           "Failed to delete vehicle: " + (result.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting vehicle:", error);
//       alert("Error deleting vehicle. Please try again.");
//     }
//   };

//   const handleSaveVehicle = async (updatedVehicle) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/vehicles/${updatedVehicle.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedVehicle),
//         }
//       );
//       const result = await response.json();

//       if (result.success) {
//         // Refresh vehicles data
//         await fetchVehicles();
//         setShowEditVehicleModal(false);
//         setEditingVehicle(null);
//         alert("Vehicle updated successfully!");
//       } else {
//         alert(
//           "Failed to update vehicle: " + (result.message || "Unknown error")
//         );
//       }
//     } catch (error) {
//       console.error("Error updating vehicle:", error);
//       alert("Error updating vehicle. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchVehicles();
//     fetchDrivers();
//     fetchTripStats();
//   }, []);

//   // Driver Functions
//   const fetchDrivers = async () => {
//     try {
//       setLoadingDrivers(true);
//       const response = await fetch("http://localhost:3000/api/drivers");
//       const result = await response.json();

//       if (result.success) {
//         setDrivers(result.data);

//         const activeCount = result.data.filter(
//           (d) => d.status === "active"
//         ).length;
//         const inactiveCount = result.data.filter(
//           (d) => d.status === "inactive"
//         ).length;

//         setDriverStats({
//           total: result.data.length,
//           active: activeCount,
//           inactive: inactiveCount,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching drivers:", error);
//     } finally {
//       setLoadingDrivers(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <header className="bg-white shadow-sm px-6 py-4">
//         <div className="flex justify-between items-center">
//           {/* Left: Logo */}
//           <h1 className="text-2xl font-bold text-sky-600">GoTravel Admin</h1>

//           {/* Center: Nav Links */}
//           <ul className="flex gap-6">
//             {[
//               { label: "Trips", id: "trips-section" },
//               { label: "Drivers", id: "drivers-section" },
//               { label: "Vehicles", id: "vehicles-section" },
//               { label: "Users", id: "users-section" },
//               { label: "Reviews", id: "reviews-section" },
//             ].map(({ label, id }) => (
//               <li
//                 key={id}
//                 onClick={() => {
//                   document.getElementById(id)?.scrollIntoView({
//                     behavior: "smooth",
//                     block: "start",
//                   });
//                 }}
//                 className="hover:scale-105 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded text-gray-700 hover:text-sky-600 transition-colors"
//               >
//                 {label}
//               </li>
//             ))}
//           </ul>

//           {/* Right: User Profile & Logout */}
//           <div className="relative">
//             <div
//               className="cursor-pointer"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               <UserAvatar user={user} />
//             </div>

//             {/* Dropdown Menu */}
//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100">
//                 <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
//                   {user?.name || "Admin"}
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-col px-12 py-8">
//         {/* Page Title */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Trip Management
//           </h2>
//           <p className="text-gray-600">
//             Create and manage your travel experiences
//           </p>
//         </div>

//         {/* Enhanced Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//           {/* Add New Trip Component */}
//           <div id="trips-section" className="lg:col-span-1">
//             <AddNewTrip />
//           </div>

//           {/* Enhanced Stats Cards with Gradients and Animations */}
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100 text-sm font-medium">Total Trips</p>
//                 <p className="text-3xl font-bold mt-1">
//                   {loadingTrips ? (
//                     <div className="animate-pulse bg-white/20 h-8 w-16 rounded"></div>
//                   ) : (
//                     tripStats.total
//                   )}
//                 </p>
//                 <div className="flex items-center mt-2 text-xs text-blue-100">
//                   <span className="bg-white/20 px-2 py-1 rounded-full">
//                     All time
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                 <SlCalender className="text-2xl" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-emerald-100 text-sm font-medium">Upcoming</p>
//                 <p className="text-3xl font-bold mt-1">
//                   {loadingTrips ? (
//                     <div className="animate-pulse bg-white/20 h-8 w-16 rounded"></div>
//                   ) : (
//                     tripStats.upcoming
//                   )}
//                 </p>
//                 <div className="flex items-center mt-2 text-xs text-emerald-100">
//                   <span className="bg-white/20 px-2 py-1 rounded-full">
//                     Scheduled
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                 <FaCalendarAlt className="text-2xl" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-violet-100 text-sm font-medium">Revenue</p>
//                 <p className="text-3xl font-bold mt-1">
//                   {loadingTrips ? (
//                     <div className="animate-pulse bg-white/20 h-8 w-20 rounded"></div>
//                   ) : (
//                     `₹${tripStats.totalRevenue.toLocaleString()}`
//                   )}
//                 </p>
//                 <div className="flex items-center mt-2 text-xs text-violet-100">
//                   <span className="bg-white/20 px-2 py-1 rounded-full">
//                     Total earned
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                 <PiCurrencyInrBold className="text-2xl" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Recent Trips Section */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                   <FaCalendarAlt className="mr-3 text-blue-600" />
//                   Recent Trips
//                 </h3>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Latest travel bookings and schedules
//                 </p>
//               </div>
//               <div className="bg-blue-100 px-3 py-1 rounded-full">
//                 <span className="text-xs font-medium text-blue-700">
//                   {loadingTrips ? "..." : trips?.length || 0} trips
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="p-6">
//             {loadingTrips ? (
//               <div className="max-w-7xl mx-auto">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                   {[...Array(8)].map((_, i) => (
//                     <div key={i} className="animate-pulse">
//                       <div className="bg-gray-200 h-40 rounded-t-xl"></div>
//                       <div className="bg-gray-100 p-3 rounded-b-xl">
//                         <div className="bg-gray-200 h-3 w-3/4 rounded mb-2"></div>
//                         <div className="bg-gray-200 h-2 w-1/2 rounded"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : tripStats.total === 0 ? (
//               <div className="text-center py-12">
//                 <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                   <FaCalendarAlt className="text-gray-400 text-2xl" />
//                 </div>
//                 <p className="text-gray-500 font-medium">
//                   No trips created yet
//                 </p>
//                 <p className="text-sm text-gray-400 mt-1">
//                   Add your first trip to get started!
//                 </p>
//               </div>
//             ) : (
//               <div className="max-w-7xl mx-auto">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                   {trips?.slice(0, 8).map((trip, index) => {
//                     // Sample images for demonstration - in real app, these would come from trip.image
//                     const sampleImages = [
//                       "/src/assets/Goa.jpeg",
//                       "/src/assets/Photo.jpg",
//                       "/src/assets/Photo2.jpeg",
//                       "/src/assets/Photo3.jpeg",
//                       "/src/assets/Photo4.jpeg",
//                       "/src/assets/Photo5.jpeg",
//                     ];

//                     // Sample descriptions for demonstration
//                     const sampleDescriptions = [
//                       "Experience beautiful beaches and vibrant culture.",
//                       "Discover landmarks and enjoy local cuisine.",
//                       "Adventure with stunning landscapes and activities.",
//                       "Relax in this peaceful getaway with views.",
//                       "Explore hidden gems and create memories.",
//                       "Join us for an incredible journey of fun.",
//                     ];

//                     return (
//                       <div
//                         key={trip.id}
//                         className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group max-w-sm"
//                       >
//                         {/* Trip Image */}
//                         <div className="relative h-40 overflow-hidden">
//                           <img
//                             src={
//                               trip.image ||
//                               sampleImages[index % sampleImages.length]
//                             }
//                             alt={trip.title}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                             onError={(e) => {
//                               e.target.src =
//                                 sampleImages[index % sampleImages.length];
//                             }}
//                           />
//                           <div className="absolute top-2 right-2">
//                             <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
//                               {new Date(trip.date) > new Date()
//                                 ? "Upcoming"
//                                 : "Completed"}
//                             </span>
//                           </div>
//                           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
//                             <h4 className="text-white font-bold text-sm mb-1 truncate">
//                               {trip.title}
//                             </h4>
//                           </div>
//                         </div>

//                         {/* Trip Details */}
//                         <div className="p-3">
//                           {/* Description */}
//                           <p className="text-gray-600 text-xs mb-3 line-clamp-2 h-8">
//                             {trip.description ||
//                               sampleDescriptions[
//                                 index % sampleDescriptions.length
//                               ]}
//                           </p>

//                           {/* Trip Info */}
//                           <div className="space-y-2 mb-3">
//                             {/* Date & Location */}
//                             <div className="flex items-center justify-between text-xs">
//                               <div className="flex items-center text-gray-500">
//                                 <FaCalendarAlt className="mr-1 text-blue-500 text-xs" />
//                                 <span>
//                                   {new Date(trip.date).toLocaleDateString(
//                                     "en-US",
//                                     {
//                                       month: "short",
//                                       day: "numeric",
//                                     }
//                                   )}
//                                 </span>
//                               </div>
//                               {trip.location_name && (
//                                 <div className="flex items-center text-gray-500">
//                                   <FaMapMarkerAlt className="mr-1 text-emerald-500 text-xs" />
//                                   <span className="truncate max-w-20 text-xs">
//                                     {trip.location_name}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>

//                             {/* Participants & Price */}
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center bg-blue-50 px-2 py-1 rounded-md">
//                                 <FaUserFriends className="mr-1 text-blue-600 text-xs" />
//                                 <span className="text-xs font-medium text-blue-800">
//                                   {trip.max_participants}
//                                 </span>
//                               </div>
//                               <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
//                                 <span className="text-sm font-bold text-green-800">
//                                   ₹
//                                   {parseFloat(trip.price || 0).toLocaleString()}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Action Buttons */}
//                           <div className="flex gap-1 pt-2 border-t border-gray-100">
//                             <button
//                               onClick={() => handleEditTrip(trip)}
//                               className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-2 rounded-md text-xs font-medium transition-colors duration-200 flex items-center justify-center"
//                             >
//                               <FaEdit className="mr-1" />
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteTrip(trip)}
//                               className="px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs font-medium transition-colors duration-200 flex items-center justify-center"
//                             >
//                               <FaTrash />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* NEW DRIVER MANAGEMENT SECTION */}
//         {/* NEW DRIVER MANAGEMENT SECTION */}
//         <div className="mt-12">
//           {/* Driver Section Title */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               Driver Management
//             </h2>
//             <p className="text-gray-600">
//               Manage your driver team and assignments
//             </p>
//           </div>

//           {/* Enhanced Driver Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//             {/* Add New Driver Component */}
//             <div id="drivers-section">
//               <AddNewDriver onDriverAdded={handleDriverAdded} />
//             </div>

//             {/* Enhanced Driver Stats Cards */}
//             <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-emerald-100 text-sm font-medium">
//                     Active Drivers
//                   </p>
//                   <p className="text-3xl font-bold mt-1">
//                     {loadingDrivers ? (
//                       <div className="animate-pulse bg-white/20 h-8 w-16 rounded"></div>
//                     ) : (
//                       driverStats.active
//                     )}
//                   </p>
//                   <div className="flex items-center mt-2 text-xs text-emerald-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       Ready to drive
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <GrUserManager className="text-2xl" />
//                 </div>
//               </div>
//               {/* Activity indicator */}
//               <div className="mt-4 flex items-center">
//                 <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse mr-2"></div>
//                 <span className="text-xs text-emerald-100">Online now</span>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-orange-100 text-sm font-medium">
//                     Total Fleet
//                   </p>
//                   <p className="text-3xl font-bold mt-1">
//                     {loadingDrivers ? (
//                       <div className="animate-pulse bg-white/20 h-8 w-16 rounded"></div>
//                     ) : (
//                       driverStats.total
//                     )}
//                   </p>
//                   <div className="flex items-center mt-2 text-xs text-orange-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       All drivers
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <FaBusAlt className="text-2xl" />
//                 </div>
//               </div>
//               {/* Progress bar for driver utilization */}
//               <div className="mt-4">
//                 <div className="bg-white/20 rounded-full h-2">
//                   <div
//                     className="bg-white rounded-full h-2 transition-all duration-500"
//                     style={{
//                       width: loadingDrivers
//                         ? "0%"
//                         : `${
//                             driverStats.total > 0
//                               ? (driverStats.active / driverStats.total) * 100
//                               : 0
//                           }%`,
//                     }}
//                   ></div>
//                 </div>
//                 <p className="text-xs text-orange-100 mt-1">
//                   {loadingDrivers
//                     ? "..."
//                     : `${
//                         driverStats.total > 0
//                           ? Math.round(
//                               (driverStats.active / driverStats.total) * 100
//                             )
//                           : 0
//                       }% active`}
//                 </p>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-slate-100 text-sm font-medium">Inactive</p>
//                   <p className="text-3xl font-bold mt-1">
//                     {loadingDrivers ? (
//                       <div className="animate-pulse bg-white/20 h-8 w-16 rounded"></div>
//                     ) : (
//                       driverStats.inactive
//                     )}
//                   </p>
//                   <div className="flex items-center mt-2 text-xs text-slate-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       Off duty
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <IoMdDoneAll className="text-2xl" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Recent Drivers Section */}
//           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//             <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 border-b border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                     <GrUserManager className="mr-3 text-emerald-600" />
//                     Recent Drivers
//                   </h3>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Active driver team members
//                   </p>
//                 </div>
//                 <div className="bg-emerald-100 px-3 py-1 rounded-full">
//                   <span className="text-xs font-medium text-emerald-700">
//                     {loadingDrivers ? "..." : drivers?.length || 0} drivers
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               {loadingDrivers ? (
//                 <div className="space-y-4">
//                   {[...Array(3)].map((_, i) => (
//                     <div key={i} className="animate-pulse">
//                       <div className="bg-gray-200 h-20 rounded-lg"></div>
//                     </div>
//                   ))}
//                 </div>
//               ) : drivers.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                     <GrUserManager className="text-gray-400 text-2xl" />
//                   </div>
//                   <p className="text-gray-500 font-medium">
//                     No drivers registered yet
//                   </p>
//                   <p className="text-sm text-gray-400 mt-1">
//                     Add your first driver to get started!
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid gap-4">
//                   {drivers.slice(0, 5).map((driver) => {
//                     // Generate fallback avatar URL using Dicebear
//                     const fallbackAvatar = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
//                       driver.name || "Driver"
//                     )}`;

//                     return (
//                       <div
//                         key={driver.id}
//                         className="bg-gradient-to-r from-gray-50 to-emerald-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-emerald-200"
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-4">
//                             {/* Driver Photo */}
//                             <div className="relative">
//                               <img
//                                 src={driver.photo || fallbackAvatar}
//                                 alt={driver.name}
//                                 onError={(e) => {
//                                   e.target.src = fallbackAvatar;
//                                 }}
//                                 className="w-16 h-16 rounded-full object-cover border-3 border-emerald-200"
//                               />
//                               {driver.status === "active" && (
//                                 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
//                               )}
//                             </div>
//                             <div>
//                               <h4 className="font-bold text-gray-800 text-lg mb-1">
//                                 {driver.name}
//                               </h4>
//                               <div className="grid grid-cols-2 gap-4 text-sm">
//                                 <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
//                                   <span className="text-gray-500 mr-2">📞</span>
//                                   <span className="font-medium text-gray-700">
//                                     {driver.phone}
//                                   </span>
//                                 </div>
//                                 <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
//                                   <span className="text-gray-500 mr-2">🪪</span>
//                                   <span className="font-medium text-gray-700">
//                                     {driver.license_number}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex flex-col items-end gap-2">
//                             <span
//                               className={`px-4 py-2 rounded-full text-sm font-medium ${
//                                 driver.status === "active"
//                                   ? "bg-green-100 text-green-800 border border-green-200"
//                                   : "bg-gray-100 text-gray-600 border border-gray-200"
//                               }`}
//                             >
//                               {driver.status === "active" && (
//                                 <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
//                               )}
//                               {driver.status.charAt(0).toUpperCase() +
//                                 driver.status.slice(1)}
//                             </span>
//                             {driver.rating && (
//                               <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
//                                 <FaStar className="text-yellow-500 mr-1" />
//                                 <span className="text-sm font-medium text-yellow-800">
//                                   {driver.rating}
//                                 </span>
//                               </div>
//                             )}

//                             {/* Action Buttons */}
//                             <div className="flex gap-1 mt-2">
//                               <button
//                                 onClick={() => handleEditDriver(driver)}
//                                 className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center"
//                               >
//                                 <FaEdit className="text-xs" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteDriver(driver)}
//                                 className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center"
//                               >
//                                 <FaTrash className="text-xs" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* VEHICLE MANAGEMENT SECTION */}
//         <div className="mt-12">
//           {/* Vehicle Section Title */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               Vehicle Management
//             </h2>
//             <p className="text-gray-600">
//               Monitor and maintain your vehicle fleet
//             </p>
//           </div>

//           {/* Enhanced Vehicle Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//             {/* Add New Vehicle Component */}
//             <div id="vehicles-section">
//               <AddNewVehicle onVehicleAdded={handleVehicleAdded} />
//             </div>

//             {/* Enhanced Vehicle Stats Cards */}
//             <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100 text-sm font-medium">
//                     Total Fleet
//                   </p>
//                   <p className="text-3xl font-bold mt-1">
//                     {loading ? (
//                       <div className="animate-pulse bg-white/20 h-8 w-16 rounded"></div>
//                     ) : (
//                       vehicleStats.total
//                     )}
//                   </p>
//                   <div className="flex items-center mt-2 text-xs text-blue-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       All vehicles
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <FaTruck className="text-2xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-100 text-sm font-medium">
//                     Available
//                   </p>
//                   <p className="text-3xl font-bold mt-1">
//                     {loading ? (
//                       <div className="animate-pulse bg-white/20 h-8 w-16 rounded"></div>
//                     ) : (
//                       vehicleStats.available
//                     )}
//                   </p>
//                   <div className="flex items-center mt-2 text-xs text-green-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       Ready to go
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <FaCheckCircle className="text-2xl" />
//                 </div>
//               </div>
//               {/* Availability indicator */}
//               <div className="mt-4 flex items-center">
//                 <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse mr-2"></div>
//                 <span className="text-xs text-green-100">Operational</span>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-orange-100 text-sm font-medium">
//                     Maintenance
//                   </p>
//                   <p className="text-3xl font-bold mt-1">
//                     {loading ? (
//                       <div className="animate-pulse bg-white/20 h-8 w-16 rounded"></div>
//                     ) : (
//                       vehicleStats.maintenance
//                     )}
//                   </p>
//                   <div className="flex items-center mt-2 text-xs text-orange-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       Under repair
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <FaTools className="text-2xl" />
//                 </div>
//               </div>
//               {/* Maintenance progress */}
//               <div className="mt-4">
//                 <div className="bg-white/20 rounded-full h-2">
//                   <div
//                     className="bg-white rounded-full h-2 transition-all duration-500"
//                     style={{
//                       width: loading
//                         ? "0%"
//                         : `${
//                             vehicleStats.total > 0
//                               ? ((vehicleStats.total -
//                                   vehicleStats.maintenance) /
//                                   vehicleStats.total) *
//                                 100
//                               : 100
//                           }%`,
//                     }}
//                   ></div>
//                 </div>
//                 <p className="text-xs text-orange-100 mt-1">
//                   {loading
//                     ? "..."
//                     : `${
//                         vehicleStats.total > 0
//                           ? Math.round(
//                               ((vehicleStats.total - vehicleStats.maintenance) /
//                                 vehicleStats.total) *
//                                 100
//                             )
//                           : 100
//                       }% operational`}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Recent Vehicles Section */}
//           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                     <FaTruck className="mr-3 text-blue-600" />
//                     Recent Vehicles
//                   </h3>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Fleet status and vehicle details
//                   </p>
//                 </div>
//                 <div className="bg-blue-100 px-3 py-1 rounded-full">
//                   <span className="text-xs font-medium text-blue-700">
//                     {loading ? "..." : vehicles?.length || 0} vehicles
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               {loading ? (
//                 <div className="space-y-4">
//                   {[...Array(3)].map((_, i) => (
//                     <div key={i} className="animate-pulse">
//                       <div className="bg-gray-200 h-20 rounded-lg"></div>
//                     </div>
//                   ))}
//                 </div>
//               ) : vehicles.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                     <FaTruck className="text-gray-400 text-2xl" />
//                   </div>
//                   <p className="text-gray-500 font-medium">
//                     No vehicles registered yet
//                   </p>
//                   <p className="text-sm text-gray-400 mt-1">
//                     Add your first vehicle to get started!
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid gap-4">
//                   {vehicles.slice(0, 5).map((vehicle) => (
//                     <div
//                       key={vehicle.id}
//                       className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-blue-200"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className="bg-blue-500 text-white p-3 rounded-full">
//                             <FaTruck className="text-lg" />
//                           </div>
//                           <div>
//                             <h4 className="font-bold text-gray-800 text-lg mb-1">
//                               {vehicle.vehicle_number}
//                             </h4>
//                             <div className="grid grid-cols-2 gap-4 text-sm">
//                               <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
//                                 <span className="text-gray-500 mr-2">🚗</span>
//                                 <span className="font-medium text-gray-700">
//                                   {vehicle.type}
//                                 </span>
//                               </div>
//                               <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
//                                 <span className="text-gray-500 mr-2">🏷️</span>
//                                 <span className="font-medium text-gray-700">
//                                   {vehicle.model}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end gap-2">
//                           <span
//                             className={`px-4 py-2 rounded-full text-sm font-medium border ${
//                               vehicle.status === "available"
//                                 ? "bg-green-100 text-green-800 border-green-200"
//                                 : vehicle.status === "maintenance"
//                                 ? "bg-orange-100 text-orange-800 border-orange-200"
//                                 : "bg-blue-100 text-blue-800 border-blue-200"
//                             }`}
//                           >
//                             {vehicle.status === "available" && (
//                               <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
//                             )}
//                             {vehicle.status === "maintenance" && (
//                               <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
//                             )}
//                             {vehicle.status.charAt(0).toUpperCase() +
//                               vehicle.status.slice(1)}
//                           </span>
//                           <div className="flex items-center gap-2">
//                             <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
//                               <span className="text-xs font-medium text-gray-600">
//                                 ID: {vehicle.id}
//                               </span>
//                             </div>
//                             <div className="flex gap-1">
//                               <button
//                                 onClick={() => handleEditVehicle(vehicle)}
//                                 className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-colors duration-200"
//                                 title="Edit Vehicle"
//                               >
//                                 <FaEdit className="text-sm" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteVehicle(vehicle.id)}
//                                 className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors duration-200"
//                                 title="Delete Vehicle"
//                               >
//                                 <FaTrash className="text-sm" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* USER MANAGEMENT SECTION */}
//         <div className="mt-12">
//           {/* User Section Title */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               User Management
//             </h2>
//             <p className="text-gray-600">
//               Manage customer accounts and profiles
//             </p>
//           </div>

//           {/* Enhanced User Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//             {/* Manage Users Component */}
//             <div id="users-section">
//               <ManageUsers />
//             </div>

//             {/* Enhanced User Stats Cards */}
//             <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-100 text-sm font-medium">
//                     Total Users
//                   </p>
//                   <p className="text-3xl font-bold mt-1">1,247</p>
//                   <div className="flex items-center mt-2 text-xs text-purple-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       Registered
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <FaUsers className="text-2xl" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-100 text-sm font-medium">
//                     Active Users
//                   </p>
//                   <p className="text-3xl font-bold mt-1">1,089</p>
//                   <div className="flex items-center mt-2 text-xs text-green-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       87% retention
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <FaCheck className="text-2xl" />
//                 </div>
//               </div>
//               {/* Activity indicator */}
//               <div className="mt-4 flex items-center">
//                 <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse mr-2"></div>
//                 <span className="text-xs text-green-100">High engagement</span>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-cyan-100 text-sm font-medium">
//                     New This Month
//                   </p>
//                   <p className="text-3xl font-bold mt-1">89</p>
//                   <div className="flex items-center mt-2 text-xs text-cyan-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       +12% growth
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <FaCalendarAlt className="text-2xl" />
//                 </div>
//               </div>
//               {/* Growth trend */}
//               <div className="mt-4">
//                 <div className="bg-white/20 rounded-full h-2">
//                   <div className="bg-white rounded-full h-2 w-3/4 transition-all duration-500"></div>
//                 </div>
//                 <p className="text-xs text-cyan-100 mt-1">
//                   Growth trend: Excellent
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Recent Users Section */}
//           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//             <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                     <FaUsers className="mr-3 text-purple-600" />
//                     Recent Users
//                   </h3>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Customer registrations and activity
//                   </p>
//                 </div>
//                 <div className="bg-purple-100 px-3 py-1 rounded-full">
//                   <span className="text-xs font-medium text-purple-700">
//                     1,247 total
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="text-center py-12">
//                 <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
//                   <FaUsers className="text-purple-500 text-3xl" />
//                 </div>
//                 <h4 className="text-lg font-semibold text-gray-800 mb-2">
//                   Customer Hub
//                 </h4>
//                 <p className="text-gray-500 font-medium mb-2">
//                   Ready for customer data
//                 </p>
//                 <p className="text-sm text-gray-400 mb-6">
//                   New customer registrations will appear here
//                 </p>

//                 {/* Sample User Cards for Demo */}
//                 <div className="grid gap-3 max-w-md mx-auto">
//                   {[
//                     {
//                       name: "John Doe",
//                       email: "john@example.com",
//                       status: "Active",
//                       joinDate: "Jan 15",
//                     },
//                     {
//                       name: "Sarah Wilson",
//                       email: "sarah@example.com",
//                       status: "Active",
//                       joinDate: "Jan 12",
//                     },
//                     {
//                       name: "Mike Johnson",
//                       email: "mike@example.com",
//                       status: "Pending",
//                       joinDate: "Jan 10",
//                     },
//                   ].map((user, index) => (
//                     <div
//                       key={index}
//                       className="bg-gradient-to-r from-gray-50 to-purple-50 p-3 rounded-lg border border-gray-100 opacity-60"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="bg-purple-200 text-purple-600 p-2 rounded-full text-sm">
//                             {user.name
//                               .split(" ")
//                               .map((n) => n[0])
//                               .join("")}
//                           </div>
//                           <div className="text-left">
//                             <p className="font-medium text-gray-700 text-sm">
//                               {user.name}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {user.email}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs ${
//                               user.status === "Active"
//                                 ? "bg-green-100 text-green-600"
//                                 : "bg-yellow-100 text-yellow-600"
//                             }`}
//                           >
//                             {user.status}
//                           </span>
//                           <p className="text-xs text-gray-400 mt-1">
//                             {user.joinDate}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6 text-xs text-gray-400">
//                   Demo data - Real customer data will replace this
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* REVIEW MANAGEMENT SECTION */}
//         <div className="mt-12">
//           {/* Review Section Title */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               Review Management
//             </h2>
//             <p className="text-gray-600">
//               View and manage customer feedback and reviews
//             </p>
//           </div>

//           {/* Enhanced Review Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//             {/* Add New Review Component */}
//             <div id="reviews-section">
//               <ManageReviews />
//             </div>

//             {/* Enhanced Review Stats Cards */}
//             <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-yellow-100 text-sm font-medium">
//                     Average Rating
//                   </p>
//                   <p className="text-3xl font-bold mt-1 flex items-center">
//                     4.5
//                     <FaStar className="text-xl ml-1" />
//                   </p>
//                   <div className="flex items-center mt-2 text-xs text-yellow-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       Excellent service
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <FaStar className="text-2xl" />
//                 </div>
//               </div>
//               {/* Star rating visualization */}
//               <div className="mt-4 flex space-x-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <FaStar
//                     key={star}
//                     className={`text-sm ${
//                       star <= 4.5 ? "text-white" : "text-white/40"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-100 text-sm font-medium">
//                     Positive Reviews
//                   </p>
//                   <p className="text-3xl font-bold mt-1">89%</p>
//                   <div className="flex items-center mt-2 text-xs text-green-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       Happy customers
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <FaThumbsUp className="text-2xl" />
//                 </div>
//               </div>
//               {/* Satisfaction progress */}
//               <div className="mt-4">
//                 <div className="bg-white/20 rounded-full h-2">
//                   <div className="bg-white rounded-full h-2 w-[89%] transition-all duration-500"></div>
//                 </div>
//                 <p className="text-xs text-green-100 mt-1">
//                   Customer satisfaction
//                 </p>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-indigo-100 text-sm font-medium">
//                     Total Reviews
//                   </p>
//                   <p className="text-3xl font-bold mt-1">245</p>
//                   <div className="flex items-center mt-2 text-xs text-indigo-100">
//                     <span className="bg-white/20 px-2 py-1 rounded-full">
//                       Verified feedback
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
//                   <FaEye className="text-2xl" />
//                 </div>
//               </div>
//               {/* Recent activity indicator */}
//               <div className="mt-4 flex items-center">
//                 <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse mr-2"></div>
//                 <span className="text-xs text-indigo-100">
//                   New reviews daily
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Recent Reviews Section */}
//           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//             <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 border-b border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-800 flex items-center">
//                     <FaStar className="mr-3 text-yellow-600" />
//                     Recent Reviews
//                   </h3>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Customer feedback and ratings
//                   </p>
//                 </div>
//                 <div className="bg-yellow-100 px-3 py-1 rounded-full">
//                   <span className="text-xs font-medium text-yellow-700">
//                     4.5 ★ average
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="text-center py-12">
//                 <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
//                   <FaStar className="text-yellow-500 text-3xl" />
//                 </div>
//                 <h4 className="text-lg font-semibold text-gray-800 mb-2">
//                   Review Center
//                 </h4>
//                 <p className="text-gray-500 font-medium mb-2">
//                   Awaiting customer feedback
//                 </p>
//                 <p className="text-sm text-gray-400 mb-6">
//                   Customer reviews and ratings will appear here
//                 </p>

//                 {/* Sample Review Cards for Demo */}
//                 <div className="grid gap-4 max-w-lg mx-auto">
//                   {[
//                     {
//                       name: "Emily Chen",
//                       rating: 5,
//                       comment:
//                         "Excellent service! The trip was perfectly organized.",
//                       date: "2 days ago",
//                       trip: "Goa Beach Tour",
//                     },
//                     {
//                       name: "Robert Smith",
//                       rating: 4,
//                       comment:
//                         "Great experience, driver was very professional.",
//                       date: "5 days ago",
//                       trip: "Mumbai City Tour",
//                     },
//                     {
//                       name: "Lisa Wang",
//                       rating: 5,
//                       comment: "Amazing trip! Highly recommend this service.",
//                       date: "1 week ago",
//                       trip: "Delhi Heritage Walk",
//                     },
//                   ].map((review, index) => (
//                     <div
//                       key={index}
//                       className="bg-gradient-to-r from-gray-50 to-yellow-50 p-4 rounded-lg border border-gray-100 opacity-60 text-left"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <div>
//                           <h5 className="font-semibold text-gray-800 text-sm">
//                             {review.name}
//                           </h5>
//                           <p className="text-xs text-gray-500">{review.trip}</p>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           {[...Array(5)].map((_, i) => (
//                             <FaStar
//                               key={i}
//                               className={`text-xs ${
//                                 i < review.rating
//                                   ? "text-yellow-400"
//                                   : "text-gray-300"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-2 italic">
//                         "{review.comment}"
//                       </p>
//                       <p className="text-xs text-gray-400">{review.date}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6 text-xs text-gray-400">
//                   Demo reviews - Real customer feedback will replace this
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit Trip Modal */}
//       {showEditModal && editingTrip && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Trip</h3>
//             <EditTripForm
//               trip={editingTrip}
//               onSave={handleSaveTrip}
//               onCancel={() => {
//                 setShowEditModal(false);
//                 setEditingTrip(null);
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && tripToDelete && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Delete Trip
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete "
//               <strong>{tripToDelete.title}</strong>"? This action cannot be
//               undone.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={confirmDeleteTrip}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//               >
//                 Delete Trip
//               </button>
//               <button
//                 onClick={() => {
//                   setShowDeleteModal(false);
//                   setTripToDelete(null);
//                 }}
//                 className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Driver Modal */}
//       {showEditDriverModal && editingDriver && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Edit Driver
//             </h3>
//             <EditDriverForm
//               driver={editingDriver}
//               onSave={handleSaveDriver}
//               onCancel={() => {
//                 setShowEditDriverModal(false);
//                 setEditingDriver(null);
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Delete Driver Confirmation Modal */}
//       {showDeleteDriverModal && driverToDelete && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Delete Driver
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete "
//               <strong>{driverToDelete.name}</strong>"? This action cannot be
//               undone.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={confirmDeleteDriver}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//               >
//                 Delete Driver
//               </button>
//               <button
//                 onClick={() => {
//                   setShowDeleteDriverModal(false);
//                   setDriverToDelete(null);
//                 }}
//                 className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Vehicle Modal */}
//       {showEditVehicleModal && editingVehicle && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Edit Vehicle
//             </h3>
//             <EditVehicleForm
//               vehicle={editingVehicle}
//               onSave={handleSaveVehicle}
//               onCancel={() => {
//                 setShowEditVehicleModal(false);
//                 setEditingVehicle(null);
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Delete Vehicle Confirmation Modal */}
//       {showDeleteVehicleModal && vehicleToDelete && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Delete Vehicle
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete vehicle "
//               <strong>{vehicleToDelete.vehicle_number}</strong>"? This action
//               cannot be undone.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={confirmDeleteVehicle}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//               >
//                 Delete Vehicle
//               </button>
//               <button
//                 onClick={() => {
//                   setShowDeleteVehicleModal(false);
//                   setVehicleToDelete(null);
//                 }}
//                 className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
