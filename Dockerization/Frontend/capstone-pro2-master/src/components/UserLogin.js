import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState(""); // or fetch after login
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

   
    //  Clear designer info first
    localStorage.removeItem("designerEmail");
    localStorage.removeItem("designerName");

    //  Set user info
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", fullName || "User Name");

    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>User Login</h2>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        value={fullName}
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <button type="submit">Login as User</button>
    </form>
  );
};

export default UserLogin;
