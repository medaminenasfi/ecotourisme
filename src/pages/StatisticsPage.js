import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import backgroundImage from "../assest/Accueil.jpg";
import Navbar from "../Components/navbar";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const StatisticsPage = () => {
  const [popularCircuits, setPopularCircuits] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0); // Ajout du revenu total

  const validateToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // Redirection vers la page de connexion si nécessaire
      return false;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error("Token invalide", error);
      return false;
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    if (!validateToken()) return;

    const fetchStatistics = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const [popularRes, revenueRes] = await Promise.all([
          axios.get("http://localhost:5000/api/reservations/stats/popular-circuits", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/reservations/stats/revenue-by-month", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // 1. Correction de l'affichage des circuits populaires
        const popularData = popularRes.data.map(item => ({
          ...item,
          // Assurer que les noms sont en string
          circuitName: item.circuitName.toString() 
        }));
        
        setPopularCircuits(popularData);

        // 2. Calcul du revenu total
        const total = revenueRes.data.reduce((sum, item) => sum + item.totalRevenue, 0);
        setTotalRevenue(total);
        
        setRevenueData(revenueRes.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Erreur de chargement des statistiques");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Fonction pour formater les tooltips
  const formatTooltip = (value, name, props) => {
    return [`${value}`, name === "reservationCount" ? "Réservations" : "Revenu"];
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
                <span className="text-primary">Statistiques</span> des Réservations
              </h1>
            </div>

            <div className="card-body">
              {error && (
                <div className="alert alert-danger rounded-3">{error}</div>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                  </div>
                  <p className="text-white mt-2">Chargement des statistiques...</p>
                </div>
              ) : (
                <div className="row">
                  {/* Section de résumé */}
                  <div className="col-12 mb-4">
                    <div className="bg-dark rounded-3 p-4 d-flex justify-content-around align-items-center">
                      <div className="text-center">
                        <h4 className="text-white-50">Revenu Total</h4>
                        <h2 className="text-success">{totalRevenue.toFixed(2)} TND</h2>
                      </div>
                      <div className="text-center">
                        <h4 className="text-white-50">Circuits</h4>
                        <h2 className="text-info">{popularCircuits.length}</h2>
                      </div>
                      <div className="text-center">
                        <h4 className="text-white-50">Période</h4>
                        <h2 className="text-warning">{revenueData.length} mois</h2>
                      </div>
                    </div>
                  </div>

                  {/* Circuits populaires */}
                  <div className="col-md-6 mb-4">
                    <h3 className="text-white mb-4">Circuits les plus populaires</h3>
                    {popularCircuits.length > 0 ? (
                      <div className="bg-dark rounded-3 p-3" style={{ height: "400px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={popularCircuits}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis 
                              dataKey="circuitName" 
                              stroke="#fff" 
                              angle={-45} 
                              textAnchor="end"
                              height={60}
                            />
                            <YAxis stroke="#fff" />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }}
                              itemStyle={{ color: '#fff' }}
                              formatter={formatTooltip}
                            />
                            <Legend />
                            <Bar 
                              dataKey="reservationCount" 
                              name="Nombre de réservations" 
                              fill="#8884d8" 
                              radius={[5, 5, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="alert alert-info">
                        Aucune donnée disponible sur les circuits populaires
                      </div>
                    )}
                  </div>

                  {/* Revenus par mois */}
                  <div className="col-md-6 mb-4">
                    <h3 className="text-white mb-4">Revenus par mois</h3>
                    {revenueData.length > 0 ? (
                      <div className="bg-dark rounded-3 p-3" style={{ height: "400px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={revenueData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              outerRadius={150}
                              fill="#8884d8"
                              dataKey="totalRevenue"
                              nameKey="month"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {revenueData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value) => [`${value.toFixed(2)} TND`, "Revenu"]}
                              contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }}
                              itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="alert alert-info">
                        Aucune donnée disponible sur les revenus mensuels
                      </div>
                    )}
                  </div>

                  {/* Tableau récapitulatif */}
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 className="text-white mb-0">Détails des revenus</h3>
                      <span className="badge bg-primary fs-6">
                        Total: {totalRevenue.toFixed(2)} TND
                      </span>
                    </div>
                    {revenueData.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-dark table-hover">
                          <thead>
                            <tr>
                              <th>Mois</th>
                              <th>Nombre de réservations</th>
                              <th>Revenu (TND)</th>
                              <th>% du total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {revenueData.map((item) => (
                              <tr key={item.month}>
                                <td>{item.month}</td>
                                <td>{item.reservationCount}</td>
                                <td>{item.totalRevenue.toFixed(2)}</td>
                                <td>{((item.totalRevenue / totalRevenue) * 100).toFixed(1)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="alert alert-info">
                        Aucune donnée à afficher dans le tableau
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default StatisticsPage;