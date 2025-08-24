// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ViewProfile = () => {
//   const { designerId } = useParams();
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     // Fetch designer profile by user_id
//     fetch(`http://localhost:8082/api/designer/${designerId}/profile`)
//       .then((res) => res.json())
//       .then((data) => setProfile(data));
//   }, [designerId]);

//   if (!profile) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>{profile.name}</h2>
//       <p><strong>Description:</strong> {profile.description}</p>
//       <p><strong>Experience:</strong> {profile.experience} years</p>
//       <p><strong>Location:</strong> {profile.location}</p>
//       {/* Add more profile details as needed */}
//     </div>
//   );
// };

// export default ViewProfile;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Chip,
  Stack,
  Tooltip,
  IconButton
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Breadcrumb from "./Breadcrumb";

const COVER_IMAGE =
  "https://images.unsplash.com/photo-1560185127-6ed189bf02fe?auto=format&fit=crop&w=1000&q=80";

const ViewProfile = () => {
  const { designerId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8082/api/designer/${designerId}/profile`)
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      });
  }, [designerId]);

  if (loading || !profile)
    return <div style={{ padding: 32 }}>Loading...</div>;

  const designerInitial =
    profile.name && profile.name.trim().length > 0
      ? profile.name.trim()[0].toUpperCase()
      : "D";

  const socials = [
    {
      icon: <EmailIcon />,
      label: "Email",
      url: `mailto:${profile.email || "designer@email.com"}`,
      color: "#ff7043"
    },
    {
      icon: <LinkedInIcon />,
      label: "LinkedIn",
      url: profile.linkedin || "#",
      color: "#0077b5"
    },
    {
      icon: <InstagramIcon />,
      label: "Instagram",
      url: profile.instagram || "#",
      color: "#c13584"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        height: "100vh",
        width: "100vw",
        overflow: "hidden", // Prevent scrolling
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        // Color overlay with background image
        background: `
          linear-gradient(
            120deg,
            rgba(255, 236, 210, 0.85) 0%,
            rgba(252, 182, 159, 0.85) 100%
          ),
          url(${COVER_IMAGE}) center/cover no-repeat fixed
        `,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Breadcrumb/>
      <Paper
        elevation={0}
        sx={{
          mt: { xs: 6, md: 10 }, // Move card down from top
          background: "rgba(255,255,255,0.98)",
          padding: { xs: "1.2rem", md: "2rem" },
          borderRadius: "18px",
          boxShadow: "0 8px 40px 0 rgba(40,40,40,0.18), 0 1.5px 6px 0 rgba(255,112,67,0.10)",
          maxWidth: 400,
          width: "95%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "visible",
        }}
      >
        {/* Avatar with gradient ring, inside the card */}
        <Box
          sx={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff7043 0%, #ffb347 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
            mt: -7
          }}
        >
          <Avatar
            sx={{
              width: 94,
              height: 94,
              bgcolor: "#fff",
              color: "#ff7043",
              fontSize: 48,
              fontWeight: 800,
              border: "3px solid #fff",
              boxShadow: "0 2px 12px 0 rgba(255,112,67,0.10)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.06) rotate(-2deg)"
              }
            }}
          >
            {designerInitial}
          </Avatar>
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 900,
            color: "#22223b",
            mb: 0.5,
            letterSpacing: 1
          }}
        >
          {profile.name}
        </Typography>

        <Chip
          icon={<LocationOnIcon />}
          label={profile.location}
          sx={{
            bgcolor: "#fbeee0",
            color: "#ff7043",
            fontWeight: 700,
            mb: 1.5,
            px: 1.2,
            fontSize: 15
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            mb: 1.5,
            bgcolor: "#fff7f0",
            px: 1.5,
            py: 1,
            borderRadius: 2
          }}
        >
          <InfoOutlinedIcon sx={{ color: "#ff7043", mt: "2px" }} />
          <Typography
            variant="body1"
            sx={{
              color: "#333",
              fontSize: 15,
              fontWeight: 500,
              textAlign: "left"
            }}
          >
            {profile.description}
          </Typography>
        </Box>

        <Chip
          icon={<WorkOutlineIcon />}
          label={`${profile.experience} years of experience`}
          sx={{
            bgcolor: "#e0f7fa",
            color: "#00796b",
            fontWeight: 700,
            mb: 1.2,
            px: 1.2,
            fontSize: 14
          }}
        />

        <Stack direction="row" spacing={2} mt={1.5} justifyContent="center">
          {socials.map((s, idx) => (
            <Tooltip key={s.label} title={s.label}>
              <IconButton
                component="a"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: s.color,
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#22223b"
                  },
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)"
                }}
              >
                {s.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ViewProfile;

