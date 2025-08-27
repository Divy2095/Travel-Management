import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const UserTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    fetchUserTrips();
  }, []);

  const fetchUserTrips = async () => {
    try {
      let user = localStorage.getItem("user");
      let token = localStorage.getItem("token");

      // Debug logs
      console.log("Stored user:", user);
      console.log("Stored token:", token);

      if (!token) {
        // Try to get a new token by redirecting to login
        console.error("No token found");
        toast.error("Session expired. Please login again.");
        return;
      }

      try {
        user = JSON.parse(user);
      } catch (e) {
        console.error("Error parsing user:", e);
        return;
      }

      if (!user?.id) {
        console.error("No valid user found");
        return;
      }

      // Create axios instance with base URL and auth header
      const axiosInstance = axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Making request with token:", token); // Debug log

      const response = await axiosInstance.get(`/bookings/user/${user.id}`);

      console.log("API Response:", response.data); // Debug log

      if (response.data.success) {
        console.log("Trip data received:", response.data.data); // Debug log
        setTrips(response.data.data || []);
      } else {
        toast.error("Could not load your trips at the moment.");
      }
    } catch (error) {
      console.error("Error fetching user trips:", error);

      if (error.response?.status === 401) {
        console.log(
          "Token verification failed:",
          localStorage.getItem("token")
        );
        toast.error("Your session has expired. Please log in again.");
      } else {
        toast.error("Unable to load trips. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Filter trips based on date
  const currentDate = new Date();
  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.trip_date) >= currentDate
  );
  const pastTrips = trips.filter(
    (trip) => new Date(trip.trip_date) < currentDate
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const displayTrips = activeTab === "upcoming" ? upcomingTrips : pastTrips;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Trips</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "upcoming"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Upcoming Trips
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "past"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Past Trips
          </button>
        </div>
      </div>

      {displayTrips.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl text-gray-600">
            {activeTab === "upcoming"
              ? "No upcoming trips scheduled"
              : "No past trips found"}
          </h3>
          {activeTab === "upcoming" && (
            <p className="mt-2 text-gray-500">
              Start exploring and book your next adventure!
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={trip.trip_image || "https://via.placeholder.com/400x200"}
                alt={trip.trip_title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {trip.trip_title || "Trip Name Not Available"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    <span>{formatDate(trip.trip_date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>
                      {trip.trip_title || "Destination Not Available"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="mr-2" />
                    <span>{trip.participants} People</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        trip.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : trip.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {trip.status.charAt(0).toUpperCase() +
                        trip.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTrips;
