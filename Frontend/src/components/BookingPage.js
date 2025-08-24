
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Rating
} from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
const BookingPage = () => {
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    email: '',
    deliveryAddress: ''
  });
  const [message, setMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const razorpayLoaded = useRef(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();
  const location = useLocation();
  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          razorpayLoaded.current = true;
          resolve();
        };
        script.onerror = () => {
          console.error('Razorpay script failed to load');
          resolve();
        };
        document.body.appendChild(script);
      });
    };
    if (!razorpayLoaded.current) {
      loadRazorpay();
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }
      try {
        // Fetch user details
        const userRes = await axios.get(`http://localhost:8081/api/users/email/${userEmail}`);
        const { id, fullName, email } = userRes.data;
        let itemsWithDetails = [];
        // Use cart from navigation state if available
        if (location.state && location.state.cart) {
          itemsWithDetails = await Promise.all(
            location.state.cart.map(async (item) => {
              // Ensure productId and quantity are present
              const productId = item.productId || item.id;
              const quantity = item.quantity || item.qty || 1;
              const productRes = await axios.get(`http://localhost:8083/api/customer/products/${productId}`);
              return {
                ...item,
                productId,
                quantity,
                product: productRes.data
              };
            })
          );
        } else {
          // Fallback: fetch cart from backend
          const cartRes = await axios.get(`http://localhost:8083/api/customer/cart/${id}`);
          const cartItems = cartRes.data;
          itemsWithDetails = await Promise.all(
            cartItems.map(async (item) => {
              const productRes = await axios.get(`http://localhost:8083/api/customer/products/${item.productId}`);
              return {
                ...item,
                product: productRes.data,
                quantity: item.quantity
              };
            })
          );
        }
        setFormData(prev => ({ ...prev, userId: id, fullName, email }));
        setCartItems(itemsWithDetails);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setMessage('Error loading booking details');
        setLoading(false);
      }
    };
    fetchData();
  }, [userEmail, location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitRating = async () => {
    try {
      const currentProduct = cartItems[currentProductIndex];
      await axios.post('http://localhost:8083/api/customer/ratings', {
        productId: currentProduct.productId,
        rating,
        comment,
        userId: formData.userId
      });
      // Move to next product or close modal
      if (currentProductIndex < cartItems.length - 1) {
        setCurrentProductIndex(prev => prev + 1);
        setRating(0);
        setComment('');
      } else {
        setShowRatingModal(false);
        setMessage('Thank you for your reviews!');
        navigate("/client-product-history");
      }
    } catch (error) {
      setMessage('Error submitting rating: ' + (error.response?.data?.message || 'Server error'));
    }
  };
  const handlePayment = async () => {
    if (!razorpayLoaded.current) {
      setMessage('Payment gateway is still loading. Please try again.');
      return;
    }
    if (!window.Razorpay) {
      setMessage('Payment gateway failed to initialize. Please refresh the page.');
      return;
    }
    if (!formData.deliveryAddress) {
      setMessage('Please enter delivery address');
      return;
    }
    try {
      // 1. Create a booking for each cart item
      for (let item of cartItems) {
        const bookingPayload = {
          productId: item.productId,
          userId: formData.userId,
          deliveryAddress: formData.deliveryAddress,
          quantity: item.quantity
        };
        await axios.post('http://localhost:8085/api/bookings', bookingPayload);
      }
      // 2. Calculate total amount
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
      );
      // 3. Razorpay payment options
      const options = {
        key: 'rzp_test_VVihXmzDUx9h5s', // Replace with your actual key
        amount: totalAmount * 100, // Convert to paise
        currency: 'INR',
        name: 'Design Booking',
        description: 'Payment for design services',
        handler: function(response) {
          setMessage(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          setShowRatingModal(true);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email
        },
        theme: {
          color: '#3399CC'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      // 4. Clear cart after successful booking
      await axios.delete(`http://localhost:8083/api/customer/cart/clear/${formData.userId}`);
      setFormData(prev => ({ ...prev, deliveryAddress: '' }));
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || 'Server error'));
    }
  };
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 8,
        p: 3,
        background: "#F7F8FA",
        borderRadius: 4,
        boxShadow: "0 8px 32px #1f293733"
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#1F2937" }}>
        Book Your Design
      </Typography>
      {/* Display cart items */}
      {cartItems.length > 0 && (
        <Box sx={{ mb: 3, p: 2, background: '#fff', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Your Order</Typography>
          {cartItems.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography>
                {item.product.category} - {item.product.theme}
              </Typography>
              <Typography>
                ₹{item.product.price} × {item.quantity}
              </Typography>
            </Box>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ₹{cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)}
          </Typography>
        </Box>
      )}
      {/* Booking form */}
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ background: "#fff", borderRadius: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{ background: "#fff", borderRadius: 2 }}
        />
        <TextField
          label="Delivery Address"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          sx={{ background: "#fff", borderRadius: 2 }}
        />
        <Button
          variant="contained"
          onClick={handlePayment}
          sx={{
            background: "linear-gradient(90deg, #99A5B6 0%, #1F2937 100%)",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 2,
            py: 1.2,
            letterSpacing: 0.5,
            boxShadow: "0 2px 12px #1f293733",
            "&:hover": {
              background: "linear-gradient(90deg, #1F2937 0%, #99A5B6 100%)"
            }
          }}
          disabled={cartItems.length === 0}
        >
          Proceed to Payment
        </Button>
      </Box>
      {message && (
        <Alert
          severity={message.includes("success") ? "success" : "error"}
          sx={{ mt: 4, textAlign: "center", fontWeight: 600 }}
        >
          {message}
        </Alert>
      )}
      {/* Rating Modal */}
      <Dialog open={showRatingModal} onClose={() => setShowRatingModal(false)}>
        <DialogTitle>
          Rate Your Purchase
          {cartItems.length > 1 && ` (${currentProductIndex + 1}/${cartItems.length})`}
        </DialogTitle>
        <DialogContent>
          {cartItems.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {cartItems[currentProductIndex].product.category}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                {cartItems[currentProductIndex].product.theme}
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                size="large"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Your review"
                multiline
                rows={3}
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleSubmitRating}
                disabled={rating === 0}
                fullWidth
              >
                {currentProductIndex < cartItems.length - 1 ? 'Next Review' : 'Submit All Reviews'}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default BookingPage;








