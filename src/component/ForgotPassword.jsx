import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import "./ForgotPassword.css";
import BeatLoader from "react-spinners/BeatLoader";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false); // State for loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch(
        `https://oxygenkart-backend.onrender.com/user/getuserbyemail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        const { _id } = userData;

        // Navigate to reset password page with _id as a route parameter
        navigate(`/reset/${_id}`);
      } else {
        // Email not found or other error
        toast.error("Email not found. Please enter a valid email.");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      toast.error("Failed to submit email. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Navbar />
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label
            style={{ textAlign: "center", fontSize: "12px", color: "gray" }}
          >
            Enter your registered email address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            {isLoading ? <BeatLoader color="#FFFFFF" size={10} /> : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default ForgotPassword;
