// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import './ContactRequestPage.css'; // Import your CSS file
// import {
//   Container, Paper, Button, Box, TextField, Typography
// } from '@mui/material';

// const ContactRequestPage = () => {
//   const { designId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     userId: '',
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     bookingDate: '',
//     scheduledDate: '',
//     message: '',
//     designId: ''
//   });
//   const [feedback, setFeedback] = useState('');
//   const userEmail = localStorage.getItem('userEmail');
//   const today = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     if (userEmail) {
//       axios.get(`http://localhost:8081/api/users/email/${userEmail}`)
//         .then(res => {
//           const { id, fullName, email } = res.data;
//           setFormData(prev => ({
//             ...prev,
//             userId: id,
//             fullName,
//             email,
//             bookingDate: today
//           }));
//         })
//         .catch(err => console.error('Error fetching user:', err));
//     }
//   }, [userEmail, today]);

//   useEffect(() => {
//     if (designId) {
//       setFormData(prev => ({
//         ...prev,
//         designId
//       }));
//     }
//   }, [designId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
//     try {
//       const payload = {
//         userId: formData.userId,
//         designId: formData.designId,
//         message: formData.message,
//         phoneNumber: formData.phoneNumber,
//         bookingDate: formData.bookingDate,
//         scheduledDate: formData.scheduledDate
//       };
//       const response = await axios.post('http://localhost:8085/api/contact-requests', payload);
//       if (response.status === 200 || response.status === 201) {
//         setFeedback('Request sent successfully!');
//         setFormData(prev => ({
//           ...prev,
//           message: '',
//           phoneNumber: '',
//           bookingDate: today,
//           scheduledDate: ''
//         }));
//       } else {
//         setFeedback('Failed to send request.');
//       }
//     } catch (error) {
//       setFeedback('Error: ' + (error.response?.data?.message || 'Server error'));
//     }
//   };

//   return (
//     <Container maxWidth="sm" className="contact-request-container">
//       <Paper elevation={4} className="contact-request-paper">
//         <h2 className="contact-request-title">Contact Designer</h2>
//         <form className="contact-request-form" onSubmit={handleSubmit}>
//           <TextField
//             label="Full Name"
//             name="fullName"
//             value={formData.fullName}
//             InputProps={{ readOnly: true }}
//             variant="outlined"
//             size="small"
//             className="contact-request-input"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             InputProps={{ readOnly: true }}
//             variant="outlined"
//             size="small"
//             className="contact-request-input"
//           />
//           <TextField
//             label="Phone Number"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             required
//             inputProps={{ pattern: "[0-9]{10,15}" }}
//             className="contact-request-input"
//           />
//           <TextField
//             label="Booking Date"
//             name="bookingDate"
//             type="date"
//             value={formData.bookingDate || today}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             required
//             InputLabelProps={{ shrink: true }}
//             className="contact-request-input"
//           />
//           <TextField
//             label="Scheduled Date"
//             name="scheduledDate"
//             type="date"
//             value={formData.scheduledDate}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             required
//             InputLabelProps={{ shrink: true }}
//             className="contact-request-input"
//           />
//           <TextField
//             label="Message / Project Details"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             multiline
//             minRows={3}
//             maxRows={6}
//             variant="outlined"
//             size="small"
//             required
//             className="contact-request-input"
//           />
//           {feedback && (
//             <Typography className={`contact-request-feedback ${feedback.includes("success") ? "success" : "error"}`}>
//               {feedback}
//             </Typography>
//           )}
//           <Box className="contact-request-actions">
//             <Button onClick={() => navigate(-1)} className="contact-request-back" type="button">
//               Back
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               className="contact-request-submit"
//             >
//               Send Request
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default ContactRequestPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import './ContactRequestPage.css';
// import {
//   Container, Paper, Button, Box, TextField, Typography
// } from '@mui/material';

// const ContactRequestPage = () => {
//   const { designId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     userId: '',
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     bookingDate: '',
//     scheduledDate: '',
//     message: '',
//     designId: ''
//   });
//   const [feedback, setFeedback] = useState('');
//   const [phoneError, setPhoneError] = useState('');
//   const userEmail = localStorage.getItem('userEmail');
//   const today = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     if (userEmail) {
//       axios.get(`http://localhost:8081/api/users/email/${userEmail}`)
//         .then(res => {
//           const { id, fullName, email } = res.data;
//           setFormData(prev => ({
//             ...prev,
//             userId: id,
//             fullName,
//             email,
//             bookingDate: today
//           }));
//         })
//         .catch(err => console.error('Error fetching user:', err));
//     }
//   }, [userEmail, today]);

//   useEffect(() => {
//     if (designId) {
//       setFormData(prev => ({
//         ...prev,
//         designId
//       }));
//     }
//   }, [designId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Validate phone number on change
//     if (name === "phoneNumber") {
//       const phoneRegex = /^[0-9]{10,15}$/;
//       if (!phoneRegex.test(value)) {
//         setPhoneError("Phone number must be 10 to 15 digits.");
//       } else {
//         setPhoneError("");
//       }
//     }
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();

//     // Final phone number validation before submit
//     const phoneRegex = /^[0-9]{10,15}$/;
//     if (!phoneRegex.test(formData.phoneNumber)) {
//       setPhoneError("Phone number must be 10 to 15 digits.");
//       return;
//     } else {
//       setPhoneError("");
//     }

//     try {
//       const payload = {
//         userId: formData.userId,
//         designId: formData.designId,
//         message: formData.message,
//         phoneNumber: formData.phoneNumber,
//         bookingDate: formData.bookingDate,
//         scheduledDate: formData.scheduledDate
//       };
//       const response = await axios.post('http://localhost:8085/api/contact-requests', payload);
//       if (response.status === 200 || response.status === 201) {
//         setFeedback('Request sent successfully!');
//         setFormData(prev => ({
//           ...prev,
//           message: '',
//           phoneNumber: '',
//           bookingDate: today,
//           scheduledDate: ''
//         }));
//       } else {
//         setFeedback('Failed to send request.');
//       }
//     } catch (error) {
//       setFeedback('Error: ' + (error.response?.data?.message || 'Server error'));
//     }
//   };

//   return (
//     <Container maxWidth="sm" className="contact-request-container">
//       <Paper elevation={4} className="contact-request-paper">
//         <h2 className="contact-request-title">Contact Designer</h2>
//         <form className="contact-request-form" onSubmit={handleSubmit}>
//           <TextField
//             label="Full Name"
//             name="fullName"
//             value={formData.fullName}
//             InputProps={{ readOnly: true }}
//             variant="outlined"
//             size="small"
//             className="contact-request-input"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             InputProps={{ readOnly: true }}
//             variant="outlined"
//             size="small"
//             className="contact-request-input"
//           />
//           <TextField
//             label="Phone Number"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             required
//             className="contact-request-input"
//             error={!!phoneError}
//             helperText={phoneError}
//           />
//           <TextField
//             label="Booking Date"
//             name="bookingDate"
//             type="date"
//             value={formData.bookingDate || today}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             required
//             InputLabelProps={{ shrink: true }}
//             className="contact-request-input"
//           />
//           <TextField
//             label="Scheduled Date"
//             name="scheduledDate"
//             type="date"
//             value={formData.scheduledDate}
//             onChange={handleChange}
//             variant="outlined"
//             size="small"
//             required
//             InputLabelProps={{ shrink: true }}
//             className="contact-request-input"
//           />
//           <TextField
//             label="Message / Project Details"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             multiline
//             minRows={3}
//             maxRows={6}
//             variant="outlined"
//             size="small"
//             required
//             className="contact-request-input"
//           />
//           {feedback && (
//             <Typography className={`contact-request-feedback ${feedback.includes("success") ? "success" : "error"}`}>
//               {feedback}
//             </Typography>
//           )}
//           <Box className="contact-request-actions">
//             <Button onClick={() => navigate(-1)} className="contact-request-back" type="button">
//               Back
//             </Button>
//             <Button
//               type="submit"
//               variant="contained"
//               className="contact-request-submit"
//               disabled={!!phoneError}
//             >
//               Send Request
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default ContactRequestPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ContactRequestPage.css';
import {
  Container, Paper, Button, Box, TextField, Typography, Dialog, DialogTitle, DialogContent, Rating
} from '@mui/material';

const ContactRequestPage = () => {
  const { designId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    bookingDate: '',
    scheduledDate: '',
    message: '',
    designId: ''
  });
  const [feedback, setFeedback] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userEmail = localStorage.getItem('userEmail');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:8081/api/users/email/${userEmail}`)
        .then(res => {
          const { id, fullName, email } = res.data;
          setFormData(prev => ({
            ...prev,
            userId: id,
            fullName,
            email,
            bookingDate: today
          }));
        })
        .catch(err => console.error('Error fetching user:', err));
    }
  }, [userEmail, today]);

  useEffect(() => {
    if (designId) {
      setFormData(prev => ({
        ...prev,
        designId
      }));
    }
  }, [designId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate phone number on change
    if (name === "phoneNumber") {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(value)) {
        setPhoneError("Phone number must be 10 to 15 digits.");
      } else {
        setPhoneError("");
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Final phone number validation before submit
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setPhoneError("Phone number must be 10 to 15 digits.");
      return;
    } else {
      setPhoneError("");
    }

    try {
      const payload = {
        userId: formData.userId,
        designId: formData.designId,
        message: formData.message,
        phoneNumber: formData.phoneNumber,
        bookingDate: formData.bookingDate,
        scheduledDate: formData.scheduledDate
      };
      const response = await axios.post('http://localhost:8085/api/contact-requests', payload);
      if (response.status === 200 || response.status === 201) {
        setFeedback('Request sent successfully!');
        setFormData(prev => ({
          ...prev,
          message: '',
          phoneNumber: '',
          bookingDate: today,
          scheduledDate: ''
        }));
        setShowRatingModal(true); // <-- Show the rating modal here!
      } else {
        setFeedback('Failed to send request.');
      }
    } catch (error) {
      setFeedback('Error: ' + (error.response?.data?.message || 'Server error'));
    }
  };

  // Rating modal submit handler
  const handleSubmitRating = async () => {
    try {
      await axios.post('http://localhost:8083/api/customer/ratings', {
        designId: formData.designId,
        userId: formData.userId,
        rating,
        comment
      });
      setShowRatingModal(false);
      setRating(0);
      setComment('');
      navigate("/client-design-history");
    } catch (error) {
      setShowRatingModal(false);
      navigate("/client-design-history");
    }
  };
  

  return (
    <Container maxWidth="sm" className="contact-request-container">
      <Paper elevation={4} className="contact-request-paper">
        <h2 className="contact-request-title">Contact Designer</h2>
        <form className="contact-request-form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            InputProps={{ readOnly: true }}
            variant="outlined"
            size="small"
            className="contact-request-input"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            InputProps={{ readOnly: true }}
            variant="outlined"
            size="small"
            className="contact-request-input"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            variant="outlined"
            size="small"
            required
            className="contact-request-input"
            error={!!phoneError}
            helperText={phoneError}
          />
          <TextField
            label="Booking Date"
            name="bookingDate"
            type="date"
            value={formData.bookingDate || today}
            onChange={handleChange}
            variant="outlined"
            size="small"
            required
            InputLabelProps={{ shrink: true }}
            className="contact-request-input"
          />
          <TextField
            label="Scheduled Date"
            name="scheduledDate"
            type="date"
            value={formData.scheduledDate}
            onChange={handleChange}
            variant="outlined"
            size="small"
            required
            InputLabelProps={{ shrink: true }}
            className="contact-request-input"
          />
          <TextField
            label="Message / Project Details"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            minRows={3}
            maxRows={6}
            variant="outlined"
            size="small"
            required
            className="contact-request-input"
          />
          {feedback && (
            <Typography className={`contact-request-feedback ${feedback.includes("success") ? "success" : "error"}`}>
              {feedback}
            </Typography>
          )}
          <Box className="contact-request-actions">
            <Button onClick={() => navigate(-1)} className="contact-request-back" type="button">
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="contact-request-submit"
              disabled={!!phoneError}
            >
              Send Request
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Rating Modal */}
      <Dialog open={showRatingModal} onClose={() => setShowRatingModal(false)}>
        <DialogTitle>Rate Your Experience</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography sx={{ mb: 2 }}>How would you rate your experience?</Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Comments (optional)"
              multiline
              rows={3}
              fullWidth
              value={comment}
              onChange={e => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSubmitRating}
              disabled={rating === 0}
              fullWidth
            >
              Submit Rating
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ContactRequestPage;
