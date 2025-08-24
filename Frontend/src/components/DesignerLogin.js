import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DesignerLogin = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    //  Clear user data
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    // Set designer data
    localStorage.setItem("designerEmail", email);
    localStorage.setItem("designerName", fullName || "Designer");

    // Navigate to home or dashboard
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Designer Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <button type="submit">Login as Designer</button>
    </form>
  );
};

export default DesignerLogin;
