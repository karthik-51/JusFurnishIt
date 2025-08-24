import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => (
  <footer className="footer-root">
    {/* Blurred background image */}
    <div className="footer-bg-blur">
      <div className="footer-bg-overlay" />
    </div>

    {/* Social icons row */}
    <div className="footer-social-row">
      <a href="#" aria-label="Facebook">
        <FaFacebookF />
      </a>
      <a href="#" aria-label="Instagram">
        <FaInstagram />
      </a>
      <a href="#" aria-label="Twitter">
        <FaTwitter />
      </a>
      <a href="#" aria-label="YouTube">
        <FaYoutube />
      </a>
      <a href="#" aria-label="LinkedIn">
        <FaLinkedin />
      </a>
    </div>

   

    <div className="footer-copyright">
      Copyright © 2025 - JustFurnishIt. All rights reserved.
    </div>
  </footer>
);

export default Footer;
