// import React, { useEffect, useState } from "react";
// import { Box, Typography, Card, CardContent, Grid, CircularProgress, Alert } from "@mui/material";

// const ClientProductHistory = () => {
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookingHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const userId = localStorage.getItem("userId");
//         if (!userId) {
//           throw new Error("User not logged in");
//         }

//         // Single API call to booking-service
//         const response = await fetch(`http://localhost:8085/api/client-product-history/${userId}`);
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch booking history: ${response.status}`);
//         }
        
//         const data = await response.json();
//         setBookingHistory(data);
//       } catch (err) {
//         setError(err.message || "Error fetching booking history");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingHistory();
//   }, []);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 4 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#1f2937" }}>
//         Product Booking History
//       </Typography>
      
//       {bookingHistory.length === 0 ? (
//         <Typography variant="body1">No booking history found.</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {bookingHistory.map((booking) => (
//             <Grid item xs={12} md={6} key={booking.bookingId}>
//               <Card sx={{ 
//                 borderRadius: 3, 
//                 boxShadow: 3,
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                   boxShadow: 6
//                 }
//               }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ mb: 1.5, color: "#1f2937", fontWeight: 700 }}>
//                     Booking ID: {booking.bookingId}
//                   </Typography>
                  
//                   <Box sx={{ mb: 1.5, p: 2, backgroundColor: "#f8fafc", borderRadius: 2 }}>
//                     <Typography><strong>Product:</strong> {booking.productName}</Typography>
//                     <Typography><strong>User:</strong> {booking.userName}</Typography>
//                     <Typography><strong>Designer:</strong> {booking.designerName}</Typography>
                    
//                   </Box>
                  
               
                  
//                   <Box sx={{ mt: 1.5 }}>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Delivery Address:</strong>
//                     </Typography>
//                     <Typography>{booking.deliveryAddress}</Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ClientProductHistory;


// import React, { useEffect, useState } from "react";
// import { Box, Typography, Card, CardContent, Grid, CircularProgress, Alert } from "@mui/material";

// const ClientProductHistory = () => {
//   const [bookingHistory, setBookingHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch booking history from backend
//   useEffect(() => {
//     const fetchBookingHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const userId = localStorage.getItem("userId");
//         if (!userId) {
//           throw new Error("User not logged in");
//         }
//         const response = await fetch(`http://localhost:8085/api/client-product-history/${userId}`);
//         if (!response.ok) {
//           throw new Error(`Failed to fetch booking history: ${response.status}`);
//         }
//         const data = await response.json();
//         setBookingHistory(data);
//       } catch (err) {
//         setError(err.message || "Error fetching booking history");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookingHistory();
//   }, []);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 4 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#1f2937" }}>
//         Product Booking History
//       </Typography>
      
//       {bookingHistory.length === 0 ? (
//         <Typography variant="body1">No booking history found.</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {bookingHistory.map((booking) => (
//             <Grid item xs={12} md={6} key={booking.bookingId}>
//               <Card sx={{ 
//                 borderRadius: 3, 
//                 boxShadow: 3,
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                   boxShadow: 6
//                 }
//               }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ mb: 1.5, color: "#1f2937", fontWeight: 700 }}>
//                     Booking ID: {booking.bookingId}
//                   </Typography>
                  
//                   <Box sx={{ mb: 1.5, p: 2, backgroundColor: "#f8fafc", borderRadius: 2 }}>
//                     <Typography><strong>Product:</strong> {booking.productName}</Typography>
//                     <Typography><strong>User:</strong> {booking.userName}</Typography>
//                     <Typography><strong>Designer:</strong> {booking.designerName}</Typography>
//                     <Typography><strong>Quantity:</strong> {booking.quantity}</Typography>

//                   </Box>
                  
//                   <Box sx={{ mt: 1.5 }}>
//                     <Typography variant="body2" color="text.secondary">
//                       <strong>Delivery Address:</strong>
//                     </Typography>
//                     <Typography>{booking.deliveryAddress}</Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ClientProductHistory;

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
  Fade,
  Grid
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Breadcrumb from "./Breadcrumb";

const fallbackImage =
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80";

const ClientProductHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch booking history from backend
  useEffect(() => {
    const fetchBookingHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User not logged in");
        }
        const response = await fetch(
          `http://localhost:8085/api/client-product-history/${userId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch booking history: ${response.status}`);
        }
        const data = await response.json();
        setBookingHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Error fetching booking history");
      } finally {
        setLoading(false);
      }
    };
    fetchBookingHistory();
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
      <Breadcrumb/>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#1f2937",
          letterSpacing: 1,
          textAlign: "center",
          textShadow: "0 2px 12px #d1fae5",
          fontSize: 22
        }}
      >
        <ShoppingCartIcon sx={{ mr: 1, color: "#10b981", fontSize: 32 }} />
        Product Booking History
      </Typography>

      {bookingHistory.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "#607d8b",
            fontWeight: 400,
            mt: 6,
            fontSize: 14
          }}
        >
          No booking history found.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          {bookingHistory.map((booking, idx) => (
            <Fade in timeout={700} key={booking.bookingId}>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: "0 8px 32px #1f293733",
                  background: "rgba(255,255,255,0.9) backdrop-filter: blur(3px)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 16px 48px #10b98133"
                  },
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: idx % 2 === 1 ? "row-reverse" : "row",
                  alignItems: "stretch",
                  height: 250,
                  maxWidth: 900,
                  width: "100%"
                }}
              >
                {/* Image on left or right */}
                <CardMedia
                  component="img"
                  sx={{
                    width: 320,
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: idx % 2 === 1 ? "0 5px 5px 0" : "5px 0 0 5px",
                    background: "#f0f0f0",
                    flexShrink: 0
                  }}
                  image={
                    booking.image
                      ? `data:image/jpeg;base64,${booking.image}`
                      : fallbackImage
                  }
                  alt={booking.productName}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />

                {/* Content */}
                <CardContent
                  sx={{
                    flex: 1,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Chip
                      icon={<AssignmentTurnedInIcon />}
                      label={`Booking #${booking.bookingId}`}
                      color="success"
                      sx={{ fontWeight: 500, fontSize: 15, px: 1.5 }}
                    />
                  </Stack>
                  <Divider sx={{ mb: 1 }} />

                  <Box sx={{ mb: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <Avatar sx={{ bgcolor: "#2A4E15", width: 28, height: 28, fontSize: 13 }}>
                        <PersonIcon />
                      </Avatar>
                      <Typography sx={{ fontWeight: 400, fontSize: 14 }}>{booking.userName}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <Avatar sx={{ bgcolor: "#55972F", width: 28, height: 28, fontSize: 13 }}>
                        <AccountCircleIcon />
                      </Avatar>
                      <Typography sx={{ fontWeight: 400, fontSize: 14 }}>
                        Designer: {booking.designerName}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <Avatar sx={{ bgcolor: "#ab47bc", width: 28, height: 28, fontSize: 13 }}>
                        <DesignServicesIcon />
                      </Avatar>
                      <Typography sx={{ fontWeight: 400, fontSize: 14 }}>
                        Product: {booking.productName}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <Avatar sx={{ bgcolor: "#1976d2", width: 28, height: 28, fontSize: 13 }}>
                        <ShoppingCartIcon />
                      </Avatar>
                      <Typography sx={{ fontWeight: 400, fontSize: 14 }}>
                        Quantity: {booking.quantity}
                      </Typography>
                    </Stack>
                  </Box>

                  <Divider sx={{ mb: 1 }} />

                  <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ flexWrap: "wrap" }}>
                    <LocalShippingIcon sx={{ color: "#43a047", mt: "2px" }} />
                    <Typography variant="body2" sx={{ fontWeight: 400, fontSize: 14 }}>
                      Delivery Address:
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        ml: 1,
                        fontSize: 14,
                        wordBreak: "break-word",
                        whiteSpace: "pre-line",
                        maxWidth: 240
                      }}
                    >
                      {booking.deliveryAddress}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ClientProductHistory;
