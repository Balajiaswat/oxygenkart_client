import React, { useEffect } from "react";
import "./Privacy.css"; // Import the CSS file
import Navbar from "./Navbar";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="terms-container">
        <h1>Privacy Policy of Oxygenkart</h1>
        <h2>Introduction</h2>
        <p>
          This Privacy Policy outlines how Oxygenkart collects, uses, and
          protects the personal data of its users. By accessing our website (
          <a href="https://www.oxygenkart.com">www.oxygenkart.com</a>) and using
          our services, you consent to the collection, storage, and processing
          of your information in accordance with this policy.
        </p>

        <h2>Data Collection</h2>
        <p>We collect personal data such as:</p>
        <ul>
          <li>
            Name, email, and mobile number when users download training
            materials.
          </li>
          <li>
            Behavioral information related to the usage of our website for
            improving user experience and services.
          </li>
          <li>
            We may also track your activity on the platform to provide better
            recommendations.
          </li>
        </ul>

        <h2>Purpose of Data Collection</h2>
        <p>The collected data is used for the following purposes:</p>
        <ul>
          <li>
            To assist users facing technical issues while accessing training
            material.
          </li>
          <li>
            For advertising and informing you about our products and services.
          </li>
          <li>
            Your data is stored on our cloud servers and will not be shared with
            third parties unless required by law.
          </li>
        </ul>

        <h2>Data Sharing</h2>
        <p>
          Oxygenkart does not share user data with third parties. However, in
          cases of legal obligations, we may share your data with law
          enforcement agencies as necessary.
        </p>

        <h2>SEBI Registration Disclaimer</h2>
        <p>
          Oxygenkart is not registered with SEBI and does not take
          responsibility for any losses incurred based on the training material
          or experts opinion provided. All trading decisions are the user's
          responsibility.
        </p>

        <h2>Refund Policy</h2>
        <p>Refunds are governed by the following conditions:</p>
        <ul>
          <li>Refunds will be processed within 4-5 business days.</li>
          <li>
            Refunds are only provided if the user is unable to access the
            purchased training material due to technical issues, such as login
            difficulties.
          </li>
          <li>
            The user must record a video demonstrating the technical issue and
            send it to support@oxygenkart.com.
          </li>
          <li>No refunds will be provided for experts opinion.</li>
        </ul>

        <h2>Security Precautions</h2>
        <p>
          We adopt reasonable security measures to protect your personal data
          from unauthorized access, alteration, or destruction. Despite our best
          efforts, data transmission over the internet can never be completely
          secure. By using Oxygenkart, you acknowledge the inherent risks
          involved in transmitting data online.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your personal data only as long as necessary to fulfill the
          purposes for which it was collected. Upon request, users can delete
          their accounts, although some information may be retained for legal or
          security reasons.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal data. If
          you wish to exercise these rights, please contact us at
          support@oxygenkart.com.
        </p>

        <h2>Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We encourage
          users to review this policy periodically to stay informed about how we
          protect their data.
        </p>

        <h2>Contact Information</h2>
        <p>
          For any questions or concerns about this Privacy Policy, you can reach
          us at:
          <br />
          <strong>Email:</strong> <b>support@oxygenkart.com</b>
        </p>
      </div>
    </>
  );
};

export default Privacy;
