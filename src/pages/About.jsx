import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./about.css"; // Ensure your CSS file is updated
import Navbar from "../component/Navbar";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideIn = {
  hidden: { x: -100 },
  visible: { x: 0, transition: { duration: 1 } },
};

function About() {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: missionRef, inView: missionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: offerRef, inView: offerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: whyRef, inView: whyInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component mounts
  }, []);

  return (
    <>
      <Navbar />
      <div className="about-container">
        <motion.div
          className="about-us"
          ref={aboutRef}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.h1 variants={slideIn}>About Us</motion.h1>
          <div className="about-content">
            <motion.img
              src="https://t3.ftcdn.net/jpg/03/10/46/56/360_F_310465670_Wy4QCEfxYU2ziHjbeZsNAumKhaZzZS1w.jpg"
              alt="about-us"
              variants={slideIn}
            />
            <motion.p variants={fadeIn}>
              Welcome to OxygenKart, your premier destination to learn day
              trading. Established to empower traders with reliable market
              insights, our mission is to help you make informed trading
              decisions and maximize your profits.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="our"
          ref={missionRef}
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="our-content">
            <motion.div className="missions" variants={fadeIn}>
              <motion.h1 style={{ textAlign: "start" }} variants={slideIn}>
                Our Missions
              </motion.h1>
              <motion.p variants={fadeIn}>
                At OxygenKart, we aim to simplify day trading by providing
                experts opinion to guide your trades throughout the day. Our
                goal is to enable traders, from beginners to experts, to achieve
                financial success with confidence.
              </motion.p>
              <motion.img
                src="https://www.shareindia.com/wp-content/uploads/2022/10/Trading-Psychology-%E2%80%93-Mastering-Emotions-Biases-and-Common-Traps.webp"
                alt="mission"
                className="mis-img"
                variants={slideIn}
              />
            </motion.div>
            <motion.div className="offer" variants={fadeIn}>
              <motion.img
                src="https://a.c-dn.net/c/content/dam/igcom/img/ftse100-hero-desktop-v3.jpg/jcr:content/renditions/original-size.webp"
                alt="mission"
                variants={slideIn}
              />
              <motion.h1 style={{ textAlign: "start" }} variants={slideIn}>
                What We Offer
              </motion.h1>
              <motion.p variants={fadeIn}>
                Our advanced algorithms and expert analysis ensure you stay
                ahead of the market. Comprehensive Day Trading Course: Learn the
                art of day trading with our in-depth course. Available for
                purchase and download, this course equips you with the skills
                and knowledge to become self-sufficient in day trading. Latest
                Trading News: Stay informed with up-to-date news and insights on
                market trends, upcoming events, and key factors that could
                influence your trading strategy.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="why-to-choose"
          ref={whyRef}
          initial="hidden"
          animate={whyInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.h1 variants={slideIn}>Why Choose OxygenKart?</motion.h1>
          <motion.p variants={fadeIn}>
            Expert Analysis: Our team of experienced traders and analysts
            provides you with the best market insights. Continuous Updates: With
            daily updates on market behavior and potential trading
            opportunities, you'll always be prepared for the next trading day.
          </motion.p>
        </motion.div>

        <motion.div
          className="why-to-choose"
          ref={valuesRef}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.h1 variants={slideIn}>Our Values</motion.h1>
          <motion.p variants={fadeIn}>
            Accuracy: We strive to provide the most reliable and precise expert
            opinion. Education: Empowering traders through knowledge and skill
            development is at the heart of what we do. Integrity: We operate
            with transparency and honesty, ensuring you can trust the
            information and services we provide. Customer Focus: Your success is
            our priority, and we are committed to supporting you every step of
            the way. Join the OxygenKart community and take your day trading to
            the next level. Whether you're looking to make better trading
            decisions or become a proficient trader, we have the tools and
            expertise to help you succeed.
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}

export default About;
