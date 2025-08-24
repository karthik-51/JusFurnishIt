
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Card, CardMedia, CardContent, Typography, IconButton,
  Grid, CircularProgress, Dialog, DialogTitle, DialogContent, TextField,
  InputAdornment, FormGroup, FormControlLabel, Checkbox, Badge, Rating, Divider
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const USER_ROLE_API = "http://localhost:8081/api/users/by-email?email=";

const API = {
  LIST: "http://localhost:8083/api/customer/products/all",
  DETAIL: id => `http://localhost:8083/api/customer/products/${id}`,
  AVG_RATING: id => `http://localhost:8083/api/customer/ratings/product/${id}/average`,
  REVIEWS: id => `http://localhost:8083/api/customer/ratings/product/${id}`,
  SUBMIT_RATING: "http://localhost:8083/api/customer/ratings",
  ADD_TO_CART: "http://localhost:8083/api/customer/cart/add",
  UPDATE_CART: "http://localhost:8083/api/customer/cart/update",
  REMOVE_FROM_CART: "http://localhost:8083/api/customer/cart/remove",
  GET_CART: userId => `http://localhost:8083/api/customer/cart/${userId}`,
  ADD_TO_WISHLIST: "http://localhost:8083/api/customer/wishlist/add",
  REMOVE_FROM_WISHLIST: "http://localhost:8083/api/customer/wishlist/remove",
  GET_WISHLIST: userId => `http://localhost:8083/api/customer/wishlist/${userId}`,
  BULK_BOOKINGS: "http://localhost:8083/api/customer/bookings/bulk",
  CLEAR_CART: userId => `http://localhost:8083/api/customer/cart/clear/${userId}`,
  
    ADD_TO_WISHLIST: "http://localhost:8083/api/customer/wishlist/add",
    REMOVE_FROM_WISHLIST: "http://localhost:8083/api/customer/wishlist/remove",
    GET_WISHLIST: userId => `http://localhost:8083/api/customer/wishlist/${userId}`
  
  
};

export default function ProductGallery() {
  const [products, setProducts] = useState([]);
  const [avgRatings, setAvgRatings] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [seeMoreOpen, setSeeMoreOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewProduct, setReviewProduct] = useState(null);
  const [reviewDialog, setReviewDialog] = useState({ stars: 0, comment: "" });
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");

  // Fetch products and categories
  useEffect(() => {
    fetch(API.LIST)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setCategories([...new Set(data.map(p => p.category))]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch average ratings for all products
  useEffect(() => {
    products.forEach(p => {
      fetch(API.AVG_RATING(p.id))
        .then(r => r.json())
        .then(avg => setAvgRatings(prev => ({ ...prev, [p.id]: avg || 0 })))
        .catch(() => undefined);
    });
  }, [products]);

  // Fetch cart and wishlist for user
  useEffect(() => {
    if (userId) {
      fetch(API.GET_CART(userId))
        .then(res => res.json())
        .then(setCart)
        .catch(() => setCart([]));
      fetch(API.GET_WISHLIST(userId))
        .then(res => res.json())
        .then(data => setWishlist(data.map(i => i.itemId)))
        .catch(() => setWishlist([]));
    }
  }, [userId]);

  // Cart logic
  const toggleCart = async (id) => {
    if (!userId || !userEmail) return navigate("/login");
    try {
      const res = await fetch(`${USER_ROLE_API}${encodeURIComponent(userEmail)}`);
      if (!res.ok) {
        alert("Unable to verify user role. Please try again.");
        return;
      }
      const userData = await res.json();
      if (!userData || userData.role !== "CUSTOMER") {
        alert("Only customers can add items to the cart. Please login as a customer.");
        return;
      }
    } catch (err) {
      alert("Error verifying user. Please try again.");
      return;
    }
    const inCart = cart.some(c => c.productId === id);
    const url = inCart ? API.REMOVE_FROM_CART : API.ADD_TO_CART;
    const method = inCart ? "DELETE" : "POST";
    const params = new URLSearchParams({
      userId,
      productId: id,
      ...(method === "POST" && { quantity: 1 })
    });
    fetch(`${url}?${params}`, { method })
      .then(() => fetch(API.GET_CART(userId)))
      .then(res => res.json())
      .then(setCart)
      .catch(console.error);
  };

  // Wishlist logic
  const toggleWishlist = async (id) => {
    if (!userId || !userEmail) return navigate("/login");
  
    try {
      // Optional: Verify user role
      const res = await fetch(`${USER_ROLE_API}${encodeURIComponent(userEmail)}`);
      if (!res.ok) {
        alert("Unable to verify user role. Please try again.");
        return;
      }
      const userData = await res.json();
      if (!userData || !('role' in userData) || userData.role !== "CUSTOMER") {
        alert("Only customers can add items to the wishlist. Please login as a customer.");
        return;
      }
    } catch (err) {
      alert("Error verifying user. Please try again.");
      return;
    }
  
    // Toggle logic
    const inWishlist = wishlist.includes(id);
    const url = inWishlist ? API.REMOVE_FROM_WISHLIST : API.ADD_TO_WISHLIST;
    const method = inWishlist ? "DELETE" : "POST";
    const params = new URLSearchParams({
      userId,
      itemId: id,
      itemType: "PRODUCT"
    });
  
    fetch(`${url}?${params}`, { method })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update wishlist");
        // Always fetch the latest wishlist after change
        return fetch(API.GET_WISHLIST(userId));
      })
      .then(res => res.json())
      .then(data => setWishlist(data.map(i => i.itemId)))
      .catch(err => {
        alert("Failed to update wishlist: " + err.message);
        console.error(err);
      });
  };
  
  
  // Update cart quantity
  const updateQty = (id, qty) => {
    if (qty < 1) return;
    const params = new URLSearchParams({
      userId,
      productId: id,
      quantity: qty
    });
    fetch(API.UPDATE_CART + `?${params}`, { method: "PUT" })
      .then(() => fetch(API.GET_CART(userId)))
      .then(res => res.json())
      .then(setCart)
      .catch(console.error);
  };

  // Load product details and reviews for See More
  const loadDetails = id => {
    fetch(API.DETAIL(id)).then(r => r.json()).then(setSelectedProduct);
    fetch(API.REVIEWS(id)).then(r => r.json()).then(setReviews);
    setSeeMoreOpen(true);
  };

  // Submit review
  const submitReview = async (productId, stars, comment) => {
    try {
      await fetch(API.SUBMIT_RATING, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating: stars,
          comment,
          userId
        })
      });
      // Refresh reviews for the product
      fetch(API.REVIEWS(productId)).then(r => r.json()).then(setReviews);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Filtering logic
  const filtered = products
    .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category))
    .filter(p =>
      !search ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.theme.toLowerCase().includes(search.toLowerCase())
    );


    

  // Cart and wishlist items
  const cartItems = products
    .filter(p => cart.some(c => c.productId === p.id))
    .map(p => {
      const item = cart.find(c => c.productId === p.id);
      return { ...p, qty: item?.quantity || 1 };
    });
  const wishlistItems = products.filter(p => wishlist.includes(p.id));

  // Handle checkout: pass all cart items to booking page
  const handleCheckout = () => {
    setShowCart(false);
    // Pass productId and quantity for each cart item
    navigate("/booking", {
      state: {
        cart: cartItems.map(item => ({
          productId: item.id,
          quantity: item.qty,
          ...item
        }))
      }
    });
  };
  
  
  
  

  if (loading) return (<Box sx={{ textAlign: "center", mt: 8 }}><CircularProgress /></Box>);

  return (
    <Box sx={{ p: 4, bgcolor: "f0f0f0", minHeight: "100vh" }}>
      {/* Toolbar */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search category or theme..."
          value={search} onChange={e => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end"><SearchIcon /></InputAdornment>
            )
          }}
        />
        <FormGroup row>
          {categories.map(cat => (
            <FormControlLabel
              key={cat}
              label={cat}
              control={
                <Checkbox
                  checked={selectedCategories.includes(cat)}
                  onChange={() =>
                    setSelectedCategories(prev =>
                      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                    )
                  }
                  sx={{
                    color: "#1f2937",
                    '&.Mui-checked': {
                      color: "#99a5b6"
                    }
                  }}
                />
              }
            />
          ))}
        </FormGroup>
      </Box>
      {/* Header */}
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "nowrap",
        mb: 3
      }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: "#1f2937" }}>Product Gallery</Typography>
        <Box>
          {userEmail && (
            <IconButton onClick={() => setShowWishlist(true)} sx={{ color: "#e53935", fontWeight: 300 }}>
              <Badge
                badgeContent={wishlistItems.length}
                sx={{ "& .MuiBadge-badge": { color: "#1f2937", background: "#99a5b6", fontWeight: 300 } }}
              >
                <FavoriteIcon />
              </Badge>
            </IconButton>
          )}
          <IconButton onClick={() => setShowCart(true)} sx={{ color: "#1f2937" }}>
            <Badge badgeContent={cartItems.length} sx={{ "& .MuiBadge-badge": { background: "#99a5b6" } }}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            onClick={() => navigate("/client-product-history")}
            sx={{ color: "#1f2937" }}
          >
            <AccountCircleIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
      </Box>
      {/* Product Cards */}
      <Grid container spacing={4} alignItems="stretch">
        {filtered.map(p => (
          <Grid item xs={12} sm={6} md={3} lg={2} key={p.id} sx={{ display: "flex" }}>
            <Card
              sx={{
                boxShadow: '15px 15px 15px rgba(0, 0, 0, 0.7)',
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                width: 340,
                height: 380,
                minHeight: 380,
                maxWidth: 350,
                bgcolor: "#fff",
                position: "relative",
                m: "auto"
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="175"
                  image={p.image ? `data:image/jpeg;base64,${p.image}` : "https://via.placeholder.com/300x180"}
                  sx={{ objectFit: "cover", cursor: "pointer", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  onClick={() => loadDetails(p.id)}
                />
                <IconButton
                  onClick={() => toggleWishlist(p.id)}
                  sx={{
                    position: "absolute",
                    top: 170,
                    left: 110,
                    color: wishlist.includes(p.id) ? "#e53935" : "#aaa",
                  }}
                >
                  {wishlist.includes(p.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 1 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#1f2937", fontSize: 16, mb: 0.7 }}>
                  {p.category}
                </Typography>
                <Typography variant="body2" sx={{ color: "#1f2937", fontSize: 15, mb: 0.7, fontWeight: 400 }}>
                  {p.shortBio || p.bio || p.theme}
                </Typography>
                <Typography variant="body2" sx={{ color: "#1f2937", fontSize: 15, mb: 0.7, fontWeight: 400 }}>
                  {p.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <Rating
                    value={avgRatings[p.id] || 0}
                    readOnly
                    precision={0.1}
                    size="small"
                    sx={{
                      '& .MuiRating-iconFilled': { color: '#FFD700' },
                      '& .MuiRating-iconHover': { color: '#FFD700' },
                      '& .MuiRating-iconFocus': { color: '#FFD700' }
                    }}
                  />
                  <Typography ml={0.5} color="text.secondary" fontSize={14}>
                    ({(avgRatings[p.id] || 0).toFixed(1)})
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={700} sx={{ color: "#1f2937", fontSize: 14 }}>
                  ₹{p.price}
                </Typography>
                {p.oldPrice && (
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through", fontSize: 12 }}>
                    ₹{p.oldPrice}
                  </Typography>
                )}
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pb: 2, pt: 1 }}>
                <Button
                  variant="contained"
                  sx={{
                    background: "rgba(85, 151, 47, 0.85)",
                    color: "#fff",
                    fontWeight: 700,
                    letterSpacing: 0.01,
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: "0 5px 12px rgba(85, 151, 47, 0.8)",
                    fontSize: 12,
                    width: 150,
                    marginTop: -2,
                    "&:hover": {
                      background: "#55972F",
                      boxShadow: "0 4px 18px #55972F",
                      color: "#fff"
                    }
                  }}
                  onClick={() => toggleCart(p.id)}
                >
                  {cart.some(c => c.productId === p.id) ? "Remove from Cart" : "Add to Cart"}
                </Button>
                <Button
                  variant="text"
                  sx={{
                    fontSize: 12,
                    width: 150,
                    border: "1.8px solid #1f2937",
                    marginLeft: 2,
                    height: 32,
                    marginTop: -2,
                    borderRadius:2,
                    fontWeight:600,
                    color:"#1f2937"
                  }}
                  onClick={() => loadDetails(p.id)}
                >
                  See More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Cart Dialog */}
      <Dialog open={showCart} onClose={() => setShowCart(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: "#1f2937", fontWeight: 700, letterSpacing: 1 }}>My Cart</DialogTitle>
        <DialogContent sx={{ bgcolor: "#f6f8fa" }}>
          {cartItems.length === 0 ? (
            <Typography>No items in your cart.</Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {cartItems.map(p => (
                  <Grid item xs={12} sm={6} md={4} key={p.id} sx={{ display: "flex", justifyContent: "center" }}>
                    <Card
                      sx={{
                        width: 250,
                        height: 380,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 4,
                        boxShadow: 3,
                        bgcolor: "#fff",
                        transition: "box-shadow 0.3s, transform 0.3s",
                        "&:hover": {
                          boxShadow: 8,
                          transform: "translateY(-6px) scale(1.03)"
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={p.image ? `data:image/jpeg;base64,${p.image}` : "https://via.placeholder.com/200x90"}
                        sx={{
                          height: 150,
                          width: "100%",
                          objectFit: "cover",
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                          bgcolor: "#e5e7eb"
                        }}
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          p: 1.5
                        }}
                      >
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: "#1f2937",
                              fontWeight: 700,
                              fontSize: 13,
                              mb: 0.5,
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap"
                            }}
                          >
                            {p.category}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#1f2937",
                              fontSize: 12,
                              mb: 1
                            }}
                          >
                            {p.theme}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#4AC304",
                              fontWeight: 700,
                              fontSize: 14,
                              mb: 1
                            }}
                          >
                            ₹{p.price}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                          <Button
                            size="small"
                            variant="text"
                            sx={{
                              minWidth: 28,
                              borderRadius: "50%",
                              color: "#1f2937",
                              fontWeight: 900,
                              fontSize: 16,
                              background: "transparent",
                              "&:hover": {
                                background: "#f6f8fa"
                              }
                            }}
                            onClick={() => updateQty(p.id, p.qty - 1)}
                            disabled={p.qty <= 1}
                          >−</Button>
                          <Typography sx={{ mx: 1, fontWeight: 700, fontSize: 13, color: "#1f2937" }}>{p.qty}</Typography>
                          <Button
                            size="small"
                            variant="text"
                            sx={{
                              minWidth: 28,
                              borderRadius: "50%",
                              color: "#1f2937",
                              fontWeight: 900,
                              fontSize: 16,
                              background: "transparent",
                              "&:hover": {
                                background: "#f6f8fa"
                              }
                            }}
                            onClick={() => updateQty(p.id, p.qty + 1)}
                          >+</Button>
                        </Box>
                        {/* <Button
                          variant="contained"
                          sx={{
                            borderRadius: 2,
                            background: "linear-gradient(90deg, #99a5b6 0%, #1f2937 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 12,
                            mb: 1,
                            textTransform: "none"
                          }}
                          onClick={() => {
                            setReviewProduct(p);
                            setReviewDialog({ stars: 0, comment: "" });
                            setReviewModalOpen(true);
                          }}
                        >
                          Rate Now
                        </Button> */}
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{
                            borderColor: "#e53935",
                            color: "#e53935",
                            fontWeight: 700,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: 12,
                            letterSpacing: 0.5,
                            "&:hover": {
                              background: "#e53935",
                              color: "#fff",
                              borderColor: "#e53935"
                            }
                          }}
                          onClick={() => toggleCart(p.id)}
                        >
                          Remove
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #99a5b6 0%, #1f2937 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  width: 200,
                  marginLeft: 85,
                  marginTop: 1,
                  letterSpacing: 0.5,
                  fontSize: 13,
                  mb: 1,
                  height: 35,
                  textTransform: "none",
                  p: 2,
                  "&:hover": {
                    background: "linear-gradient(90deg, #1f2937 0%, #99a5b6 100%)"
                  }
                }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="h6" sx={{ color: "#1f2937", fontWeight: 700, fontSize: 16 }}>
                  Total: ₹{cartItems.reduce((sum, p) => sum + (p.price * p.qty), 0)}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Wishlist Dialog */}
      <Dialog open={showWishlist} onClose={() => setShowWishlist(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: "#1f2937", fontWeight: 700, letterSpacing: 1 }}>My Wishlist</DialogTitle>
        <DialogContent sx={{ bgcolor: "#f6f8fa" }}>
          {wishlistItems.length === 0 ? (
            <Typography>No items in your wishlist.</Typography>
          ) : (
            <Grid container spacing={3}>
              {wishlistItems.map(p => (
                <Grid item xs={12} sm={6} md={4} key={p.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={p.image ? `data:image/jpeg;base64,${p.image}` : "https://via.placeholder.com/200x90"}
                      sx={{ height: 150 }}
                    />
                    <CardContent>
                      <Typography>{p.category}</Typography>
                      <Typography>{p.theme}</Typography>
                      <Typography>₹{p.price}</Typography>
                      <Button onClick={() => loadDetails(p.id)}>See More</Button>
                      <Button
  fullWidth
  variant="outlined"
  color="error"
  sx={{ mt: 1 }}
  onClick={() => toggleWishlist(p.id)}
>
  Remove
</Button>

                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={reviewModalOpen} onClose={() => setReviewModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: "#1f2937", fontWeight: 700 }}>Leave a Review</DialogTitle>
        <DialogContent sx={{ bgcolor: "#f8fafc" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Typography sx={{ color: "#1f2937", fontWeight: 600 }}>
              {reviewProduct?.category} — {reviewProduct?.theme}
            </Typography>
            <Rating
              name="review"
              value={reviewDialog.stars}
              onChange={(e, v) => setReviewDialog(d => ({ ...d, stars: v }))}
              sx={{ '& .MuiRating-iconFilled': { color: '#FFD700' } }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Your comment..."
              value={reviewDialog.comment}
              onChange={e => setReviewDialog(d => ({ ...d, comment: e.target.value }))}
              sx={{ borderRadius: 2, bgcolor: "#fff" }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                sx={{ borderRadius: 2 }}
                onClick={() => setReviewModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #99a5b6 0%, #1f2937 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  px: 3
                }}
                onClick={async () => {
                  await submitReview(reviewProduct.id, reviewDialog.stars, reviewDialog.comment);
                  setReviewModalOpen(false);
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      

      {/* See More Dialog */}
      <Dialog open={seeMoreOpen} onClose={() => setSeeMoreOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#1f2937" }}>Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3, mb: 2 }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: 180,
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: 2,
                    background: "#f5f5f5"
                  }}
                  image={selectedProduct.image ? `data:image/jpeg;base64,${selectedProduct.image}` : "https://via.placeholder.com/300x200"}
                  alt={selectedProduct.category}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={600} mb={1} sx={{ color: "#1f2937" }}>{selectedProduct.category}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}><strong>Theme:</strong> {selectedProduct.theme}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}><strong>Price:</strong> ₹{selectedProduct.price}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}><strong>Bio:</strong> {selectedProduct.shortBio || selectedProduct.bio || "No bio available"}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}><strong>Description:</strong> {selectedProduct.description}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Rating value={avgRatings[selectedProduct.id] || 0} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#FFD700' } }} />
                    <Typography ml={1} color="text.secondary">
                      ({(avgRatings[selectedProduct.id] || 0).toFixed(1)})
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" mb={1} sx={{ color: "#1f2937" }}>Reviews</Typography>
              {reviews.length === 0 ? (
                <Typography color="text.secondary">No reviews yet.</Typography>
              ) : (
                reviews.map((r, i) => (
                  <Box key={i} sx={{ mb: 2, p: 1, bgcolor: "#f1f5f9", borderRadius: 1 }}>
                    <Rating value={r.rating} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: '#FFD700' } }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Georgia, serif",
                        color: "#1f2937"
                      }}
                    >
                      {r.comment}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
