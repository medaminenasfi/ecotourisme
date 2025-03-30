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

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  });

  useEffect(() => {
    if (authLoading) return;

    const fetchData = async () => {
      try {
        const [avisRes, circuitsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/avis', { headers: getAuthHeader() }),
          axios.get('http://localhost:5000/api/circuits', { headers: getAuthHeader() })
        ]);
        
        setAvis(avisRes.data?.avis || []);
        setCircuits(circuitsRes.data?.circuits || []);
        setLoading(false);
      } catch (error) {
        console.error('Data loading failed:', error);
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
      const response = await axios[method](url, formData, config);

      // Update local state with new/modified review
      if (editingAvis) {
        setAvis(prev => prev.map(a => a._id === editingAvis._id ? response.data.avis : a));
      } else {
        setAvis(prev => [...prev, response.data.avis]);
      }

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
    <div className="container mt-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Circuit Reviews</h1>
        {user && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg me-2"></i>Add Review
          </button>
        )}
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {avis.map(review => (
          <div className="col" key={review._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span className="fw-medium">
                  {review.user?.firstName || 'Anonymous User'}
                </span>
                <span className="badge bg-warning text-dark">
                  {review.rating}/5
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title text-muted">
                  {circuits.find(c => c._id === review.circuitId)?.name || 'Unknown Circuit'}
                </h5>
                <p className="card-text">{review.comment}</p>
              </div>
              {user?.id === review.user?._id && (
                <div className="card-footer bg-transparent d-flex gap-2">
                  <button 
                    className="btn btn-sm btn-outline-warning"
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
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingAvis ? 'Edit Review' : 'Create New Review'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Circuit</label>
                    <select
                      className="form-select"
                      value={formData.circuitId}
                      onChange={e => setFormData({...formData, circuitId: e.target.value})}
                      required
                    >
                      <option value="">Select a circuit</option>
                      {circuits.map(circuit => (
                        <option key={circuit._id} value={circuit._id}>
                          {circuit.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <select
                      className="form-select"
                      value={formData.rating}
                      onChange={e => setFormData({...formData, rating: e.target.value})}
                      required
                    >
                      <option value="">Select rating</option>
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea
                      className="form-control"
                      value={formData.comment}
                      onChange={e => setFormData({...formData, comment: e.target.value})}
                      rows="3"
                      required
                    />
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingAvis ? 'Save Changes' : 'Create Review'}
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