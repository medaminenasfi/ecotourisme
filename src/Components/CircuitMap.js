import React, { useState } from 'react'; 
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from 'react-bootstrap';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Circuit Coordinates
const tozeurCircuitCoordinates = [
  [33.9143, 8.1292], // Start
  [33.9183, 8.1352],
  [33.9223, 8.1412],
  [33.9263, 8.1452],
  [33.9300, 8.1500], // Finish
];

// Restaurants & Guesthouses
const pointsOfInterest = [
  { name: "Dar Tozeur (Maison d’Hôte)", position: [33.9155, 8.1320], type: "guesthouse" },
  { name: "Restaurant Le Soleil", position: [33.9200, 8.1380], type: "restaurant" },
  { name: "El Bey (Maison d’Hôte)", position: [33.9250, 8.1430], type: "guesthouse" },
  { name: "Le Palmier Restaurant", position: [33.9280, 8.1480], type: "restaurant" },
];

// Leaflet Default Icons
const createIcon = (size = [40, 40]) => 
  new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1] / 2],
  });

const startIcon = createIcon();
const finishIcon = createIcon();
const arrowIcon = createIcon([25, 25]);
const restaurantIcon = createIcon([30, 30]);
const guesthouseIcon = createIcon([30, 30]);
const userLocationIcon = createIcon([30, 30]);

// Handle Clicks on the Map
const ClickHandler = ({ setClickedPosition }) => {
  useMapEvents({
    click(e) {
      setClickedPosition(e.latlng);
    },
  });
  return null;
};

const CircuitMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState("");

  // Get Current Location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          alert("Error getting location: " + error.message);
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  return (
    <div>
      <MapContainer center={tozeurCircuitCoordinates[0]} zoom={14} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Click Event Handler */}
        <ClickHandler setClickedPosition={setClickedPosition} />

        {/* Circuit Path */}
        <Polyline
          positions={tozeurCircuitCoordinates}
          color="blue"
          eventHandlers={{
            click: () => setSelectedCircuit("Tozeur Circuit"),
          }}
        />

        {/* Start & Finish Markers */}
        <Marker position={tozeurCircuitCoordinates[0]} icon={startIcon}>
          <Popup>Start: Oasis de Tozeur</Popup>
        </Marker>
        <Marker position={tozeurCircuitCoordinates[tozeurCircuitCoordinates.length - 1]} icon={finishIcon}>
          <Popup>End: Circuit Finish</Popup>
        </Marker>

        {/* Direction Arrows */}
        {tozeurCircuitCoordinates.slice(1, -1).map((point, index) => (
          <Marker key={`arrow-${index}`} position={point} icon={arrowIcon}>
            <Popup>Direction</Popup>
          </Marker>
        ))}

        {/* Restaurants & Guesthouses */}
        {pointsOfInterest.map((poi, index) => (
          <Marker
            key={`poi-${index}`}
            position={poi.position}
            icon={poi.type === "restaurant" ? restaurantIcon : guesthouseIcon}
          >
            <Popup>{poi.name}</Popup>
          </Marker>
        ))}

        {/* Clicked Position Marker */}
        {clickedPosition && (
          <Marker position={clickedPosition}>
            <Popup>You clicked here!</Popup>
          </Marker>
        )}

        {/* User Location */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Display Selected Circuit Name */}
      {selectedCircuit && (
        <div style={{ marginTop: "10px", fontWeight: "bold" }}>
          Selected Circuit: {selectedCircuit}
        </div>
      )}

      {/* Get Location Button */}
      <Button onClick={getCurrentLocation} style={{ marginTop: "10px" }}>
        Get My Location
      </Button>
    </div>
  );
};

export default CircuitMap;
