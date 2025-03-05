import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';

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
  { name: 'Gafsa', coords: [34.425, 8.7842] },
];

function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 10);
  return null;
}

const Circuit = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <MapContainer center={tunisiaCenter} zoom={zoomLevel} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedRegion && <ChangeView coords={selectedRegion} />}
      {regions.map((region, index) => (
        <Marker
          key={index}
          position={region.coords}
          icon={customIcon} // Set custom icon
          eventHandlers={{ click: () => setSelectedRegion(region.coords) }}
        >
          <Popup>{region.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Circuit;
