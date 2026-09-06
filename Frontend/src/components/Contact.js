// Contact.js
import React, { useState } from "react";
import contact from "../assets/img/contact-img.svg";
import { sendContactMessage } from "../services/contactService";

const Contact = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [buttonText, setButtonText] = useState("Send");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    try {
      if (!userId) {
        alert("Error: User ID not found!");
        setButtonText("Send");
        return;
      }

      await sendContactMessage(userId, formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error sending message. Please try again.");
    } finally {
      setButtonText("Send");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-left">
          <h2>Contact Us</h2>
          <img src={contact} alt="Contact Illustration" className="contact-image" />
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your Message"
                className="form-input"
                rows="5"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-button">
                {buttonText}
              </button>
              <button
                type="reset"
                className="reset-button"
                onClick={() => setFormData({ name: "", email: "", message: "" })}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;