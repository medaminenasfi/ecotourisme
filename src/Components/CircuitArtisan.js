import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import "./circuitar.css";
import { motion, AnimatePresence } from "framer-motion";
import tunis from "../assest/tunisi.jpg";
import ariane from "../assest/Ariana.webp";
import Ben from "../assest/ben arous.jpg";
import man from "../assest/mannoub.jpg";
import nab from "../assest/nabeul.jpg";
import zagh from "../assest/zagh.jpg";
import bizer from "../assest/bizer.jpg";
import beja from "../assest/beja.jpg";
import jendoub from "../assest/jendouba.jpg";
import kef from "../assest/kef.jpg";
import silia from "../assest/silina.jpg";
import sous from "../assest/souss.jpg";
import mounn from "../assest/mounas.jpg";
import mah from "../assest/mahd.jpg";
import sfax from "../assest/sfaxx.jpg";
import kai from "../assest/kaira.jpg";
import kasse from "../assest/kasseri.jpg";
import sidibou from "../assest/sidi bou.jpg";
import gafss from "../assest/gafsaa.jpg";
import toze from "../assest/tozeur poterie.jpg";
import gabes from "../assest/Gabes.jpg";
import med from "../assest/medenin.jpg";
import tata from "../assest/tataa.jpg";
import kebili from "../assest/kebibli vannerie.jpg";
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
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

const regions = [
  {
    name: "Tunis",
    coords: [36.8065, 10.1815],
    description: "🧵 Broderie traditionnelle",
    imageUrl: tunis,
  },
  {
    name: "Ariana",
    coords: [36.8665, 10.1647],
    description: "🧵 Broderie traditionnelle",
    imageUrl: ariane,
  },
  {
    name: "Ben Arous",
    coords: [36.7435, 10.2317],
    description: "🏺 Poterie artisanale",
    imageUrl: Ben,
  },
  {
    name: "Manouba",
    coords: [36.8083, 9.9991],
    description: "👝 Travail du cuir",
    imageUrl: man,
  },
  {
    name: "Nabeul",
    coords: [36.451, 10.7361],
    description: "🏺 Céramique & poterie",
    imageUrl: nab,
  },
  {
    name: "Bizerte",
    coords: [37.2744, 9.8739],
    description: "🚤 Construction de bateaux artisanaux",
    imageUrl: bizer,
  },
  {
    name: "Beja",
    coords: [36.733, 9.1843],
    description: "🧺 Vannerie en alfa",
    imageUrl: beja,
  },
  {
    name: "Jendouba",
    coords: [36.5011, 8.7802],
    description: "👒 Chapeaux de paille",
    imageUrl: jendoub,
  },
  {
    name: "Kef",
    coords: [36.1675, 8.704],
    description: "👒 Chapeaux de paille",
    imageUrl: kef,
  },
  {
    name: "Siliana",
    coords: [36.088, 9.3746],
    description: "🧺 Travail de l'alfa & broderie",
    imageUrl: silia,
  },
  {
    name: "Zaghouan",
    coords: [36.4021, 10.1447],
    description: "🏺 Poterie traditionnelle",
    imageUrl: zagh,
  },
  {
    name: "Sousse",
    coords: [35.8256, 10.6369],
    description: "💍 Bijouterie artisanale",
    imageUrl: sous,
  },
  {
    name: "Monastir",
    coords: [35.7643, 10.8113],
    description: "💍 Bijouterie artisanale",
    imageUrl: mounn,
  },
  {
    name: "Mahdia",
    coords: [35.5047, 11.0622],
    description: "🧵 Tissage de soie & artisanat marin",
    imageUrl: mah,
  },
  {
    name: "Sfax",
    coords: [34.7391, 10.7593],
    description: "🛠️ Cuivre ciselé & poterie",
    imageUrl: sfax,
  },
  {
    name: "Kairouan",
    coords: [35.6781, 10.0963],
    description: "🧵 Tapis de Kairouan",
    imageUrl: kai,
  },
  {
    name: "Kasserine",
    coords: [35.1676, 8.8368],
    description: "🧶 Tissage de couvertures traditionnelles",
    imageUrl: kasse,
  },
  {
    name: "Sidi Bouzid",
    coords: [35.0382, 9.4858],
    description: "🪵 Bois d'olivier (ustensiles)",
    imageUrl: sidibou,
  },
  {
    name: "Gabes",
    coords: [33.8815, 10.0982],
    description: "🏺 Poterie de Chenini & bijoux berbères",
    imageUrl: gabes,
  },
  {
    name: "Medenine",
    coords: [33.3549, 10.5055],
    description: "🏺 Poterie de Chenini & bijoux berbères",
    imageUrl: med,
  },
  {
    name: "Tataouine",
    coords: [32.929, 10.4518],
    description: "💍 Artisanat berbère (bijoux & tissage)",
    imageUrl: tata,
  },
  {
    name: "Tozeur",
    coords: [33.9197, 8.1335],
    description: "🌴 Poterie & bois de palmier",
    imageUrl: toze,
  },
  {
    name: "Kebili",
    coords: [33.7076, 8.9715],
    description: "🧺 Vannerie en feuilles de palmier",
    imageUrl: kebili,
  },
  {
    name: "Gafsa",
    coords: [34.425, 8.7842],
    description: "🧵 Tapis de laine & margoums",
    imageUrl: gafss,
  },
];

function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 10);
  return null;
}

const Circuit = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setShowResults(term.length > 0);

    const foundRegion = regions.find((region) =>
      region.name.toLowerCase().includes(term)
    );

    if (foundRegion) {
      setSelectedRegion(foundRegion.coords);
    }
  };

  const filteredRegions = regions.filter((region) =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="circuit-container bg-black">
      <motion.div 
        className="search-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="search-wrapper">
          <div className="search-icon-wrapper">
            <FaSearch className="search-icon" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une région..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
        <AnimatePresence>
          {showResults && searchTerm && (
            <motion.div 
              className="search-results"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filteredRegions.map((region) => (
                <motion.div
                  key={region.name}
                  className="search-result-item"
                  onClick={() => {
                    setSelectedRegion(region.coords);
                    setSearchTerm(region.name);
                    setShowResults(false);
                  }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaMapMarkerAlt className="result-icon" />
                  <span>{region.name}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <MapContainer
        center={tunisiaCenter}
        zoom={zoomLevel}
        className="map-view"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {filteredRegions.map((region) => (
          <Marker
            key={region.name}
            position={region.coords}
            icon={customIcon}
            eventHandlers={{
              click: () => setSelectedRegion(region.coords),
            }}
          >
            <Popup>
              <motion.div 
                className="popup-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="popup-title">{region.name}</h3>
                <div className="popup-image-container">
                  <img
                    src={region.imageUrl}
                    alt={region.name}
                    className="popup-image"
                  />
                </div>
                <p className="popup-description">{region.description}</p>
              </motion.div>
            </Popup>
          </Marker>
        ))}

        {selectedRegion && <ChangeView coords={selectedRegion} />}
      </MapContainer>

      <style jsx>{`
        .circuit-container {
          position: relative;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        .search-container {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: 90%;
          max-width: 500px;
          pointer-events: auto;
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 30px;
          padding: 12px 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .search-wrapper:focus-within {
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.02);
        }

        .search-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
        }

        .search-icon {
          color: #fff;
          font-size: 1.3rem;
          opacity: 0.8;
        }

        .search-bar {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 1.1rem;
          padding: 8px 0;
          outline: none;
          width: 100%;
        }

        .search-bar::placeholder {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.1rem;
        }

        .search-results {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.9);
          border-radius: 15px;
          max-height: 300px;
          overflow-y: auto;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .search-result-item {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .search-result-item:last-child {
          border-bottom: none;
        }

        .search-result-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .result-icon {
          margin-right: 12px;
          color: #28a745;
          font-size: 1.1rem;
        }

        .map-view {
          height: 100%;
          width: 100%;
        }

        .popup-content {
          padding: 10px;
          text-align: center;
        }

        .popup-title {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #333;
        }

        .popup-image-container {
          margin: 10px 0;
        }

        .popup-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
        }

        .popup-description {
          color: #666;
          font-size: 0.9rem;
        }

        .search-results::-webkit-scrollbar {
          width: 8px;
        }

        .search-results::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .search-results::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .search-results::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .search-container {
            width: 95%;
            top: 10px;
          }

          .search-wrapper {
            padding: 10px 20px;
          }

          .search-bar {
            font-size: 1rem;
          }

          .search-bar::placeholder {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Circuit;
