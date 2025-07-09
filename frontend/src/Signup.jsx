import React, { useState } from "react";
import axios from "axios";
import photo from "./assets/Photo.jpg";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    login_type: "customer", // default role
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
      toast.error(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <>
      <div
        className="h-screen w-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${photo})` }}
      >
        <div className="absolute top-[40%] left-[10%] w-[40%] text-white">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-md">
            Welcome to GoTravel
          </h1>
          <p className="text-3xl max-w-[60%] drop-shadow-md">
            Start exploring world, you ever before.
          </p>
        </div>

        <div className="absolute top-[20%] right-[20%] w-[400px] bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-l font-semibold">LET'S GET YOU STARTED</h2>
          <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full mb-4 p-2 border rounded"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full mb-4 p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border rounded"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full mb-4 p-2 border rounded"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <input
              type="submit"
              value="START TRAVELLING"
              onClick={handleSubmit}
              className="w-full mb-4 p-2 border rounded cursor-pointer bg-amber-400 font-semibold"
            />
            <br />
            <p>
              Already have an Account?{" "}
              <a href="/login" className="border-b hover:text-blue-500">
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
