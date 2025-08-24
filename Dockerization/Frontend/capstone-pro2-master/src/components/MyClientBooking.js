// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   CircularProgress,
//   Divider,
//   Alert
// } from "@mui/material";

// const MyClientBooking = ({ userId }) => {
//   const [contactRequests, setContactRequests] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setError(null);
//       setLoading(true);
//       try {
//         // 1. Fetch designer's designs
//         const designsRes = await fetch(
//           `http://localhost:8082/api/designer/${userId}/designs`
//         );
//         let designs = await designsRes.json();
//         designs = Array.isArray(designs) ? designs : [];
//         const designIds = designs.map((d) => d.id);

//         // 2. Fetch designer's products
//         const productsRes = await fetch(
//           `http://localhost:8082/api/designer/${userId}/products`
//         );
//         let products = await productsRes.json();
//         products = Array.isArray(products) ? products : [];
//         const productIds = products.map((p) => p.id);

//         // 3. Fetch contact requests for designer's designs
//         let contactReqData = [];
//         if (designIds.length > 0) {
//           const contactReqRes = await fetch(
//             `http://localhost:8085/api/contact-requests/by-design-ids`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ designIds })
//             }
//           );
//           contactReqData = await contactReqRes.json();
//           contactReqData = Array.isArray(contactReqData) ? contactReqData : [];
//         }

//         // 4. Fetch bookings for designer's products
//         let bookingsData = [];
//         if (productIds.length > 0) {
//           const bookingsRes = await fetch(
//             `http://localhost:8085/api/bookings/by-product-ids`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ productIds })
//             }
//           );
//           bookingsData = await bookingsRes.json();
//           bookingsData = Array.isArray(bookingsData) ? bookingsData : [];
//         }

//         setContactRequests(contactReqData);
//         setBookings(bookingsData);
//       } catch (err) {
//         setError(
//           "Error loading client bookings. Please check backend services and network."
//         );
//         setContactRequests([]);
//         setBookings([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Client Contact Requests
//       </Typography>
//       <Grid container spacing={2}>
//         {Array.isArray(contactRequests) && contactRequests.length === 0 && (
//           <Typography sx={{ p: 2 }}>No contact requests found.</Typography>
//         )}
//         {Array.isArray(contactRequests) &&
//           contactRequests.map((req) => (
//             <Grid item xs={12} md={6} key={req.id}>
//               <Card>
//                 <CardContent>
//                   <Typography>
//                     <strong>Booking Date:</strong> {req.booking_date || req.bookingDate}
//                   </Typography>
//                   <Typography>
//                     <strong>Design:</strong> {req.design_category || req.designCategory}
//                   </Typography>
//                   <Typography>
//                     <strong>Message:</strong> {req.message}
//                   </Typography>
//                   <Typography>
//                     <strong>Phone:</strong> {req.phone_number || req.phoneNumber}
//                   </Typography>
//                   <Typography>
//                     <strong>Scheduled Date:</strong> {req.scheduled_date || req.scheduledDate}
//                   </Typography>
//                   <Typography>
//                     <strong>User:</strong> {req.user_name || req.userName}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//       </Grid>

//       <Divider sx={{ my: 3 }} />

//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Product Bookings
//       </Typography>
//       <Grid container spacing={2}>
//         {Array.isArray(bookings) && bookings.length === 0 && (
//           <Typography sx={{ p: 2 }}>No product bookings found.</Typography>
//         )}
//         {Array.isArray(bookings) &&
//           bookings.map((booking) => (
//             <Grid item xs={12} md={6} key={booking.id}>
//               <Card>
//                 <CardContent>
//                   <Typography>
//                     <strong>Booking ID:</strong> {booking.id}
//                   </Typography>
//                   <Typography>
//                     <strong>Product:</strong> {booking.product_name || booking.productName}
//                   </Typography>
//                   <Typography>
//                     <strong>User:</strong> {booking.user_name || booking.userName}
//                   </Typography>
//                   <Typography>
//                     <strong>Delivery Address:</strong> {booking.delivery_address || booking.deliveryAddress}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//       </Grid>
//     </Box>
//   );
// };

// export default MyClientBooking;


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   CircularProgress,
//   Divider,
//   Alert
// } from "@mui/material";

// const MyClientBooking = ({ userId }) => {
//   const [contactRequests, setContactRequests] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [userMap, setUserMap] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setError(null);
//       setLoading(true);
//       try {
//         // 1. Fetch designer's designs
//         const designsRes = await fetch(
//           `http://localhost:8082/api/designer/${userId}/designs`
//         );
//         let designs = await designsRes.json();
//         designs = Array.isArray(designs) ? designs : [];
//         const designIds = designs.map((d) => d.id);

//         // 2. Fetch designer's products
//         const productsRes = await fetch(
//           `http://localhost:8082/api/designer/${userId}/products`
//         );
//         let products = await productsRes.json();
//         products = Array.isArray(products) ? products : [];
//         const productIds = products.map((p) => p.id);

//         // 3. Fetch contact requests for designer's designs
//         let contactReqData = [];
//         if (designIds.length > 0) {
//           const contactReqRes = await fetch(
//             `http://localhost:8085/api/contact-requests/by-design-ids`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ designIds })
//             }
//           );
//           contactReqData = await contactReqRes.json();
//           contactReqData = Array.isArray(contactReqData)
//             ? contactReqData
//             : [];
//         }

//         // 4. Fetch bookings for designer's products
//         let bookingsData = [];
//         if (productIds.length > 0) {
//           const bookingsRes = await fetch(
//             `http://localhost:8085/api/bookings/by-product-ids`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ productIds })
//             }
//           );
//           bookingsData = await bookingsRes.json();
//           bookingsData = Array.isArray(bookingsData) ? bookingsData : [];
//         }

//         setContactRequests(contactReqData);
//         setBookings(bookingsData);
//       } catch (err) {
//         setError(
//           "Error loading client bookings. Please check backend services and network."
//         );
//         setContactRequests([]);
//         setBookings([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   // Fetch user details individually for each booking
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const newUserMap = { ...userMap };
//       let needsUpdate = false;

//       for (const booking of bookings) {
//         const userId = booking.user_id || booking.userId;
//         if (userId && !newUserMap[userId]) {
//           try {
//             const userRes = await fetch(
//               `http://localhost:8081/api/users/${userId}`
//             );
//             if (userRes.ok) {
//               const user = await userRes.json();
//               newUserMap[userId] = user.full_name || user.fullName || user.name || `User ${userId}`;
//               needsUpdate = true;
//             }
//           } catch (err) {
//             newUserMap[userId] = `User ${userId}`;
//             needsUpdate = true;
//           }
//         }
//       }

//       if (needsUpdate) {
//         setUserMap(newUserMap);
//       }
//     };

//     if (bookings.length > 0) {
//       fetchUserDetails();
//     }
//   }, [bookings, userMap]);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Client Contact Requests
//       </Typography>
//       <Grid container spacing={2}>
//         {Array.isArray(contactRequests) && contactRequests.length === 0 && (
//           <Typography sx={{ p: 2 }}>No contact requests found.</Typography>
//         )}
//         {Array.isArray(contactRequests) &&
//           contactRequests.map((req) => (
//             <Grid item xs={12} md={6} key={req.id}>
//               <Card>
//                 <CardContent>
//                   <Typography>
//                     <strong>Booking Date:</strong>{" "}
//                     {req.booking_date || req.bookingDate}
//                   </Typography>
//                   <Typography>
//                     <strong>Design:</strong>{" "}
//                     {req.design_category || req.designCategory}
//                   </Typography>
//                   <Typography>
//                     <strong>Message:</strong> {req.message}
//                   </Typography>
//                   <Typography>
//                     <strong>Phone:</strong>{" "}
//                     {req.phone_number || req.phoneNumber}
//                   </Typography>
//                   <Typography>
//                     <strong>Scheduled Date:</strong>{" "}
//                     {req.scheduled_date || req.scheduledDate}
//                   </Typography>
//                   <Typography>
//                     <strong>User:</strong> {req.user_name || req.userName}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//       </Grid>

//       <Divider sx={{ my: 3 }} />

//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Product Bookings
//       </Typography>
//       <Grid container spacing={2}>
//         {Array.isArray(bookings) && bookings.length === 0 && (
//           <Typography sx={{ p: 2 }}>No product bookings found.</Typography>
//         )}
//         {Array.isArray(bookings) &&
//           bookings.map((booking) => {
//             const userId = booking.user_id || booking.userId;
//             const userName = userMap[userId] || (userId ? `User ${userId}` : "N/A");
            
//             return (
//               <Grid item xs={12} md={6} key={booking.id}>
//                 <Card>
//                   <CardContent>
//                     <Typography>
//                       <strong>Booking ID:</strong> {booking.id}
//                     </Typography>
//                     <Typography>
//                       <strong>Product:</strong>{" "}
//                       {booking.product_name || booking.productName}
//                     </Typography>
//                     <Typography>
//                       <strong>User:</strong> {userName}
//                     </Typography>
//                     <Typography>
//                       <strong>Delivery Address:</strong>{" "}
//                       {booking.delivery_address || booking.deliveryAddress}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//       </Grid>
//     </Box>
//   );
// };

// export default MyClientBooking;


import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NumbersIcon from "@mui/icons-material/Numbers";

const ODD_ROW_BG = "rgba(255,255,255,0.92)";
const EVEN_ROW_BG = "rgba(245, 236, 227, 0.92)"; // a light nude shade

const MyClientBooking = ({ userId }) => {
  const [contactRequests, setContactRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [designerName, setDesignerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch designer name
  useEffect(() => {
    const fetchDesignerName = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/users/${userId}`);
        if (res.ok) {
          const user = await res.json();
          setDesignerName(user.full_name || user.fullName || user.name || `Designer ${userId}`);
        } else {
          setDesignerName(`Designer ${userId}`);
        }
      } catch {
        setDesignerName(`Designer ${userId}`);
      }
    };
    if (userId) {
      fetchDesignerName();
    }
  }, [userId]);

  // Fetch all data on mount or when userId changes
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        // Fetch designer's designs
        const designsRes = await fetch(
          `http://localhost:8082/api/designer/${userId}/designs`
        );
        let designsData = await designsRes.json();
        designsData = Array.isArray(designsData) ? designsData : [];
        setDesigns(designsData);
        const designIds = designsData.map((d) => d.id);

        // Fetch designer's products
        const productsRes = await fetch(
          `http://localhost:8082/api/designer/${userId}/products`
        );
        let productsData = await productsRes.json();
        productsData = Array.isArray(productsData) ? productsData : [];
        setProducts(productsData);
        const productIds = productsData.map((p) => p.id);

        // Fetch contact requests for designer's designs
        let contactReqData = [];
        if (designIds.length > 0) {
          const contactReqRes = await fetch(
            `http://localhost:8085/api/contact-requests/by-design-ids`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ designIds })
            }
          );
          contactReqData = await contactReqRes.json();
          contactReqData = Array.isArray(contactReqData)
            ? contactReqData
            : [];
        }

        // Fetch bookings for designer's products
        let bookingsData = [];
        if (productIds.length > 0) {
          const bookingsRes = await fetch(
            `http://localhost:8085/api/bookings/by-product-ids`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productIds })
            }
          );
          bookingsData = await bookingsRes.json();
          bookingsData = Array.isArray(bookingsData) ? bookingsData : [];
        }

        setContactRequests(contactReqData);
        setBookings(bookingsData);
      } catch (err) {
        setError(
          "Error loading client bookings. Please check backend services and network."
        );
        setContactRequests([]);
        setBookings([]);
        setProducts([]);
        setDesigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Fetch user details individually for each booking
  useEffect(() => {
    const fetchUserDetails = async () => {
      const newUserMap = { ...userMap };
      let needsUpdate = false;

      for (const booking of bookings) {
        const clientUserId = booking.user_id || booking.userId;
        if (clientUserId && !newUserMap[clientUserId]) {
          try {
            const userRes = await fetch(
              `http://localhost:8081/api/users/${clientUserId}`
            );
            if (userRes.ok) {
              const user = await userRes.json();
              newUserMap[clientUserId] = user.full_name || user.fullName || user.name || `User ${clientUserId}`;
              needsUpdate = true;
            }
          } catch (err) {
            newUserMap[clientUserId] = `User ${clientUserId}`;
            needsUpdate = true;
          }
        }
      }
      if (needsUpdate) {
        setUserMap(newUserMap);
      }
    };
    if (bookings.length > 0) {
      fetchUserDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  // Map product_id to product object for quick lookup
  const productMap = React.useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, [products]);

  // Map design_id to category for quick lookup
  const designCategoryMap = React.useMemo(() => {
    const map = {};
    designs.forEach((d) => {
      map[d.id] = d.category;
    });
    return map;
  }, [designs]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* CONTACT REQUESTS TABLE */}
      <Paper
        sx={{
          backgroundColor: ODD_ROW_BG,
          padding: "2rem 2.5rem",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          maxWidth: 1200,
          width: "100%",
          textAlign: "center",
          mb: 5,
          mx: "auto"
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 2,
            letterSpacing: 1,
            color: "#3e2723",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}
        >
          <AssignmentTurnedInIcon sx={{ color: "#e57373", fontSize: 32, mr: 1 }} />
          Client Contact Requests
        </Typography>
        <TableContainer sx={{ background: "none", boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <NumbersIcon sx={{ color: "#e57373", mr: 1, verticalAlign: "middle" }} />
                  ID
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <CalendarMonthIcon sx={{ color: "#64b5f6", mr: 1, verticalAlign: "middle" }} />
                  Booking Date
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <CategoryIcon sx={{ color: "#9575cd", mr: 1, verticalAlign: "middle" }} />
                  Design Category
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <MessageIcon sx={{ color: "#ffb74d", mr: 1, verticalAlign: "middle" }} />
                  Message
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <LocalPhoneIcon sx={{ color: "#81c784", mr: 1, verticalAlign: "middle" }} />
                  Phone
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <EventAvailableIcon sx={{ color: "#4db6ac", mr: 1, verticalAlign: "middle" }} />
                  Scheduled Date
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <PersonIcon sx={{ color: "#f06292", mr: 1, verticalAlign: "middle" }} />
                  User
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(contactRequests) && contactRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No contact requests found.
                  </TableCell>
                </TableRow>
              ) : (
                contactRequests.map((req, idx) => (
                  <TableRow
                    key={req.id}
                    sx={{
                      backgroundColor: idx % 2 === 0 ? ODD_ROW_BG : EVEN_ROW_BG,
                      "&:last-child td, &:last-child th": { border: 0 }
                    }}
                  >
                    <TableCell>{req.id}</TableCell>
                    <TableCell>{req.booking_date || req.bookingDate}</TableCell>
                    <TableCell>
                      {designCategoryMap[req.design_id || req.designId] || "Unknown"}
                    </TableCell>
                    <TableCell>{req.message}</TableCell>
                    <TableCell>{req.phone_number || req.phoneNumber}</TableCell>
                    <TableCell>{req.scheduled_date || req.scheduledDate}</TableCell>
                    <TableCell>{req.user_name || req.userName}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* PRODUCT BOOKINGS TABLE */}
      <Paper
        sx={{
          backgroundColor: ODD_ROW_BG,
          padding: "2rem 2.5rem",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          maxWidth: 1200,
          width: "100%",
          textAlign: "center",
          mx: "auto"
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 2,
            letterSpacing: 1,
            color: "#3e2723",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}
        >
          <ShoppingCartIcon sx={{ color: "#9575cd", fontSize: 32, mr: 1 }} />
          Product Bookings
        </Typography>
        <TableContainer sx={{ background: "none", boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <AssignmentTurnedInIcon sx={{ color: "#e57373", mr: 1, verticalAlign: "middle" }} />
                  Booking ID
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <AccountCircleIcon sx={{ color: "#64b5f6", mr: 1, verticalAlign: "middle" }} />
                  Designer
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <CategoryIcon sx={{ color: "#9575cd", mr: 1, verticalAlign: "middle" }} />
                  Category
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <PersonIcon sx={{ color: "#f06292", mr: 1, verticalAlign: "middle" }} />
                  User
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <HomeIcon sx={{ color: "#ffb74d", mr: 1, verticalAlign: "middle" }} />
                  Delivery Address
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>
                  <ShoppingCartIcon sx={{ color: "#81c784", mr: 1, verticalAlign: "middle" }} />
                  Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(bookings) && bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No product bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking, idx) => {
                  const clientUserId = booking.user_id || booking.userId;
                  const userName = userMap[clientUserId] || (clientUserId ? `User ${clientUserId}` : "N/A");
                  const productId = booking.product_id || booking.productId;
                  const product = productMap[productId];
                  const productCategory = product ? product.category : "Unknown";
                  return (
                    <TableRow
                      key={booking.id}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? ODD_ROW_BG : EVEN_ROW_BG,
                        "&:last-child td, &:last-child th": { border: 0 }
                      }}
                    >
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{designerName}</TableCell>
                      <TableCell>{productCategory}</TableCell>
                      <TableCell>{userName}</TableCell>
                      <TableCell>{booking.delivery_address || booking.deliveryAddress}</TableCell>
                      <TableCell>{booking.quantity}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default MyClientBooking;
