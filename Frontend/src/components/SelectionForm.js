// SelectionForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectionForm = () => {
  const navigate = useNavigate();
  const [designCategories, setDesignCategories] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedDesigns, setSelectedDesigns] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8083/api/customer/designs/all").then((res) => res.json()),
      fetch("http://localhost:8083/api/customer/products/all").then((res) => res.json()),
    ]).then(([designs, products]) => {
      const designCats = Array.from(new Set(designs.map((d) => d.category)));
      const productCats = Array.from(new Set(products.map((p) => p.category)));
      setDesignCategories(designCats);
      setProductCategories(productCats);
    });
  }, []);

  const handleToggle = (type, category) => {
    if (type === "design") {
      setSelectedDesigns((prev) =>
        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
      );
    } else {
      setSelectedProducts((prev) =>
        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
      );
    }
  };

  const handleNext = () => {
    if (selectedDesigns.length === 0 && selectedProducts.length === 0) {
      alert("Please select at least one category.");
      return;
    }
    navigate("/selected-gallery", {
      state: {
        selections: {
          designs: selectedDesigns,
          products: selectedProducts,
        },
      },
    });
  };

  return (
    <div>
      <h2>Select Your Interests</h2>
      <div>
        <h3>Design Categories</h3>
        {designCategories.map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={selectedDesigns.includes(cat)}
              onChange={() => handleToggle("design", cat)}
            />
            {cat}
          </label>
        ))}
      </div>
      <div>
        <h3>Product Categories</h3>
        {productCategories.map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={selectedProducts.includes(cat)}
              onChange={() => handleToggle("product", cat)}
            />
            {cat}
          </label>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SelectionForm;
