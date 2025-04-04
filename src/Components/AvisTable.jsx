import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AvisPage = () => {
  const context = useContext(AuthContext) || {};
  const { user = null, logout = () => {}, loading: authLoading = true } = context;

  const [avis, setAvis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAvis, setEditingAvis] = useState(null);
  const [formData, setFormData] = useState({
    circuitId: '',
    rating: '',
    comment: ''
  });
  const [loading, setLoading] = useState(true);
  const [circuits, setCircuits] = useState([]);
  const [error, setError] = useState(null);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  });

  useEffect(() => {
    if (authLoading) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        const [avisRes, circuitsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/avis', { 
            headers: { Authorization: `Bearer ${token}` } 
          }),
          axios.get('http://localhost:5000/api/circuits', { 
            headers: { Authorization: `Bearer ${token}` } 
          })
        ]);

        // Handle both possible backend response structures
        const avisData = avisRes.data?.avis || avisRes.data || [];
        const circuitsData = circuitsRes.data?.circuits || circuitsRes.data || [];

        setAvis(avisData);
        setCircuits(circuitsData);
        setLoading(false);
      } catch (error) {
        console.error('Data loading failed:', error);
        setError(error.message);
        setLoading(false);
        if (error.response?.status === 401) logout();
      }
    };

    fetchData();
  }, [authLoading, logout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: getAuthHeader() };
      const url = editingAvis 
        ? `http://localhost:5000/api/avis/${editingAvis._id}`
        : 'http://localhost:5000/api/avis';

      const method = editingAvis ? 'put' : 'post';
      await axios[method](url, formData, config);

      // Refresh data after submission
      const avisRes = await axios.get('http://localhost:5000/api/avis', config);
      setAvis(avisRes.data?.avis || avisRes.data || []);
      
      closeModal();
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response?.status === 401) logout();
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/avis/${id}`, {
        headers: getAuthHeader()
      });
      setAvis(prev => prev.filter(a => a._id !== id));
    } catch (error) {
      console.error('Deletion error:', error);
      if (error.response?.status === 401) logout();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAvis(null);
    setFormData({ circuitId: '', rating: '', comment: '' });
  };

  if (authLoading || loading) return (
    <div className="container mt-4 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mt-4 alert alert-danger">
      Error loading data: {error}
      <button className="btn btn-link" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-gradient">Circuit Reviews</h1>
        {user && (
          <button 
            className="btn btn-primary rounded-pill px-4 py-2 shadow-sm"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-pencil-square me-2"></i>Ajouter un avis
          </button>
        )}
      </div>

      {/* Reviews List */}
      <h3 className="mb-4">Avis des utilisateurs</h3>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {avis.map(review => {
          const circuit = circuits.find(c => c._id === review.circuitId) || {};
          
          return (
            <div className="col" key={review._id}>
              <div className="card h-100 shadow-lg-hover">
                <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle me-2 text-primary"></i>
                    <span className="fw-medium">
                      {review.userId?.first_name || 'Anonymous'} {review.userId?.last_name}
                    </span>
                  </div>
                  <span className="badge bg-warning text-dark">
                    {review.rating}/5
                  </span>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-muted mb-3">
                    <i className="bi bi-geo-alt me-2 text-success"></i>
                    {circuit.name || 'Unknown Circuit'}
                  </h5>
                  <p className="card-text text-secondary">{review.comment}</p>
                </div>
                {user?.id === review.userId?._id && (
                  <div className="card-footer bg-transparent d-flex gap-2">
                    <button 
                      className="btn btn-sm btn-outline-warning rounded-pill"
                      onClick={() => {
                        setEditingAvis(review);
                        setFormData({
                          circuitId: review.circuitId,
                          rating: review.rating,
                          comment: review.comment
                        });
                        setShowModal(true);
                      }}
                    >
                      <i className="bi bi-pencil me-1"></i>Modifier
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger rounded-pill"
                      onClick={() => handleDelete(review._id)}
                    >
                      <i className="bi bi-trash me-1"></i>Supprimer
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white rounded-top">
                <h5 className="modal-title">
                  <i className="bi bi-star-fill me-2"></i>
                  {editingAvis ? 'Edit Review' : 'Create New Review'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
              </div>
              <div className="modal-body py-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-bold text-secondary">
                      <i className="bi bi-map me-2"></i>Sélectionner un circuit
                    </label>
                    <select
                      className="form-select form-select-lg rounded-pill border-primary"
                      value={formData.circuitId}
                      onChange={e => setFormData({...formData, circuitId: e.target.value})}
                      required
                    >
                      <option value="">Choisissez un circuit...</option>
                      {circuits.map(circuit => (
                        <option key={circuit._id} value={circuit._id}>
                          {circuit.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold text-secondary">
                      <i className="bi bi-star me-2"></i>Notation
                    </label>
                    <select
                      className="form-select form-select-lg rounded-pill border-warning"
                      value={formData.rating}
                      onChange={e => setFormData({...formData, rating: e.target.value})}
                      required
                    >
                      <option value="">Sélectionnez votre note...</option>
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>
                          {Array(num).fill('⭐').join('')} ({num})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold text-secondary">
                      <i className="bi bi-chat-text me-2"></i>Commentaire
                    </label>
                    <textarea
                      className="form-control border-info rounded-3"
                      value={formData.comment}
                      onChange={e => setFormData({...formData, comment: e.target.value})}
                      rows="4"
                      placeholder="Share your experience..."
                      required
                    />
                  </div>

                  <div className="modal-footer border-0">
                    <button 
                      type="button" 
                      className="btn btn-secondary rounded-pill px-4"
                      onClick={closeModal}
                    >
                      Annuler
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary rounded-pill px-4"
                    >
                      {editingAvis ? 'Save Changes' : 'Post Review'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvisPage;