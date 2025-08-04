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
import RecentBookings from "./components/RecentBookings";
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
    totalBookings: 0,
  });

  // Data states
  const [trips, setTrips] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookings, setBookings] = useState([]);

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
    console.log("🚀 AdminDashboard mounted, fetching data...");
    fetchAllData();
  }, []);

  // Also add a manual refresh button for debugging
  const handleRefresh = () => {
    console.log("🔄 Manual refresh triggered");
    fetchAllData();
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching admin dashboard data...");

      // Fetch trips
      const tripsRes = await axios.get(`${API_BASE_URL}/trips`).catch((err) => {
        console.error(
          "❌ Error fetching trips:",
          err.response?.data || err.message
        );
        return { data: [] };
      });

      // Fetch drivers
      const driversRes = await axios
        .get(`${API_BASE_URL}/drivers`)
        .catch((err) => {
          console.error(
            "❌ Error fetching drivers:",
            err.response?.data || err.message
          );
          return { data: [] };
        });

      // Fetch vehicles
      const vehiclesRes = await axios
        .get(`${API_BASE_URL}/vehicles`)
        .catch((err) => {
          console.error(
            "❌ Error fetching vehicles:",
            err.response?.data || err.message
          );
          return { data: [] };
        });

      // Fetch users
      const usersRes = await axios
        .get(`${API_BASE_URL}/auth/users`)
        .catch((err) => {
          console.error(
            "❌ Error fetching users:",
            err.response?.data || err.message
          );
          return { data: [] };
        });

      // Fetch bookings
      const bookingsRes = await axios
        .get(`${API_BASE_URL}/bookings`)
        .catch((err) => {
          console.error(
            "❌ Error fetching bookings:",
            err.response?.data || err.message
          );
          return { data: [] };
        });

      console.log("🔍 Raw API Responses:", {
        trips: tripsRes.data,
        drivers: driversRes.data,
        vehicles: vehiclesRes.data,
        users: usersRes.data,
        bookings: bookingsRes.data,
      });

      // Handle different response structures
      const tripsData = tripsRes.data?.data || tripsRes.data || [];
      const driversData = driversRes.data?.data || driversRes.data || [];
      const vehiclesData = vehiclesRes.data?.data || vehiclesRes.data || [];
      const usersData = usersRes.data?.data || usersRes.data || [];
      const bookingsData = bookingsRes.data?.data || bookingsRes.data || [];

      console.log("✅ Processed Data:", {
        trips: tripsData.length,
        drivers: driversData.length,
        vehicles: vehiclesData.length,
        users: usersData.length,
        bookings: bookingsData.length,
      });

      setTrips(tripsData);
      setDrivers(driversData);
      setVehicles(vehiclesData);
      setUsers(usersData);
      setBookings(bookingsData);
      setReviews([]); // No reviews API yet

      // Update stats
      const newStats = {
        totalTrips: tripsData.length,
        totalDrivers: driversData.length,
        totalVehicles: vehiclesData.length,
        totalUsers: usersData.length,
        totalReviews: 0,
        totalBookings: bookingsData.length,
      };

      setStats(newStats);
      console.log("📊 Updated stats:", newStats);
    } catch (error) {
      console.error("💥 Error fetching data:", error);
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
        case "booking":
          endpoint = `${API_BASE_URL}/bookings/${data.id}`;
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
        case "booking":
          setBookings(bookings.filter((booking) => booking.id !== data.id));
          setStats((prev) => ({
            ...prev,
            totalBookings: prev.totalBookings - 1,
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

  // Booking handlers
  const handleViewBooking = (booking) => {
    alert(`Viewing booking details for booking ID: ${booking.id}`);
    // You can implement a modal to show booking details
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/bookings/${bookingId}/status`, {
        status: newStatus,
      });

      // Update local state
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );

      alert(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Error updating booking status. Please try again.");
    }
  };

  const handleEditBooking = (booking) => {
    alert(`Edit booking functionality for booking ID: ${booking.id}`);
    // You can implement booking edit functionality here
  };

  const handleDeleteBooking = async (booking) => {
    if (
      window.confirm(`Are you sure you want to delete booking #${booking.id}?`)
    ) {
      try {
        await axios.delete(`${API_BASE_URL}/bookings/${booking.id}`);

        // Update local state
        setBookings(bookings.filter((b) => b.id !== booking.id));
        setStats((prev) => ({
          ...prev,
          totalBookings: prev.totalBookings - 1,
        }));

        alert("Booking deleted successfully!");
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Error deleting booking. Please try again.");
      }
    }
  };

  // Tab navigation
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "bookings", label: "Manage Bookings" },
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
            <div className="space-y-8">
              {/* Recent Bookings - Full width */}
              <RecentBookings
                bookings={bookings}
                onView={handleViewBooking}
                onEdit={handleEditBooking}
                onDelete={handleDeleteBooking}
                onUpdateStatus={handleUpdateBookingStatus}
              />

              {/* Other components in grid */}
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
              </div>
            </div>
          </div>
        );
      case "bookings":
        return (
          <RecentBookings
            bookings={bookings}
            onView={handleViewBooking}
            onEdit={handleEditBooking}
            onDelete={handleDeleteBooking}
            onUpdateStatus={handleUpdateBookingStatus}
          />
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

    switch (type) {
      case "trip":
        return (
          <EditTripForm
            trip={data}
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

      {/* Debug Section - Remove this in production */}
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-800">
                <strong>Debug Info:</strong> Stats - Trips: {stats.totalTrips},
                Drivers: {stats.totalDrivers}, Vehicles: {stats.totalVehicles},
                Users: {stats.totalUsers}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>

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
