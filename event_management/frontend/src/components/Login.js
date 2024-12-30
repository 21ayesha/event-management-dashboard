import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { api } from '../Services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('login/', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/events'); // Redirect to events page after successful login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" align="center">Login</Typography>
        <form onSubmit={handleLogin}>
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
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                Don't have an account? 
                <Button onClick={() => navigate("/register")} style={{ color: '#800080' }}> Register</Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;