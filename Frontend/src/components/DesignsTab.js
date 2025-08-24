// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   TextField,
//   Grid,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import axios from "axios";

// const DesignsTab = ({ userId }) => {
//   const [designs, setDesigns] = useState([]);
//   const [openForm, setOpenForm] = useState(false);
//   const [formMode, setFormMode] = useState("add");
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [formData, setFormData] = useState({
//     bio: "",
//     theme: "",
//     category: "",
//     description: "",
//     estimatedCost: "",
//     image: null,
//   });
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     fetchDesigns();
//   }, [userId]);

//   const fetchDesigns = () => {
//     axios
//       .get(`http://localhost:8082/api/designer/${userId}/designs`, {
//         withCredentials: true,
//       })
//       .then((res) => setDesigns(res.data))
//       .catch(() =>
//         setSnackbar({
//           open: true,
//           message: "Failed to load designs",
//           severity: "error",
//         })
//       );
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleEdit = (design) => {
//     setFormMode("edit");
//     setSelectedDesign(design);
//     setFormData({
//       bio: design.bio,
//       theme: design.theme,
//       category: design.category,
//       description: design.description,
//       estimatedCost: design.estimatedCost,
//       image: null,
//     });
//     setOpenForm(true);
//   };

//   const handleDelete = (designId) => {
//     axios
//       .delete(`http://localhost:8082/api/designer/${userId}/designs/${designId}`, {
//         withCredentials: true,
//       })
//       .then(() => {
//         setDesigns((prev) => prev.filter((d) => d.id !== designId));
//         setSnackbar({
//           open: true,
//           message: "Design deleted successfully!",
//           severity: "success",
//         });
//       })
//       .catch(() =>
//         setSnackbar({
//           open: true,
//           message: "Failed to delete design",
//           severity: "error",
//         })
//       );
//   };

//   const handleFormSubmit = () => {
//     const multipartData = new FormData();
//     const jsonPart = {
//       bio: formData.bio,
//       theme: formData.theme,
//       category: formData.category,
//       description: formData.description,
//       estimatedCost: formData.estimatedCost,
//     };

//     multipartData.append("data", new Blob([JSON.stringify(jsonPart)], { type: "application/json" }));

//     if (formData.image) {
//       multipartData.append("image", formData.image);
//     }

//     const endpoint =
//       formMode === "add"
//         ? `http://localhost:8082/api/designer/${userId}/designs`
//         : `http://localhost:8082/api/designer/${userId}/designs/${selectedDesign.id}`;

//     const request =
//       formMode === "add"
//         ? axios.post(endpoint, multipartData, { withCredentials: true })
//         : axios.put(endpoint, multipartData, { withCredentials: true });

//     request
//       .then(() => {
//         setOpenForm(false);
//         setSnackbar({
//           open: true,
//           message: `Design ${formMode === "add" ? "added" : "updated"} successfully!`,
//           severity: "success",
//         });
//         fetchDesigns(); // Refresh without reloading
//       })
//       .catch(() =>
//         setSnackbar({
//           open: true,
//           message: "Failed to submit design",
//           severity: "error",
//         })
//       );
//   };

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h5">My Designs</Typography>
//         <Button
//           variant="contained"
//           onClick={() => {
//             setFormMode("add");
//             setFormData({
//               bio: "",
//               theme: "",
//               category: "",
//               description: "",
//               estimatedCost: "",
//               image: null,
//             });
//             setOpenForm(true);
//           }}
//         >
//           Add Design
//         </Button>
//       </Box>

//       <Grid container spacing={3}>
//         {designs.map((design) => (
//           <Grid item xs={12} sm={6} md={4} key={design.id}>
//             <Card sx={{ height: "100%" }}>
//               {design.image && (
//                 <CardMedia
//                   component="img"
//                   height="160"
//                   image={`data:image/jpeg;base64,${design.image}`}
//                   alt={design.theme}
//                 />
//               )}
//               <CardContent>
//                 <Typography variant="h6">{design.theme}</Typography>
//                 <Typography variant="body2">
//                   <strong>Bio:</strong> {design.bio}
//                 </Typography>
//                 <Typography variant="body2">
//                   <strong>Category:</strong> {design.category}
//                 </Typography>
//                 <Typography variant="body2">
//                   <strong>Description:</strong> {design.description}
//                 </Typography>
//                 <Typography variant="body2">
//                   <strong>Estimated Cost:</strong> ₹{design.estimatedCost}
//                 </Typography>
//                 <Box mt={1} display="flex" justifyContent="space-between">
//                   <Button size="small" variant="outlined" onClick={() => handleEdit(design)}>
//                     Edit
//                   </Button>
//                   <Button
//                     size="small"
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDelete(design.id)}
//                   >
//                     Delete
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Form Dialog */}
//       <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//         <DialogTitle>{formMode === "add" ? "Add Design" : "Edit Design"}</DialogTitle>
//         <DialogContent dividers>
//           <TextField label="Bio" name="bio" fullWidth value={formData.bio} onChange={handleChange} margin="normal" />
//           <TextField label="Theme" name="theme" fullWidth value={formData.theme} onChange={handleChange} margin="normal" />
//           <TextField label="Category" name="category" fullWidth value={formData.category} onChange={handleChange} margin="normal" />
//           <TextField label="Description" name="description" fullWidth multiline rows={3} value={formData.description} onChange={handleChange} margin="normal" />
//           <TextField label="Estimated Cost" name="estimatedCost" fullWidth value={formData.estimatedCost} onChange={handleChange} margin="normal" />
//           <Button variant="contained" component="label" sx={{ mt: 2 }}>
//             Upload Image
//             <input type="file" name="image" hidden accept="image/*" onChange={handleChange} />
//           </Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenForm(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleFormSubmit}>
//             {formMode === "add" ? "Add" : "Update"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default DesignsTab;

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

const DesignsTab = ({ userId }) => {
  const [designs, setDesigns] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [formData, setFormData] = useState({
    bio: "",
    theme: "",
    category: "",
    description: "",
    estimatedCost: "",
    image: null,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchDesigns();
    // eslint-disable-next-line
  }, [userId]);

  const fetchDesigns = () => {
    axios
      .get(`http://localhost:8082/api/designer/${userId}/designs`, {
        withCredentials: true,
      })
      .then((res) => setDesigns(res.data))
      .catch(() =>
        setSnackbar({
          open: true,
          message: "Failed to load designs",
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

  const handleEdit = (design) => {
    setFormMode("edit");
    setSelectedDesign(design);
    setFormData({
      bio: design.bio,
      theme: design.theme,
      category: design.category,
      description: design.description,
      estimatedCost: design.estimatedCost,
      image: null,
    });
    setOpenForm(true);
  };

  const handleDelete = (designId) => {
    axios
      .delete(`http://localhost:8082/api/designer/${userId}/designs/${designId}`, {
        withCredentials: true,
      })
      .then(() => {
        setDesigns((prev) => prev.filter((d) => d.id !== designId));
        setSnackbar({
          open: true,
          message: "Design deleted successfully!",
          severity: "success",
        });
      })
      .catch(() =>
        setSnackbar({
          open: true,
          message: "Failed to delete design",
          severity: "error",
        })
      );
  };

  const handleFormSubmit = () => {
    const multipartData = new FormData();
    const jsonPart = {
      bio: formData.bio,
      theme: formData.theme,
      category: formData.category,
      description: formData.description,
      estimatedCost: formData.estimatedCost,
    };

    multipartData.append("data", new Blob([JSON.stringify(jsonPart)], { type: "application/json" }));

    if (formData.image) {
      multipartData.append("image", formData.image);
    }

    const endpoint =
      formMode === "add"
        ? `http://localhost:8082/api/designer/${userId}/designs`
        : `http://localhost:8082/api/designer/${userId}/designs/${selectedDesign.id}`;

    const request =
      formMode === "add"
        ? axios.post(endpoint, multipartData, { withCredentials: true })
        : axios.put(endpoint, multipartData, { withCredentials: true });

    request
      .then(() => {
        setOpenForm(false);
        setSnackbar({
          open: true,
          message: `Design ${formMode === "add" ? "added" : "updated"} successfully!`,
          severity: "success",
        });
        fetchDesigns(); // Refresh without reloading
      })
      .catch(() =>
        setSnackbar({
          open: true,
          message: "Failed to submit design",
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
          My Designs
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
              estimatedCost: "",
              image: null,
            });
            setOpenForm(true);
          }}
          sx={{
            background: primaryGradient,
            opacity: buttonOpacity,
            fontWeight: 600,
            width:300,
            height:35,
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
          Add Design
        </Button>
      </Box>

      <Grid container spacing={3}>
        {designs.map((design) => (
          <Grid item xs={12} sm={6} md={4} key={design.id}>
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
              {design.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={`data:image/jpeg;base64,${design.image}`}
                  alt={design.theme}
                  sx={{
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                    objectFit: "cover",
                  }}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: "#1f2937", fontWeight: 600 }}>
                  {design.theme}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4c5666" }}>
                  <strong>Bio:</strong> {design.bio}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4c5666" }}>
                  <strong>Category:</strong> {design.category}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4c5666" }}>
                  <strong>Description:</strong> {design.description}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4c5666" }}>
                  <strong>Estimated Cost:</strong> ₹{design.estimatedCost}
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleEdit(design)}
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
                    onClick={() => handleDelete(design.id)}
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
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm"
        PaperProps={{
          sx: {
            background: secondaryBg,
            borderRadius: "16px",
            boxShadow: cardShadow,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#1f2937" }}>
          {formMode === "add" ? "Add Design" : "Edit Design"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField label="Bio" name="bio" fullWidth value={formData.bio} onChange={handleChange} margin="normal" />
          <TextField label="Theme" name="theme" fullWidth value={formData.theme} onChange={handleChange} margin="normal" />
          <TextField label="Category" name="category" fullWidth value={formData.category} onChange={handleChange} margin="normal" />
          <TextField label="Description" name="description" fullWidth multiline rows={3} value={formData.description} onChange={handleChange} margin="normal" />
          <TextField label="Estimated Cost" name="estimatedCost" fullWidth value={formData.estimatedCost} onChange={handleChange} margin="normal" />
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
          <Button onClick={() => setOpenForm(false)}
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

export default DesignsTab;
