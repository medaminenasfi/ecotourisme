import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Paper, Alert, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {   
  
  Fade,
  Zoom
} from '@mui/material';
import {   Person } from '@mui/icons-material';
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
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Zoom in={true}>
        <Paper 
          elevation={6} 
          sx={{ 
            padding: 4,
            width: '100%',
            textAlign: 'center',
            borderRadius: 4,
            transform: 'translateY(0)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 8
            }
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Person sx={{ 
              fontSize: 50, 
              color: 'primary.main', 
              bgcolor: 'rgba(63, 81, 181, 0.1)', 
              p: 1.5, 
              borderRadius: '50%' 
            }}/>
          </Box>

          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 700, 
            color: 'text.primary',
            mb: 3
          }}>
            Connexion
          </Typography>

          {error && (
            <Fade in={!!error}>
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            </Fade>
          )}

          <form onSubmit={handleSubmit}>
            <Box mb={2.5}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={credentials.email}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': { borderWidth: 2 },
                    '&:hover fieldset': { borderColor: 'primary.main' }
                  }
                }}
              />
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                label="Mot de passe"
                name="password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={credentials.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: 'text.secondary' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': { borderWidth: 2 },
                    '&:hover fieldset': { borderColor: 'primary.main' }
                  }
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'none',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 3
                }
              }}
            >
              Se connecter
            </Button>
          </form>

          <Box mt={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link 
              href="/forgot" 
              variant="body2" 
              sx={{
                color: 'text.secondary',
                '&:hover': { 
                  color: 'primary.main',
                  textDecoration: 'none'
                }
              }}
            >
              Mot de passe oublié ?
            </Link>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Pas de compte?{' '}
              <Link 
                href="/inscrire" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'primary.main',
                  '&:hover': { 
                    textDecoration: 'none',
                    opacity: 0.9
                  }
                }}
              >
                S'inscrire
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Zoom>
    </Container>
  );
};

export default Seconnecter;