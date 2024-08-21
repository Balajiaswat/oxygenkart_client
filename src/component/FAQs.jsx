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
      question: "How accurate are the trading signals?",
      answer:
        "Our signals are highly accurate, but market behavior can be unpredictable. Always trade with caution.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support at support@oxygenkart.com.",
    },
    // Add more FAQs as needed
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
