// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Signup.css";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [userType, setUserType] = useState("CUSTOMER");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     const newUser = {
//       fullName,
//       email,
//       password,
//       confirmPassword,
//       role: userType,
//     };

//     try {
//       const res = await fetch("http://localhost:8081/api/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newUser),
//       });

//       if (res.ok) {
//         alert("Registration successful! Please login.");
//         setFullName("");
//         setEmail("");
//         setPassword("");
//         setConfirmPassword("");
//         navigate("/login"); // ✅ Redirect both roles to login
//       } else {
//         const errorText = await res.text();
//         alert("Failed to register user: " + errorText);
//       }
//     } catch (error) {
//       console.error("Error registering user:", error);
//       alert("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <h2 className="signup-title">Sign Up</h2>

//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//           className="signup-field"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="signup-field"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="signup-field"
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           className="signup-field"
//         />

//         <div className="signup-role-options">
//           <button
//             type="button"
//             className={`signup-role-btn ${userType === "CUSTOMER" ? "active" : ""}`}
//             onClick={() => setUserType("CUSTOMER")}
//           >
//             User
//           </button>
//           <button
//             type="button"
//             className={`signup-role-btn ${userType === "DESIGNER" ? "active" : ""}`}
//             onClick={() => setUserType("DESIGNER")}
//           >
//             Designer
//           </button>
//         </div>

//         <button type="submit" className="signup-action-btn">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("CUSTOMER");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    // Confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      fullName,
      email,
      password,
      confirmPassword,
      role: userType,
    };

    try {
      const res = await fetch("http://localhost:8081/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        alert("Registration successful! Please login.");
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      } else {
        const errorText = await res.text();
        alert("Failed to register user: " + errorText);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="signup-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signup-field"
        />

        {/* Password Field with Eye Icon */}
        <div className="signup-password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-field"
            style={{ paddingRight: 36 }}
          />
          <span
            className="signup-eye-icon"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={0}
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#888"
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Field with Eye Icon */}
        <div className="signup-password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-field"
            style={{ paddingRight: 36 }}
          />
          <span
            className="signup-eye-icon"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            tabIndex={0}
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#888"
            }}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="signup-role-options">
          <button
            type="button"
            className={`signup-role-btn ${userType === "CUSTOMER" ? "active" : ""}`}
            onClick={() => setUserType("CUSTOMER")}
          >
            User
          </button>
          <button
            type="button"
            className={`signup-role-btn ${userType === "DESIGNER" ? "active" : ""}`}
            onClick={() => setUserType("DESIGNER")}
          >
            Designer
          </button>
        </div>

        <button type="submit" className="signup-action-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
