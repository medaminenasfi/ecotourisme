import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Modal,
  Form,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaCalendarAlt } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import backgroundImage from "../assest/Accueil.jpg";
import Navbar from "../Components/navbar";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const GestionReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [setUsers] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");

  const DATE_FILTERS = {
    ALL: "all",
    TODAY: "today",
    WEEK: "week",
    MONTH: "month",
    NEXT_MONTH: "next_month",
    PAST: "past",
    FUTURE: "future",
  };

  const [formData, setFormData] = useState({
    user: "",
    circuit: "",
    date: "",
    numberOfPeople: "",
    totalPrice: "",
    status: "pending",
  });

  // Recalculer les filtres quand les réservations ou le filtre changent
  useEffect(() => {
    filterByDate(selectedDateFilter);
  }, [reservations, selectedDateFilter]);

  const validateToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/Seconnecter";
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.UserInfo?.role === "admin");

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("accessToken");
        window.location.href = "/Seconnecter";
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem("accessToken");
      window.location.href = "/Seconnecter";
      return false;
    }
  };

  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const [usersRes, circuitsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/circuits", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setUsers(usersRes.data);
      setCircuits(circuitsRes.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchReservations = async () => {
    if (!validateToken()) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:5000/api/reservations",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { sort: "-date" } 
        }
      );

      const enhancedReservations = response.data
        .map((res) => ({
          ...res,
          circuitDisplay: res.circuitDetails?.name || res.circuit?.name || "Circuit supprimé",
          userDisplay: res.user
            ? `${res.user.first_name} ${res.user.last_name}`
            : "Utilisateur supprimé",
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setReservations(enhancedReservations);
      setError("");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchInitialData();
      await fetchReservations();
    };
    loadData();
  }, []);

  const filterByDate = (filterType) => {
    setSelectedDateFilter(filterType);
    
    if (filterType === DATE_FILTERS.ALL) {
      setFilteredReservations(reservations);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filtered = reservations.filter(res => {
      const resDate = new Date(res.date);
      resDate.setHours(0, 0, 0, 0);
      
      switch (filterType) {
        case DATE_FILTERS.TODAY:
          return resDate.getTime() === today.getTime();
          
        case DATE_FILTERS.WEEK:
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          return resDate >= today && resDate < nextWeek;
          
        case DATE_FILTERS.MONTH:
          const nextMonth = new Date(today);
          nextMonth.setMonth(today.getMonth() + 1);
          return resDate >= today && resDate < nextMonth;
          
        case DATE_FILTERS.NEXT_MONTH:
          const nextMonthStart = new Date(today);
          nextMonthStart.setMonth(today.getMonth() + 1);
          nextMonthStart.setDate(1);
          
          const nextMonthEnd = new Date(nextMonthStart);
          nextMonthEnd.setMonth(nextMonthStart.getMonth() + 1);
          
          return resDate >= nextMonthStart && resDate < nextMonthEnd;
          
        case DATE_FILTERS.PAST:
          return resDate < today;
          
        case DATE_FILTERS.FUTURE:
          return resDate >= today;
          
        default:
          return true;
      }
    });

    setFilteredReservations(filtered);
  };

  const DateFilters = () => (
    <div className="d-flex gap-2 mb-3 flex-wrap">
      <Button 
        variant={selectedDateFilter === DATE_FILTERS.ALL ? 'primary' : 'outline-primary'}
        onClick={() => filterByDate(DATE_FILTERS.ALL)}
      >
        <FaCalendarAlt className="me-1" /> Toutes
      </Button>
      <Button 
        variant={selectedDateFilter === DATE_FILTERS.TODAY ? 'primary' : 'outline-primary'}
        onClick={() => filterByDate(DATE_FILTERS.TODAY)}
      >
        <FaCalendarAlt className="me-1" /> Aujourd'hui
      </Button>
      <Button 
        variant={selectedDateFilter === DATE_FILTERS.WEEK ? 'primary' : 'outline-primary'}
        onClick={() => filterByDate(DATE_FILTERS.WEEK)}
      >
        <FaCalendarAlt className="me-1" /> Cette semaine
      </Button>
      <Button 
        variant={selectedDateFilter === DATE_FILTERS.MONTH ? 'primary' : 'outline-primary'}
        onClick={() => filterByDate(DATE_FILTERS.MONTH)}
      >
        <FaCalendarAlt className="me-1" /> Ce mois
      </Button>
      <Button 
        variant={selectedDateFilter === DATE_FILTERS.PAST ? 'primary' : 'outline-primary'}
        onClick={() => filterByDate(DATE_FILTERS.PAST)}
      >
        <FaCalendarAlt className="me-1" /> Passées
      </Button>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateToken()) return;

    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const payload = {
        ...formData,
        numberOfPeople: Number(formData.numberOfPeople),
        totalPrice: Number(formData.totalPrice),
        date: new Date(formData.date).toISOString(),
      };

      if (formData.circuit.startsWith("temp-")) {
        const originalReservation = reservations.find(
          (r) => r._id === formData.circuit.split("-")[1]
        );
        payload.circuitDetails = originalReservation?.circuitDetails;
        payload.circuit = originalReservation?.circuit?._id || null;
      }

      const method = selectedReservation ? "put" : "post";
      const url = selectedReservation
        ? `http://localhost:5000/api/reservations/${selectedReservation._id}`
        : "http://localhost:5000/api/reservations";

      await axios[method](url, payload, config);

      setSuccess(
        selectedReservation
          ? "Réservation mise à jour"
          : "Nouvelle réservation créée"
      );
      setShowModal(false);
      await fetchReservations();
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async (id) => {
    if (!validateToken()) return;

    if (window.confirm("Confirmer la suppression ?")) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:5000/api/reservations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSuccess("Réservation supprimée");
        await fetchReservations();
      } catch (err) {
        handleError(err);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    if (err.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/Seconnecter";
    }
    setError(err.response?.data?.message || "Erreur de communication");
  };

  const openModal = (reservation = null) => {
    setSelectedReservation(reservation);
    const initialData = reservation
      ? {
          user: reservation.user?._id || "",
          circuit: reservation.circuit?._id || `temp-${reservation._id}`,
          date: reservation.date?.split("T")[0] || "",
          numberOfPeople: reservation.numberOfPeople || "",
          totalPrice: reservation.totalPrice || "",
          status: reservation.status || "pending",
        }
      : {
          user: "",
          circuit: "",
          date: "",
          numberOfPeople: "",
          totalPrice: "",
          status: "pending",
        };

    setFormData(initialData);
    setShowModal(true);
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          paddingTop: "80px",
        }}
      >
        <div className="container py-5" style={{ maxWidth: "1400px" }}>
          <div
            className="card shadow"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
            }}
          >
            <div
              className="card-header"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <h1 className="text-white mb-0 text-center">
                <span className="text-primary">Gestion</span> des Réservations
              </h1>
              <div className="text-center mt-2">
                <p className="text-white mb-0">
                  Gérez toutes les réservations de randonnée en cours
                </p>
              </div>
            </div>

            <div className="card-body">
              {error && (
                <Alert variant="danger" className="rounded-3">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" className="rounded-3">
                  {success}
                </Alert>
              )}

              <div className="mb-4">
                <DateFilters />
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : filteredReservations.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  Aucune réservation trouvée
                </div>
              ) : (
                <div className="table-responsive">
                  <Table
                    hover
                    responsive
                    className="align-middle text-white mb-0"
                  >
                    <thead style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                      <tr>
                        <th>Utilisateur</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Personnes</th>
                        <th>Prix</th>
                        <th>Statut</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReservations.map((reservation) => (
                        <tr
                          key={reservation._id}
                          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                        >
                          <td>{reservation.userDisplay}</td>
                          <td>
                            {reservation.circuitDisplay}
                            {reservation.circuitDetails && (
                              <Badge bg="info" className="ms-2"></Badge>
                            )}
                          </td>
                          <td>
                            {new Date(reservation.date).toLocaleDateString("fr-FR", {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </td>
                          <td>{reservation.numberOfPeople}</td>
                          <td>{reservation.totalPrice?.toFixed(2)} TND</td>
                          <td>
                            <Badge
                              pill
                              className="text-uppercase"
                              bg={
                                reservation.status === "confirmed"
                                  ? "success"
                                  : reservation.status === "cancelled"
                                  ? "danger"
                                  : "warning"
                              }
                            >
                              {reservation.status === "confirmed"
                                ? "Confirmée"
                                : reservation.status === "cancelled"
                                ? "Annulée"
                                : "En attente"}
                            </Badge>
                          </td>
                          <td className="text-end">
                            {isAdmin && (
                              <>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="me-2"
                                  onClick={() => openModal(reservation)}
                                >
                                  <FaEdit className="me-1" /> Modifier
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleDelete(reservation._id)}
                                >
                                  <FaTrashAlt className="me-1" /> Supprimer
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          contentClassName="bg-dark text-white"
          backdrop="static"
        >
          <Modal.Header
            closeButton
            closeVariant="white"
            className="border-secondary"
          >
            <Modal.Title className="text-primary">
              {selectedReservation
                ? "Modifier Réservation"
                : "Nouvelle Réservation"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Circuit</Form.Label>
                <Form.Select
                  value={formData.circuit}
                  onChange={(e) =>
                    setFormData({ ...formData, circuit: e.target.value })
                  }
                  required
                  className="bg-dark text-white border-secondary"
                >
                  <option value="">Sélectionner un circuit</option>
                  {circuits.map((circuit) => (
                    <option key={circuit._id} value={circuit._id}>
                      {circuit.name}
                    </option>
                  ))}
                  {reservations
                    .filter((r) => r.circuitDetails)
                    .map((reservation) => (
                      <option
                        key={`temp-${reservation._id}`}
                        value={`temp-${reservation._id}`}
                      >
                        {reservation.circuitDetails.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nombre de personnes</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={formData.numberOfPeople}
                  onChange={(e) =>
                    setFormData({ ...formData, numberOfPeople: e.target.value })
                  }
                  required
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Prix total</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.totalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, totalPrice: e.target.value })
                  }
                  required
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Statut</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  required
                  className="bg-dark text-white border-secondary"
                >
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmée</option>
                  <option value="cancelled">Annulée</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </Button>
                <Button variant="primary" type="submit">
                  {selectedReservation ? "Enregistrer" : "Créer"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default GestionReservations;