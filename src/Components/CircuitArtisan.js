import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';
import './Circuit.css';
import Bizert from "../assest/bizert.jpg";

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

const regions = [
  { 
    name: 'Tunis', 
    coords: [36.8065, 10.1815], 
    description: 'Capital city of Tunisia, rich in history and culture.', 
    imageUrl: 'path_to_tunis_image.jpg' 
  },
  { 
    name: 'Ariana', 
    coords: [36.8665, 10.1647], 
    description: 'A city located in the north of Tunis, known for its beautiful parks.', 
    imageUrl: 'path_to_ariana_image.jpg' 
  },
  { 
    name: 'Ben Arous', 
    coords: [36.7435, 10.2317], 
    description: 'An industrial city, located south of Tunis.', 
    imageUrl: 'path_to_ben_arous_image.jpg' 
  },
  { 
    name: 'Manouba', 
    coords: [36.8083, 9.9991], 
    description: 'A city famous for its historical sites and monuments.', 
    imageUrl: 'path_to_manouba_image.jpg' 
  },
  { 
    name: 'Nabeul', 
    coords: [36.451, 10.7361], 
    description: 'Known for its pottery, Nabeul is located on the northeastern coast.', 
    imageUrl: 'path_to_nabeul_image.jpg' 
  },
  { 
    name: 'Bizerte', 
    coords: [37.2744, 9.8739], 
    description: 'Bizerte est une ville tunisienne située au nord, sur la Méditerranée. Elle est connue pour son port, ses plages et sa médina historique', 
    imageUrl: Bizert 
  },
  { 
    name: 'Beja', 
    coords: [36.733, 9.1843], 
    description: 'A city with a rich agricultural history, known for its beautiful landscapes.', 
    imageUrl: 'path_to_beja_image.jpg' 
  },
  { 
    name: 'Jendouba', 
    coords: [36.5011, 8.7802], 
    description: 'Jendouba is a quiet, rural city in northwestern Tunisia.', 
    imageUrl: 'path_to_jendouba_image.jpg' 
  },
  { 
    name: 'Kef', 
    coords: [36.1675, 8.704], 
    description: 'A city with a mountainous landscape, famous for its beautiful nature reserves.', 
    imageUrl: 'path_to_kef_image.jpg' 
  },
  { 
    name: 'Siliana', 
    coords: [36.088, 9.3746], 
    description: 'A city known for its agricultural heritage and scenic views.', 
    imageUrl: 'path_to_siliana_image.jpg' 
  },
  { 
    name: 'Zaghouan', 
    coords: [36.4021, 10.1447], 
    description: 'A historical city, home to the ancient Roman waterworks system.', 
    imageUrl: 'path_to_zaghouan_image.jpg' 
  },
  { 
    name: 'Sousse', 
    coords: [35.8256, 10.6369], 
    description: 'A coastal city with sandy beaches and a UNESCO World Heritage site.', 
    imageUrl: 'path_to_sousse_image.jpg' 
  },
  { 
    name: 'Monastir', 
    coords: [35.7643, 10.8113], 
    description: 'Famous for its historical sites, including the Ribat of Monastir.', 
    imageUrl: 'path_to_monastir_image.jpg' 
  },
  { 
    name: 'Mahdia', 
    coords: [35.5047, 11.0622], 
    description: 'A city known for its beautiful beaches and fishing harbor.', 
    imageUrl: 'path_to_mahdia_image.jpg' 
  },
  { 
    name: 'Sfax', 
    coords: [34.7391, 10.7593], 
    description: 'An industrial hub with a vibrant port city atmosphere.', 
    imageUrl: 'path_to_sfax_image.jpg' 
  },
  { 
    name: 'Kairouan', 
    coords: [35.6781, 10.0963], 
    description: 'A historical city, known for its religious significance and mosques.', 
    imageUrl: 'path_to_kairouan_image.jpg' 
  },
  { 
    name: 'Kasserine', 
    coords: [35.1676, 8.8368], 
    description: 'Known for its mountainous terrain and historical sites.', 
    imageUrl: 'path_to_kasserine_image.jpg' 
  },
  { 
    name: 'Sidi Bouzid', 
    coords: [35.0382, 9.4858], 
    description: 'A city that played a significant role in Tunisia\'s revolution.', 
    imageUrl: 'path_to_sidi_bouzid_image.jpg' 
  },
  { 
    name: 'Gabes', 
    coords: [33.8815, 10.0982], 
    description: 'A coastal city, known for its agriculture and beautiful beaches.', 
    imageUrl: 'path_to_gabes_image.jpg' 
  },
  { 
    name: 'Medenine', 
    coords: [33.3549, 10.5055], 
    description: 'Medenine is famous for its unique traditional architecture called “ksours.”', 
    imageUrl: 'path_to_medenine_image.jpg' 
  },
  { 
    name: 'Tataouine', 
    coords: [32.929, 10.4518], 
    description: 'Known for its Berber culture and unique landscape.', 
    imageUrl: 'path_to_tataouine_image.jpg' 
  },
  { 
    name: 'Tozeur', 
    coords: [33.9197, 8.1335], 
    description: 'A city famous for its oasis and ancient architecture.', 
    imageUrl: 'path_to_tozeur_image.jpg' 
  },
  { 
    name: 'Kebili', 
    coords: [33.7076, 8.9715], 
    description: 'A city near the Sahara Desert, known for its desert landscape.', 
    imageUrl: 'path_to_kebili_image.jpg' 
  },
  { 
    name: 'Gafsa', 
    coords: [34.425, 8.7842], 
    description: 'An agricultural city surrounded by scenic mountains and historic sites.', 
    imageUrl: 'path_to_gafsa_image.jpg' 
  }
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

  const handleRegionClick = (region) => {
    setSelectedRegion(region.coords);
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
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {regions.map((region) => (
          <Marker
            key={region.name}
            position={region.coords}
            icon={customIcon}
            eventHandlers={{
              click: () => handleRegionClick(region),
            }}
          >
            <Popup>
              <div>
                <h3>{region.name}</h3>
                <p>{region.description}</p>
                <img src={region.imageUrl} alt={region.name} style={{ width: '100%', height: 'auto' }} />
              </div>
            </Popup>
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Circuit;
