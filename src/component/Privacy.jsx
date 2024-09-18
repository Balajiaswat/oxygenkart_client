import React from "react";
import "./Privacy.css"; // Import the CSS file
import Navbar from "./Navbar";

const Privacy = () => {
  return (
    <>
      <Navbar />
      <div className="terms-container">
        <h1>Privacy Policy</h1>
        <h2>1. Data Collection</h2>
        <p>
          Oxygenkart collects personal information such as your name, email, and
          mobile number when you download our training materials. This data is
          essential for assisting with technical issues and improving your
          experience.
        </p>

        <h2>2. Data Usage</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Resolve technical issues related to course downloads.</li>
          <li>Notify you of any future products or services.</li>
        </ul>
        <p>We do not share your data with third-party websites or services.</p>

        <h2>3. Data Protection</h2>
        <p>
          Your personal information is stored securely on our cloud-based
          server, and we take precautions to ensure your data remains safe.
        </p>

        <h2>4. Non-Responsibility for Losses</h2>
        <p>
          Oxygenkart is not a SEBI-registered entity. We provide educational
          content and trading signals but are not responsible for any financial
          losses incurred from following these signals or from the material
          published on our website.
        </p>

        <h2>5. Refund Policy (4-5 business days)</h2>
        <p>
          <strong>Daily Signals:</strong> No refunds are offered for the daily
          intraday trading signal service.
        </p>
        <p>
          <strong>Training Material:</strong> Refunds will only be considered in
          cases where:
        </p>
        <ul>
          <li>
            There is a technical issue preventing the access link from being
            delivered to your email.
          </li>
          <li>
            The provided contact information (email and phone number) is
            accurate and active.
          </li>
        </ul>
      </div>
    </>
  );
};

export default Privacy;
