import React from "react";
import { TiMessage } from "react-icons/ti";
import "./footer.css"; // Import the CSS file
import { NavLink, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo-container">
            <img
              src="https://instalingual-app-new.s3.amazonaws.com/images/0ef3aa87-b54a-4c47-860a-dc1c4f2f7aac-Image.jpg"
              alt="logo"
              className="footer-logo"
            />
            <div className="footer-contact">
              <p>3rd cross, Ramurthynagar Bangalore -560016</p>
              <p>support@oxygenkart.com</p>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-link-group">
              <div className="footer-link-column">
                <NavLink className="footer-link" to="/aboutus">
                  About Us
                </NavLink>
                <NavLink className="footer-link" to="/termandcondition">
                  Terms
                </NavLink>
                <NavLink className="footer-link" to="/termandcondition">
                  Terms
                </NavLink>
                <NavLink className="footer-link" to="/privacy">
                  Privacy
                </NavLink>
                <a className="footer-link">
                  @ 2024 Oxygenkart.com All rights reserved.
                </a>
              </div>
            </div>
            {/* <div className="footer-chat">
              <TiMessage className="footer-chat-icon" />
              <button className="footer-chat-btn">Chat now</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
