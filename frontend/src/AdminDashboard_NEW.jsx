import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Component imports
import AdminHeader from "./components/AdminHeader";
import StatsSection from "./components/StatsSection";
import RecentTrips from "./components/RecentTrips";
import RecentDrivers from "./components/RecentDrivers";
import RecentVehicles from "./components/RecentVehicles";
import RecentUsers from "./components/RecentUsers";
import RecentReviews from "./components/RecentReviews";
import Modal from "./components/Modal";
import EditTripForm from "./components/EditTripForm";
import EditDriverForm from "./components/EditDriverForm";
import EditVehicleForm from "./components/EditVehicleForm";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import AddNewTrip from "./components/AddNewTrip";
import AddNewDriver from "./components/AddNewDriver";
import AddNewVehicle from "./components/AddNewVehicle";
import ManageUsers from "./components/ManageUsers";
import ManageReviews from "./components/ManageReviews";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // State management
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalTrips: 0,
    totalDrivers: 0,
    totalVehicles: 0,
    totalUsers: 0,
    totalReviews: 0,
  });

  // Data states
  const [trips, setTrips] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Modal states
  const [editModal, setEditModal] = useState({
    isOpen: false,
    type: null,
    data: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: null,
    data: null,
  });

  // Loading states
  const [loading, setLoading] = useState(true);

  // API base URL
  const API_BASE_URL = "http://localhost:3000/api";

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [tripsRes, driversRes, vehiclesRes, usersRes, reviewsRes] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/trips`),
          axios.get(`${API_BASE_URL}/drivers`),
          axios.get(`${API_BASE_URL}/vehicles`),
          axios.get(`${API_BASE_URL}/auth/users`),
          axios.get(`${API_BASE_URL}/reviews`),
        ]);

      setTrips(tripsRes.data);
      setDrivers(driversRes.data);
      setVehicles(vehiclesRes.data);
      setUsers(usersRes.data);
      setReviews(reviewsRes.data);

      // Update stats
      setStats({
        totalTrips: tripsRes.data.length,
        totalDrivers: driversRes.data.length,
        totalVehicles: vehiclesRes.data.length,
        totalUsers: usersRes.data.length,
        totalReviews: reviewsRes.data.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Edit handlers
  const handleEdit = (type, data) => {
    setEditModal({ isOpen: true, type, data });
  };

  const handleSave = async (updatedData) => {
    try {
      const { type } = editModal;
      let endpoint = "";

      switch (type) {
        case "trip":
          endpoint = `${API_BASE_URL}/trips/${updatedData.id}`;
          break;
        case "driver":
          endpoint = `${API_BASE_URL}/drivers/${updatedData.id}`;
          break;
        case "vehicle":
          endpoint = `${API_BASE_URL}/vehicles/${updatedData.id}`;
          break;
        default:
          return;
      }

      await axios.put(endpoint, updatedData);

      // Update local state
      switch (type) {
        case "trip":
          setTrips(
            trips.map((trip) =>
              trip.id === updatedData.id ? updatedData : trip
            )
          );
          break;
        case "driver":
          setDrivers(
            drivers.map((driver) =>
              driver.id === updatedData.id ? updatedData : driver
            )
          );
          break;
        case "vehicle":
          setVehicles(
            vehicles.map((vehicle) =>
              vehicle.id === updatedData.id ? updatedData : vehicle
            )
          );
          break;
      }

      setEditModal({ isOpen: false, type: null, data: null });
      alert(
        `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`
      );
    } catch (error) {
      console.error(`Error updating ${editModal.type}:`, error);
      alert(`Error updating ${editModal.type}. Please try again.`);
    }
  };

  // Delete handlers
  const handleDelete = (type, data) => {
    setDeleteModal({ isOpen: true, type, data });
  };

  const confirmDelete = async () => {
    try {
      const { type, data } = deleteModal;
      let endpoint = "";

      switch (type) {
        case "trip":
          endpoint = `${API_BASE_URL}/trips/${data.id}`;
          break;
        case "driver":
          endpoint = `${API_BASE_URL}/drivers/${data.id}`;
          break;
        case "vehicle":
          endpoint = `${API_BASE_URL}/vehicles/${data.id}`;
          break;
        default:
          return;
      }

      await axios.delete(endpoint);

      // Update local state
      switch (type) {
        case "trip":
          setTrips(trips.filter((trip) => trip.id !== data.id));
          setStats((prev) => ({ ...prev, totalTrips: prev.totalTrips - 1 }));
          break;
        case "driver":
          setDrivers(drivers.filter((driver) => driver.id !== data.id));
          setStats((prev) => ({
            ...prev,
            totalDrivers: prev.totalDrivers - 1,
          }));
          break;
        case "vehicle":
          setVehicles(vehicles.filter((vehicle) => vehicle.id !== data.id));
          setStats((prev) => ({
            ...prev,
            totalVehicles: prev.totalVehicles - 1,
          }));
          break;
      }

      setDeleteModal({ isOpen: false, type: null, data: null });
      alert(
        `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`
      );
    } catch (error) {
      console.error(`Error deleting ${deleteModal.type}:`, error);
      alert(`Error deleting ${deleteModal.type}. Please try again.`);
    }
  };

  // Tab navigation
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "trips", label: "Manage Trips" },
    { id: "drivers", label: "Manage Drivers" },
    { id: "vehicles", label: "Manage Vehicles" },
    { id: "users", label: "Manage Users" },
    { id: "reviews", label: "Manage Reviews" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <StatsSection stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentTrips
                trips={trips}
                onEdit={(trip) => handleEdit("trip", trip)}
                onDelete={(trip) => handleDelete("trip", trip)}
              />
              <RecentDrivers
                drivers={drivers}
                onEdit={(driver) => handleEdit("driver", driver)}
                onDelete={(driver) => handleDelete("driver", driver)}
              />
              <RecentVehicles
                vehicles={vehicles}
                onEdit={(vehicle) => handleEdit("vehicle", vehicle)}
                onDelete={(vehicle) => handleDelete("vehicle", vehicle)}
              />
              <RecentUsers users={users} />
              <RecentReviews reviews={reviews} />
            </div>
          </div>
        );
      case "trips":
        return <AddNewTrip onTripAdded={fetchAllData} />;
      case "drivers":
        return <AddNewDriver onDriverAdded={fetchAllData} />;
      case "vehicles":
        return <AddNewVehicle onVehicleAdded={fetchAllData} />;
      case "users":
        return <ManageUsers users={users} onRefresh={fetchAllData} />;
      case "reviews":
        return <ManageReviews reviews={reviews} onRefresh={fetchAllData} />;
      default:
        return null;
    }
  };

  const renderEditForm = () => {
    const { type, data } = editModal;
console.log("drivers from dashboard",drivers);
    switch (type) {
      case "trip":
        return (
          <EditTripForm
            trip={data}
             drivers={drivers} 
            onSave={handleSave}
            onCancel={() =>
              setEditModal({ isOpen: false, type: null, data: null })
            }
          />
        );
      case "driver":
        return (
          <EditDriverForm
            driver={data}
            onSave={handleSave}
            onCancel={() =>
              setEditModal({ isOpen: false, type: null, data: null })
            }
          />
        );
      case "vehicle":
        return (
          <EditVehicleForm
            vehicle={data}
            onSave={handleSave}
            onCancel={() =>
              setEditModal({ isOpen: false, type: null, data: null })
            }
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <AdminHeader onLogout={handleLogout} />

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">{renderTabContent()}</div>

      {/* Edit Modal */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, type: null, data: null })}
        title={`Edit ${
          editModal.type
            ? editModal.type.charAt(0).toUpperCase() + editModal.type.slice(1)
            : ""
        }`}
      >
        {renderEditForm()}
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onConfirm={confirmDelete}
        onCancel={() =>
          setDeleteModal({ isOpen: false, type: null, data: null })
        }
        title={`Delete ${
          deleteModal.type
            ? deleteModal.type.charAt(0).toUpperCase() +
              deleteModal.type.slice(1)
            : ""
        }`}
        message={`Are you sure you want to delete this ${deleteModal.type}? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminDashboard;
