// import React from "react";
// import { Paper, Avatar, Typography, TextField, Button } from "@mui/material";

// const ProfileTab = ({
//   designerInfo,
//   editProfile,
//   editingProfile,
//   handleProfileChange,
//   handleProfileEdit,
//   handleProfileSave,
// }) => (
//   <Paper
//     elevation={3}
//     sx={{ p: 4, textAlign: "center", borderRadius: 4, background: "#fff" }}
//   >
//     <Avatar
//       src={designerInfo.image}
//       alt={designerInfo.name}
//       sx={{
//         width: 120,
//         height: 120,
//         mx: "auto",
//         mb: 2,
//         border: "4px solid #6d3afc",
//         boxShadow: 2,
//       }}
//     />
//     {editingProfile ? (
//       <>
//         <TextField
//           label="Name"
//           name="name"
//           value={editProfile.name}
//           onChange={handleProfileChange}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Location"
//           name="location"
//           value={editProfile.location}
//           onChange={handleProfileChange}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Description"
//           name="description"
//           value={editProfile.description}
//           onChange={handleProfileChange}
//           fullWidth
//           multiline
//           minRows={2}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Experience"
//           name="experience"
//           value={editProfile.experience}
//           onChange={handleProfileChange}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <Button
//           variant="contained"
//           sx={{ mt: 1, px: 4, py: 1.5, borderRadius: 2, background: "#6d3afc" }}
//           onClick={handleProfileSave}
//         >
//           Save
//         </Button>
//       </>
//     ) : (
//       <>
//         <Typography variant="h5" fontWeight="bold" mb={1}>
//           {designerInfo.name}
//         </Typography>
//         <Typography color="text.secondary" mb={1}>
//           {designerInfo.location}
//         </Typography>
//         <Typography mb={2}>{designerInfo.description}</Typography>
//         <Typography fontWeight="bold" color="#1976d2">
//           {designerInfo.experience}
//         </Typography>
//         <Button
//           variant="outlined"
//           sx={{ mt: 2, borderColor: "#6d3afc", color: "#6d3afc" }}
//           onClick={handleProfileEdit}
//         >
//           Edit
//         </Button>
//       </>
//     )}
//   </Paper>
// );

// export default ProfileTab;


import React from "react";
import { Paper, Avatar, Typography, TextField, Button, Box } from "@mui/material";

const primaryGradient = "linear-gradient(90deg, #4c5666 0%, #1f2937 100%)";
const cardShadow = "0 6px 32px #1f293733";
const buttonOpacity = 0.92;

const ProfileTab = ({
  designerInfo,
  editProfile,
  editingProfile,
  handleProfileChange,
  handleProfileEdit,
  handleProfileSave,
}) => (
  <Paper
    elevation={3}
    sx={{
      p: { xs: 2, sm: 4 },
      textAlign: "center",
      borderRadius: "16px",
      background: "rgba(255,255,255,0.96)",
      boxShadow: cardShadow,
      maxWidth: 420,
      mx: "auto",
      mt: 3,
      mb: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "box-shadow 0.2s, transform 0.2s",
      "&:hover": {
        boxShadow: "0 8px 36px #1f293744",
        transform: "translateY(-2px) scale(1.012)",
      },
    }}
  >
    <Avatar
      src={designerInfo.image}
      alt={designerInfo.name}
      sx={{
        width: 120,
        height: 120,
        mx: "auto",
        mb: 2,
        border: "4px solid #4c5666",
        boxShadow: "0 2px 10px #1f293733",
        background: "#f6f7fa",
      }}
    />
    {editingProfile ? (
      <Box sx={{ width: "100%" }}>
        <TextField
          label="Name"
          name="name"
          value={editProfile.name}
          onChange={handleProfileChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Location"
          name="location"
          value={editProfile.location}
          onChange={handleProfileChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          value={editProfile.description}
          onChange={handleProfileChange}
          fullWidth
          multiline
          minRows={2}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Experience"
          name="experience"
          value={editProfile.experience}
          onChange={handleProfileChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          sx={{
            mt: 1,
            px: 4,
            py: 1.5,
            borderRadius: "10px",
            background: primaryGradient,
            opacity: buttonOpacity,
            fontWeight: 700,
            fontSize: "1.08em",
            boxShadow: "0 2px 10px #1f293733",
            letterSpacing: "0.01em",
            transition: "background 0.2s, opacity 0.2s",
            "&:hover": {
              background: "linear-gradient(90deg, #1f2937 0%, #4c5666 100%)",
              opacity: 1,
            },
          }}
          onClick={handleProfileSave}
        >
          Save
        </Button>
      </Box>
    ) : (
      <>
        <Typography variant="h5" fontWeight="bold" mb={1} sx={{ color: "#1f2937" }}>
          {designerInfo.name}
        </Typography>
        <Typography color="#4c5666" mb={1} fontWeight={500}>
          {designerInfo.location}
        </Typography>
        <Typography mb={2} color="#4c5666" fontSize="1.06em">
          {designerInfo.description}
        </Typography>
        <Typography fontWeight="bold" color="#1976d2" mb={2}>
          {designerInfo.experience}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            background: primaryGradient,
            opacity: buttonOpacity,
            color: "#fff",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "1.08em",
            boxShadow: "0 2px 10px #1f293733",
            px: 4,
            py: 1.2,
            letterSpacing: "0.01em",
            border: "none",
            transition: "background 0.2s, opacity 0.2s",
            "&:hover": {
              background: "linear-gradient(90deg, #1f2937 0%, #4c5666 100%)",
              opacity: 1,
            },
          }}
          onClick={handleProfileEdit}
        >
          Edit
        </Button>
      </>
    )}
  </Paper>
);

export default ProfileTab;
