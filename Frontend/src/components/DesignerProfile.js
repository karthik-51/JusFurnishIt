import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import axios from "axios";
const DesignerProfile = ({ userId }) => {
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    experience: "",
    description: ""
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8082/api/designer/${userId}/profile`, {
          withCredentials: true
        })
        .then((res) => {
          const { name, location, experience, description } = res.data;
          setProfile({
            name: name || "",
            location: location || "",
            experience: experience || "",
            description: description || ""
          });
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setSnackbar({
            open: true,
            message: "Failed to load profile",
            severity: "error"
          });
        })
        .finally(() => setLoading(false));
    }
  }, [userId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    axios
      .post(`http://localhost:8082/api/designer/${userId}/profile`, profile, {
        withCredentials: true
      })
      .then(() => {
        setSnackbar({
          open: true,
          message: "Profile updated successfully!",
          severity: "success"
        });
        setEditing(false);
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Failed to update profile",
          severity: "error"
        });
      });
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar sx={{ width: 80, height: 80 }}>
          {profile.name?.charAt(0).toUpperCase() || "D"}
        </Avatar>
      </Box>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Designer Profile
      </Typography>
      <TextField
        label="Name"
        name="name"
        fullWidth
        value={profile.name}
        onChange={handleChange}
        disabled={!editing}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Location"
        name="location"
        fullWidth
        value={profile.location}
        onChange={handleChange}
        disabled={!editing}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Experience"
        name="experience"
        fullWidth
        value={profile.experience}
        onChange={handleChange}
        disabled={!editing}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        fullWidth
        multiline
        rows={3}
        value={profile.description}
        onChange={handleChange}
        disabled={!editing}
        sx={{ mb: 2 }}
      />
      <Box display="flex" justifyContent="center" mt={2}>
        {editing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={
              !profile.name || !profile.location || !profile.experience
            }
          >
            Save
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => setEditing(true)}>
            Edit Profile
          </Button>
        )}
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
export default DesignerProfile;














    