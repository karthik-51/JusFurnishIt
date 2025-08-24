import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  CardMedia,
  Stack,
  Avatar,
  Divider,
  Chip,
  Fade
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MessageIcon from "@mui/icons-material/Message";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Breadcrumb from "./Breadcrumb";

const fallbackImage =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";

const CARD_HEIGHT = 230; // Increased height

const ClientDesignHistory = () => {
  const [designHistory, setDesignHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesignHistory = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User not logged in");

        const res = await fetch(
          `http://localhost:8085/api/client-design-history/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch design history");

        const data = await res.json();
        setDesignHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchDesignHistory();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        background: "linear-gradient(135deg, #f3f6fa 60%, #e8f5e9 100%)",
        minHeight: "100vh"
      }}
    >
      <Breadcrumb />
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 900,
          color: "#1f2937",
          letterSpacing: 1,
          textAlign: "center",
          textShadow: "0 2px 12px #d1fae5",
          fontSize: 22 // smaller title
        }}
      >
        <AssignmentTurnedInIcon sx={{ mr: 1, color: "#10b981", fontSize: 32 }} />
        My Interior Design Bookings
      </Typography>

      {designHistory.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "#607d8b",
            fontWeight: 500,
            mt: 6,
            fontSize: 14
          }}
        >
          No design booking history found.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          {designHistory.map((item, idx) => (
            <Fade in timeout={700} key={item.bookingId}>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: "0 8px 32px #1f293733",
                  background: "rgba(255,255,255,0.85) backdrop-filter: blur(3px)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 16px 48px #10b98133"
                  },
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: idx % 2 === 1 ? "row-reverse" : "row",
                  alignItems: "stretch",
                  width: 800,
                  height: 190,
                  minWidth: 320
          
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 300,
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: idx % 2 === 1 ? '0 5px 5px 0' : '5px 0 0 5px',
                    background: "#f0f0f0",
                    flexShrink: 0
                  }}
                  image={item.image || fallbackImage}
                  alt={item.designName}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
                <CardContent sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 1 }}
                  >
                    <Chip
                      icon={<AssignmentTurnedInIcon />}
                      label={`Booking #${item.bookingId}`}
                      color="success"
                      sx={{ fontWeight: 700, fontSize: 13, px: 1.5 }}
                    />
                  </Stack>
                  <Divider sx={{ mb: 1 }} />

                  <Box sx={{ mb: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <Avatar sx={{ bgcolor: "#2A4E15", width: 22, height: 22, fontSize: 11 }}>
                        <PersonIcon sx={{ fontSize: 15 }} />
                      </Avatar>
                      <Typography sx={{ fontWeight: 500, fontSize: 13 }}>{item.userName}</Typography>
                      <Typography sx={{ color: "#94D071", fontWeight: 500, ml: 1, fontSize: 12 }}>
                        (You)
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <Avatar sx={{ bgcolor: "#55972F", width: 22, height: 22, fontSize: 11 }}>
                        <AccountCircleIcon sx={{ fontSize: 15 }} />
                      </Avatar>
                      <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                        Designer: {item.designerName}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <Avatar sx={{ bgcolor: "#ab47bc", width: 22, height: 22, fontSize: 11 }}>
                        <DesignServicesIcon sx={{ fontSize: 15 }} />
                      </Avatar>
                      <Typography sx={{ fontWeight: 500, fontSize: 13 }}>
                        Design: {item.categoryName}
                      </Typography>
                    </Stack>
                  </Box>

                  <Divider sx={{ mb: 1 }} />

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      mb: 1,
                      justifyContent: "space-between",
                      flexWrap: "wrap"
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CalendarMonthIcon sx={{ color: "#43a047", fontSize: 17 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 13 }}>
                        {item.bookingDate || "N/A"}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EventAvailableIcon sx={{ color: "#1976d2", fontSize: 17 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 13 }}>
                        {item.scheduledDate || "N/A"}
                      </Typography>
                    </Stack>
                  </Stack>

                  {item.message && (
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "flex-start",
                        background: "#f8fafc",
                        borderRadius: 2,
                        p: 1,
                        boxShadow: "0 2px 8px #10b98111"
                      }}
                    >
                      <MessageIcon sx={{ color: "#ffa726", mr: 1, mt: 0.5, fontSize: 16 }} />
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontWeight: 700, fontSize: 13 }}
                        >
                          Message / Project Details
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: 13 }}>{item.message}</Typography>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ClientDesignHistory;
