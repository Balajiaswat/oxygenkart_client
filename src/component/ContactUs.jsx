import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import "./ContactUs.css";

function ContactUs({ contactUsRef }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is not valid";
    if (!formData.message) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://oxygenkart-backend.onrender.com/contactus/send",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          toast.success("Your message has been sent successfully!");
          setFormData({ firstName: "", lastName: "", email: "", message: "" });
          setErrors({});
        } else {
          toast.error("Something went wrong, please try again");
        }
      } catch (error) {
        toast.error("Something went wrong, please try again");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill in all fields correctly");
    }
  };

  return (
    <>
      <ToastContainer />
      <section
        ref={contactUsRef}
        id="contact-us-section"
        className="form-container"
      >
        <div className="form-container-box">
          <div className="form-text-box">
            <h1 className="form-text-box-h1" style={{ textAlign: "start" }}>
              Need support?
            </h1>
            <p className="form-text-box-p">Fill in the form to get in touch</p>
            <div className="form-img">
              <img src="/assets/fim.png" alt="formImage" />
            </div>
          </div>

          <div className="main-form">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <div className="input-content">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <span className="error">{errors.firstName}</span>
                  )}
                </div>
                <div className="input-content">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <span className="error">{errors.lastName}</span>
                  )}
                </div>
              </div>
              <div
                style={{ display: "block", width: "100%", marginTop: "20px" }}
              >
                <label className="input-content-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  className="input-content-input"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="textarea">
                <label className="textarea-label">How can we help you?</label>
                <textarea
                  className="textarea-input"
                  placeholder="Please share what you want us to help"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <span className="error">{errors.message}</span>
                )}
              </div>
              <button
                type="submit"
                className="submit"
                style={{ cursor: "pointer" }}
                disabled={loading}
              >
                {loading ? <BeatLoader color="#FFFFFF" size={10} /> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
