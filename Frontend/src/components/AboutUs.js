import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="aboutus-container">
      <div className="aboutus-content">
        <h2>About JustFurnishIt</h2>

        <h3>Interior Design, Redefined with Luxury</h3>
        <p className="description">
          JustFurnishIt is an online design booking platform where designers can
          register themselves with their design options and customers can select
          the design options of their choice.
        </p>
        <p>
          Everyone dreams of a beautifully designed home. But even after
          investing a lot, many struggle to find designers who can bring their
          vision to life. Our platform solves this — connecting customers with
          verified designers and allowing customers to choose from a wide range
          of interiors like sofas, curtains, carpets, tables, paintings, and
          more.
        </p>

        <div className="aboutus-stats">
          <div>
            <strong>2+</strong>
            <span>Years Of Legacy</span>
          </div>
          <div>
            <strong>150+</strong>
            <span>Team Members</span>
          </div>
          <div>
            <strong>500+</strong>
            <span>Finished Projects</span>
          </div>
          <div>
            <strong>50+</strong>
            <span>Cities Served</span>
          </div>
        </div>

        <div className="houzz-award">
          <span>🏆 Recognized Repeatedly as the Best</span>
        </div>
      </div>

      <div className="image-wrapper">
        <img
          src="https://images.livspace-cdn.com/w:1920/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/design-ideas-thumbnails-1628773921-7vSz1/amj-2025-1744185110-pMHWe/living-1744276479-FMn7z/193-1746175766-LmF82.jpg" // replace with actual path
          alt="Background Design"
          className="background-image animate-in"
        />
        <img
          src="https://images.unsplash.com/photo-1615874959474-d609969a20ed" // replace with actual path
          alt="Foreground Design"
         className="foreground-image animate-slide"
        />
        <img
          src="https://decoholic.org/wp-content/uploads/2020/05/decorating-walls-with-mirrors-1.jpg" // replace with actual path
          alt="Foreground Design"
          className="foreground-image-circle animate-zoom"
        />
      </div>
    </section>
  );
};

export default AboutUs;
