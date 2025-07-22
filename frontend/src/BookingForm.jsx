import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaRupeeSign,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaIdCard,
} from "react-icons/fa";

const BookingForm = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    participants: 1,
    specialRequests: "",
    agreeToTerms: false,
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData((prev) => ({
        ...prev,
        fullName: parsedUser.name || "",
        email: parsedUser.email || "",
      }));
    }

    // Fetch trip details
    fetchTripDetails();
  }, [tripId]);

  const fetchTripDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/trips/${tripId}`);
      const result = await response.json();

      if (result.success) {
        setTrip(result.data);
      } else {
        toast.error("Trip not found");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Failed to load trip details");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (formData.participants > trip.max_participants) {
      toast.error(`Maximum ${trip.max_participants} participants allowed`);
      return;
    }

    setSubmitting(true);

    try {
      const bookingData = {
        tripId: trip.id,
        userId: user?.id,
        ...formData,
        totalAmount: trip.price * formData.participants,
      };

      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Booking submitted successfully!");
        navigate("/", { state: { bookingSuccess: true } });
      } else {
        toast.error(result.message || "Failed to submit booking");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const calculateTotal = () => {
    return trip ? trip.price * formData.participants : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Trip Not Found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft />
              <span>Back to Trips</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Book Your Trip
            </h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                <img
                  src={trip.image || "/src/assets/Goa.jpeg"}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/src/assets/Goa.jpeg";
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {trip.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-blue-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(trip.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span className="text-sm text-gray-600">
                      {trip.location_name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaUsers className="text-green-500" />
                    <span className="text-sm text-gray-600">
                      Max {trip.max_participants} people
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Price per person</span>
                    <div className="flex items-center gap-1">
                      <FaRupeeSign className="text-green-600 text-sm" />
                      <span className="font-semibold">
                        {trip.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Participants</span>
                    <span className="font-semibold">
                      {formData.participants}
                    </span>
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">
                        Total
                      </span>
                      <div className="flex items-center gap-1">
                        <FaRupeeSign className="text-green-600" />
                        <span className="text-xl font-bold text-green-600">
                          {calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Booking Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaPhone className="inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUsers className="inline mr-2" />
                      Number of Participants *
                    </label>
                    <select
                      name="participants"
                      value={formData.participants}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {[...Array(trip.max_participants)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaIdCard className="inline mr-2" />
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="inline mr-2" />
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests or Comments
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special dietary requirements, accessibility needs, or other requests..."
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      terms and conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      cancellation policy
                    </a>
                    . I understand that this booking is subject to availability
                    and confirmation.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="border-t pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                      submitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </div>
                    ) : (
                      `Confirm Booking - ₹${calculateTotal().toLocaleString()}`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
