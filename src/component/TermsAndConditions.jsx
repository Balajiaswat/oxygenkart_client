import React, { useEffect } from "react";
import "./TermsAndConditions.css";
import Navbar from "./Navbar";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component mounts
  }, []);
  return (
    <>
      <Navbar />
      <div className="terms-container">
        <h1>Term and Conditions</h1>
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to OxygenKart. These Terms and Conditions govern your use of
            our website and services. By accessing or using our site and
            services, you agree to comply with and be bound by these terms.
          </p>
        </section>
        <section>
          <h2>2. Trading Signals</h2>
          <p>
            Our experts opinion on intraday trades will help you limit loses.
            However, market behavior can be unpredictable. Therefore, you
            acknowledge and agree that:
          </p>
          <ul>
            <li>
              Trading involves risk, and you should be aware of these risks
              before acting on our signals.
            </li>
            <li>
              OxygenKart and its employees are not responsible for any losses
              incurred due to the Buy and Sell signals provided.
            </li>
          </ul>
        </section>
        <section>
          <h2>3. Trading Course</h2>
          <p>
            Our trading course is designed to enable you to start trading from
            day one. This is applicable only if you have an active Zerodha
            trading account. Additionally:
          </p>
          <ul>
            <li>
              The course suggests that you can earn back the money spent on the
              course, but this is contingent upon market conditions aligning
              with our expectations and signals. If the market behaves contrary
              to our predictions, this may not be possible.
            </li>
          </ul>
        </section>
        <section>
          <h2>4. Customer Support</h2>
          <p>
            While OxygenKart is a customer-focused company and we strive to
            address customer queries promptly:
          </p>
          <ul>
            <li>
              There may be times when response delays occur. We appreciate your
              understanding and patience in such situations.
            </li>
          </ul>
        </section>
        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            OxygenKart and its employees are not responsible for any losses
            incurred during trading. You acknowledge and agree that:
          </p>
          <ul>
            <li>
              Trading is inherently risky, and you accept full responsibility
              for any investment decisions and outcomes resulting from our
              signals and courses.
            </li>
          </ul>
        </section>
        <section>
          <h2>6. General Provisions</h2>
          <ul>
            <li>
              Changes to Terms: OxygenKart reserves the right to modify these
              terms at any time. Any changes will be posted on this page and
              will be effective immediately upon posting.
            </li>
            <li>
              Governing Law: These Terms and Conditions are governed by the laws
              of Indian Government.
            </li>
          </ul>
        </section>
        <section>
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms and
            Conditions, please contact us at{" "}
            <a href="mailto:queries@oxygenkart.com">support@oxygenkart.com</a>.
          </p>
        </section>
      </div>
    </>
  );
};

export default TermsAndConditions;
