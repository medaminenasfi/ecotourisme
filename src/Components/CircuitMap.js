import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';
import './Circuit.css';

// Fix Leaflet marker icon issue
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

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
    { name: 'Circuit de la médina', description: 'Une promenade à travers les rues historiques de la médina de Tunis.', start: '2025-04-01', end: '2025-04-07' },
    { name: 'Circuit des plages', description: 'Explorez les magnifiques plages autour de Tunis.', start: '2025-05-01', end: '2025-05-10' },
    { name: 'Circuit des sites historiques', description: 'Visitez les sites historiques importants de Tunis, y compris le musée du Bardo.', start: '2025-06-01', end: '2025-06-05' }
  ],
  Ariana: [
    { name: 'Circuit de l’Oasis d’Ariana', description: 'Explorez les oasis de la région d’Ariana.', start: '2025-07-01', end: '2025-07-07' },
    { name: 'Circuit de la médina', description: 'Visitez la médina d’Ariana avec ses charmantes rues et architectures.', start: '2025-08-01', end: '2025-08-10' }
  ],
  Manouba: [
    { name: 'Circuit de la nature', description: 'Explorez les forêts et la biodiversité de Manouba.', start: '2025-10-01', end: '2025-10-07' }
  ],
  Nabeul: [
    { name: 'Circuit des plages de Nabeul', description: 'Détendez-vous sur les plages immaculées de Nabeul.', start: '2025-04-10', end: '2025-04-20' }
  ],
  Bizerte: [
    { name: 'Circuit de l’Île de la Galite', description: 'Découvrez l’île préservée de la Galite.', start: '2025-05-15', end: '2025-05-20' }
  ],
  Beja: [
    { name: 'Circuit des ruines romaines de Timgad', description: 'Visitez les ruines romaines de Timgad à Beja.', start: '2025-06-15', end: '2025-06-18' }
  ],
  Jendouba: [
    { name: 'Circuit des montagnes de Jendouba', description: 'Randonnez dans les montagnes verdoyantes de Jendouba.', start: '2025-07-10', end: '2025-07-15' }
  ],
  Kef: [
    { name: 'Circuit des anciennes forteresses', description: 'Visitez les anciennes forteresses du Kef.', start: '2025-08-15', end: '2025-08-20' }
  ],
  Siliana: [
    { name: 'Circuit des Gorges de Siliana', description: 'Explorez les magnifiques gorges de Siliana.', start: '2025-09-10', end: '2025-09-15' }
  ],
  Zaghouan: [
    { name: 'Circuit des sources d\'eau', description: 'Découvrez les fameuses sources d’eau de Zaghouan.', start: '2025-10-10', end: '2025-10-15' }
  ],
  Sousse: [
    { name: 'Circuit du Ribat de Sousse', description: 'Explorez le Ribat historique de Sousse, un lieu de défense contre les invasions.', start: '2025-11-01', end: '2025-11-05' },
    { name: 'Circuit des plages de Sousse', description: 'Détendez-vous sur les plages magnifiques de Sousse.', start: '2025-12-01', end: '2025-12-10' }
  ],
  Monastir: [
    { name: 'Circuit du mausolée de Bourguiba', description: 'Visitez le mausolée de Bourguiba à Monastir.', start: '2025-12-15', end: '2025-12-20' }
  ],
  Mahdia: [
    { name: 'Circuit des plages de Mahdia', description: 'Randonnez sur les plages immaculées de Mahdia.', start: '2025-01-01', end: '2025-01-07' }
  ],
  Sfax: [
    { name: 'Circuit du centre historique de Sfax', description: 'Explorez la médina et le centre historique de Sfax.', start: '2025-02-01', end: '2025-02-07' }
  ],
  Kairouan: [
    { name: 'Circuit du mausolée de Sidi Sahbi', description: 'Visitez le mausolée de Sidi Sahbi à Kairouan.', start: '2025-03-01', end: '2025-03-05' }
  ],
  Kasserine: [
    { name: 'Circuit de Jebel Mghilla', description: 'Randonnez dans les montagnes du Jebel Mghilla, le plus haut sommet de la Tunisie.', start: '2025-04-01', end: '2025-04-07' },
    { name: 'Circuit des Gorges de Selja', description: 'Explorez les spectaculaires gorges de Selja.', start: '2025-05-01', end: '2025-05-07' }
  ],
  Gabes: [
    { name: 'Circuit de l’Oasis de Gabes', description: 'Découvrez l’oasis de Gabes, unique en bord de mer.', start: '2025-07-01', end: '2025-07-10' },
    { name: 'Circuit des dunes', description: 'Parcourez les dunes du désert en direction de l’oasis.', start: '2025-08-01', end: '2025-08-05' }
  ],
  Medenine: [
    { name: 'Circuit de l’oasis de Medenine', description: 'Explorez l’oasis de Medenine dans le sud tunisien.', start: '2025-09-01', end: '2025-09-07' }
  ],
  Tataouine: [
    { name: 'Circuit des ksour de Tataouine', description: 'Découvrez les ksour traditionnels de Tataouine.', start: '2025-10-01', end: '2025-10-07' }
  ],
  Tozeur: [
    { name: 'Circuit de l’Oasis de Tozeur', description: 'Un circuit à travers les oasis luxuriantes de Tozeur.', start: '2025-11-01', end: '2025-11-07' },
    { name: 'Circuit du Chott El Jerid', description: 'Marchez sur le désert salé du Chott El Jerid.', start: '2025-12-01', end: '2025-12-07' }
  ],
  Kebili: [
    { name: 'Circuit de l’oasis de Kebili', description: 'Découvrez l’oasis de Kebili au cœur du désert.', start: '2025-01-10', end: '2025-01-15' }
  ],
  Gafsa: [
    { name: 'Circuit des montagnes de Gafsa', description: 'Explorez les montagnes et oasis de Gafsa.', start: '2025-02-10', end: '2025-02-15' }
  ]
};

const regions = [
  { name: 'Tunis', coords: [36.8065, 10.1815] },
  { name: 'Ariana', coords: [36.8665, 10.1647] },
  { name: 'Ben Arous', coords: [36.7435, 10.2317] },
  { name: 'Manouba', coords: [36.8083, 9.9991] },
  { name: 'Nabeul', coords: [36.451, 10.7361] },
  { name: 'Bizerte', coords: [37.2744, 9.8739] },
  { name: 'Beja', coords: [36.733, 9.1843] },
  { name: 'Jendouba', coords: [36.5011, 8.7802] },
  { name: 'Kef', coords: [36.1675, 8.704] },
  { name: 'Siliana', coords: [36.088, 9.3746] },
  { name: 'Zaghouan', coords: [36.4021, 10.1447] },
  { name: 'Sousse', coords: [35.8256, 10.6369] },
  { name: 'Monastir', coords: [35.7643, 10.8113] },
  { name: 'Mahdia', coords: [35.5047, 11.0622] },
  { name: 'Sfax', coords: [34.7391, 10.7593] },
  { name: 'Kairouan', coords: [35.6781, 10.0963] },
  { name: 'Kasserine', coords: [35.1676, 8.8368] },
  { name: 'Sidi Bouzid', coords: [35.0382, 9.4858] },
  { name: 'Gabes', coords: [33.8815, 10.0982] },
  { name: 'Medenine', coords: [33.3549, 10.5055] },
  { name: 'Tataouine', coords: [32.929, 10.4518] },
  { name: 'Tozeur', coords: [33.9197, 8.1335] },
  { name: 'Kebili', coords: [33.7076, 8.9715] },
  { name: 'Gafsa', coords: [34.425, 8.7806] }
];

function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 10);
  return null;
}

const Circuit = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regionCircuits, setRegionCircuits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRegions, setFilteredRegions] = useState(regions);
  const [reviews, setReviews] = useState({});

  const handleRegionClick = (region) => {
    setSelectedRegion(region.coords);
    setRegionCircuits(circuitsByRegion[region.name] || []);
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
    // Add reservation functionality here, such as navigating to a confirmation page or saving the reservation
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
      <MapContainer center={tunisiaCenter} zoom={zoomLevel} style={{ height: "100vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {regions.map((region) => (
          <Marker
            key={region.name}
            position={region.coords}
            icon={customIcon}
            eventHandlers={{
              click: () => handleRegionClick(region),
            }}
          >
            <Popup>{region.name}</Popup>
          </Marker>
        ))}
        {selectedRegion && <ChangeView coords={selectedRegion} />}
      </MapContainer>

      {regionCircuits.length > 0 && (
        <div className="circuit-list">
          <h2>Circuits in {selectedRegion && selectedRegion.name}</h2>
          <ul>
            {regionCircuits.map((circuit, index) => (
              <li key={index}>
                <h3>{circuit.name}</h3>
                <p>{circuit.description}</p>
                <p><strong>Start:</strong> {circuit.start}</p>
                <p><strong>End:</strong> {circuit.end}</p>
                <button onClick={() => handleReserveClick(circuit)}>Reserver</button>

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
                          <p><strong>Rating:</strong> {review.rating} / 5</p>
                          <p><strong>Comment:</strong> {review.comment}</p>
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
