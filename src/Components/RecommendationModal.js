import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const RecommendationModal = ({ show, handleClose }) => {
  const [preferences, setPreferences] = useState({
    region: '',
    niveau: '',
    duree: '',
    meteo: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const regionsTunisie = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan',
    'Bizerte', 'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Kairouan',
    'Kasserine', 'Sidi Bouzid', 'Sousse', 'Monastir', 'Mahdia', 'Sfax',
    'Gafsa', 'Tozeur', 'Kébili', 'Gabès', 'Médenine', 'Tataouine'
  ];

  const niveaux = ['Facile', 'Moyen', 'Difficile'];
  const durees = ['1 jour', '2-3 jours', '4-7 jours', 'Plus d\'une semaine'];
  const meteos = ['Ensoleillé', 'Nuageux', 'Pluvieux', 'Venteux', 'Tempéré'];

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('http://localhost:5000/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });

      const data = await response.json();
      setResult(data.recommendation);
    } catch (error) {
      console.error('Erreur:', error);
      setResult('Une erreur est survenue lors de la recommandation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Demande de recommandation IA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Sélecteur de Région */}
          <Form.Group className="mb-3">
            <Form.Label>Région</Form.Label>
            <Form.Control 
              as="select" 
              name="region" 
              onChange={handleChange} 
              required
              value={preferences.region}
            >
              <option value="" disabled>Sélectionnez une région</option>
              {regionsTunisie.map((region, index) => (
                <option key={index} value={region}>{region}</option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Sélecteur de Niveau */}
          <Form.Group className="mb-3">
            <Form.Label>Niveau</Form.Label>
            <Form.Control 
              as="select" 
              name="niveau" 
              onChange={handleChange} 
              required
              value={preferences.niveau}
            >
              <option value="" disabled>Sélectionnez un niveau</option>
              {niveaux.map((niveau, index) => (
                <option key={index} value={niveau}>{niveau}</option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Sélecteur de Durée */}
          <Form.Group className="mb-3">
            <Form.Label>Durée</Form.Label>
            <Form.Control 
              as="select" 
              name="duree" 
              onChange={handleChange} 
              required
              value={preferences.duree}
            >
              <option value="" disabled>Sélectionnez une durée</option>
              {durees.map((duree, index) => (
                <option key={index} value={duree}>{duree}</option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Sélecteur de Météo
          <Form.Group className="mb-3">
            <Form.Label>Météo</Form.Label>
            <Form.Control 
              as="select" 
              name="meteo" 
              onChange={handleChange} 
              required
              value={preferences.meteo}
            >
              <option value="" disabled>Sélectionnez une météo</option>
              {meteos.map((meteo, index) => (
                <option key={index} value={meteo}>{meteo}</option>
              ))}
            </Form.Control>
          </Form.Group>
 */}
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              'Obtenir une recommandation'
            )}
          </Button>
        </Form>

        {result && (
          <div className="mt-4 p-3 bg-light border rounded">
            <h5>Recommandation :</h5>
            <div className="mt-2" style={{ whiteSpace: 'pre-wrap' }}>
              {result}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default RecommendationModal;