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
          1. OxygenKart is not a SEBI Registered Organization; it houses
          experienced traders who provide trading signals based on market
          experience.
        </p>
        <p>2. Please trade cautiously and responsibly.</p>
        <p>
          3. OxygenKart or any of its members are not responsible for losses you
          incurred.
        </p>
        <button className="understand-button" onClick={handleClose}>
          I Understand
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
