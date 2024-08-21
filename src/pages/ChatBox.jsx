import React, { useEffect, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
// import addNotification from "react-push-notification";
import "./home.css";
import { notifyUser } from "./Chck";
import messageSound from "../assest/sound.wav";

function ChatBox({ showChatBox, setShowChatBox, toggleChatBox }) {
  const [messages, setMessages] = useState([]);
  const [payment, setPayment] = useState(true);
  const [notification, setNotification] = useState({});
  const [chatLocked, setChatLocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const navigation = useNavigate();
  const token = localStorage.getItem("token");
  const latestMessageTime = useRef(null);
  const latestNotificationTime = useRef(null);
  const messageAudioRef = useRef(new Audio(messageSound));

  const calculateTimeRemaining = () => {
    const now = new Date();
    const nextStartTime = new Date();
    nextStartTime.setHours(8, 30, 0, 0); // 8:30 AM

    if (now >= nextStartTime) {
      nextStartTime.setDate(nextStartTime.getDate() + 1); // Move to next day if current time is past 8:30 AM
    }

    const timeDiff = nextStartTime - now;
    setTimeRemaining(timeDiff);
  };

  const isWithinChatTime = () => {
    const now = new Date();
    const startTime = new Date();
    startTime.setHours(8, 30, 0, 0); // 8:30 AM
    const endTime = new Date();
    endTime.setHours(16, 30, 0, 0); // 4:30 PM

    return now >= startTime && now <= endTime;
  };

  useEffect(() => {
    // Fetch messages or perform any initialization logic based on showChatBox
    if (showChatBox) {
      // Example: Fetch messages when chat box is shown
      fetchMessages();
    }
  }, [showChatBox]);

  const fetchMessages = async () => {
    if (!isWithinChatTime()) {
      setChatLocked(true);
      calculateTimeRemaining();
      return;
    }

    try {
      const response = await fetch(
        `https://oxygenkart-backend.onrender.com/message/getwithtime`
      );

      if (response.ok) {
        const data = await response.json();
        if (latestMessageTime.current) {
          const newMessages = data.filter(
            (message) =>
              new Date(message.created_at) > latestMessageTime.current
          );

          if (newMessages.length > 0 && showChatBox) {
            messageAudioRef.current.play();
          } else if (
            newMessages.length > 0 &&
            (!showChatBox || document.hidden)
          ) {
            notifyUser("New Message Received");
          }
        }
        if (data.length > 0) {
          latestMessageTime.current = new Date(
            data[data.length - 1].created_at
          );
        }

        setMessages(data);
        setChatLocked(false);
      } else {
        const data = await response.json();
        if (data.msg) {
          if (response.status === 403) {
            setChatLocked(true);
            calculateTimeRemaining();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotification = async () => {
    try {
      const response = await fetch(
        `https://oxygenkart-backend.onrender.com/notification/getlatest`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (latestNotificationTime.current) {
          const newNotificationTime = new Date(data.notification.date);
          if (
            newNotificationTime > latestNotificationTime.current &&
            (!showChatBox || document.hidden)
          ) {
            notifyUser("New notification received");
          } else if (
            newNotificationTime > latestNotificationTime.current &&
            showChatBox
          ) {
            messageAudioRef.current.play();
          }
          latestNotificationTime.current = newNotificationTime;
        } else if (data.notification.date) {
          messageAudioRef.current.play();
          latestNotificationTime.current = new Date(data.notification.date);
        }
        setNotification(data.notification);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `https://oxygenkart-backend.onrender.com/user/getuser`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // setPayment(data.payment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }

    const intervalId = setInterval(() => {
      if (token && payment) {
        fetchNotification();
        fetchMessages();
      }
    }, 5000); // Fetch every 5 seconds

    if (token && payment) {
      fetchNotification();
      fetchMessages();
    }

    return () => clearInterval(intervalId); // Clean up interval
  }, [token, payment, showChatBox]);

  useEffect(() => {
    if (chatLocked) {
      const countdownInterval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(countdownInterval);
            fetchMessages(); // Attempt to fetch messages again
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000); // Update every second

      return () => clearInterval(countdownInterval);
    }
  }, [chatLocked]);

  const formatTimeRemaining = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const activatePremium = () => {
    setPayment(true);
  };

  return (
    <>
      {showChatBox && (
        <div className="chat-box">
          <div>
            <div className="chatBoxHeader">
              <h4 className="chatBoxTitle">Chat Messages</h4>

              <button className="closeBtn" onClick={toggleChatBox}>
                <IoClose className="closeIcon" />
              </button>
            </div>
            {chatLocked ? null : (
              <p className="notification">
                {notification.message && notification.message.trim() !== ""
                  ? notification.message
                  : "No Notification"}
              </p>
            )}
          </div>

          {payment ? (
            chatLocked ? (
              <div
                className="chat-box-locked"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  height: "120px",
                }}
              >
                <FaLock color="black" size={16} /> {/* Display lock icon */}
                <p style={{ fontSize: "12px" }}>Chat is disabled for now</p>
                {timeRemaining !== null && (
                  <p style={{ fontSize: "12px" }}>
                    Reopens in: {formatTimeRemaining(timeRemaining)}
                  </p>
                )}
              </div>
            ) : (
              <div className="chat-box-content">
                {messages.length > 0 ? (
                  <>
                    {messages.map((message) => {
                      const createdAt = new Date(message.created_at);
                      const formattedTime = createdAt.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      });
                      const formattedDate = createdAt.toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      );

                      return (
                        <div key={message._id} className="chatMessage">
                          <span className="timestamp">
                            {formattedDate} {formattedTime}
                          </span>
                          <p className="messageText">{message.message}</p>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p style={{ textAlign: "center" }}>No messages found</p>
                )}
              </div>
            )
          ) : (
            <div className="premium">
              <p>You haven't activated the premium</p>
              <button onClick={activatePremium}>Activate</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ChatBox;
