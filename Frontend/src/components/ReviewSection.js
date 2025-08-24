import React, { useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";
import "./ReviewSection.css";

const reviews = [
  {
    name: "Anjali Sharma",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Just Furnish It made my dream home a reality! The team listened to my ideas and created a space that feels uniquely mine. Every detail was perfect and the process was smooth from start to finish.",
    designer: "Manjay Gupta",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    review:
      "From the first consultation to the final reveal, Just Furnish It exceeded my expectations. My home is now modern, functional, and beautiful. The designer was attentive and creative.",
    designer: "Aarti Deshmukh",
    rating: 5,
  },
  {
    name: "Priya Iyer",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    review:
      "I never imagined my house could look this good! The design team at Just Furnish It brought my vision to life and made the entire journey enjoyable. Highly recommended.",
    designer: "Rajeev Menon",
    rating: 5,
  },
  {
    name: "Mohammed Faiz",
    role: "Photographer",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    review:
      "A seamless experience from start to finish. The designer understood my style and delivered a stunning home makeover. I love spending time in my new space!",
    designer: "Neha Gupta",
    rating: 4,
  },
  {
    name: "Sneha Reddy",
    role: "Doctor",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    review:
      "Working with Just Furnish It was the best decision! My family and I are thrilled with our new home. The designer was professional and truly talented.",
    designer: "Raghav Kumar",
    rating: 5,
  },
];

const ReviewSection = () => {
  const [active, setActive] = useState(1); // center card

  // Helper to get the correct index with wrap-around
  const getIdx = (offset) =>
    (active + offset + reviews.length) % reviews.length;

  return (
    <div className="review-carousel">
      <h2 className="carousel-title">A Word From Our Customers</h2>
      <div className="carousel-controls">
        <button
          className="carousel-arrow-review"
          onClick={() => setActive(getIdx(-1))}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-arrow-review"
          onClick={() => setActive(getIdx(1))}
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="carousel-cards">
        {[getIdx(-1), getIdx(0), getIdx(1)].map((idx, i) => {
          const r = reviews[idx];
          return (
            <div
              key={idx}
              className={`carousel-card ${i === 1 ? "center" : "side"}`}
            >
              <img src={r.image} alt={r.name} className="card-img" />
              <div className="card-name">{r.name}</div>
              <div className="card-role">{r.role}</div>
              <div className="card-review">
                <FaQuoteLeft className="quote-icon" />
                <blockquote>{r.review}</blockquote>
              </div>
              <div className="card-design">
                <span>
                  <strong>Designed by:</strong> {r.designer}
                </span>
              </div>
              <div className="card-stars">
                {[...Array(5)].map((_, j) => (
                  <FaStar
                    key={j}
                    color={j < r.rating ? "#ffc107" : "#ddd"}
                    size={18}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSection;
