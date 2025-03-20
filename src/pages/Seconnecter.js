import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Paper, Alert, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Seconnecter = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials);
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/');
      } else {
        setError(response.data.message || 'Échec de la connexion. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Échec de la connexion. Veuillez réessayer.');
    }
  };

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
      <Paper elevation={3} sx={{ padding: 4, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Se Connecter
        </Typography>
        
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
              label="Mot de passe"
              name="password"
              type={showPassword ? 'text' : 'password'}
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

        <Box mt={2}>
          <Link href="/forgot" variant="body2" sx={{ cursor: 'pointer', textDecoration: 'none' }}>
            Mot de passe oublié ?
          </Link>
        </Box>

        {/* Ajouter le lien pour la création de compte */}
        <Box mt={1}>
          <Typography variant="body2">
            Pas encore de compte ? 
            <Link href="/inscrire" sx={{ marginLeft: 0.5, textDecoration: 'none', fontWeight: 'bold' }}>
              Créer un compte
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Seconnecter;
