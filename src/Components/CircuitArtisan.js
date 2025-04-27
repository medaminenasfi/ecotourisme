import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';
import './circuitar.css';
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
import  silia   from "../assest/silina.jpg"
import  sous  from "../assest/souss.jpg"
import  mounn   from "../assest/mounas.jpg"
import   mah  from "../assest/mahd.jpg"
import   sfax  from "../assest/sfaxx.jpg"
import   kai  from "../assest/kaira.jpg"
import   kasse  from "../assest/kasseri.jpg"
import   sidibou  from "../assest/sidi bou.jpg"
import   gafss  from "../assest/gafsaa.jpg"
import   toze  from "../assest/tozeur poterie.jpg"
import   gabes  from "../assest/Gabes.jpg"
import  med   from "../assest/medenin.jpg"
import   tata  from "../assest/tataa.jpg"
import    kebili from "../assest/kebibli vannerie.jpg"










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
    description: ' 🧵 Broderie traditionnelle.', 
    imageUrl: tunis 
  },
  { 
    name: 'Ariana', 
    coords: [36.8665, 10.1647], 
    description: ' 🧵 Broderie traditionnelle.', 
    imageUrl: ariane
  },
  { 
    name: 'Ben Arous', 
    coords: [36.7435, 10.2317], 
    description: ' 🏺 Poterie artisanale', 
    imageUrl: Ben
  },
  { 
    name: 'Manouba', 
    coords: [36.8083, 9.9991], 
    description: '👝 Travail du cuir.', 
    imageUrl: man
  },
  { 
    name: 'Nabeul', 
    coords: [36.451, 10.7361], 
    description: '🏺 Céramique & poterie.', 
    imageUrl: nab
  },
  { 
    name: 'Bizerte', 
    coords: [37.2744, 9.8739], 
    description: '🚤 Construction de bateaux artisanaux', 
    imageUrl: bizer
  },
  { 
    name: 'Beja', 
    coords: [36.733, 9.1843], 
    description: '🧺 Vannerie en alfa', 
    imageUrl: beja
  },
  { 
    name: 'Jendouba', 
    coords: [36.5011, 8.7802], 
    description: '👒 Chapeaux de paille', 
    imageUrl: jendoub
  },
  { 
    name: 'Kef', 
    coords: [36.1675, 8.704], 
    description: '👒 Chapeaux de paille', 
    imageUrl: kef
  },
  { 
    name: 'Siliana', 
    coords: [36.088, 9.3746], 
    description: '🧺 Travail de l’alfa & broderie', 
    imageUrl: silia 
  },
  { 
    name: 'Zaghouan', 
    coords: [36.4021, 10.1447], 
    description: '🏺 Poterie traditionnelle.', 
    imageUrl: zagh
  },
  { 
    name: 'Sousse', 
    coords: [35.8256, 10.6369], 
    description: '💍 Bijouterie artisanale', 
    imageUrl: sous
  },
  { 
    name: 'Monastir', 
    coords: [35.7643, 10.8113], 
    description: '💍 Bijouterie artisanale', 
    imageUrl: mounn 
  },
  { 
    name: 'Mahdia', 
    coords: [35.5047, 11.0622], 
    description: '🧵 Tissage de soie & artisanat marin', 
    imageUrl: mah
  },
  { 
    name: 'Sfax', 
    coords: [34.7391, 10.7593], 
    description: '🛠️ Cuivre ciselé & poterie', 
    imageUrl: sfax
  },
  { 
    name: 'Kairouan', 
    coords: [35.6781, 10.0963], 
    description: '🧵 Tapis de Kairouan', 
    imageUrl: kai 
  },
  { 
    name: 'Kasserine', 
    coords: [35.1676, 8.8368], 
    description: '🧶 Tissage de couvertures traditionnelles', 
    imageUrl: kasse
  },
  { 
    name: 'Sidi Bouzid', 
    coords: [35.0382, 9.4858], 
    description: '🪵 Bois d’olivier (ustensiles)', 
    imageUrl: sidibou
  },
  { 
    name: 'Gabes', 
    coords: [33.8815, 10.0982], 
    description: ' 🏺 Poterie de Chenini & bijoux berbères', 
    imageUrl:gabes 
  },
  { 
    name: 'Medenine', 
    coords: [33.3549, 10.5055], 
    description: ' 🏺 Poterie de Chenini & bijoux berbères”', 
    imageUrl: med
  },
  { 
    name: 'Tataouine', 
    coords: [32.929, 10.4518], 
    description: '💍 Artisanat berbère (bijoux & tissage)', 
    imageUrl: tata
  },
  { 
    name: 'Tozeur', 
    coords: [33.9197, 8.1335], 
    description: ' 🌴 Poterie & bois de palmier', 
    imageUrl: toze
  },
  { 
    name: 'Kebili', 
    coords: [33.7076, 8.9715], 
    description: ' 🧺 Vannerie en feuilles de palmier', 
    imageUrl: kebili
  },
  { 
    name: 'Gafsa', 
    coords: [34.425, 8.7842], 
    description: '🧵 Tapis de laine & margoums.', 
    imageUrl: gafss
  }
];
function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 10);
  return null;
}

const Circuit = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    // Déplacer la logique de recherche ici
    const foundRegion = regions.find(region => 
      region.name.toLowerCase().includes(term)
    );
    
    if (foundRegion) {
      setSelectedRegion(foundRegion.coords);
    }
  };

  const filteredRegions = regions.filter(region => 
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="circuit-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher une région..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

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
              <div className="popup-content">
                <h3 className="popup-title">{region.name}</h3>
                <img 
                  src={region.imageUrl} 
                  alt={region.name} 
                  className="popup-image"
                />
                <p className="popup-description">{region.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedRegion && <ChangeView coords={selectedRegion} />}
      </MapContainer>
    </div>
  );
};

export default Circuit;