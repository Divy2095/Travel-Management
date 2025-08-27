import React, { useState } from "react";
import axios from "axios";
import photo from "./assets/Photo.jpg";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );

      console.log("Login response:", res.data); // Debug log

      if (res.data.success && res.data.token) {
        // Save both user data and token
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        console.log("Saved token:", res.data.token); // Debug log
        console.log("Saved user:", res.data.user); // Debug log

        toast.success("Login successful!");

        if (res.data.user.login_type === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/";
        }
      } else {
        console.error("Login response missing token or success:", res.data);
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data);
      toast.error(
        err?.response?.data?.message || "Login failed. Please try again."
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
          <h2 className="text-l font-semibold">Welcome back!</h2>
          <h1 className="text-2xl font-bold mb-6">Start Traveling</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <input
              type="submit"
              value="Log In"
              onClick={handleLogin}
              className="w-full mb-4 p-2 border rounded cursor-pointer bg-amber-400 font-semibold"
            />
            <br />
            <p>
              Don't have an Account?{" "}
              <a href="/signup" className="border-b hover:text-blue-500">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
