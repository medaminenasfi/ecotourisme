import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Paper, Alert, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Seconnecter = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // Error state to hold error messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message on form submission
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials);
      if (response.data.accessToken) {
        // Store the access token in localStorage
        localStorage.setItem('accessToken', response.data.accessToken);
        // Redirect to homepage after successful login
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please try again.');
    }
  };

  // Toggle the visibility of the password
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Se Connecter
        </Typography>
        
        {/* Show error message if there's an error */}
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              value={credentials.password}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Se Connecter
            </Button>
          </Box>
        </form>

        {/* Forgot password link */}
        <Box mt={2} textAlign="center">
          <Link 
            href="/forgot" 
            variant="body2"
            sx={{ cursor: 'pointer', textDecoration: 'none' }}
          >
            Mot de passe oublié ?
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Seconnecter;
