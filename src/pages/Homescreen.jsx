import React, { useEffect, useState, useRef } from "react";
import { RiSignalTowerLine } from "react-icons/ri";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "../component/navbar.css"; // Import CSS for transitions
import Navbar from "../component/Navbar";
import "./home.css";
import { useNavigate } from "react-router-dom";
import ContactUs from "../component/ContactUs";
import ChatBox from "./ChatBox";
import Chck from "./Chck";
import Footer from "../component/Footer";

function Homescreen() {
  const [showChatBox, setShowChatBox] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();
  const contactUsRef = useRef(null);
  const courseRef = useRef(null);
  const intradayRef = useRef(null);
  const homeRef = useRef(null);

  document.title = "OxygenKart";

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component mounts
  }, []);

  const token = localStorage.getItem("token");

  const buyCourse = async (courseId) => {
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    try {
      // 1. Fetch order details from your backend
      const response = await fetch(
        `https://oxygenkart-backend.onrender.com/courseOrder/buy/${courseId}`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { razorpay_order_id, amount, currency } = data; // Update to match your response

        // 2. Dynamically load the Razorpay Checkout script
        const loadScript = (src) => {
          return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
          });
        };

        const scriptLoaded = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!scriptLoaded) {
          toast.error("Razorpay SDK failed to load. Are you online?");
          return;
        }

        // 3. Configure Razorpay options
        const options = {
          key: "rzp_live_ZKgDtSQ2sM0im6", // Replace with your actual Razorpay test/live key
          amount: amount, // Amount is in paise
          currency: currency,
          name: "OxygenKart",
          description: "Purchase of Course",
          order_id: razorpay_order_id, // Razorpay Order ID from backend
          handler: async function (response) {
            // Handle payment success
            const { razorpay_payment_id, razorpay_signature } = response;

            // Verify payment with your backend
            const verificationResponse = await fetch(
              `https://oxygenkart-backend.onrender.com/courseOrder/courseVerifyPayment`, // Your verification endpoint
              {
                method: "POST",
                headers: {
                  Authorization: token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: razorpay_order_id,
                  razorpay_payment_id: razorpay_payment_id,
                  razorpay_signature: razorpay_signature,
                  amount: amount,
                }),
              }
            );

            if (verificationResponse.ok) {
              toast.success("Payment successful and verified!");
            } else {
              toast.error("Payment verified failed.");
            }
          },
          prefill: {
            name: localStorage.getItem("username"),
          },
          theme: {
            color: "#3399cc",
          },
        };

        // 4. Open the Razorpay payment modal
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        toast.error("Failed to purchase course.");
      }
    } catch (error) {
      toast.error("An error occurred while purchasing the course.");
      console.log(error);
    }
  };

  const fetchCourses = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      // const token = localStorage.getItem("token");

      const response = await fetch(
        "https://oxygenkart-backend.onrender.com/course/get",
        {
          // headers: {
          //   Authorization: token,
          // },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      // console.log(data);
      setCourses(data); // Assuming response format has 'courses' array
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Handle error, e.g., show toast message
    } finally {
      setLoading(false); // Always set loading to false when done (success or error)
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const tradinSignal = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setShowChatBox(true);
    }, 1000);
  };
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const toggleChatBox = async () => {
    if (!token) {
      toast.error("You are not logged in!");
      setTimeout(() => {
        navigation("/login");
      }, 3000);
      return; // Exit early if not logged in
    }

    // Step 1: Check user's payment status
    try {
      const paymentCheckResponse = await fetch(
        `https://oxygenkart-backend.onrender.com/payment/check-payment`, // Endpoint to check payment status
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const paymentCheckData = await paymentCheckResponse.json();

      if (paymentCheckResponse.ok) {
        // Step 2: If payment is true, open the chat box
        if (paymentCheckData.payment) {
          setShowChatBox((prevShowChatBox) => !prevShowChatBox);
        } else {
          // Step 3: If payment is false, proceed with Razorpay payment
          const response = await fetch(
            `https://oxygenkart-backend.onrender.com/payment/create-order`, // Your create order endpoint
            {
              method: "POST",
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ amount: 5 }), // Amount of ₹5
            }
          );

          const orderData = await response.json();

          if (response.ok) {
            // Dynamically load the Razorpay Checkout script
            const scriptLoaded = await loadScript(
              "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!scriptLoaded) {
              toast.error("Razorpay SDK failed to load. Are you online?");
              return;
            }

            // Configure Razorpay options
            const options = {
              key: "rzp_live_ZKgDtSQ2sM0im6", // Replace with your actual Razorpay test/live key
              amount: orderData.order.amount, // Amount is in paise
              currency: orderData.order.currency,
              name: "OxygenKart",
              description: "Purchase of Order",
              order_id: orderData.order.id, // Razorpay Order ID from backend
              handler: async (paymentResponse) => {
                const { razorpay_payment_id, razorpay_signature } =
                  paymentResponse;

                // Verify payment with your backend
                const verificationResponse = await fetch(
                  `http://localhost:8080/payment/verify-payment`, // Your verification endpoint
                  {
                    method: "POST",
                    headers: {
                      Authorization: token,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      razorpay_order_id: orderData.order.id,
                      razorpay_payment_id: razorpay_payment_id,
                      razorpay_signature: razorpay_signature,
                      amount: orderData.order.amount,
                    }),
                  }
                );

                if (verificationResponse.ok) {
                  toast.success("Payment successful and verified!");
                  setShowChatBox(true); // Open chat box after successful payment
                } else {
                  toast.error("Payment verification failed.");
                }
              },
              prefill: {
                name: localStorage.getItem("username"),
                // Include other user details if needed
              },
              theme: {
                color: "#3399cc",
              },
            };

            // Open the Razorpay payment modal
            const razorpay = new window.Razorpay(options);
            razorpay.open(); // Open the Razorpay payment modal
          } else {
            toast.error("Failed to create order. Please try again.");
            console.error("Error creating order:", orderData);
          }
        }
      } else {
        toast.error("Failed to check payment status.");
        console.error("Error checking payment status:", paymentCheckData);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  // Helper function to dynamically load the Razorpay Checkout script
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <>
      <Chck />
      <Navbar
        contactUsRef={contactUsRef}
        intradayRef={intradayRef}
        homeRef={homeRef}
        courseRef={courseRef}
      />
      <section ref={homeRef} id="home-section" className="banner">
        <div className="banner-cont">
          <div ref={homeRef} id="home-section" className="bannerText">
            <h1 className="text">Master Day Trading with OxygenKart</h1>
            <div className="chat-btn">
              {/* <TiMessage className="icon" /> */}
              <button className="btn" onClick={toggleChatBox}>
                Try Now
                <span> @ ₹5</span>
              </button>
            </div>
          </div>
          <div className="banner-img">
            <img src="/assets/banner.png" alt="banner" className="img" />
          </div>
        </div>
      </section>

      {/* Chat box */}
      <ChatBox
        showChatBox={showChatBox}
        setShowChatBox={setShowChatBox}
        toggleChatBox={toggleChatBox}
      />
      <ToastContainer />

      {/* intraday */}
      <section
        ref={intradayRef}
        id="intraday-section"
        className="intraday-container"
      >
        <div className="intraday-content">
          <h1 className="intraday-h1">Intraday</h1>
          <div className="intraday-grid">
            {/* First icon */}
            <div className="intraday-box" onClick={tradinSignal}>
              <RiSignalTowerLine className="intraday-icon" />
              <h4 className="intraday-h4">Accurate Trading Signals</h4>
              <p className="intraday-para">
                Get real-time Buy and Sell signals tailored to help you make
                profitable trades. Our advanced algorithms and expert analysis
                ensure you stay ahead of the market.
              </p>
            </div>
            {/* Second icon */}
            <div className="intraday-box">
              <MdOutlineSmartDisplay className="intraday-icon" />
              <h4 className="intraday-h4">Expert Market Analysis</h4>
              <p className="intraday-para">
                Stay informed with comprehensive market analysis from our team
                of experts. Gain insights into market trends and make informed
                trading decisions.
              </p>
            </div>
            {/* Third icon */}
            <div className="intraday-box" onClick={scrollToBottom}>
              <CgNotes className="intraday-icon" />
              <h4 className="intraday-h4">24/7 Support</h4>
              <p className="intraday-para">
                Our support team is available around the clock to assist you
                with any questions or issues. We're here to help you succeed in
                your trading journey.
              </p>
            </div>
          </div>
          <div className="intraday-details">
            <div>
              <p className="intraday-details-p">5+</p>
              <p className="intraday-details-scnd-p">Years</p>
            </div>
            <div>
              <p className="intraday-details-p">5k+</p>
              <p className="intraday-details-scnd-p">Daily Profit</p>
            </div>

            <div>
              <p className="intraday-details-p">10k+</p>
              <p className="intraday-details-scnd-p">Active Users</p>
            </div>
            <div>
              <p className="intraday-details-p">90%+</p>
              <p className="intraday-details-scnd-p">Accuracy</p>
            </div>
            {/* <div>
              <p className="intraday-details-p">580</p>
              <p className="intraday-details-scnd-p">Companies</p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Courses */}

      <section ref={courseRef} id="courseRef" className="course">
        <div className="course-content">
          <h1 className="course-content-h1">Day trading course</h1>
          {loading ? ( // Show loading indicator while isLoading is true
            <p style={{ width: "100%", textAlign: "center" }}>Loading...</p>
          ) : (
            <div className="course-content-box">
              {courses.length !== 0 &&
                courses.map((course) => (
                  <div className="course-content-detail" key={course._id}>
                    <div
                      id="course-content-detail-cont"
                      style={{
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* Render video if course.video exists */}
                      {course.video && (
                        <video
                          controls
                          src={course.video}
                          alt={course.title}
                          style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "450px",
                          }}
                        />
                      )}
                      {/* Render image if course.image exists */}
                      {course.image && !course.video && (
                        <img
                          src={course.image}
                          alt={course.title}
                          style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "300px",
                          }}
                        />
                      )}
                    </div>
                    <div className="course-content-detail-div">
                      <p className="course-text-content-p">
                        {`${new Date(course.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}`}
                      </p>
                      <h4 className="course-text-content-h4">{course.title}</h4>
                      <p className="course-text-content-p">
                        {course.description}
                      </p>
                      <div className="course-text-content-readmore">
                        <button
                          className="buy"
                          onClick={() => buyCourse(course._id)}
                        >
                          Buy ₹{course.price}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      <ContactUs contactUsRef={contactUsRef} />
    </>
  );
}

export default Homescreen;
