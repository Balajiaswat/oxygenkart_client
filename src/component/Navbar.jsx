import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import "./navbar.css"; // Import CSS for transitions

const navLinks = [
  { name: "Home", path: "/", isInternal: false },
  { name: "Intraday", ref: "intradayRef", isInternal: true },
  { name: "Courses", ref: "courseRef", isInternal: true },
  { name: "Contact Us", ref: "contactUsRef", isInternal: true },
];

function Navbar({ courseRef, contactUsRef, intradayRef, homeRef }) {
  const [messages, setMessages] = useState([]);
  const [showChatBox, setShowChatBox] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [payment, setPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `https://oxygenkart-backend.onrender.com/user/getuser`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPayment(data.payment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://oxygenkart-backend.onrender.com/message/get`
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (token && payment) {
        fetchMessages();
      }
    }, 5000); // 5000 milliseconds = 5 seconds

    if (token && payment) {
      fetchMessages();
    }

    // Clean up interval on component unmount or when token changes
    return () => clearInterval(intervalId);
  }, [token, payment]);

  useEffect(() => {
    // Check if token and username exist in localStorage
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    // If both token and username exist, user is logged in
    if (token && username) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found, you are not logged in.");
        return;
      }

      const response = await fetch(
        `https://oxygenkart-backend.onrender.com/user/logout`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setLoading(false);
        setLoggedIn(false);
        // setTimeout(() => {
        //   navigate("/login");
        // }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(`Logout failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("An error occurred while logging out.");
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const toggleChatBox = () => {
    if (!token) {
      toast.error("You are not logged in!");
    } else {
      setShowChatBox((prevShowChatBox) => !prevShowChatBox);
    }
  };

  const activatePremium = async () => {
    setPayment(true);
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getRefByName = (name) => {
    switch (name) {
      case "Home":
        return homeRef;
      case "Intraday":
        return intradayRef;
      case "Courses":
        return courseRef;
      case "Contact Us":
        return contactUsRef;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="nav">
        <div className="nav-content">
          <div>
            <img
              src="https://instalingual-app-new.s3.amazonaws.com/images/0ef3aa87-b54a-4c47-860a-dc1c4f2f7aac-Image.jpg"
              alt="logo"
              className="logo"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            <FaBars />
          </div>
          <div className={`nav-item ${menuOpen ? "open" : ""}`}>
            <div className="links-cont">
              {navLinks.map((link, index) => (
                <div key={index} className="nav-link">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? "link active-link" : "link"
                    }
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                    onClick={() => {
                      scrollToSection(getRefByName(link.name));
                      setMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="auth-buttons">
              {!loggedIn && (
                <>
                  <button
                    className="chat-button"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </button>
                  <button
                    className="auth-button"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </>
              )}
              {loggedIn && (
                <button className="auth-button" onClick={logout}>
                  {loading ? (
                    <BeatLoader color="#FFFFFF" size={10} />
                  ) : (
                    "Logout"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Chat box */}
      {showChatBox && (
        <div className="chat-box">
          <div className="chatBoxHeader">
            <h4 className="chatBoxTitle">Chat Messages</h4>
            <button className="closeBtn" onClick={toggleChatBox}>
              <IoClose className="closeIcon" />
            </button>
          </div>

          {payment ? (
            <div className="chat-box-content">
              {messages.length > 0 ? (
                <>
                  <p className="notification">
                    This new notification for testing
                  </p>
                  {messages.map((message) => {
                    const createdAt = new Date(message.created_at);
                    const formattedTime = createdAt.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });
                    const formattedDate = createdAt.toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    );

                    return (
                      <div key={message._id} className="chatMessage">
                        <span className="timestamp">
                          {formattedDate} {formattedTime}
                        </span>
                        <p className="messageText">{message.message}</p>
                      </div>
                    );
                  })}
                </>
              ) : (
                <p style={{ textAlign: "center" }}>No messages found</p>
              )}
            </div>
          ) : (
            <div className="premium">
              <p>You haven't activated the premium</p>
              <button onClick={activatePremium}>Activate</button>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Navbar;
