// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginType, setLoginType] = useState("user");
//   const [loginError, setLoginError] = useState("");

//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [resetEmail, setResetEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [resetError, setResetError] = useState("");
//   const [resetSuccess, setResetSuccess] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoginError("");

//     try {
//       const res = await fetch("http://localhost:8081/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const contentType = res.headers.get("Content-Type");
//       if (!res.ok) {
//         const errorText = await res.text();
//         setLoginError("Login failed: " + errorText);
//         return;
//       }

//       if (!contentType || !contentType.includes("application/json")) {
//         setLoginError("Server returned invalid response (non-JSON).");
//         return;
//       }

//       const user = await res.json();

//       const normalizedRole = user.role?.toUpperCase();
//       const userId = user.userId || user.id;

//       if (!normalizedRole || !user.email || !userId) {
//         setLoginError("Invalid response from server.");
//         return;
//       }

//       if (
//         (loginType === "designer" && normalizedRole !== "DESIGNER") ||
//         (loginType === "user" && normalizedRole !== "CUSTOMER")
//       ) {
//         setLoginError("Role mismatch. Please check login type.");
//         return;
//       }

//       // Store user data in localStorage
//       localStorage.setItem("userId", userId);
//       localStorage.setItem("userEmail", user.email);
//       localStorage.setItem("userName", user.fullName || user.email);
//       localStorage.setItem("userRole", normalizedRole);
//       localStorage.setItem("token", user.token);

//       if (normalizedRole === "DESIGNER") {
//         navigate("/designer-dashboard", { replace: true });
//       } else {
//         navigate(from, { replace: true });
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setLoginError("Server error. Please try again later.");
//     }
//   };

//   const handlePasswordReset = async () => {
//     setResetError("");
//     setResetSuccess("");

//     if (!resetEmail || !newPassword || !confirmPassword) {
//       setResetError("All fields are required.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setResetError("Passwords do not match.");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:8081/api/users/reset-password/${resetEmail}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ password: newPassword }),
//         }
//       );

//       if (!res.ok) {
//         const errText = await res.text();
//         setResetError("Reset failed: " + errText);
//         return;
//       }

//       setResetSuccess("Password updated successfully!");
//       setTimeout(() => setShowForgotPassword(false), 2000);
//     } catch (err) {
//       console.error("Reset error:", err);
//       setResetError("Server error during password reset.");
//     }
//   };

//   return (
//     <div className="login-container">
//       {!showForgotPassword ? (
//         <form className="login-form" onSubmit={handleSubmit}>
//           <h2 className="login-title">Login</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             className="login-field"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             className="login-field"
//           />

//           <div className="login-role-options">
//             <button
//               type="button"
//               className={`login-role-btn ${loginType === "user" ? "active" : ""}`}
//               onClick={() => setLoginType("user")}
//             >
//               User
//             </button>
//             <button
//               type="button"
//               className={`login-role-btn ${loginType === "designer" ? "active" : ""}`}
//               onClick={() => setLoginType("designer")}
//             >
//               Designer
//             </button>
//           </div>

//           <button type="submit" className="login-action-btn">Login</button>
//           <p className="forgot-password" onClick={() => setShowForgotPassword(true)}>
//             Forgot Password?
//           </p>

//           {loginError && <p className="login-error">{loginError}</p>}
//         </form>
//       ) : (
//         <div className="reset-password-form">
//           <h2>Reset Password</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             value={resetEmail}
//             onChange={(e) => setResetEmail(e.target.value)}
//             className="login-field"
//           />
//           <input
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="login-field"
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="login-field"
//           />

//           <button onClick={handlePasswordReset} className="login-action-btn">
//             Reset Password
//           </button>
//           <button
//             className="back-to-login"
//             onClick={() => setShowForgotPassword(false)}
//           >
//             Back to Login
//           </button>

//           {resetError && <p className="login-error">{resetError}</p>}
//           {resetSuccess && <p className="login-success">{resetSuccess}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";


// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginType, setLoginType] = useState("user");
//   const [loginError, setLoginError] = useState("");
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const [resetEmail, setResetEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [resetError, setResetError] = useState("");
//   const [resetSuccess, setResetSuccess] = useState("");
//   const [showResetPassword, setShowResetPassword] = useState(false);

//   const [showResetPwd, setShowResetPwd] = useState(false);
//   const [showResetConfirmPwd, setShowResetConfirmPwd] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoginError("");

//     try {
//       const res = await fetch("http://localhost:8081/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const contentType = res.headers.get("Content-Type");
//       if (!res.ok) {
//         const errorText = await res.text();
//         setLoginError("Login failed: " + errorText);
//         return;
//       }

//       if (!contentType || !contentType.includes("application/json")) {
//         setLoginError("Server returned invalid response (non-JSON).");
//         return;
//       }

//       const user = await res.json();

//       const normalizedRole = user.role?.toUpperCase();
//       const userId = user.userId || user.id;

//       if (!normalizedRole || !user.email || !userId) {
//         setLoginError("Invalid response from server.");
//         return;
//       }

//       if (
//         (loginType === "designer" && normalizedRole !== "DESIGNER") ||
//         (loginType === "user" && normalizedRole !== "CUSTOMER")
//       ) {
//         setLoginError("Role mismatch. Please check login type.");
//         return;
//       }

//       // Store user data in localStorage
//       localStorage.setItem("userId", userId);
//       localStorage.setItem("userEmail", user.email);
//       localStorage.setItem("userName", user.fullName || user.email);
//       localStorage.setItem("userRole", normalizedRole);
//       localStorage.setItem("token", user.token);


//       if (normalizedRole === "DESIGNER") {
//         navigate("/designer-dashboard", { replace: true });
//       } else {
//         navigate(from, { replace: true });
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setLoginError("Server error. Please try again later.");
//     }
//   };

//   const handlePasswordReset = async () => {
//     setResetError("");
//     setResetSuccess("");

//     if (!resetEmail || !newPassword || !confirmPassword) {
//       setResetError("All fields are required.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setResetError("Passwords do not match.");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:8081/api/users/reset-password/${resetEmail}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ password: newPassword }),
//         }
//       );

//       if (!res.ok) {
//         const errText = await res.text();
//         setResetError("Reset failed: " + errText);
//         return;
//       }

//       setResetSuccess("Password updated successfully!");
//       setTimeout(() => setShowForgotPassword(false), 2000);
//     } catch (err) {
//       console.error("Reset error:", err);
//       setResetError("Server error during password reset.");
//     }
//   };

//   return (
//     <div className="login-container">
//       {!showForgotPassword ? (
//         <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
//           <h2 className="login-title">Login</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             className="login-field"
//             autoComplete="username"
//           />
//           <div style={{ position: "relative" }}>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               required
//               onChange={(e) => setPassword(e.target.value)}
//               className="login-field"
//               autoComplete="current-password"
//               style={{ paddingRight: "38px" }}
//             />
//             <span
//               style={{
//                 position: "absolute",
//                 right: "10px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//                 color: "#4c5666",
//                 fontSize: "1.13em",
//               }}
//               onClick={() => setShowPassword((prev) => !prev)}
//               aria-label={showPassword ? "Hide password" : "Show password"}
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") setShowPassword((prev) => !prev);
//               }}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <div className="login-role-options">
//             <button
//               type="button"
//               className={`login-role-btn ${loginType === "user" ? "active" : ""}`}
//               onClick={() => setLoginType("user")}
//             >
//               User
//             </button>
//             <button
//               type="button"
//               className={`login-role-btn ${loginType === "designer" ? "active" : ""}`}
//               onClick={() => setLoginType("designer")}
//             >
//               Designer
//             </button>
//           </div>

//           <button type="submit" className="login-btn login-action-btn">
//             Login
//           </button>

//           <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
//             <span
//               className="login-forgot"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//               onClick={() => setShowForgotPassword(true)}
//             >
//               Forgot Password?
//             </span>
//             <span
//               className="login-forgot"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//               onClick={() => navigate("/signup")}
//             >
//               Register
//             </span>
//           </div>

//           {loginError && <p className="login-error">{loginError}</p>}
//         </form>
//       ) : (
//         <div className="login-form reset-password-form">
//           <h2 className="login-title">Reset Password</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             value={resetEmail}
//             onChange={(e) => setResetEmail(e.target.value)}
//             className="login-field"
//             autoComplete="username"
//           />
//           <div style={{ position: "relative" }}>
//             <input
//               type={showResetPwd ? "text" : "password"}
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="login-field"
//               autoComplete="new-password"
//               style={{ paddingRight: "38px" }}
//             />
//             <span
//               style={{
//                 position: "absolute",
//                 right: "10px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//                 color: "#4c5666",
//                 fontSize: "1.13em",
//               }}
//               onClick={() => setShowResetPwd((prev) => !prev)}
//               aria-label={showResetPwd ? "Hide password" : "Show password"}
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") setShowResetPwd((prev) => !prev);
//               }}
//             >
//               {showResetPwd ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           <div style={{ position: "relative" }}>
//             <input
//               type={showResetConfirmPwd ? "text" : "password"}
//               placeholder="Confirm New Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="login-field"
//               autoComplete="new-password"
//               style={{ paddingRight: "38px" }}
//             />
//             <span
//               style={{
//                 position: "absolute",
//                 right: "10px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//                 color: "#4c5666",
//                 fontSize: "1.13em",
//               }}
//               onClick={() => setShowResetConfirmPwd((prev) => !prev)}
//               aria-label={showResetConfirmPwd ? "Hide password" : "Show password"}
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") setShowResetConfirmPwd((prev) => !prev);
//               }}
//             >
//               {showResetConfirmPwd ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <button onClick={handlePasswordReset} className="login-btn login-action-btn">
//             Reset Password
//           </button>
//           <button
//             className="login-btn back-to-login"
//             style={{
//               background: "#f6f7fa",
//               color: "#1f2937",
//               border: "1.5px solid #1f2937",
//               marginTop: "0",
//               marginBottom: "8px",
//             }}
//             type="button"
//             onClick={() => setShowForgotPassword(false)}
//           >
//             Back to Login
//           </button>

//           {resetError && <p className="login-error">{resetError}</p>}
//           {resetSuccess && <p className="login-success">{resetSuccess}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;





import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("user");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Forgot password modal state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [showResetPwd, setShowResetPwd] = useState(false);
  const [showResetConfirmPwd, setShowResetConfirmPwd] = useState(false);

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("http://localhost:8081/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("Content-Type");

      if (!res.ok) {
        let errorText = await res.text();
        try {
          const errObj = JSON.parse(errorText);
          errorText = errObj.error || errorText;
        } catch {}
        setLoginError(errorText);
        setSnackbarMsg(errorText);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (!contentType || !contentType.includes("application/json")) {
        setLoginError("Server returned invalid response (non-JSON).");
        setSnackbarMsg("Server returned invalid response (non-JSON).");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      const user = await res.json();
      const token = user.token;
      const normalizedRole = user.role?.toUpperCase();
      const userId = user.userId || user.id;

      if (!token || !userId || !user.email || !normalizedRole) {
        setLoginError("Invalid server response.");
        setSnackbarMsg("Invalid server response.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      if (
        (loginType === "designer" && normalizedRole !== "DESIGNER") ||
        (loginType === "user" && normalizedRole !== "CUSTOMER")
      ) {
        setLoginError("Role mismatch. Please check login type.");
        setSnackbarMsg("Role mismatch. Please check login type.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.fullName || user.email);
      localStorage.setItem("userRole", normalizedRole);

      setSnackbarMsg("Login successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        if (normalizedRole === "DESIGNER") {
          navigate("/designer-dashboard", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }, 1000);
    } catch (err) {
      setLoginError("Server error. Please try again later.");
      setSnackbarMsg("Server error. Please try again later.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handlePasswordReset = async () => {
    setResetError("");
    setResetSuccess("");

    if (!resetEmail || !newPassword || !confirmPassword) {
      setResetError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8081/api/users/reset-password/${resetEmail}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: newPassword }),
        }
      );
      if (!res.ok) {
        const errText = await res.text();
        setResetError("Reset failed: " + errText);
        setSnackbarMsg("Reset failed: " + errText);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      setResetSuccess("Password updated successfully!");
      setSnackbarMsg("Password updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        setForgotOpen(false);
        setResetEmail("");
        setNewPassword("");
        setConfirmPassword("");
        setResetError("");
        setResetSuccess("");
      }, 1500);
    } catch (err) {
      setResetError("Server error during password reset.");
      setSnackbarMsg("Server error during password reset.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="login-field"
          autoComplete="username"
        />
        <div className="login-password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="login-field"
            autoComplete="current-password"
            style={{ paddingRight: "38px" }}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="password-toggle"
            tabIndex={0}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="login-role-options">
          <button
            type="button"
            className={`login-role-btn ${loginType === "user" ? "active" : ""}`}
            onClick={() => setLoginType("user")}
          >
            User
          </button>
          <button
            type="button"
            className={`login-role-btn ${loginType === "designer" ? "active" : ""}`}
            onClick={() => setLoginType("designer")}
          >
            Designer
          </button>
        </div>

        <button type="submit" className="login-btn login-action-btn">
          Login
        </button>

        <div className="login-footer">
          <span onClick={() => setForgotOpen(true)}>
            Forgot Password?
          </span>
          <span onClick={() => navigate("/signup")}>
            Register
          </span>
        </div>

        {loginError && <p className="login-error">{loginError}</p>}
      </form>

      {/* Forgot Password Modal */}
      <Dialog
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background: "rgba(255,255,255,0.98)",
            boxShadow: "0 6px 32px #1f293733",
            minWidth: 340,
            px: 1,
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, pr: 5, position: "relative" }}>
  Reset Password
  <IconButton
    aria-label="close"
    onClick={() => setForgotOpen(false)}
    sx={{
      position: "absolute",
      left: 150,
      top: 8,
      color: "#1f2937",
      background: "none", // No background
      borderRadius: 0,    // No border radius (optional)
      "&:hover": {
        background: "none" // No hover background
      }
    }}
    size="small"
  >
    <CloseIcon />
  </IconButton>
</DialogTitle>

        <DialogContent>
          <input
            type="email"
            placeholder="Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="login-field"
            autoComplete="username"
            style={{ marginBottom: 18, marginTop: 10 }}
          />
          <div className="login-password-field">
            <input
              type={showResetPwd ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="login-field"
              autoComplete="new-password"
              style={{ paddingRight: "38px" }}
            />
            <span
              onClick={() => setShowResetPwd((prev) => !prev)}
              className="password-toggle"
              tabIndex={0}
            >
              {showResetPwd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="login-password-field">
            <input
              type={showResetConfirmPwd ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="login-field"
              autoComplete="new-password"
              style={{ paddingRight: "38px" }}
            />
            <span
              onClick={() => setShowResetConfirmPwd((prev) => !prev)}
              className="password-toggle"
              tabIndex={0}
            >
              {showResetConfirmPwd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {resetError && <p className="login-error">{resetError}</p>}
          {resetSuccess && <p className="login-success">{resetSuccess}</p>}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button
            onClick={() => setForgotOpen(false)}
            sx={{
              fontWeight: 600,
              background: "linear-gradient(90deg, #4c5666 0%, #1f2937 100%)",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px #1f293733",
              px: 3,
              py: 1,
              textTransform: "none",
              '&:hover': {
                background: "linear-gradient(90deg, #1f2937 0%, #4c5666 100%)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePasswordReset}
            sx={{
              fontWeight: 600,
              background: "linear-gradient(90deg, #4c5666 0%, #1f2937 100%)",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px #1f293733",
              px: 3,
              py: 1,
              textTransform: "none",
              '&:hover': {
                background: "linear-gradient(90deg, #1f2937 0%, #4c5666 100%)",
              },
            }}
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success and error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
