import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "../css/registration.css"; // Ensure this path matches your folder structure
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", {
        name: formData.name,
        password: formData.password,
        email: formData.email,
      });
      navigate("/login");
      console.log(res);
    } catch (err) {
      setError(err.res.data);
    }
  };

  return (
    <div className="reg-wrapper">
      <div className="reg-card">
        {/* LEFT SIDE: IMAGE */}
        <div className="reg-left">
          <Typography
            variant="h4"
            component="h2"
            className="reg-logo"
            backgroundColor="#fffafb"
          >
            NexUrb
          </Typography>

          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
            alt="3D Character"
            className="reg-img"
          />
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="reg-right">
          <Typography variant="h4" className="reg-header">
            Registration
          </Typography>

          <form onSubmit={handleSubmit} className="reg-form">
            <TextField
              label="Name"
              variant="standard"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              className="reg-input"
            />

            <TextField
              label="Email"
              variant="standard"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              className="reg-input"
            />

            <TextField
              label="Password"
              variant="standard"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              className="reg-input"
            />

            <TextField
              label="Confirm Password"
              variant="standard"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              className="reg-input"
            />

            <Button
              type="submit"
              variant="contained"
              className="reg-btn-primary"
            >
              Register
            </Button>
          </form>

          <Button
            variant="outlined"
            className="reg-btn-google"
            startIcon={
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="google-icon"
              />
            }
          >
            Sign up with Google
          </Button>
          {/* {error && <p id="err">User already exists!</p>} */}

          <Typography variant="body2" className="reg-login-text">
            Already have an account?{" "}
            <Link href="/login" underline="hover" className="reg-link">
              Sign in
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Registration;
