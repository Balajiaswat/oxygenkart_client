import React, { useState } from "react";
import "./PopupModal.css"; // Import the CSS file for styling

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(true); // Set the modal to open by default

  const handleClose = () => {
    setIsOpen(false); // Close the modal
  };

  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>
          1. OxygenKart is not a SEBI-registered entity. It offers market
          insights based on the opinions of experienced traders.
        </p>
        <p>2. We encourage you to trade with caution and responsibility.</p>
        <p>
          3. OxygenKart and its members are not liable for any financial losses
          incurred as a result of trading decisions.
        </p>
        <button className="understand-button" onClick={handleClose}>
          I Understand
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
