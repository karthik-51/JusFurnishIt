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

    {/* Footer content */}
    {/* <div className="footer-main">
      <div className="footer-col">
        <div className="footer-title">Useful Links</div>
        <ul className="footer-links">
          <li>Hire us</li>
          <li>Who we are</li>
          <li>How we work</li>
          <li>Book Luxury Interior Designer</li>
          <li>Interior Cost Calculator</li>
          <li>Contact us</li>
          <li>Refer a friend</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div className="footer-col">
        <div className="footer-title">Company Support</div>
        <ul className="footer-links">
          <li>Privacy Policy</li>
          <li>Payment Policy</li>
          <li>Refund, Return Policy & Delay Penalties</li>
          <li>Cancellation Policy</li>
          <li>Warranty Policy</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
      <div className="footer-col">
        <div className="footer-address-block">
          <div className="footer-address-title">
            <FaMapMarkerAlt className="footer-address-icon" />
            <span>Registered Address</span>
          </div>
          <div className="footer-address">
            129, Siddapura, Whitefield,
            <br />
            Bengaluru, Karnataka, India,
            <br />
            Varthur Main Road, Bengaluru,
            <br />
            Karnataka 560066
          </div>
        </div>
        <div className="footer-address-block">
          <div className="footer-address-title">
            <FaMapMarkerAlt className="footer-address-icon" />
            <span>Whitefield Design Centre</span>
          </div>
          <div className="footer-address">
            1st floor, The Gateway By UKn,
            <br />
            Nallurahalli Main Rd, Brookefield,
            <br />
            Bengaluru, Karnataka - 560066
          </div>
        </div>
        <div className="footer-address-block">
          <div className="footer-address-title">
            <FaMapMarkerAlt className="footer-address-icon" />
            <span>HSR Layout Design Centre</span>
          </div>
          <div className="footer-address">
            1460, ASENSE INTERIOR,
            <br />
            Ground Floor, C S Towers, 17th Cross Road, 4th Sector,
            <br />
            HSR Layout, Bengaluru, Karnataka 560102
          </div>
        </div>
      </div>
    </div> */}

    <div className="footer-copyright">
      Copyright © 2025 - JustFurnishIt. All rights reserved.
    </div>
  </footer>
);

export default Footer;
