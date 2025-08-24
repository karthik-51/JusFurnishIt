

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Card, CardContent, CardMedia, Typography, IconButton,
  Grid, CircularProgress, Dialog, DialogTitle, DialogContent, TextField,
  InputAdornment, FormGroup, FormControlLabel, Checkbox, Badge, Rating, Divider
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ContactRequestPage from "./ContactRequestPage";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewProfile from "./ViewProfile";


const DESIGN_API_URL = "http://localhost:8083/api/customer/designs/all";
const DESIGN_DETAIL_API = (id) => `http://localhost:8083/api/customer/designs/${id}`;
const AVG_RATING_API = (id) => `http://localhost:8083/api/customer/ratings/design/${id}/average`;
const REVIEW_API = (id) => `http://localhost:8083/api/customer/ratings/design/${id}`;
const SUBMIT_RATING_API = "http://localhost:8083/api/customer/ratings";

const gradientButtonSx = {
  borderRadius: 2,
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
};

const gradientOutlinedSx = {
  borderRadius: 2,
  textTransform: "none",
  fontWeight: 700,
  border: "2px solid #99a5b6",
  color: "#1f2937",
  background: "#fff",
  "&:hover": {
    background: "linear-gradient(90deg, #99a5b6 0%, #1f2937 100%)",
    color: "#fff",
    border: "2px solid #1f2937"
  }
};

const gradientTextSx = {
  borderRadius: 2,
  textTransform: "none",
  fontWeight: 700,
  color: "#1f2937",
  background: "none",
  "&:hover": {
    color: "#99a5b6",
    background: "none"
  }
};

const DesignGallery = () => {
  const [designs, setDesigns] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [designCategories, setDesignCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [ratingDialog, setRatingDialog] = useState({ open: false, designId: null, stars: 0, comment: "" });
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [seeMoreDialogOpen, setSeeMoreDialogOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [contactDialog, setContactDialog] = useState({ open: false, design: null });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
const [reviewDesign, setReviewDesign] = useState(null);
const [reviewDialog, setReviewDialog] = useState({ stars: 0, comment: "" });

//Loading designs
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetch(DESIGN_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setDesigns(data);
        setDesignCategories([...new Set(data.map((d) => d.category))]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    designs.forEach((d) => {
      fetch(AVG_RATING_API(d.id))
        .then((res) => res.json())
        .then((avg) => setRatings((prev) => ({ ...prev, [d.id]: avg || 0 })))
        .catch(() => {});
    });
  }, [designs]);

  useEffect(() => {
    if (userEmail) {
      const userId = localStorage.getItem("userId");
      fetch(`http://localhost:8083/api/customer/wishlist/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          const designIds = data
            .filter((item) => item.itemType === "design")
            .map((item) => item.itemId);
          setWishlist(designIds);
          localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(designIds));
        })
        .catch(() => setWishlist([]));
    }
  }, [userEmail]);

  const handleWishlistToggle = async (designId) => {
    if (!userEmail) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8081/api/users/by-email?email=${encodeURIComponent(userEmail)}`);
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
    
    const userId = localStorage.getItem("userId");
    const isWishlisted = wishlist.includes(designId);
    const url = isWishlisted
      ? `http://localhost:8083/api/customer/wishlist/remove?userId=${userId}&itemId=${designId}&itemType=design`
      : `http://localhost:8083/api/customer/wishlist/add?userId=${userId}&itemId=${designId}&itemType=design`;
    fetch(url, {
      method: isWishlisted ? "DELETE" : "POST"
    })
      .then((res) => {
        if (res.ok) {
          const updated = isWishlisted
            ? wishlist.filter((itemId) => itemId !== designId)
            : [...wishlist, designId];
          setWishlist(updated);
          localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(updated));
        }
      })
      .catch(() => {});
  };

  const handleRemove = (designId) => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8083/api/customer/wishlist/remove?userId=${userId}&itemId=${designId}&itemType=design`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          const updated = wishlist.filter((itemId) => itemId !== designId);
          setWishlist(updated);
          localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(updated));
        }
      })
      .catch(() => {});
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // In your component, get userId from localStorage
const userId = localStorage.getItem("userId");

// Submit review for a design (store userId)
const handleRatingSubmit = () => {
  const { designId, stars, comment } = ratingDialog;
  if (!designId || !userId) return;

  fetch(SUBMIT_RATING_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      designId,
      rating: stars,
      comment,
      userId
    })
  }).then(() => {
    // Refresh average rating
    fetch(AVG_RATING_API(designId))
      .then((res) => res.json())
      .then((avg) => setRatings((prev) => ({ ...prev, [designId]: avg || 0 })));
    // Refresh reviews list
    fetch(REVIEW_API(designId))
      .then(res => res.json())
      .then(data => setReviews(Array.isArray(data) ? data : []));
    setRatingDialog({ open: false, designId: null, stars: 0, comment: "" });
  });
};

const handleSeeMore = (id) => {
  fetch(DESIGN_DETAIL_API(id))
    .then(res => res.json())
    .then(data => setSelectedDesign(data));
  fetch(REVIEW_API(id))
    .then(res => res.json())
    .then(data => setReviews(Array.isArray(data) ? data : []));
  setSeeMoreDialogOpen(true);
  setShowReviewForm(false);
};

const filteredDesigns = designs
  .filter(d => selectedCategories.length === 0 || selectedCategories.includes(d.category))
  .filter(d =>
    !search ||
    d.category.toLowerCase().includes(search.toLowerCase()) ||
    d.theme.toLowerCase().includes(search.toLowerCase())
  );



const wishlistDesigns = designs.filter((d) => wishlist.includes(d.id));

if (loading) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <CircularProgress />
    </Box>
  );
}

return (
  <Box sx={{ p: 4, bgcolor: "#f0f0f0", minHeight: "100vh", position: "relative" }}>
    {/* Wishlist Badge */}
    {userEmail && (
      <Box onClick={() => setShowWishlist(true)} sx={{ position: "absolute", top: 40, right: 40, backgroundColor: "#fff", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", cursor: "pointer" }}>
        <Badge badgeContent={wishlistDesigns.length} sx={{ "& .MuiBadge-badge": { color: "#1f2937", background: "#99a5b6", fontWeight: 700, fontSize: 16, height: 24, minWidth: 24, border: "2px solid #1f2937", borderRadius: "50%", boxShadow: "none", padding: "0 6px" } }}>
          <FavoriteIcon sx={{ color: "#e53935", fontSize: 32 }} />
        </Badge>

        <IconButton
        onClick={() => navigate("/client-design-history")}
        sx={{ color: "#1f2937" }}
      >
        <AccountCircleIcon sx={{ fontSize: 32 }} />
      </IconButton>
      </Box>
    )}

    {/* Filters */}
    <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
      <TextField
        placeholder="Search category or theme"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormGroup row>
        {designCategories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                sx={{
                  color: "#1f2937",
                  '&.Mui-checked': {
                    color: "#99a5b6"
                  }
                }}
              />
            }
            label={cat}
          />
        ))}
      </FormGroup>
    </Box>

    {/* Design Cards */}
    <Grid container spacing={4} alignItems="stretch">
      {filteredDesigns.map((d) => {
        const id = d.id;
        const isWishlisted = wishlist.includes(id);
        const imageUrl = d.image ? `data:image/jpeg;base64,${d.image}` : "https://via.placeholder.com/300x180";
        return (
          <Grid item xs={12} sm={6} md={3} lg={2} key={id} sx={{ display: "flex" }}>
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
                  height="190"
                  image={imageUrl}
                  sx={{ objectFit: "cover", cursor: "pointer", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  onClick={() => handleSeeMore(id)}
                />
                <IconButton
                  onClick={() => handleWishlistToggle(id)}
                  sx={{
                    position: "absolute",
                    top: 185,
                    left: 130,
                    color: isWishlisted ? "#e53935" : "#aaa",
                  }}
                >
                  {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 1 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{ color: "#1f2937", fontSize: 16, mb: 0.7 }}
                >
                  {d.category}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#1f2937", fontSize: 15, mb: 0.7, fontWeight: 400 }}
                >
                  {d.theme}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#1f2937", fontSize: 15, mb: 0.7, fontWeight: 400 }}
                >
                  {d.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <Rating
                    value={ratings[id] || 0}
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
                    ({(ratings[id] || 0).toFixed(1)})
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={700} sx={{ color: "#1f2937", fontSize: 14 }}>
                  ₹{d.estimatedCost}
                </Typography>
              </CardContent>
              <Box sx={{ display: "极", justifyContent: "space-between", alignItems: "center", px: 2, pb: 2, pt: 1 }}>
              {d.userId && (
  <Button
    onClick={() => navigate(`/designer-profile/${d.userId}`)}
    variant="contained"
    size="small"
    sx={{
      ...gradientButtonSx,
      width: 140,
      fontSize: 12,
      px: 1,
      py: 0.5,
      minWidth: 0,
      marginTop: -2,
      height: 33,
      marginLeft: -1
    }}
  >
    View Profile
  </Button>
)}
                <Button
                  variant="text"
                  sx={{
                    ...gradientTextSx,
                    fontSize: 12,
                    width: 140,
                    border: "1.2px solid #1f2937",
                    marginLeft: 2,
                    height: 33,
                    marginTop: -2,
                  }}
                  onClick={() => handleSeeMore(id)}
                >
                  See More
                </Button>
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>

    {/* Wishlist Dialog */}
    <Dialog open={showWishlist} onClose={() => setShowWishlist(false)} fullWidth maxWidth="md">
      <DialogTitle sx={{ color: "#1f2937", fontWeight: 700, letterSpacing: 1 }}>
        My Wishlist
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#f6f8fa" }}>
        {wishlistDesigns.length === 0 ? (
          <Typography>No items in wishlist.</Typography>
        ) : (
          <Grid container spacing={3}>
  {wishlistDesigns.map(d => (
    <Grid item xs={12} sm={6} md={4} key={d.id} sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: 240,
          height: 340,
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
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={d.image ? `data:image/jpeg;base64,${d.image}` : "https://via.placeholder.com/240x120"}
            sx={{
              height: 150,
              width: "100%",
              objectFit: "cover",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              bgcolor: "#e5e7eb"
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "#1f2937",
              color: "#fff",
              borderRadius: 2,
              px: 1.5,
              py: 0.3,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 0.5,
              boxShadow: 1
            }}
          >
            {d.category}
          </Box>
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#1f2937",
                fontWeight: 700,
                fontSize: 15,
                mb: 0.5,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
              }}
            >
              {d.theme}
            </Typography>
            <Typography
              sx={{
                color: "#4AC304",
                fontWeight: 700,
                fontSize: 16,
                mb: 1
              }}
            >
              ₹{d.estimatedCost}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
            

            <Button
              onClick={() => navigate(`/contact-designer/${d.id}`)}
              variant="outlined"
              sx={gradientOutlinedSx}
            >
              Contact Designer
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{
                fontWeight: 700,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 13
              }}
              onClick={() => handleRemove(d.id)}
            >
              Remove
            </Button>
            
            
          </Box>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

        )}
      </DialogContent>
    </Dialog>

    {/* See More Dialog */}
    <Dialog open={seeMoreDialogOpen} onClose={() => setSeeMoreDialogOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#1f2937" }}>Design Details</DialogTitle>
      <DialogContent>
        {selectedDesign ? (
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
                image={selectedDesign.image ? `data:image/jpeg;base64,${selectedDesign.image}` : "https://via.placeholder.com/300x200"}
                alt={selectedDesign.category}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600} mb={1} sx={{ color: "#1f2937" }}>{selectedDesign.category}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}><strong>Theme:</strong> {selectedDesign.theme}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}><strong>Cost:</strong> ₹{selectedDesign.estimatedCost}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}><strong>Bio:</strong> {selectedDesign.bio || "No bio available"}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}><strong>Description:</strong> {selectedDesign.description}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Rating value={ratings[selectedDesign.id] || 0} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#FFD700' } }} />
                  <Typography ml={1} color="text.secondary">
                    ({(ratings[selectedDesign.id] || 0).toFixed(1)})
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />

            {/* Rate Now Button or Review Form */}
            {!showReviewForm ? (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                
              </Box>
            ) : (
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  bgcolor: "#f8fafc",
                  borderRadius: 2,
                  p: 2,
                  boxShadow: 1,
                  mb: 2
                }}
              >
                <Typography variant="h6" mb={1} sx={{ color: "#1f2937" }}>Leave a Review</Typography>
                <Rating
                  name="review"
                  value={ratingDialog.stars}
                  onChange={(e, v) => setRatingDialog(d => ({ ...d, stars: v }))}
                  sx={{ '& .MuiRating-iconFilled': { color: '#FFD700' } }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Your comment..."
                  value={ratingDialog.comment}
                  onChange={e => setRatingDialog(d => ({ ...d, comment: e.target.value }))}
                  sx={{ borderRadius: 2, bgcolor: "#fff" }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                  <Button
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                    onClick={() => setShowReviewForm(false)}
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
                    onClick={() => {
                      handleRatingSubmit();
                      setShowReviewForm(false);
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" mb={1} sx={{ color: "#1f2937" }}>Reviews</Typography>
            {reviews.length === 0 ? (
              <Typography color="text.secondary">No reviews yet.</Typography>
            ) : (
              reviews.map((r, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Rating value={r.rating} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: '#FFD700' } }} />
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    {r.comment}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))
            )}
          </Box>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </DialogContent>
    </Dialog>

    <Dialog open={reviewModalOpen} onClose={() => setReviewModalOpen(false)} maxWidth="xs" fullWidth>
  <DialogTitle sx={{ color: "#1f2937", fontWeight: 700 }}>Leave a Review</DialogTitle>
  <DialogContent sx={{ bgcolor: "#f8fafc" }}>
    {reviewDesign && (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <Typography sx={{ color: "#1f2937", fontWeight: 600 }}>
          {reviewDesign.category} — {reviewDesign.theme}
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
              // Submit review for design
              await fetch(SUBMIT_RATING_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  designId: reviewDesign.id,
                  rating: reviewDialog.stars,
                  comment: reviewDialog.comment,
                  userId: userId
                })
              });
              // Optionally, refresh ratings/reviews here
              setReviewModalOpen(false);
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    )}
  </DialogContent>
</Dialog>


    {/* Contact Designer Dialog */}
    {/* <ContactRequestPage
      open={contactDialog.open}
      onClose={() => setContactDialog({ open: false, design: null })}
      design={contactDialog.design}
    />
    */}
  </Box>
);
};

export default DesignGallery;
