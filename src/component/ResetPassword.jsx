import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import Navbar from "./Navbar";
import "./ForgotPassword.css";
import "./ResetPassword.css";
import BeatLoader from "react-spinners/BeatLoader";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate passwords
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // API call to change password
      const response = await fetch(
        `https://oxy-admin-backend.onrender.com/user/change-password/${id}`, // Replace with your actual endpoint
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: password, confirmPassword }),
        }
      );

      if (response.ok) {
        toast.success("Password changed successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Navbar />
      <div className="forgot-password-container">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <label
            style={{ textAlign: "center", fontSize: "12px", color: "gray" }}
          >
            Enter new password
          </label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => togglePasswordVisibility("password")}
            >
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>
          <label
            style={{ textAlign: "center", fontSize: "12px", color: "gray" }}
          >
            Re-enter password
          </label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>
          <button type="submit">
            {isLoading ? <BeatLoader color="#FFFFFF" size={10} /> : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default ResetPassword;
