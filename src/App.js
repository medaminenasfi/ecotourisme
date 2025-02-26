import { Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Artisan from "./pages/Artisan";
import Randonée from "./pages/Randonée";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
import "bootstrap/dist/css/bootstrap.min.css";
import Seconnecter from "./pages/Seconnecter";
import Inscrire from "./pages/inscrire"; // Correct the capitalization
import Footer from "./Components/footer";
import "./index.css";
import Forgot from "./pages/forgot"

function App() {
  return (
    <div className="app-container">

      <div className="content">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/Randonée" element={<Randonée />} />
          <Route path="/Reservation" element={<Reservation />} />
          <Route path="/Artisan" element={<Artisan />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Seconnecter" element={<Seconnecter />} />
          <Route path="/inscrire" element={<Inscrire />} />
          <Route path="/forgot" element={<Forgot />} />

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
