import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, IconButton, Alert, Fade, Zoom, Link, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock, Phone, Email, Male, Female, Work } from '@mui/icons-material';
import Navbar from "../Components/navbar";
import backgroundImage from "../assest/Accueil.jpg";

const Inscrire = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '',
    gender: 'male',
    role: 'voyageur',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', formData);
      if (response.data.accessToken) {
setSuccess(true);  
      setTimeout(() => {

        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/Seconnecter');
      },2000);
    }
    } catch (error) {
      setError('Échec de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div 
        className="auth-container"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          paddingTop: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Zoom in={true}>
          <div className="auth-card">
            <div className="text-center mb-5">
              <Person sx={{ 
                fontSize: 50, 
                color: '#20c997', 
                bgcolor: 'rgba(32, 201, 151, 0.1)', 
                p: 1.5, 
                borderRadius: '50%' 
              }}/>
              <h2 className="text-white mb-3 fw-bold">Créer un compte</h2>
              <p className="text-muted">Rejoignez notre communauté</p>
            </div>

            {error && (
              <Fade in={!!error}>
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              </Fade>
            )}

            {success && (
              <Fade in={success}>
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  Compte créé avec succès ! Redirection vers la connexion...
                </Alert>
              </Fade>
            )}


            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    label="Prénom"
                    name="first_name"
                    variant="outlined"
                    value={formData.first_name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <Person fontSize="small" sx={{ color: '#20c997', mr: 1 }} />,
                    }}
                    sx={inputStyle}
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    fullWidth
                    label="Nom"
                    name="last_name"
                    variant="outlined"
                    value={formData.last_name}
                    onChange={handleChange}
                    sx={inputStyle}
                  />
                </div>
              </div>

              <div className="mb-4">
                <TextField
                  fullWidth
                  label="Téléphone"
                  name="phone_number"
                  variant="outlined"
                  value={formData.phone_number}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <Phone fontSize="small" sx={{ color: '#20c997', mr: 1 }} />,
                  }}
                  sx={inputStyle}
                />
              </div>

              <div className="mb-4">
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <Email fontSize="small" sx={{ color: '#20c997', mr: 1 }} />,
                  }}
                  sx={inputStyle}
                />
              </div>

              <div className="mb-4">
                <TextField
                  fullWidth
                  label="Mot de passe"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <Lock fontSize="small" sx={{ color: '#20c997', mr: 1 }} />,
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 
                          <VisibilityOff sx={{ color: '#20c997' }} /> : 
                          <Visibility sx={{ color: '#20c997' }} />}
                      </IconButton>
                    ),
                  }}
                  sx={inputStyle}
                />
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <TextField
                    select
                    fullWidth
                    label="Genre"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    sx={inputStyle}
                    InputProps={{
                      startAdornment: formData.gender === 'male' ? 
                        <Male sx={{ color: '#20c997', mr: 1 }} /> : 
                        <Female sx={{ color: '#20c997', mr: 1 }} />,
                    }}
                  >
                    <MenuItem value="male">Homme</MenuItem>
                    <MenuItem value="female">Femme</MenuItem>
                  </TextField>
                </div>
                <div className="col-md-6">
                  <TextField
                    select
                    fullWidth
                    label="Rôle"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    sx={inputStyle}
                    InputProps={{
                      startAdornment: <Work sx={{ color: '#20c997', mr: 1 }} />,
                    }}
                  >
                    <MenuItem value="voyageur">Voyageur</MenuItem>
                    <MenuItem value="fournisseur">Fournisseur</MenuItem>
                  </TextField>
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={buttonStyle}
              >
                S'inscrire
              </Button>
            </form>

            <Box mt={3} textAlign="center">
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Déjà un compte?{' '}
                <Link 
                  href="/seconnecter" 
                  sx={{ 
                    fontWeight: 600, 
                    color: '#20c997',
                    '&:hover': { 
                      textDecoration: 'none',
                      opacity: 0.9
                    }
                  }}
                >
                  Se connecter
                </Link>
              </Typography>
            </Box>
          </div>
        </Zoom>
      </div>
    </div>
  );
};

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    '& fieldset': {
      borderColor: '#20c997',
    },
    '&:hover fieldset': {
      borderColor: '#1aa87d',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#20c997',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#20c997',
  },
};

const buttonStyle = {
  backgroundColor: '#20c997',
  color: '#fff',
  borderRadius: '20px',
  py: 1.5,
  fontSize: '1.1rem',
  fontWeight: 700,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#1aa87d',
    transform: 'scale(1.02)',
  },
};

export default Inscrire;