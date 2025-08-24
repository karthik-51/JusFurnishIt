// import React, { useEffect, useState } from "react";
// import { Box, Typography, Card, CardContent, Grid, CircularProgress, Alert } from "@mui/material";

// const ContactRequestResults = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch username from localStorage (set this at login)
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     const fetchRequests = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const userId = localStorage.getItem("userId");
//         if (!userId) throw new Error("User not logged in");

//         const response = await fetch(`http://localhost:8085/api/contact-requests/by-user/${userId}`);
//         if (!response.ok) throw new Error("Failed to fetch contact requests");
//         const data = await response.json();
//         setRequests(data);
//       } catch (err) {
//         setError(err.message || "Error fetching contact requests");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
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
//         Contact Request Results
//       </Typography>
//       {requests.length === 0 ? (
//         <Typography variant="body1">No contact requests found.</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {requests.map((req) => (
//             <Grid item xs={12} md={6} key={req.id}>
//               <Card sx={{
//                 borderRadius: 3,
//                 boxShadow: 3,
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 "&:hover": { transform: "translateY(-5px)", boxShadow: 6 }
//               }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ mb: 1.5, color: "#1f2937", fontWeight: 700 }}>
//                     Request ID: {req.id}
//                   </Typography>
//                   <Typography><strong>User Name:</strong> {username}</Typography>
//                   <Typography><strong>Design Name:</strong> {req.design_name || req.designName}</Typography>
//                   <Typography><strong>Booking Date:</strong> {req.booking_date || req.bookingDate}</Typography>
//                   <Typography><strong>Message:</strong> {req.message}</Typography>
//                   <Typography><strong>Phone Number:</strong> {req.phone_number || req.phoneNumber}</Typography>
//                   <Typography><strong>Scheduled Date:</strong> {req.scheduled_date || req.scheduledDate}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ContactRequestResults;


// import React, { useEffect, useState } from "react";
// import { Box, Typography, Card, CardContent, Grid, CircularProgress, Alert } from "@mui/material";

// const ClientDesignHistory = () => {
//   const [designHistory, setDesignHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDesignHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const userId = localStorage.getItem("userId");
//         if (!userId) throw new Error("User not logged in");

//         const response = await fetch(`http://localhost:8085/api/client-design-history/${userId}`);
//         if (!response.ok) throw new Error(`Failed to fetch design history: ${response.status}`);
//         const data = await response.json();
//         setDesignHistory(Array.isArray(data) ? data : []);
//       } catch (err) {
//         setError(err.message || "Error fetching design history");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDesignHistory();
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
//         Design Contact/Booking History
//       </Typography>
//       {designHistory.length === 0 ? (
//         <Typography variant="body1">No design history found.</Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {designHistory.map((item) => (
//             <Grid item xs={12} md={6} key={item.bookingId}>
//               <Card sx={{
//                 borderRadius: 3,
//                 boxShadow: 3,
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 "&:hover": { transform: "translateY(-5px)", boxShadow: 6 }
//               }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ mb: 1.5, color: "#1f2937", fontWeight: 700 }}>
//                     Booking ID: {item.bookingId}
//                   </Typography>
//                   <Box sx={{ mb: 1.5, p: 2, backgroundColor: "#f8fafc", borderRadius: 2 }}>
//                     <Typography><strong>User:</strong> {item.userName}</Typography>
//                     <Typography><strong>Design:</strong> {item.designName}</Typography>
//                     <Typography><strong>Designer:</strong> {item.designerName}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
//                     <Box sx={{ mb: 1 }}>
//                       <Typography variant="body2" color="text.secondary">
//                         <strong>Booking Date:</strong>
//                       </Typography>
//                       <Typography>{item.bookingDate || "N/A"}</Typography>
//                     </Box>
//                     <Box sx={{ mb: 1 }}>
//                       <Typography variant="body2" color="text.secondary">
//                         <strong>Scheduled Date:</strong>
//                       </Typography>
//                       <Typography>{item.scheduledDate || "N/A"}</Typography>
//                     </Box>
//                   </Box>
//                   {item.message && (
//                     <Box sx={{ mt: 1.5 }}>
//                       <Typography variant="body2" color="text.secondary">
//                         <strong>Message:</strong>
//                       </Typography>
//                       <Typography>{item.message}</Typography>
//                     </Box>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ClientDesignHistory;


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   CircularProgress,
//   Alert,
//   Avatar,
//   Tooltip,
//   Divider,
//   Chip,
//   CardMedia,
//   Stack,
//   Fade
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import DesignServicesIcon from "@mui/icons-material/DesignServices";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// import MessageIcon from "@mui/icons-material/Message";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CategoryIcon from "@mui/icons-material/Category";
// import BrushIcon from "@mui/icons-material/Brush";

// const fallbackImage =
//   "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"; // fallback interior image

// const ClientDesignHistory = () => {
//   const [designHistory, setDesignHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDesignHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const userId = localStorage.getItem("userId");
//         if (!userId) throw new Error("User not logged in");

//         const response = await fetch(
//           `http://localhost:8085/api/client-design-history/${userId}`
//         );
//         if (!response.ok)
//           throw new Error(`Failed to fetch design history: ${response.status}`);
//         const data = await response.json();
//         setDesignHistory(Array.isArray(data) ? data : []);
//       } catch (err) {
//         setError(err.message || "Error fetching design history");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDesignHistory();
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
//     <Box
//       sx={{
//         p: { xs: 1, sm: 3 },
//         background: "linear-gradient(135deg, #f3f6fa 60%, #e8f5e9 100%)",
//         minHeight: "100vh",
//       }}
//     >
//       <Typography
//         variant="h4"
//         sx={{
//           mb: 4,
//           fontWeight: 900,
//           color: "#1f2937",
//           letterSpacing: 1,
//           textAlign: "center",
//           textShadow: "0 2px 12px #d1fae5",
//         }}
//       >
//         <AssignmentTurnedInIcon sx={{ mr: 1, color: "#10b981", fontSize: 38 }} />
//         My Interior Design Bookings
//       </Typography>

//       {designHistory.length === 0 ? (
//         <Typography
//           variant="body1"
//           sx={{
//             textAlign: "center",
//             color: "#607d8b",
//             fontWeight: 500,
//             mt: 6,
//           }}
//         >
//           No design booking history found.
//         </Typography>
//       ) : (
//         <Grid container spacing={4}>
//           {designHistory.map((item) => (
//             <Grid item xs={12} md={6} lg={4} key={item.bookingId}>
//               <Fade in timeout={700}>
//                 <Card
//                   sx={{
//                     borderRadius: 5,
//                     boxShadow: "0 8px 32px #1f293733",
//                     background:
//                       "rgba(255,255,255,0.85) backdrop-filter: blur(3px)",
//                     transition: "transform 0.3s, box-shadow 0.3s",
//                     "&:hover": {
//                       transform: "translateY(-8px) scale(1.02)",
//                       boxShadow: "0 16px 48px #10b98133",
//                     },
//                     overflow: "hidden",
//                   }}
//                 >
//                   <CardMedia
//                   component="img"
//                   height="200"
//                   image={item.image || item.imageUrl || fallbackImage}
//                   alt={item.designName}
//                   sx={{
//                     objectFit: "cover",
//                     width: "100%",
//                     borderBottom: "2px solid #10b981",
//                     background: "#f0f0f0",
//                   }}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = fallbackImage;
//                   }}
//                 />


//                   <CardContent sx={{ pb: 2 }}>
//                     <Stack
//                       direction="row"
//                       alignItems="center"
//                       spacing={1}
//                       sx={{ mb: 2 }}
//                     >
//                       <Chip
//                         icon={<AssignmentTurnedInIcon />}
//                         label={`Booking #${item.bookingId}`}
//                         color="success"
//                         sx={{ fontWeight: 700, fontSize: 15, px: 1.5 }}
//                       />
//                       {item.category && (
//                         <Chip
//                           icon={<CategoryIcon />}
//                           label={item.category}
//                           color="info"
//                           sx={{ fontWeight: 500, fontSize: 13, px: 1 }}
//                         />
//                       )}
//                     </Stack>

//                     <Divider sx={{ mb: 2 }} />

//                     <Box sx={{ mb: 2 }}>
//                       <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
//                         <Avatar sx={{ bgcolor: "#2A4E15", width: 32, height: 32, fontSize: 15 }}>
//                           <PersonIcon />
//                         </Avatar>
//                         <Typography sx={{ fontWeight: 600 }}>
//                           {item.userName}
//                         </Typography>
//                         <Typography sx={{ color: "#94D071", fontWeight: 500, ml: 1 }}>
//                           (You)
//                         </Typography>
//                       </Stack>
//                       <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
//                         <Avatar sx={{ bgcolor: "#55972F", width: 32, height: 32, fontSize: 15 }}>
//                           <AccountCircleIcon />
//                         </Avatar>
//                         <Typography sx={{ fontWeight: 600 }}>
//                           Designer: {item.designerName}
//                         </Typography>
//                       </Stack>
//                       <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
//                         <Avatar sx={{ bgcolor: "#ab47bc", width: 32, height: 32, fontSize: 15 }}>
//                           <BrushIcon />
//                         </Avatar>
//                         <Typography sx={{ fontWeight: 600 }}>
//                           Design: {item.designName}
//                         </Typography>
//                       </Stack>
//                       {item.location && (
//                         <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
//                           <Avatar sx={{ bgcolor: "#1976d2", width: 32, height: 32, fontSize: 15 }}>
//                             <LocationOnIcon />
//                           </Avatar>
//                           <Typography sx={{ fontWeight: 600 }}>
//                             Location: {item.location}
//                           </Typography>
//                         </Stack>
//                       )}
//                     </Box>

//                     <Divider sx={{ mb: 2 }} />

//                     <Stack
//                       direction="row"
//                       spacing={2}
//                       sx={{ mb: 2, justifyContent: "space-between", flexWrap: "wrap" }}
//                     >
//                       <Stack direction="row" alignItems="center" spacing={1}>
//                         <CalendarMonthIcon sx={{ color: "#43a047" }} />
//                         <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                           {item.bookingDate || "N/A"}
//                         </Typography>
//                       </Stack>
//                       <Stack direction="row" alignItems="center" spacing={1}>
//                         <EventAvailableIcon sx={{ color: "#1976d2" }} />
//                         <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                           {item.scheduledDate || "N/A"}
//                         </Typography>
//                       </Stack>
//                     </Stack>

//                     {item.message && (
//                       <Box
//                         sx={{
//                           mt: 2,
//                           display: "flex",
//                           alignItems: "flex-start",
//                           background: "#f8fafc",
//                           borderRadius: 2,
//                           p: 1.5,
//                           boxShadow: "0 2px 8px #10b98111"
//                         }}
//                       >
//                         <MessageIcon sx={{ color: "#ffa726", mr: 1, mt: 0.5 }} />
//                         <Box>
//                           <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
//                             Message / Project Details
//                           </Typography>
//                           <Typography sx={{ fontWeight: 500 }}>
//                             {item.message}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Fade>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ClientDesignHistory;


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
