import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const primaryGradient = "linear-gradient(90deg, #4c5666 0%, #1f2937 100%)";
const secondaryBg = "rgba(255,255,255,0.96)";
const cardShadow = "0 6px 32px #1f293733";
const buttonOpacity = 0.92;

const ProductTab = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    bio: "",
    theme: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [userId]);

  const fetchProducts = () => {
    axios
      .get(`http://localhost:8082/api/designer/${userId}/products`, {
        withCredentials: true,
      })
      .then((res) => setProducts(res.data))
      .catch(() =>
        setSnackbar({
          open: true,
          message: "Failed to load products",
          severity: "error",
        })
      );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEdit = (product) => {
    setFormMode("edit");
    setSelectedProduct(product);
    setFormData({
      bio: product.shortBio,
      theme: product.theme,
      category: product.category,
      description: product.description,
      price: product.price,
      image: null,
    });
    setOpenForm(true);
  };

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:8082/api/designer/${userId}/products/${productId}`, {
        withCredentials: true,
      })
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        setSnackbar({
          open: true,
          message: "Product deleted successfully!",
          severity: "success",
        });
      })
      .catch(() =>
        setSnackbar({
          open: true,
          message: "Failed to delete product",
          severity: "error",
        })
      );
  };

  const handleFormSubmit = () => {
    const multipartData = new FormData();
    const jsonPart = {
      shortBio: formData.bio,
      theme: formData.theme,
      category: formData.category,
      description: formData.description,
      price: parseFloat(formData.price),
    };

    multipartData.append("data", new Blob([JSON.stringify(jsonPart)], { type: "application/json" }));
    if (formData.image) {
      multipartData.append("image", formData.image);
    }

    const endpoint =
      formMode === "add"
        ? `http://localhost:8082/api/designer/${userId}/products`
        : `http://localhost:8082/api/designer/${userId}/products/${selectedProduct.id}`;

    const request =
      formMode === "add"
        ? axios.post(endpoint, multipartData, { withCredentials: true })
        : axios.put(endpoint, multipartData, { withCredentials: true });

    request
      .then(() => {
        setOpenForm(false);
        setSnackbar({
          open: true,
          message: `Product ${formMode === "add" ? "added" : "updated"} successfully!`,
          severity: "success",
        });
        fetchProducts();
      })
      .catch(() =>
        setSnackbar({
          open: true,
          message: "Failed to submit product",
          severity: "error",
        })
      );
  };

  return (
    <Box sx={{ px: { xs: 0, md: 2 } }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{
          background: secondaryBg,
          borderRadius: "14px",
          boxShadow: cardShadow,
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "#1f2937", fontWeight: 700 }}>
          My Products
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setFormMode("add");
            setFormData({
              bio: "",
              theme: "",
              category: "",
              description: "",
              price: "",
              image: null,
            });
            setOpenForm(true);
          }}
          sx={{
            background: primaryGradient,
            opacity: buttonOpacity,
            fontWeight: 600,
            width:250,
            borderRadius: "10px",
            boxShadow: "0 2px 10px #1f293733",
            px: 3,
            py: 1.2,
            fontSize: "1.07em",
            letterSpacing: "0.01em",
            transition: "background 0.2s, opacity 0.2s",
            "&:hover": {
              background: "linear-gradient(90deg, #1f2937 0%, #4c5666 100%)",
              opacity: 1,
            },
          }}
        >
          Add Product
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                height: "100%",
                background: secondaryBg,
                borderRadius: "14px",
                boxShadow: cardShadow,
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.2s, transform 0.2s",
                "&:hover": {
                  boxShadow: "0 8px 36px #1f293744",
                  transform: "translateY(-3px) scale(1.012)",
                },
              }}
            >
              {product.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={`data:image/jpeg;base64,${product.image}`}
                  alt={product.theme}
                  sx={{
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                    objectFit: "cover",
                  }}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: "#1f2937", fontWeight: 600 }}>
                  {product.theme}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4c5666" }}>
                  <strong>Bio:</strong> {product.shortBio}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4c5666" }}>
                  <strong>Category:</strong> {product.category}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4c5666" }}>
                  <strong>Description:</strong> {product.description}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4c5666" }}>
                  <strong>Price:</strong> ₹{product.price}
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleEdit(product)}
                    sx={{
                      background: primaryGradient,
                      opacity: buttonOpacity,
                      color: "#fff",
                      fontWeight: 600,
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px #1f293722",
                      px: 2,
                      transition: "background 0.2s, opacity 0.2s",
                      "&:hover": {
                        background: "linear-gradient(90deg, #1f2937 0%, #4c5666 100%)",
                        opacity: 1,
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(product.id)}
                    sx={{
                      background: "#d32f2f",
                      opacity: buttonOpacity,
                      color: "#fff",
                      fontWeight: 600,
                      borderRadius: "8px",
                      px: 2,
                      boxShadow: "0 2px 8px #1f293722",
                      transition: "background 0.2s, opacity 0.2s",
                      "&:hover": {
                        background: "#b71c1c",
                        opacity: 1,
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Form Dialog */}
      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            background: secondaryBg,
            borderRadius: "16px",
            boxShadow: cardShadow,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#1f2937" }}>
          {formMode === "add" ? "Add Product" : "Edit Product"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField label="Bio" name="bio" fullWidth value={formData.bio} onChange={handleChange} margin="normal" />
          <TextField label="Theme" name="theme" fullWidth value={formData.theme} onChange={handleChange} margin="normal" />
          <TextField label="Category" name="category" fullWidth value={formData.category} onChange={handleChange} margin="normal" />
          <TextField label="Description" name="description" fullWidth multiline rows={3} value={formData.description} onChange={handleChange} margin="normal" />
          <TextField label="Price" name="price" fullWidth value={formData.price} onChange={handleChange} margin="normal" />
          <Button
            variant="contained"
            component="label"
            sx={{
              mt: 2,
              background: primaryGradient,
              opacity: buttonOpacity,
              fontWeight: 700,
              borderRadius: "10px",
              boxShadow: "0 2px 10px #1f293733",
              px: 3,
              fontSize: "1em",
              transition: "background 0.2s, opacity 0.2s",
              "&:hover": {
                background: "linear-gradient(90deg, #1f2937 0%, #4c5666 100%)",
                opacity: 1,
              },
            }}
          >
            Upload Image
            <input type="file" name="image" hidden accept="image/*" onChange={handleChange} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenForm(false)}
            sx={{
              color: "#1f2937",
              fontWeight: 600,
              borderRadius: "8px",
              px: 2,
              "&:hover": { background: "#f6f7fa" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            sx={{
              background: primaryGradient,
              opacity: buttonOpacity,
              color: "#fff",
              fontWeight: 700,
              borderRadius: "10px",
              boxShadow: "0 2px 10px #1f293733",
              px: 3,
              fontSize: "1em",
              transition: "background 0.2s, opacity 0.2s",
              "&:hover": {
                background: "linear-gradient(90deg, #1f2937 0%, #4c5666 100%)",
                opacity: 1,
              },
            }}
          >
            {formMode === "add" ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductTab;
