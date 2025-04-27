import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState , useRef } from "react";
import "./Circuit.css";
import { Link } from "react-router-dom";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import 'leaflet-routing-machine';
import React, { useEffect } from 'react';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconPng,
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

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
const circuitsByRegion = {
  BenArous: [
    {
      name: "Circuit du Parc de Fouchana",
      description: "Randonnée écologique dans une réserve naturelle urbaine.",
      location: "Parc de Fouchana - Zone humide",
      duration: 2,
      price: 25,
      difficulty: "Facile",
    },
    {
      name: "Circuit des Collines de Mornag",
      description: "Sentiers viticoles à travers les domaines agricoles.",
      location: "Mornag - Domaine viticole",
      duration: 3,
      price: 35,
      difficulty: "Moyen",
    },
  ],
  SidiBouzid: [
    {
      name: "Circuit du Jebel Sidi Bouzid",
      description: "Ascension avec vue sur les plaines agricoles.",
      location: "Jebel Sidi Bouzid - Point de vue",
      duration: 4,
      price: 40,
      difficulty: "Difficile",
    },
    {
      name: "Circuit des Oasis de Regueb",
      description: "Découverte des systèmes d'irrigation traditionnels.",
      location: "Regueb - Palmeraies",
      duration: 2.5,
      price: 28,
      difficulty: "Moyen",
    },
  ],
  Tunis: [
    {
      name: "Circuit du Belvédère - Lac de Tunise",
      description: "Vue panoramique sur Tunis et le lac.",
      location: "Parc du Belvédère",
      duration: 2,
      price: 30,
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
      location: "Monastir",
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


function Routing({ map }) {
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map ) return;

    const waypoints = [
      L.latLng(36.8356, 10.2237),  // deb
      L.latLng(36.8003, 10.1907)   // fin
    ];

    routingControlRef.current = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: true,
      showAlternatives: false,
      lineOptions: {
        styles: [{ color: '#3388ff', weight: 5 }]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true
    }).addTo(map);

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map]);

  return null;
}

function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 10);
  return null;
}

const Circuit = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regionCircuits, setRegionCircuits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRegions, setFilteredRegions] = useState(regions);
  const mapRef = useRef();

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
      handleRegionClick(filtered[0]);
    }
  };

  return (
    <Container fluid className="p-0">
      <section className="bg-dark text-white py-4 shadow">
        <Container>
          <h1 className="text-center mb-4 display-5">
            🌿 Explorer Nos Circuits en Carte 🌿
          </h1>

          <Form.Group className="mb-4">
            <Form.Control
              type="search"
              placeholder="Rechercher une région..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="rounded-pill py-2"
            />
          </Form.Group>

          <Row>
            <Col lg={8} className="mb-4 mb-lg-0">
              <div style={{ height: "60vh", borderRadius: "15px", overflow: "hidden" }}>
                <MapContainer
                  center={tunisiaCenter}
                  zoom={zoomLevel}
                  style={{ height: "100%", width: "100%" }}
                  ref={mapRef}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  <Routing map={mapRef.current} />
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
                                </div>
                              </Popup>
                            </Marker>
                          ))}
                  {selectedRegion && <ChangeView coords={selectedRegion.coords} />}
                </MapContainer>
              </div>
            </Col>

            {regionCircuits.length > 0 && (
              <Col lg={4}>
                <div className="p-3 bg-light rounded-3 h-100">
                  <h2 className="mb-4 text-dark">
                    {selectedRegion.name.split(",")[0]}🌿
                  </h2>
                  <div className="overflow-auto" style={{ maxHeight: "50vh" }}>
                    {regionCircuits.map((circuit, index) => (
                      <Card key={index} className="mb-3 shadow-sm">
                        <Card.Body>
                          <Card.Title>{circuit.name}</Card.Title>
                          <Card.Text className="text-muted small">
                            {circuit.description}
                          </Card.Text>
                          <div className="mb-3">
                            <p className="mb-1">
                              <strong>📍 Départ:</strong> {circuit.location}
                            </p>
                            <p className="mb-1">
                              <strong>⏳ Durée:</strong> {circuit.duration} heures
                            </p>
                            <p className="mb-1">
                              <strong>💵 Prix:</strong> {circuit.price} TND
                            </p>
                            <p className="mb-3">
                              <strong>🏔 Difficulté:</strong> {circuit.difficulty}
                            </p>
<Link
  to="/Reservation"
  state={{
    circuit: {
      ...circuit,
      _id: `${selectedRegion.id}-${index}-${Date.now()}`, // Add unique ID
      isTemp: true,
      region: selectedRegion.id,
      name: circuit.name, // Ensure name is included
      price: circuit.price,
      duration: circuit.duration,
      difficulty: circuit.difficulty,
      location: circuit.location
    },
  }}
>
  <Button variant="success" className="w-100">
    Réserver - {circuit.price} TND
  </Button>
</Link>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Container>
  );
};

export default Circuit;