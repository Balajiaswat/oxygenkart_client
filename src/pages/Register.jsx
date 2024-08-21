import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebook,
  FaApple,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./login.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component mounts
  }, []);

  const handleRegister = async (values) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://oxy-admin-backend.onrender.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.status === 403) {
        toast.error("Invalid Credentials: Email or password is incorrect");
        return;
      }

      if (response.status === 200) {
        const responseData = await response.json();
        toast.success("Registration successful!");
        navigate("/login"); // Navigate to home page on success
      }
    } catch (error) {
      toast.error("Error: Failed to register. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ email, password, username });
  };

  return (
    <>
      <ToastContainer />
      <div className="container" style={{ background: "#fff" }}>
        <div className="header">
          <img
            src="https://instalingual-app-new.s3.amazonaws.com/images/0ef3aa87-b54a-4c47-860a-dc1c4f2f7aac-Image.jpg"
            alt="logo"
            onClick={() => navigate("/")}
          />
          <div className="account">
            <span style={{ fontSize: "12px", color: "black" }}>
              Already have an account?
            </span>
            <span style={{ color: "black" }} onClick={() => navigate("/login")}>
              Signin
            </span>
          </div>
        </div>
        <div className="form-container">
          <div className="login-box">
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <h2>Sign Up</h2>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div
                    className="password-input"
                    style={{ width: "100%", position: "relative" }}
                  >
                    <input
                      style={{ width: "100%" }}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="eye-icon" />
                      ) : (
                        <FaEye className="eye-icon" />
                      )}
                    </span>
                  </div>
                  <button type="submit" disabled={loading}>
                    {loading ? "Signing Up" : "Sign Up"}
                  </button>
                  {/* <p>or sign up with</p> */}
                  {/* <div className="social-login">
                    <button className="social-button google">
                      <FaGoogle />
                    </button>
                    <button className="social-button facebook">
                      <FaFacebook />
                    </button>
                    <button className="social-button apple">
                      <FaApple />
                    </button>
                  </div> */}
                </div>
              </form>
            </div>
            <div
              className="login-image"
              style={{ backgroundColor: "#A07CE9FF" }}
            >
              <img
                src="/assets/rgi.jpg"
                alt="login"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
