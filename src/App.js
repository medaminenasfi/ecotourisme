import { Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Artisan from "./pages/Artisan";
import Randonée from "./pages/Randonée";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";



function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/Artisan" element={<Artisan/>} />
      <Route path="/Randonée" element={<Randonée/>} />
      <Route path="/Contact" element={<Contact/>} />
      <Route path="/Reservation" element={<Reservation/>} />






    </Routes>
      <h1 className="title">My Name Amine</h1>
    </>
  );
}

export default App;
