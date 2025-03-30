import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AvisPage = () => {
  const context = useContext(AuthContext) || {};
  const { user = null, logout = () => {}, loading: authLoading = true } = context;

  // State initialization with empty arrays
  const [avis, setAvis] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAvis, setEditingAvis] = useState(null);
  const [formData, setFormData] = useState({
    circuitId: '',
    rating: '',
    comment: ''
  });
  const [loading, setLoading] = useState(true);

  // Auth header helper
  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  });

  // Data fetching with error handling
  useEffect(() => {
    if (authLoading) return;

    const fetchData = async () => {
      try {
        const [avisRes, circuitsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/avis', { headers: getAuthHeader() }),
          axios.get('http://localhost:5000/api/circuits', { headers: getAuthHeader() })
        ]);
        
        // Safe state updates with fallbacks
        setAvis(avisRes.data?.avis || []);
        setCircuits(circuitsRes.data?.circuits || []);
        setLoading(false);
      } catch (error) {
        console.error('Data loading failed:', error);
        setAvis([]);
        setCircuits([]);
        setLoading(false);
        if (error.response?.status === 401) logout();
      }
    };

    fetchData();
  }, [authLoading, logout]);

  // Form submission handler
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
      const res = await axios.get('http://localhost:5000/api/avis', config);
      setAvis(res.data?.avis || []);
      closeModal();
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response?.status === 401) logout();
    }
  };

  // Delete review handler
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

  // Modal control
  const closeModal = () => {
    setShowModal(false);
    setEditingAvis(null);
    setFormData({ circuitId: '', rating: '', comment: '' });
  };

  // Loading state
  if (authLoading || loading) return <div className="container">Loading reviews...</div>;

  return (
    <div className="container">
      <h1>Circuit Reviews</h1>
      
      {user && (
        <button className="btn-add" onClick={() => setShowModal(true)}>
          Add New Review
        </button>
      )}

      <div className="reviews-list">
        {(avis || []).map(review => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <span className="user">
                {user?.id === review.userId ? (
                  `Your Review (${user.first_name || 'User'})`
                ) : (
                  `User: ${review.userId?.slice(-4) || 'Anonymous'}`
                )}
              </span>
              <span className="rating">{review.rating}/5</span>
            </div>
            <p className="circuit">
              {(circuits || []).find(c => c._id === review.circuitId)?.name || 'Unknown Circuit'}
            </p>
            <p className="comment">{review.comment}</p>
            
            {user?.id === review.userId && (
              <div className="review-actions">
                <button onClick={() => {
                  setEditingAvis(review);
                  setFormData({
                    circuitId: review.circuitId,
                    rating: review.rating,
                    comment: review.comment
                  });
                  setShowModal(true);
                }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(review._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{editingAvis ? 'Edit Review' : 'New Review'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Circuit:</label>
                <select
                  value={formData.circuitId}
                  onChange={e => setFormData({...formData, circuitId: e.target.value})}
                  required
                >
                  <option value="">Select Circuit</option>
                  {(circuits || []).map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Rating:</label>
                <select
                  value={formData.rating}
                  onChange={e => setFormData({...formData, rating: e.target.value})}
                  required
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Comment:</label>
                <textarea
                  value={formData.comment}
                  onChange={e => setFormData({...formData, comment: e.target.value})}
                  required
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-submit">
                  {editingAvis ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvisPage;