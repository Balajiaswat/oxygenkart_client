import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./FAQs.css";
import Navbar from "./Navbar";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component mounts
  }, []);

  const styles = useSpring({
    height: isOpen ? "auto" : 0,
    opacity: isOpen ? 1 : 0,
    overflow: "hidden",
  });

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
      </div>
      <animated.div style={styles} className="faq-answer">
        {answer}
      </animated.div>
    </div>
  );
};

const FAQs = () => {
  const faqData = [
    {
      question: "What is OxygenKart?",
      answer:
        "OxygenKart is a platform that provides trading signals and courses to help you start day trading.",
    },
    {
      question: "What data does OxygenKart collect?",
      answer:
        "We collect your name, email, and mobile number only if you choose to download our training material. This helps us assist you in case of any technical issues.",
    },
    {
      question: "How do you use my personal data?",
      answer:
        "Your data is stored securely on our cloud-based server and is never shared with third parties. We may use your contact details to notify you about new products or services in the future.",
    },
    {
      question: "Is OxygenKart SEBI registered?",
      answer:
        "No, OxygenKart is not a SEBI registered company. We are a team of experienced traders sharing our trading knowledge with the people of India.",
    },
    {
      question: "Do you guarantee profits from trading signals?",
      answer:
        "No. Even experienced day traders can incur losses. OxygenKart and its members are not responsible for any losses based on buy/sell signals provided.",
    },
    {
      question: "Is there a refund policy for daily signals?",
      answer:
        "No, we do not offer refunds for the daily intraday trading signal service.",
    },
    {
      question: "Can I get a refund for training material?",
      answer:
        "A refund for training material is only applicable if there is a technical glitch in delivering the access link to your email, and only if your provided contact details are accurate and active.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="faqs-container">
        <h1>Frequently Asked Questions</h1>
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </>
  );
};

export default FAQs;
