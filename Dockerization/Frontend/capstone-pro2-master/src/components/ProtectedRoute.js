// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const userRole = localStorage.getItem("userRole");
//   const userId = localStorage.getItem("userId");

//   if (!userRole || !userId) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


// src/components/ProtectedRoute.js
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const userEmail = localStorage.getItem("userEmail");
//   const location = useLocation();

//   if (!userEmail) {
//     // Redirect to login, pass current location for redirect after login
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate, useLocation } from "react-router-dom";
 
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
 
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
 
  return children;
};
 
export default ProtectedRoute;
 