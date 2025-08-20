import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";
import UserTrips from "./components/UserTrips";
import Goa from "./assets/Goa.jpeg";
import Photo2 from "./assets/Photo2.jpeg";
import Photo3 from "./assets/Photo3.jpeg";
import Photo4 from "./assets/Photo4.jpeg";
import Photo5 from "./assets/Photo5.jpeg";
import Photo6 from "./assets/Photo6.jpeg";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("home");
  const navigate = useNavigate();

  // Trip state management
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log("User loaded from localStorage:", parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    // Fetch trips when component mounts
    fetchTrips();
  }, []);

  // Fetch trips function
  const fetchTrips = async () => {
    try {
      setLoadingTrips(true);
      const response = await fetch("http://localhost:3000/api/trips");
      const result = await response.json();

      if (result.success) {
        setTrips(result.data || []);
      } else {
        console.error("Failed to fetch trips:", result.message);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoadingTrips(false);
    }
  };

  // Handle booking navigation
  const handleBookTrip = (tripId) => {
    if (!user) {
      toast.info("Please login to book a trip");
      navigate("/login");
      return;
    }
    navigate(`/booking/${tripId}`);
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter your email");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    setLoading(true);

    try {
      console.log("Sending invite to:", email);

      const res = await axios.post(
        "http://localhost:3000/api/admin/send-invite",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("Response:", res.data);
      toast.success(res.data.message || "Invitation Sent!");
      setEmail("");
    } catch (error) {
      console.error("Error details:", error);

      if (error.response) {
        toast.error(error.response.data.message || "Failed to send invite");
      } else if (error.request) {
        toast.error("No response from server. Check if backend is running.");
      } else {
        toast.error("Failed to send request");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // Fixed UserAvatar component
  const UserAvatar = ({ user }) => {
    const [imageError, setImageError] = useState(false);

    // Generate fallback avatar URL
    const fallbackAvatar = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
      user.name || "User"
    )}&radius=50&backgroundColor=3b82f6&color=ffffff`;

    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <div className="flex items-center space-x-3">
        <img
          src={imageError ? fallbackAvatar : user.image || fallbackAvatar}
          alt={user.name || "User"}
          className="w-8 h-8 rounded-full border-2 border-gray-300"
          onError={handleImageError}
        />
        <span className="font-medium text-gray-700">{user.name}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-100">
      <header>
        <ul className="flex gap-8 justify-center items-center p-3">
          <li></li>
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Destinations
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Hotels
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Booking
            </a>
          </li>
          <li>
            {user ? (
              // Show user avatar and name with dropdown
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                  <UserAvatar user={user} />
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <button
                      onClick={() => setCurrentView("trips")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Trips
                    </button>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Show login button with proper click handler
              <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Log in
              </button>
            )}
          </li>
        </ul>
      </header>

      <main className="container mx-auto px-6 py-2">
        {currentView === "trips" ? (
          <>
            <div className="mb-6">
              <button
                onClick={() => setCurrentView("home")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Home
              </button>
            </div>
            <UserTrips />
          </>
        ) : (
          <>
            {/* Hero Section */}
            <section className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <div className="bg-blue-200 p-8 rounded-2xl shadow-lg">
                  <p className="font-semibold text-sm text-gray-600 mb-4">
                    BEST DESTINATIONS AROUND THE WORLD
                  </p>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                    Travel, Enjoy and live a new and Full life
                  </h1>
                  <h2 className="text-xl text-gray-700 leading-relaxed">
                    Discover breathtaking places, meet amazing people, and make
                    memories that last a lifetime.
                  </h2>
                  <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Start Exploring
                  </button>
                </div>
              </div>

              {/* Images Grid */}
              <div className="hidden md:grid grid-cols-3 gap-6 relative h-auto">
                <div className="flex flex-col gap-6">
                  <img
                    src={Goa}
                    alt="Destination 1"
                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:rotate-3 transition-transform duration-300"
                  />
                  <img
                    src={Photo2}
                    alt="Destination 3"
                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:-rotate-3 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-6 mt-12">
                  <img
                    src={Photo3}
                    alt="Destination 2"
                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:-rotate-6 transition-transform duration-300"
                  />
                  <img
                    src={Photo4}
                    alt="Destination 4"
                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:rotate-6 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <img
                    src={Photo5}
                    alt="Destination 5"
                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:rotate-3 transition-transform duration-300"
                  />
                  <img
                    src={Photo6}
                    alt="Destination 6"
                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:-rotate-3 transition-transform duration-300"
                  />
                </div>
              </div>
            </section>

            {/* Available Trips Section */}
            <section className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Available Trips
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover amazing destinations and book your next adventure.
                  Choose from our curated selection of trips.
                </p>
              </div>

              {loadingTrips ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-t-xl"></div>
                      <div className="bg-gray-100 p-4 rounded-b-xl">
                        <div className="bg-gray-200 h-4 w-3/4 rounded mb-3"></div>
                        <div className="bg-gray-200 h-3 w-1/2 rounded mb-2"></div>
                        <div className="bg-gray-200 h-3 w-2/3 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : trips.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <FaCalendarAlt className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Trips Available
                  </h3>
                  <p className="text-gray-500">
                    Check back soon for exciting new destinations!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {trips.map((trip, index) => {
                    // Sample images for demonstration
                    const sampleImages = [
                      Goa,
                      Photo2,
                      Photo3,
                      Photo4,
                      Photo5,
                      Photo6,
                    ];

                    // Sample descriptions for demonstration
                    const sampleDescriptions = [
                      "Experience beautiful beaches and vibrant culture in this amazing destination.",
                      "Discover historic landmarks and enjoy authentic local cuisine on this journey.",
                      "Adventure awaits with stunning landscapes and thrilling activities.",
                      "Relax and unwind in this peaceful getaway with breathtaking views.",
                      "Explore hidden gems and create unforgettable memories.",
                      "Join us for an incredible journey filled with fun and excitement.",
                    ];

                    return (
                      <div
                        key={trip.id}
                        className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                      >
                        {/* Trip Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={
                              trip.image ||
                              sampleImages[index % sampleImages.length]
                            }
                            alt={trip.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src =
                                sampleImages[index % sampleImages.length];
                            }}
                          />
                          <div className="absolute top-3 right-3">
                            <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                              {new Date(trip.date) > new Date()
                                ? "Available"
                                : "Past Trip"}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h3 className="text-white font-bold text-lg mb-1 truncate">
                              {trip.title}
                            </h3>
                          </div>
                        </div>

                        {/* Trip Details */}
                        <div className="p-4">
                          {/* Description */}
                          <p
                            className="text-gray-600 text-sm mb-4 overflow-hidden"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              minHeight: "2.5rem",
                            }}
                          >
                            {trip.description ||
                              sampleDescriptions[
                                index % sampleDescriptions.length
                              ]}
                          </p>

                          {/* Trip Info Grid */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-blue-500 text-sm" />
                              <span className="text-xs font-medium text-gray-700">
                                {new Date(trip.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-red-500 text-sm" />
                              <span className="text-xs font-medium text-gray-700 truncate">
                                {trip.location_name || "Destination"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <FaUsers className="text-green-500 text-sm" />
                              <span className="text-xs font-medium text-gray-700">
                                Max {trip.max_participants || "N/A"} people
                              </span>
                            </div>
                          </div>

                          {/* Price and Book Button */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <FaRupeeSign className="text-green-600 text-sm" />
                              <span className="text-xl font-bold text-green-600">
                                {trip.price
                                  ? Number(trip.price).toLocaleString()
                                  : "N/A"}
                              </span>
                              <span className="text-xs text-gray-500">
                                per person
                              </span>
                            </div>

                            <button
                              onClick={() => handleBookTrip(trip.id)}
                              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                                new Date(trip.date) > new Date()
                                  ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                              disabled={new Date(trip.date) <= new Date()}
                            >
                              {new Date(trip.date) > new Date()
                                ? "Book Now"
                                : "Unavailable"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* View All Trips Button */}
              {trips.length > 8 && (
                <div className="text-center mt-8">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
                    View All Trips
                  </button>
                </div>
              )}
            </section>

            {/* Services Section */}
            <div className="my-16">
              <h1 className="text-center font-semibold text-2xl mb-8">
                We Offer Best Services
              </h1>
              <div className="flex flex-wrap gap-12 justify-center">
                {[
                  "Calculated Weather",
                  "Best Flights",
                  "Local Events",
                  "Best Services",
                ].map((text, idx) => (
                  <div
                    key={idx}
                    className="h-40 w-60 bg-amber-300 rounded-lg flex items-center justify-center text-lg font-medium shadow-md hover:scale-105 transition-transform"
                  >
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps Section */}
            <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
              <div className="px-4">
                <p className="text-blue-500 text-xl font-medium mb-2">
                  Easy and Fast
                </p>
                <h1 className="text-3xl sm:text-4xl font-semibold mb-6">
                  Book Your Next Trip In 3 Easy Steps
                </h1>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Choose Destination</li>
                  <li>Make Payment</li>
                  <li>Reach Location on Selected Date</li>
                </ul>
              </div>

              <div className="w-full flex justify-center">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Trip Steps"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="mt-24 text-center">
              <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
                What People Say About Us.
              </h1>
              <p className="text-gray-600 max-w-xl mx-auto">
                Hear from our happy travelers and their amazing experiences.
              </p>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      {currentView !== "trips" && (
        <footer className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-6 mt-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Want to Become a Trip Planner?
            </h2>
            <p className="text-gray-600 mb-6">
              Join our team of travel enthusiasts and help others plan their
              dream vacations. Enter your email to get started!
            </p>

            <form
              onSubmit={handleApply}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                required
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all w-full sm:w-auto`}
              >
                {loading ? "Sending..." : "Apply Now"}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-6">
              We'll get in touch with more details after you apply.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Dashboard;
