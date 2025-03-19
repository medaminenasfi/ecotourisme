import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const Inscrire = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '',
    gender: 'male',
    role: 'voyageur',  // Default role
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', formData);
      if (response.data.accessToken) {
        // Store the access token in localStorage
        localStorage.setItem('accessToken', response.data.accessToken);
        // Redirect to the login page after successful registration
        navigate('/seconnecter');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
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
          S'inscrire
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
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
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="voyageur">Voyageur</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="fournisseur">Fournisseur</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              S'inscrire
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Inscrire;
