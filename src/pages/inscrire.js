import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
  Zoom,Link 
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Person,
  Lock,
  Phone,
  Email,
  Male,
  Female,
  Work,
  PersonPin
} from '@mui/icons-material';

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', formData);
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/seconnecter');
      } else {
        setError(response.data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Échec de l\'inscription. Veuillez réessayer.');
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
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Zoom in={true}>
        <Paper 
          elevation={6}
          sx={{
            padding: 4,
            width: '100%',
            borderRadius: 4,
            transform: 'translateY(0)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: 8
            }
          }}
        >
          <Box textAlign="center" mb={4}>
            <Person sx={{ 
              fontSize: 50, 
              color: 'primary.main', 
              bgcolor: 'rgba(63, 81, 181, 0.1)', 
              p: 1.5, 
              borderRadius: '50%' 
            }}/>
            <Typography variant="h4" sx={{ mt: 2, fontWeight: 700 }}>
              Créer un compte
            </Typography>
          </Box>

          {error && (
            <Fade in={!!error}>
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            </Fade>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="Prénom"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': { borderWidth: 2 },
                  }
                }}
              />
              <TextField
                fullWidth
                label="Nom"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': { borderWidth: 2 },
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Téléphone"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': { borderWidth: 2 },
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': { borderWidth: 2 },
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Mot de passe"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                inputProps={{ minLength: 8 }}
                helperText="Minimum 8 caractères"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
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
                  }
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <FormControl fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
                <InputLabel>Genre</InputLabel>
                <Select
                  label="Genre"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">
                      {formData.gender === 'male' ? <Male /> : <Female />}
                    </InputAdornment>
                  }
                >
                  <MenuItem value="male">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Male fontSize="small" /> Homme
                    </Box>
                  </MenuItem>
                  <MenuItem value="female">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Female fontSize="small" /> Femme
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
                <InputLabel>Rôle</InputLabel>
                <Select
                  label="Rôle"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <Work fontSize="small" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="voyageur">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Voyageur
                    </Box>
                  </MenuItem>
                  <MenuItem value="fournisseur">Fournisseur</MenuItem>
                </Select>
              </FormControl>
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
              S'inscrire
            </Button>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Déjà un compte?{' '}
              <Link 
                href="/seconnecter" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'primary.main',
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
        </Paper>
      </Zoom>
    </Container>
  );
};

export default Inscrire;