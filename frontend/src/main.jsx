import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminRegister from "./AdminRegister.jsx";
import BookingForm from "./BookingForm.jsx";
import BookingSuccess from "./BookingSuccess.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReceiptVoucher from "./components/ReceiptVoucher";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/booking/:tripId" element={<BookingForm />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/receipt/:id" element={<ReceiptVoucher />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  </StrictMode>
);
