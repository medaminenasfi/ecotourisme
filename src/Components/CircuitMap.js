import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import "./Circuit.css";

// Fix Leaflet marker icon issue
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const tunisiaCenter = [33.8869, 9.5375];
const zoomLevel = 6;





// All circuits for the 24 regions in Tunisia
const circuitsByRegion = {
  Tunis: [
    {
      name: "Circuit du Belvédère - Lac de Tunise",
      description: "Vue panoramique sur Tunis et le lac.",
      location: "Parc du Belvédère",
      duration: 2, // Duration in hours
      price: 30, // Price in TND
      difficulty: "Facile",
    },
    {
      name: "Circuit de la Forêt de Radès",
      description: "Promenade forestière menant à la mer.",
      location: "Forêt de Radès",
      duration: 3,
      price: 40,
      difficulty: "Moyen",
    },
  ],
  Ariana: [
    {
      name: "Circuit du Parc Ennahli",
      description: "Sentiers en pleine nature autour des collines.",
      location: "Parc Ennahli - Colline Ennahli",
      duration: 1.5,
      price: 15,
      difficulty: "Facile",
    },
    {
      name: "Circuit du Parc de la Soukra",
      description: "Randonnée dans une forêt de pins.",
      location: "Forêt de la Soukra - Coteaux d’Ariana",
      duration: 2,
      price: 18,
      difficulty: "Moyen",
    },
  ],
  Manouba: [
    {
      name: "Circuit de la Médina de Testour",
      description: "Visite historique de Testour.",
      location: "Médina de Testour - Vallée de la Medjerda",
      duration: 2,
      price: 22,
      difficulty: "Facile",
    },
    {
      name: "Circuit d’Oued Ellil",
      description: "Randonnée à travers les collines verdoyantes.",
      location: "Oued Ellil - Collines de Jedaida",
      duration: 3,
      price: 30,
      difficulty: "Moyen",
    },
  ],
  Nabeul: [
    {
      name: "Circuit de Korbous",
      description: "Randonnée côtière avec vue sur la mer.",
      location: "Korbous - Sources thermales naturelles",
      duration: 4,
      price: 35,
      difficulty: "Moyen",
    },
    {
      name: "Circuit de la Forêt de Dar Chichou",
      description: "Exploration de la forêt et des plages.",
      location: "Dar Chichou - Cap Bon",
      duration: 5,
      price: 40,
      difficulty: "Difficile",
    },
  ],
  Bizerte: [
    {
      name: "Circuit du Lac d’Ichkeul",
      description: "Découverte du parc naturel et de sa faune.",
      location: "Parc National d’Ichkeul - Mont Ichkeul",
      duration: 3,
      price: 25,
      difficulty: "Moyen",
    },
    {
      name: "Circuit de la Forêt de Rafraf",
      description: "Sentiers forestiers menant à la mer.",
      location: "Village de Rafraf - Plage Sidi Ali El Mekki",
      duration: 2.5,
      price: 20,
      difficulty: "Facile",
    },
  ],
  Beja: [
    {
      name: "Circuit de la Forêt de Nefza",
      description: "Randonnée dans une forêt dense.",
      location: "Nefza - Barrage de Sidi El Barrak",
      duration: 3,
      price: 28,
      difficulty: "Moyen",
    },
    {
      name: "Circuit d’Oued Zarga",
      description: "Découverte des cascades et paysages verdoyants.",
      location: "Oued Zarga - Cascade naturelle",
      duration: 4,
      price: 35,
      difficulty: "Difficile",
    },
  ],
  Jendouba: [
    {
      name: "Circuit du Parc National de Feija",
      description: "Exploration de la faune et flore locales.",
      location: "Ain Draham - Parc de Feija",
      duration: 4,
      price: 30,
      difficulty: "Moyen",
    },
    {
      name: "Circuit de Fernana",
      description: "Randonnée en pleine nature avec vues magnifiques.",
      location: "Fernana - Sources thermales",
      duration: 5,
      price: 40,
      difficulty: "Difficile",
    },
  ],
  Kef: [
    {
      name: "Circuit du Jebel Serj",
      description: "Ascension offrant une vue panoramique.",
      location: "Dahmani - Grottes naturelles",
      duration: 5,
      price: 45,
      difficulty: "Difficile",
    },
    {
      name: "Circuit de l’Oasis de Tajerouine",
      description: "Découverte des oasis locales.",
      location: "Tajerouine - Sources naturelles",
      duration: 3,
      price: 30,
      difficulty: "Moyen",
    },
  ],
  Siliana: [
    {
      name: "Circuit du Mont Bargou",
      description: "Ascension avec vue sur les vallées.",
      location: "Bargou - Sommet du Jebel Bargou",
      duration: 4,
      price: 35,
      difficulty: "Difficile",
    },
    {
      name: "Circuit de la Vallée de Kesra",
      description: "Randonnée dans une vallée sauvage.",
      location: "Kesra - Chutes d’eau",
      duration: 3,
      price: 28,
      difficulty: "Moyen",
    },
  ],
  Zaghouan: [
    {
      name: "Circuit du Mont Zaghouan",
      description: "Ascension avec une vue époustouflante.",
      location: "Zaghouan - Sommet du Mont Zaghouan",
      duration: 4,
      price: 35,
      difficulty: "Difficile",
    },
    {
      name: "Circuit de la Forêt de Zaghouan",
      description: "Randonnée calme à travers la forêt.",
      location: "Zaghouan - Parc naturel",
      duration: 2,
      price: 20,
      difficulty: "Facile",
    },
  ],
  Sousse: [
    {
      name: "Circuit de la Forêt de Sousse",
      description: "Randonnée en forêt paisible",
      location: "Forêt de Sousse - Plage de Hammam Sousse",
      duration: 2,
      price: 18,
      difficulty: "Facile",
    },
    {
      name: "Circuit des plages de Sousse",
      description: "Détendez-vous sur les plages magnifiques de Sousse.",
      location: "Plage de Sousse - Port El Kantaoui",
      duration: 2,
      price: 15,
      difficulty: "Facile",
    },
  ],
  Monastir: [
    {
      name: "Circuit du mausolée de Bourguiba",
      description: "Visitez le mausolée de Bourguiba à Monastir.",
      location: "..",
      duration: 1,
      price: 10,
      difficulty: "Facile",
    },
    {
      name: "Circuit du Parc National de Boukornine",
      description: "Sentiers avec vues panoramiques.",
      location: "Hammam-Lif - Boukornine",
      duration: 3,
      price: 25,
      difficulty: "Moyen",
    },
  ],
  Mahdia: [
    {
      name: "Circuit de la Plage de Mahdia",
      description: "Randonnée sur des plages immaculées.",
      location: "Plage de Mahdia - Oued Mahdia",
      duration: 2,
      price: 15,
      difficulty: "Facile",
    },
    {
      name: "Circuit du Parc Naturel de Mahdia",
      description: "Exploration de la faune et de la flore locales.",
      location: "Plage de Mahdia - Forêt de Mahdia",
      duration: 3,
      price: 28,
      difficulty: "Moyen",
    },
  ],
  Sfax: [
    {
      name: "Circuit du Parc Naturel de Sidi Mansour",
      description: "Randonnée en bord de mer",
      location: "Sidi Mansour - Plage de Sidi Mansour",
      duration: 2.5,
      price: 20,
      difficulty: "Facile",
    },
  ],
  Kairouan: [
    {
      name: "Circuit de la Forêt de Oueslatia",
      description: "Promenade au cœur de la nature.",
      location: "Oueslatia - Source de Oueslatia",
      duration: 2,
      price: 18,
      difficulty: "Facile",
    },
    {
      name: "Circuit des Oliveraies",
      description: "Randonnée à travers les champs d’oliviers.",
      location: "Kairouan - Oasis de Barrouta",
      duration: 3,
      price: 25,
      difficulty: "Moyen",
    },
  ],
  Kasserine: [
    {
      name: "Circuit du Mont Chambi",
      description: "Ascension du plus haut sommet de Tunisie.",
      location: "Base du Mont Chambi - Sommet (1 544m)",
      duration: 5,
      price: 45,
      difficulty: "Difficile",
    },
    {
      name: "Circuit du Jebel Selloum",
      description: "Exploration de montagnes sauvages.",
      location: "Thala - Grottes naturelles",
      duration: 4,
      price: 40,
      difficulty: "Moyen",
    },
  ],
  Gabes: [
    {
      name: "Circuit de l’Oasis de Gabes",
      description: "Découvrez l’oasis de Gabes, unique en bord de mer.",
      location: "Oasis de Gabès - Bord de mer",
      duration: 3,
      price: 28,
      difficulty: "Moyen",
    },
  ],
  Medenine: [
    {
      name: "Circuit de Matmata",
      description: "Exploration des habitations troglodytes.",
      location: "Matmata - Désert de Tataouine",
      duration: 4,
      price: 35,
      difficulty: "Moyen",
    },
    {
      name: "Circuit de Douz",
      description: "Découverte des dunes du désert.",
      location: "Douz - Erg Djemel",
      duration: 5,
      price: 40,
      difficulty: "Difficile",
    },
  ],
  Tataouine: [
    {
      name: "Circuit de Tataouine",
      description: "Découverte des ksour et paysages sahariens.",
      location: "Tataouine - Ksar Ouled Soltane",
      duration: 3,
      price: 30,
      difficulty: "Moyen",
    },
    {
      name: "Circuit du Désert de Chenini",
      description: "Randonnée au cœur du désert.",
      location: "Chenini - Désert de Tataouine",
      duration: 5,
      price: 45,
      difficulty: "Difficile",
    },
  ],
  Tozeur: [
    {
      name: "Circuit des Oasis de Tozeur",
      description: "Randonnée à travers les palmeraies.",
      location: "Tozeur - Chott el-Jerid",
      duration: 4,
      price: 35,
      difficulty: "Moyen",
    },
    {
      name: "Circuit des Ksour",
      description: "Exploration des villages fortifiés.",
      location: "Ksar Ouled Soltane - Chott el-Jerid",
      duration: 5,
      price: 40,
      difficulty: "Difficile",
    },
  ],
  Kebili: [
    {
      name: "Circuit de l’Oasis de Kebili",
      description: "Randonnée dans une oasis du désert.",
      location: "Kebili - Erg el-Naouel",
      duration: 5,
      price: 45,
      difficulty: "Difficile",
    },
    {
      name: "Circuit de la Vallée de l’Oued Djerid",
      description: "Découverte des paysages désertiques.",
      location: "Kebili - Chott el-Jerid",
      duration: 4,
      price: 35,
      difficulty: "Moyen",
    },
  ],
  Gafsa: [
    {
      name: "Circuit de l’Oasis de Tozeur",
      description: "Exploration des oasis au bord du désert.",
      location: "Tozeur - Oasis de Chott el-Jerid",
      duration: 4,
      price: 35,
      difficulty: "Moyen",
    },
    {
      name: "Circuit du Ksar Ouled Soltane",
      description: "Découverte de l’architecture des ksour.",
      location: "Ksar Ouled Soltane - Erg Chebbi",
      duration: 5,
      price: 45,
      difficulty: "Difficile",
    },
  ],
};


const regions = [
  {
    id: "Tunis",
    name: "🌿Tunis, Tunisia 🌿  Parc du Belvédère, nature urbaine.",
    coords: [36.8065, 10.1815],
  },
  {
    id: "Ariana",
    name: "🌿Ariana, Tunisia🌿",
    coords: [36.8665, 10.1647],
  },
  {
    id: "BenArous",
    name: "🌿Ben Arous, Tunisia🌿",
    coords: [36.7435, 10.2317],
  },
  {
    id: "Manouba",
    name: "🌿Manouba, Tunisia🌿",
    coords: [36.8083, 9.9991],
  },
  {
    id: "Nabeul",
    name: "🌿Nabeul, Tunisia🌿",
    coords: [36.451, 10.7361],
  },
  {
    id: "Bizerte",
    name: "🌿Bizerte, Tunisia 🌿 Parc Ichkeul, oiseaux migrateurs.",
    coords: [37.2744, 9.8739],
  },
  {
    id: "Beja",
    name: "🌿Béja, Tunisia 🌿 Dougga, nature et patrimoine.",
    coords: [36.733, 9.1843],
  },
  {
    id: "Jendouba",
    name: "🌿Jendouba, Tunisia🌿",
    coords: [36.5011, 8.7802],
  },
  {
    id: "Kef",
    name: "🌿Le Kef, Tunisia 🌿 Jebel Ouergha, nature sauvage.",
    coords: [36.1675, 8.704],
  },
  {
    id: "Siliana",
    name: "🌿Siliana, Tunisia🌿",
    coords: [36.088, 9.3746],
  },
  {
    id: "Zaghouan",
    name: "🌿Zaghouan, Tunisia🌿",
    coords: [36.4021, 10.1447],
  },
  {
    id: "Sousse",
    name: "🌿Sousse, Tunisia 🌿 Oliveraies et terroir local.",
    coords: [35.8256, 10.6369],
  },
  {
    id: "Monastir",
    name: "🌿Monastir, Tunisia 🌿 Sentiers côtiers et conservation marine.",
    coords: [35.7643, 10.8113],
  },
  {
    id: "Mahdia",
    name: "🌿Mahdia, Tunisia🌿",
    coords: [35.5047, 11.0622],
  },
  {
    id: "Sfax",
    name: "🌿Sfax, Tunisia 🌿 Îles Kerkennah, pêche durable.",
    coords: [34.7391, 10.7593],
  },
  {
    id: "Kairouan",
    name: "🌿Kairouan, Tunisia 🌿 Lac Sidi Saad, oasis désertique.",
    coords: [35.6781, 10.0963],
  },
  {
    id: "Kasserine",
    name: "🌿Kasserine, Tunisia 🌿 Chaambi, plus haut sommet de Tunisie.",
    coords: [35.1676, 8.8368],
  },
  {
    id: "SidiBouzid",
    name: "🌿Sidi Bouzid, Tunisia 🌿Montagnes et nature rurale.",
    coords: [35.0382, 9.4858],
  },
  {
    id: "Gabes",
    name: "🌿Gabès, Tunisia🌿 Oasis maritime unique.",
    coords: [33.8815, 10.0982],
  },
  {
    id: "Medenine",
    name: "🌿Médenine, Tunisia 🌿 Ksours et randonnées berbères.",
    coords: [33.3549, 10.5055],
  },
  {
    id: "Tataouine",
    name: "🌿Tataouine, Tunisia🌿  Ksar Ghilane, désert et patrimoine.",
    coords: [32.929, 10.4518],
  },
  {
    id: "Tozeur",
    name: "🌿Tozeur, Tunisia 🌿 Chébika, oasis et dunes.",
    coords: [33.9197, 8.1335],
  },
  {
    id: "Kebili",
    name: "🌿Kebili, Tunisia🌿",
    coords: [33.7076, 8.9715],
  },
  {
    id: "Gafsa",
    name: "🌿Gafsa, Tunisia  Cascades et oasis de montagne.",
    coords: [34.425, 8.7806],
  },
];

function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 10);
  return null;
}

const Circuit = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regionCircuits, setRegionCircuits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setFilteredRegions] = useState(regions);
  const [reviews, setReviews] = useState({});

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setRegionCircuits(circuitsByRegion[region.id] || []);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = regions.filter((region) =>
      region.name.toLowerCase().includes(term)
    );
    setFilteredRegions(filtered);

    if (filtered.length === 1) {
      // If exactly one region matches, automatically zoom to it
      handleRegionClick(filtered[0]);
    }
  };

  const handleReserveClick = (circuit) => {
    alert(`You have reserved: ${circuit.name}`);
    // Add reservation functionality here (e.g., navigation or API call)
  };

  const handleReviewSubmit = (circuitName, reviewData) => {
    // Add or update the review for the selected circuit
    setReviews((prevReviews) => ({
      ...prevReviews,
      [circuitName]: [...(prevReviews[circuitName] || []), reviewData],
    }));
  };

  return (
    <div className="circuit-container">
      <input
        type="text"
        placeholder="Search for a region..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <MapContainer
        center={tunisiaCenter}
        zoom={zoomLevel}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {regions.map((region) => (
          <Marker
            key={region.id}
            position={region.coords}
            icon={customIcon}
            eventHandlers={{
              click: () => handleRegionClick(region),
            }}
          >
            <Popup>{region.name}</Popup>
          </Marker>
        ))}
        {selectedRegion && <ChangeView coords={selectedRegion.coords} />}
      </MapContainer>

      {regionCircuits.length > 0 && (
        <div className="circuit-list">
          <h2>Circuits in {selectedRegion && selectedRegion.name}</h2>
          <ul>
            {regionCircuits.map((circuit, index) => (
              <li key={index}>
                <h3>{circuit.name}</h3>
                <p>{circuit.description}</p>
                <p>
                  <strong>Départ :</strong> {circuit.location}
                </p>
                <p>
                  <strong>Durée :</strong> {circuit.duration} heures
                </p>
                <p>
                  <strong>Prix :</strong> {circuit.price} TND
                </p>
                <p>
                  <strong>Difficulté :</strong> {circuit.difficulty}
                </p>
                <button onClick={() => handleReserveClick(circuit)}>
                  Reserver
                </button>

                {/* Review Form for Each Circuit */}
                <div className="review-form">
                  <h4>Leave a Review</h4>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const reviewData = {
                        rating: parseInt(e.target.rating.value),
                        comment: e.target.comment.value,
                      };
                      handleReviewSubmit(circuit.name, reviewData);
                      e.target.reset(); // clear the form after submit
                    }}
                  >
                    <div>
                      <label htmlFor="rating">Rating: </label>
                      <select id="rating" name="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment: </label>
                      <textarea
                        id="comment"
                        name="comment"
                        placeholder="Write your review here..."
                        required
                      />
                    </div>
                    <button type="submit">Submit Review</button>
                  </form>
                </div>

                {/* Display Reviews */}
                <div className="reviews">
                  <h4>Reviews:</h4>
                  {reviews[circuit.name] && reviews[circuit.name].length > 0 ? (
                    <ul>
                      {reviews[circuit.name].map((review, idx) => (
                        <li key={idx}>
                          <p>
                            <strong>Rating:</strong> {review.rating} / 5
                          </p>
                          <p>
                            <strong>Comment:</strong> {review.comment}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Circuit;
 