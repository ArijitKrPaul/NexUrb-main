import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import "../css/login.css";
import loginimage from "../assets/loginimage.jpg";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // State for validation errors

  const loginsubmit = async (e) => {
    e.preventDefault();
    try {
      const q = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      if (q.status == 200) {
        navigateToDashboard(q.data);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.log("2");
      setError(err.response.data);
      setEmail("");
      setPassword("");
    }
  };

  const navigateToDashboard = (data) => {
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify(data));

    if (data.role == "user") {
      navigate("/home");
    }
    if (data.role == "superadmin") {
      navigate("/Superadmin");
    }
    if (data.role === "employee") {
      navigate("/Edashboard");
    }
    if (data.role === "admin") {
      navigate("/admin");
    }
  };

  return (
    <Box id="login">
      <Box id="login-container">
        {/* Changed Stack to component="form" to handle Enter key submission if needed */}
        <Stack
          spacing={2}
          id="login-form"
          component="form"
          onSubmit={loginsubmit}
        >
          <p style={{ marginBottom: "20px", fontSize: "35px" }}>
            <strong>NexUrb</strong>
          </p>
          <p style={{ fontSize: "50px", marginBottom: "20px" }}>
            <strong>Hello,</strong>
          </p>
          <p
            style={{
              marginBottom: "20px",
              fontSize: "50px",
              marginTop: "-20px",
            }}
          >
            <strong>Welcome Back</strong>
          </p>
          <p style={{ marginTop: "-10px", marginBottom: "10px" }}>
            NexUrb a platform to manage your inventory and see project details
          </p>

          <TextField
            id="email-input"
            label="Email"
            variant="filled"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Add error prop (turns red) and helperText (shows message)

            required
          />

          <TextField
            id="password-input"
            label="Password"
            variant="filled"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <FormControlLabel control={<Checkbox />} label="Remember Me" />

          <Button variant="contained" id="login-btn" type="submit">
            Sign In
          </Button>
          {error && <p id="error">{error}</p>}
          <Typography variant="body2">
            New User?{" "}
            <Link to="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </Stack>
        <Box>
          <img src={loginimage} alt="loginimage" id="login-image" />
        </Box>
      </Box>
    </Box>
  );
}
