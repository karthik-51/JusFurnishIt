import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import DesignsTab from "./DesignsTab";
import ProductsTab from "./ProductsTab";
import DesignerProfile from "./DesignerProfile";
import MyClientBooking from "./MyClientBooking";

const buttonLabels = [
  "My Profile",
  "My Designs",
  "My Products",
  "My Client Booking"
];

const tabColors = {
  main: "#1f2937",
  secondary: "#4c5666",
  bg: "rgba(255,255,255,0.96)",
  shadow: "0 6px 32px #1f293733"
};

const DesignerDashboard = ({ userId }) => {
  const [activeTab, setActiveTab] = useState(0);

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return <DesignerProfile userId={userId} />;
      case 1:
        return <DesignsTab userId={userId} />;
      case 2:
        return <ProductsTab userId={userId} />;
      case 3:
        return <MyClientBooking userId={userId} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100vh",
        background: `url("https://wallpaperaccess.com/full/2594920.jpg") no-repeat center center fixed`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tab Bar - full width */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          background: "#f6f7fa",
          borderRadius: 0,
          boxShadow: "0 2px 10px #1f293722",
          p: 2,
          width: "100%",
        }}
      >
        {buttonLabels.map((label, idx) => (
          <Button
            key={label}
            onClick={() => setActiveTab(idx)}
            variant={activeTab === idx ? "contained" : "outlined"}
            sx={{
              width:220,
              minWidth: 100,
              fontWeight: 700,
              fontSize: "1.05em",
              borderRadius: "10px",
              background: activeTab === idx
                ? `linear-gradient(90deg, ${tabColors.secondary} 0%, ${tabColors.main} 100%)`
                : "#f6f7fa",
              color: activeTab === idx ? "#fff" : tabColors.main,
              border: activeTab === idx ? "none" : `1.5px solid ${tabColors.main}`,
              boxShadow: activeTab === idx ? "0 2px 10px #1f293733" : "none",
              transition: "all 0.2s",
              "&:hover": {
                background: activeTab === idx
                  ? `linear-gradient(90deg, ${tabColors.main} 0%, ${tabColors.secondary} 100%)`
                  : "#e2e6ee",
                color: activeTab === idx ? "#fff" : tabColors.secondary,
              }
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      {/* Content Area - full width and height */}
      <Box
        sx={{
          flex: 1,
          width: "100vw",
          height: "100%",
          background: tabColors.bg,
          borderRadius: 0,
          boxShadow: "none",
          p: { xs: 2, md: 4 },
          overflowY: "auto",
          animation: "fadeIn 0.6s",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(30px)" },
            to: { opacity: 1, transform: "translateY(0)" }
          }
        }}
      >
        {renderTab()}
      </Box>
    </Box>
  );
};

export default DesignerDashboard;
