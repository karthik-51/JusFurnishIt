// import React, { useEffect, useState } from "react";
// import "./ScrollingShowcase.css";

// const ScrollingShowcase = () => {
//   const [designs, setDesigns] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8082/api/designs/public")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Designs:", data);
//         setDesigns(data);
//       })
//       .catch((err) => console.error("Error loading designs:", err));
  
//     fetch("http://localhost:8082/api/designer/products")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Products:", data);
//         setProducts(data);
//       })
//       .catch((err) => console.error("Error loading products:", err));
//   }, []);
  
//   const renderImages = (items) => {
//     if (!Array.isArray(items) || items.length === 0) return null;
  
//     return [...items, ...items].map((item, index) => (
//       <div className="scroll-item" key={index}>
//         {item.image ? (
//           <img
//             src={`data:image/jpeg;base64,${item.image}`}
//             alt="Showcase"
//             style={{ height: "200px", objectFit: "cover", borderRadius: "8px" }}
//           />
//         ) : (
//           <p>No Image</p>
//         )}
//       </div>
//     ));
//   };
  

//   return (
//     <div>
//       <h2 style={{ textAlign: "center" }}>Designs Showcase</h2>
//       <div className="scroll-container">{renderImages(designs)}</div>

//       <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Products Showcase</h2>
//       <div className="scroll-container">{renderImages(products)}</div>
//     </div>
//   );
// };

// export default ScrollingShowcase;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ScrollingShowcase.css";

const ScrollingShowcase = () => {
  const [designs, setDesigns] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8082/api/designs/public")
      .then((res) => res.json())
      .then((data) => setDesigns(data))
      .catch((err) => console.error("Error loading designs:", err));

    fetch("http://localhost:8082/api/designer/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const renderImages = (items) => {
    if (!Array.isArray(items) || items.length === 0) return null;
    // Duplicate items for infinite effect
    return [...items, ...items].map((item, index) => (
      <div className="scroll-item" key={index}>
        {item.image ? (
          <>
            <img
              src={`data:image/jpeg;base64,${item.image}`}
              alt="Showcase"
              className="showcase-img"
            />
            <div className="showcase-category">{item.category}</div>
          </>
        ) : (
          <p>No Image</p>
        )}
      </div>
    ));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Designs Showcase</h2>
      <div className="scroll-wrapper">
        <div className="scroll-container">{renderImages(designs)}</div>
      </div>
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <button className="see-more-btn" onClick={() => navigate("/design-gallery")}>
          See More Designs
        </button>
      </div>

      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Products Showcase</h2>
      <div className="scroll-wrapper">
        <div className="scroll-container">{renderImages(products)}</div>
      </div>
      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <button className="see-more-btn" onClick={() => navigate("/product-gallery")}>
          See More Products
        </button>
      </div>
    </div>
  );
};

export default ScrollingShowcase;
