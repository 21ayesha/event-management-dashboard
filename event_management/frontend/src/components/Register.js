import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Grid, Paper } from "@mui/material";
import axios from "axios";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        email,
        password,
      });
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="registration-container">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" align="center">Register</Typography>
        <form onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error" align="center">{error}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                Already have an account? 
                <Button onClick={() => navigate("/login")} color="primary"> Login</Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;