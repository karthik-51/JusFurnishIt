import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FooterContact from "./components/FooterContactUs";
import DesignerProfile from "./components/DesignerProfile";
import BookingPage from "./components/BookingPage";
import DesignerDashboard from "./components/DesignerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import DesignGallery from "./components/DesignGallery";
import ProductGallery from "./components/ProductGallery";
import ViewProfile from "./components/ViewProfile";
import MyClientBooking from "./components/MyClientBooking";
import ContactRequestPage from "./components/ContactRequestPage";
import ClientProductHistory from "./components/ClientProductHistory";
import ClientDesignHistory from "./components/ClientDesignHistory";

import "./App.css";

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<FooterContact />} />
        <Route path="/designer/:name" element={<DesignerProfile />} />
        <Route path="/design-gallery" element={<DesignGallery />} />
        <Route path="/product-gallery" element={<ProductGallery />} />
     

        {/* Protected Routes */}
        <Route
          path="/designer-dashboard"
          element={
            <ProtectedRoute>
              <DesignerDashboard userId={userId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:productId"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact-designer/:designId"
          element={
            <ProtectedRoute>
              <ContactRequestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myclientbooking/:designerId"
          element={
            <ProtectedRoute>
              <MyClientBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client-product-history"
          element={
            <ProtectedRoute>
              <ClientProductHistory userId={userId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client-design-history"
          element={
            <ProtectedRoute>
              <ClientDesignHistory userId={userId} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/designer-profile/:designerId"
          element={
            <ProtectedRoute>
              <ViewProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
