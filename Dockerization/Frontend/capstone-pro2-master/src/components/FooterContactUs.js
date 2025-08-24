import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./FooterContact.css";

const FooterContact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    purpose: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8085/api/contact/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        purpose: "",
        message: ""
      });
    } else {
      alert("Failed to send message.");
    }
  };

  return (
    <div className="footer-contact-hero">
      <div className="footer-contact-overlay">
        <div className="footer-contact-container">
          {/* Left: Contact Info */}
          <div className="footer-contact-info">
            <h2>Contact Us</h2>
            <p className="footer-contact-desc">
              We’d love to hear from you! Whether you’re planning a dream space
              or need expert design advice, our team is here to help. Feel free
              to reach out with your questions, ideas, or feedback. We’re just a
              message away—let’s create something beautiful together. Contact us
              today and transform your vision into reality!
            </p>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div>
                <div className="footer-contact-label">Address</div>
                <div className="footer-contact-value">
                  JustFurnishIt, RMZ Ecoworld
                  <br />
                 Bangalore – 560066, India.
                </div>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <FaPhoneAlt />
              </div>
              <div>
                <div className="footer-contact-label">Phone</div>
                <div className="footer-contact-value">561-456-2321</div>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <FaEnvelope />
              </div>
              <div>
                <div className="footer-contact-label">Email</div>
                <div className="footer-contact-value">
                  justfurnishit@email.com
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="footer-contact-form-box">
            <h3>Send Message</h3>
            <form className="footer-contact-form" onSubmit={handleSubmit}>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                required
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                required
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Phone Number (Optional)"
              />
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              >
                <option value="">Purpose of Contact</option>
                <option value="service">Interior Design Service</option>
                <option value="pricing">Pricing/Package Inquiry</option>
                <option value="technical">Technical Issue</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your Message..."
                rows="4"
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
