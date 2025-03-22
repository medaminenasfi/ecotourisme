import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestionReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Axios interceptor for JWT
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations');
        setReservations(response.data);
        
        // Check admin status
        const token = localStorage.getItem('accessToken');
        if (token) {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          setIsAdmin(decoded.roles?.includes('admin'));
        }
      } catch (err) {
        setError(handleError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location = '/login';
        return 'Session expirée. Veuillez vous reconnecter.';
      }
      return error.response.data.message;
    }
    return error.message;
  };

  const handleCreate = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/reservations', formData);
      setReservations([...reservations, response.data]);
      setShowCreateModal(false);
      alert('Réservation créée avec succès!');
    } catch (err) {
      alert(handleError(err));
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/reservations/${id}`, formData);
      setReservations(reservations.map(r => r._id === id ? response.data : r));
      setShowEditModal(false);
      alert('Réservation mise à jour!');
    } catch (err) {
      alert(handleError(err));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression?')) {
      try {
        await axios.delete(`http://localhost:5000/api/reservations/${id}`);
        setReservations(reservations.filter(r => r._id !== id));
        alert('Réservation supprimée!');
      } catch (err) {
        alert(handleError(err));
      }
    }
  };

  if (loading) return <div className="text-center p-4">Chargement...</div>;
  if (error) return <div className="text-red-500 p-4">Erreur: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Réservations</h1>
        {isAdmin && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Nouvelle Réservation
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Circuit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Personnes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map(reservation => (
              <tr key={reservation._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {reservation.user?.name || 'Utilisateur supprimé'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {reservation.circuit?.name || 'Circuit supprimé'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(reservation.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reservation.numberOfPeople}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reservation.totalPrice} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {reservation.status}
                  </span>
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedReservation(reservation);
                        setShowEditModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(reservation._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Nouvelle Réservation</h3>
            <ReservationForm 
              onSubmit={handleCreate} 
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Modifier Réservation</h3>
            <ReservationForm 
              initialData={selectedReservation}
              onSubmit={(formData) => handleUpdate(selectedReservation._id, formData)}
              onCancel={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ReservationForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    user: initialData?.user?._id || '',
    circuit: initialData?.circuit?._id || '',
    date: initialData?.date?.split('T')[0] || '',
    numberOfPeople: initialData?.numberOfPeople || '',
    totalPrice: initialData?.totalPrice || '',
    status: initialData?.status || 'pending'
  });

  const validateForm = () => {
    const errors = [];
    if (!formData.user.match(/^[0-9a-fA-F]{24}$/)) errors.push('ID utilisateur invalide');
    if (!formData.circuit.match(/^[0-9a-fA-F]{24}$/)) errors.push('ID circuit invalide');
    if (formData.numberOfPeople < 1 || formData.numberOfPeople > 20) errors.push('Nombre de personnes invalide (1-20)');
    if (formData.totalPrice < 0) errors.push('Prix total invalide');
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">ID Utilisateur *</label>
        <input
          type="text"
          value={formData.user}
          onChange={(e) => setFormData({ ...formData, user: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">ID Circuit *</label>
        <input
          type="text"
          value={formData.circuit}
          onChange={(e) => setFormData({ ...formData, circuit: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date *</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre de personnes *</label>
        <input
          type="number"
          min="1"
          max="20"
          value={formData.numberOfPeople}
          onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prix total *</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.totalPrice}
          onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Statut *</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmé</option>
          <option value="cancelled">Annulé</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Sauvegarder
        </button>
      </div>
    </form>
  );
};

export default GestionReservations;