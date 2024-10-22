import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebook,
  FaApple,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { authWithGoogle } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component mounts
  }, []);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://oxygenkart-backend.onrender.com/user/login",
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
        // if (!responseData.user.isAdmin) {
        //   toast.error("You are not authorized to access this page");
        //   return;
        // }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.user.userId);
        localStorage.setItem("username", responseData.user.username);

        const loggedInUserId = responseData.user.userId;
        await fetch(
          `https://oxygenkart-backend.onrender.com/loggedInUser/user-login/${loggedInUserId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${responseData.token}`,
            },
          }
        );

        navigate("/"); // Adjust this based on your routing setup
      }
    } catch (error) {
      toast.error("Error: Failed to login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();

    try {
      const user = await authWithGoogle();

      // Create the form data with the user's access token
      const formData = {
        access_token: user.accessToken,
      };

      // Make the POST request to your backend
      const res = await fetch(
        "https://oxygenkart-backend.onrender.com/user/google-auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Handle the response
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token); // Assuming the token is in responseData
        localStorage.setItem("userId", data.user._id); // Assuming userId is available as '_id'
        localStorage.setItem("username", data.user.username); // Assuming username is available
        const loggedInUserId = data.user._id;
        await fetch(
          `https://oxygenkart-backend.onrender.com/loggedInUser/user-login/${loggedInUserId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${data.token}`,
            },
          }
        );

        // Optional: Redirect to the homepage or a different page
        window.location.href = "/";
      } else {
        console.log("Failed to authenticate:", data);
      }
    } catch (err) {
      console.log("Trouble logging into Google", err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container" style={{ background: "#A07CE9FF" }}>
        <div className="header">
          <img
            src="https://instalingual-app-new.s3.amazonaws.com/images/0ef3aa87-b54a-4c47-860a-dc1c4f2f7aac-Image.jpg"
            alt="logo"
            onClick={() => navigate("/")}
          />
          <div className="account">
            <span style={{ fontSize: "12px", color: "white" }}>
              Don't have an account?
            </span>
            <span onClick={() => navigate("/register")}>Signup</span>
          </div>
        </div>
        <div className="form-container">
          <div className="login-box">
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <h2>Sign In</h2>
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
                  <div className="form-options">
                    <label>
                      <input type="checkbox" className="checkbox" />
                      Remember me
                    </label>
                    <span
                      onClick={() => navigate("/forgot-password")}
                      className="forget"
                    >
                      Forgot Password?
                    </span>
                  </div>
                  <button type="submit" disabled={loading}>
                    {loading ? "Signing In" : "Sign In"}
                  </button>
                  <p>or sign in with</p>
                  <div className="social-login">
                    <button
                      className="social-button google"
                      onClick={handleGoogleAuth}
                    >
                      <FaGoogle />
                    </button>
                    <button className="social-button facebook">
                      <FaFacebook />
                    </button>
                    <button className="social-button apple">
                      <FaApple />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div
              className="login-image"
              style={{ backgroundColor: "#00BDD6FF", borderRadius: "8px" }}
            >
              <img
                src="/assets/lgi.jpg"
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

export default Login;
