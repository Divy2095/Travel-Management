import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import photo from "./assets/Photo.jpg"; // Background image

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    login_type: "admin", // hardcoded
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${photo})` }}
    >
      <div className="bg-white bg-opacity-95 shadow-2xl p-10 rounded-2xl w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-amber-500">
          🧳 Trip Planner Registration
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded transition duration-300"
          >
            Register as Admin
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-amber-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
