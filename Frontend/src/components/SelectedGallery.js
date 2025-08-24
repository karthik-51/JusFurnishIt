import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Badge,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const DATA_URL = "http://localhost:3900/designers";

const SelectedGallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  const userEmail = localStorage.getItem("userEmail");

  const selections = location.state?.selections || {
    designs: [],
    products: [],
  };

  useEffect(() => {
    if (userEmail) {
      const stored = localStorage.getItem(`wishlist_${userEmail}`);
      setWishlist(stored ? JSON.parse(stored) : []);
    } else {
      setWishlist([]);
    }
  }, [userEmail]);

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => {
        const filteredDesigns = data.filter(
          (item) =>
            item.option === "design" &&
            selections.designs.includes(item.category)
        );
        const filteredProducts = data.filter(
          (item) =>
            item.option === "product" &&
            selections.products.includes(item.category)
        );
        setDesigns(filteredDesigns);
        setProducts(filteredProducts);
      })
      .finally(() => setLoading(false));
  }, [selections]);

  const handleWishlistToggle = (id) => {
    if (!userEmail) {
      navigate("/login");
      return;
    }
    setWishlist((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((itemId) => itemId !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemove = (id) => {
    setWishlist((prev) => {
      const updated = prev.filter((itemId) => itemId !== id);
      localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleBookNow = (item) => {
    navigate("/booking", { state: { item } });
  };

  // Wishlist items from both designs and products
  const wishlistItems = [...designs, ...products].filter((item) =>
    wishlist.includes(item.id || item._id)
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (designs.length === 0 && products.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No items found for your selection.
        </Typography>
      </Box>
    );
  }

  // Card rendering function for reuse
  const renderCard = (item, idx) => {
    const id = item.id || item._id || idx;
    const isWishlisted = wishlist.includes(id);
    return (
      <Grid item xs={12} sm={6} md={4} key={id}>
        <Card
          sx={{
            width: 300,
            borderRadius: 3,
            boxShadow: 3,
            position: "relative",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="180"
              image={
                item.imageUrls && item.imageUrls.length > 0
                  ? item.imageUrls[0]
                  : "https://via.placeholder.com/300x180?text=No+Image"
              }
              alt={item.category}
              sx={{ borderRadius: "12px 12px 0 0", objectFit: "cover" }}
            />
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                left: 120,
                color: isWishlisted ? "#f44336" : "#aaa",
                backgroundColor: "transparent",
              }}
              aria-label="wishlist"
              onClick={() => handleWishlistToggle(id)}
            >
              {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "rgba(0,0,0,0.6)",
                padding: "4px 8px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                color: "white",
                fontWeight: 500,
                fontSize: "0.85rem",
              }}
            >
              <StarIcon sx={{ color: "#FFD700", fontSize: "1rem", mr: 0.5 }} />
              {item.rating || "4.5"}
            </Box>
          </Box>
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              Category: {item.category || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              Theme: {item.theme || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              Estimated Cost: ₹{item.cost || "N/A"}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            sx={{
              borderRadius: 0,
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
              textTransform: "none",
              background: "linear-gradient(90deg, #99a5b6 0%, #1f2937 100%)",
              color: "#fff",
              fontWeight: 700,
              letterSpacing: 0.01,
              boxShadow: "0 2px 12px #1f293733",
              "&:hover": {
                background: "linear-gradient(90deg, #1f2937 0%, #99a5b6 100%)",
                color: "#fff",
                boxShadow: "0 4px 18px #1f293744",
              },
            }}
            onClick={() =>
              navigate(
                `/designer/${encodeURIComponent(item.fullName || item.name)}`
              )
            }
          >
            View Profile
          </Button>
        </Card>
      </Grid>
    );
  };

  return (
    <Box sx={{ p: 4, background: "none", position: "relative" }}>
      {/* Floating wishlist button in the top right corner */}
      {userEmail && (
        <div
          className="wishlist-icon-wrapper"
          onClick={() => setShowWishlist(true)}
          style={{
            position: "fixed",
            top: 60,
            right: 20,
            backgroundColor: "rgba(255,255,255,0.93)",
            borderRadius: "50%",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            cursor: "pointer",
            zIndex: 1001,
            transition: "background 0.2s",
          }}
        >
          <Badge
            badgeContent={wishlistItems.length}
            color="error"
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <FavoriteIcon fontSize="large" sx={{ color: "#f44336" }} />
          </Badge>
        </div>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Selected Gallery
        </Typography>
      </Box>

      {designs.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Designs
          </Typography>
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {designs.map(renderCard)}
          </Grid>
        </>
      )}
      {products.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Products
          </Typography>
          <Grid container spacing={3}>
            {products.map(renderCard)}
          </Grid>
        </>
      )}

      <Dialog
        open={showWishlist}
        onClose={() => setShowWishlist(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "#f7f8fa",
            boxShadow: "0 8px 32px #1f293733",
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#1f2937",
            fontSize: "1.35rem",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          Wishlist
          <Box
            sx={{
              ml: 1,
              background: "#f44336",
              color: "#fff",
              borderRadius: "50%",
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1em",
              fontWeight: 700,
            }}
          >
            {wishlistItems.length}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {wishlistItems.length === 0 ? (
              <Typography sx={{ p: 2 }}>No items in your wishlist.</Typography>
            ) : (
              wishlistItems.map((item, idx) => {
                const id = item.id || item._id || idx;
                const imageUrl =
                  item.imageUrls && item.imageUrls.length > 0
                    ? item.imageUrls[0]
                    : "https://via.placeholder.com/300x180?text=No+Image";
                return (
                  <Grid item xs={12} sm={6} md={4} key={id}>
                    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={imageUrl}
                        alt={item.category || "Category"}
                        sx={{
                          borderRadius: "12px 12px 0 0",
                          objectFit: "cover",
                        }}
                      />
                      <CardContent>
                        <Typography
                          fontWeight="bold"
                          sx={{ fontSize: "1.1em" }}
                        >
                          {item.category}
                        </Typography>
                        <Typography color="text.secondary">
                          {item.theme}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          sx={{ fontWeight: 600 }}
                        >
                          Estimated Cost: ₹{item.cost || "N/A"}
                        </Typography>
                        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                          <Button
                            variant="contained"
                            sx={{
                              flex: 1,
                              background:
                                "linear-gradient(90deg, #99a5b6 0%, #1f2937 100%)",
                              color: "#fff",
                              borderRadius: 2,
                              fontWeight: 700,
                              "&:hover": {
                                background:
                                  "linear-gradient(90deg, #1f2937 0%, #99a5b6 100%)",
                              },
                            }}
                            onClick={() => handleBookNow(item)}
                          >
                            Book Now
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{ flex: 1, borderRadius: 2 }}
                            onClick={() => handleRemove(id)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SelectedGallery;
