import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountMenuEl, setAccountMenuEl] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const fullName = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");
    if (email && role) {
      setDisplayName(fullName || email);
      setUserType(role.toLowerCase());
    } else {
      setDisplayName("");
      setUserType("");
    }
  }, [location]);

  const handleServicesClick = (event) => setAnchorEl(event.currentTarget);
  const handleServicesClose = () => setAnchorEl(null);

  const handleAccountClick = (event) => setAccountMenuEl(event.currentTarget);
  const handleAccountClose = () => setAccountMenuEl(null);

  const handleLogout = () => {
    localStorage.clear();
    setDisplayName("");
    setUserType("");
    navigate("/login");
  };

  // Highlight style for the selected button
  const isActive = (path) => location.pathname === path;

  const navButtonSx = (active) => ({
    whiteSpace: "nowrap",
    fontWeight: 900,
    fontSize: "0.9rem",
    letterSpacing: "0.5px",
    textTransform: "none",
    opacity: active ? 1 : 0.85,
    backgroundColor: active ? "rgba(255,255,255,0.15)" : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.12)",
      opacity: 1,
    },
    borderRadius: 1,
    transition: "background 0.2s, opacity 0.2s",
  });

  // For dropdown, check if current path is under any of the dropdown links
  const isServicesActive = ["/design-gallery", "/product-gallery"].includes(location.pathname);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1f2937", color: "white" }} elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          minHeight: "60px !important",
          height: "48px",
          marginBottom:-0.5
        }}
      >
        {/* Left: Logo */}
        <Typography variant="h6" component={Link} to="/" sx={{ color: "white", textDecoration: "none" }}>
          JustFurnishIt
        </Typography>

        {/* Right: Navigation */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={navButtonSx(isActive("/"))}
            >
              Home
            </Button>

            <Button
              color="inherit"
              onClick={handleServicesClick}
              endIcon={<ArrowDropDownIcon />}
              sx={navButtonSx(isServicesActive)}
            >
              Services
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleServicesClose}
              PaperProps={{ sx: { backgroundColor: "#1f2937", color: "white" } }}
            >
              <MenuItem
                selected={isActive("/design-gallery")}
                onClick={() => { handleServicesClose(); navigate("/design-gallery"); }}
                sx={isActive("/design-gallery") ? { backgroundColor: "rgba(255,255,255,0.10)" } : {}}
              >
                Designs
              </MenuItem>
              <MenuItem
                selected={isActive("/product-gallery")}
                onClick={() => { handleServicesClose(); navigate("/product-gallery"); }}
                sx={isActive("/product-gallery") ? { backgroundColor: "rgba(255,255,255,0.10)" } : {}}
              >
                Products
              </MenuItem>
            </Menu>
          </Box>
          <Button
            color="inherit"
            component={Link}
            to="/contact"
            sx={navButtonSx(isActive("/contact"))}
          >
            Contact Us
          </Button>

          {userType === "designer" && (
            <Button
              color="inherit"
              component={Link}
              to="/designer-dashboard"
              sx={navButtonSx(isActive("/designer-dashboard"))}
            >
              Dashboard
            </Button>
          )}

          {!displayName && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/signup"
                sx={navButtonSx(isActive("/signup"))}
              >
                Signup
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={navButtonSx(isActive("/login"))}
              >
                Login
              </Button>
            </>
          )}

          {displayName && (
            <>
              <IconButton
                onClick={handleAccountClick}
                sx={{
                  padding: 0,
                  minWidth: 0,
                  width: 32,
                  height: 32,
                  ml: 1,
                  background: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: "0.8rem",
                    border: "2px solid #1f2937",
                    color: "#1f2937",
                    bgcolor: "#fff",
                  }}
                >
                  {displayName[0]?.toUpperCase() || (
                    <AccountCircleIcon fontSize="small" />
                  )}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={accountMenuEl}
                open={Boolean(accountMenuEl)}
                onClose={handleAccountClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    mt: 0.5,
                    p: 0.5,
                    minWidth: 130,
                    maxWidth: 180,
                    borderRadius: 1.5,
                    boxShadow: 1,
                  },
                }}
              >
                <Typography fontWeight="bold" fontSize="0.8rem" sx={{ px: 1, color: "#333" }}>
                  {displayName}
                </Typography>
                <Typography
                  fontSize="0.7rem"
                  sx={{
                    color: userType === "designer" ? "#1976d2" : "#388e3c",
                    px: 1,
                    mt: 0.3,
                    mb: 0.5,
                  }}
                >
                  {userType === "designer" ? "Designer" : "User"}
                </Typography>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "#f44336",
                    px: 1,
                    py: 0.5,
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
