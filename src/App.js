import React, { useContext } from "react";
import { Route, Routes, Navigate  , Router} from "react-router-dom";
import { AuthContext , AuthProvider } from "./context/AuthContext";
import Accueil from "./pages/Accueil";
import Artisan from "./pages/Artisan";
import Randonée from "./pages/Randonée";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
import Seconnecter from "./pages/Seconnecter";
import Inscrire from "./pages/inscrire";
import Forgot from "./pages/forgot";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return user ? children : <Navigate to="/Seconnecter" />;
}

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return user && user.role === "admin" ? children : <Navigate to="/" />;
}

function AuthRedirectRoute({ children }) {
  const { user } = useContext(AuthContext);
  
  if (user === undefined) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  return user ? <Navigate to="/" /> : children;
}

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/Randonée" element={<Randonée />} />
          <Route path="/Artisan" element={<Artisan />} />
          <Route path="/Contact" element={<Contact />} />
          <Route
            path="/Seconnecter"
            element={
              <AuthRedirectRoute>
                <Seconnecter />
              </AuthRedirectRoute>
            }
          />
          <Route
            path="/inscrire"
            element={
              <AuthRedirectRoute>
                <Inscrire />
              </AuthRedirectRoute>
            }
          />
          <Route path="/forgot" element={<Forgot />} />
          <Route
            path="/Reservation"
            element={
              <ProtectedRoute>
                <Reservation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminDashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  </AuthProvider>

  );
}

export default App;
