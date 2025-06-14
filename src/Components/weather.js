import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import axios from "axios";
import {
  WiDaySunny,
  WiRain,
  WiCloud,
  WiThermometer,
  WiHumidity,
  WiStrongWind,
} from "react-icons/wi";
import "leaflet/dist/leaflet.css";
import { Form, Spinner, Card } from "react-bootstrap";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const cities = [
  { name: "Tunis", coords: [36.8065, 10.1815] },
  { name: "Sousse", coords: [35.8254, 10.6369] },
  { name: "Sfax", coords: [34.7406, 10.7603] },
  { name: "Ariana", coords: [36.8665, 10.1647] },
  {
    name: "Ben Arous",
    coords: [36.7435, 10.2317],
  },
  {
    name: "Manouba",
    coords: [36.8083, 9.9991],
  },
  {
    name: "Nabeul",
    coords: [36.451, 10.7361],
  },
  {
    name: "Bizerte",
    coords: [37.2744, 9.8739],
  },
  {
    name: "Beja",
    coords: [36.733, 9.1843],
  },
  {
    name: "Jendouba",
    coords: [36.5011, 8.7802],
  },
  {
    name: "Kef",
    coords: [36.1675, 8.704],
  },
  {
    name: "Siliana",
    coords: [36.088, 9.3746],
  },
  {
    name: "Zaghouan",
    coords: [36.4021, 10.1447],
  },
  {
    name: "Monastir",
    coords: [35.7643, 10.8113],
  },
  {
    name: "Mahdia",
    coords: [35.5047, 11.0622],
  },
  {
    name: "Sfax",
    coords: [34.7391, 10.7593],
  },
  {
    name: "Kairouan",
    coords: [35.6781, 10.0963],
  },
  {
    name: "Kasserine",
    coords: [35.1676, 8.8368],
  },
  {
    name: "Sidi Bouzid",
    coords: [35.0382, 9.4858],
  },
  {
    name: "Gabes",
    coords: [33.8815, 10.0982],
  },
  {
    name: "Medenine",
    coords: [33.3549, 10.5055],
  },
  {
    name: "Tataouine",
    coords: [32.929, 10.4518],
  },
  {
    name: "Tozeur",
    coords: [33.9197, 8.1335],
  },
  {
    name: "Kebili",
    coords: [33.7076, 8.9715],
  },
  {
    name: "Gafsa",
    coords: [34.425, 8.7842],
  },
];

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom]);
  return null;
}

const WeatherMap = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [status, setStatus] = useState({ loading: true, error: null });
  const API_KEY = "ea6990b8ad9ce003cb88b22e93c93638";

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("fr-FR", options);
  };

  const fetchData = async () => {
    setStatus({ loading: true, error: null });
    const source = axios.CancelToken.source();

    try {
      const currentWeatherResponses = await Promise.allSettled(
        cities.map((city) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords[0]}&lon=${city.coords[1]}&appid=${API_KEY}&units=metric&lang=fr`,
            {
              timeout: 15000,
              cancelToken: source.token,
            }
          )
        )
      );

      const forecastResponses = await Promise.allSettled(
        cities.map((city) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coords[0]}&lon=${city.coords[1]}&appid=${API_KEY}&units=metric&lang=fr`,
            {
              timeout: 15000,
              cancelToken: source.token,
            }
          )
        )
      );

      const validCurrentData = currentWeatherResponses
        .map((response, index) => {
          if (response.status === "rejected") {
            console.error(
              `Erreur pour ${cities[index].name}:`,
              response.reason
            );
            return null;
          }

          const data = response.value.data;
          if (!data || data.cod !== 200) {
            console.warn(`Données invalides pour ${cities[index].name}:`, data);
            return null;
          }

          return {
            city: cities[index],
            position: [data.coord.lat, data.coord.lon],
            data: data,
          };
        })
        .filter(Boolean);

      const validForecastData = forecastResponses
        .map((response, index) => {
          if (response.status === "rejected") return null;
          const data = response.value.data;
          if (!data || data.cod !== "200") return null;

          // Group forecast by date
          const forecastByDate = data.list.reduce((acc, item) => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
          }, {});

          return {
            city: cities[index].name,
            forecast: forecastByDate,
          };
        })
        .filter(Boolean)
        .reduce((acc, item) => {
          acc[item.city] = item.forecast;
          return acc;
        }, {});

      if (validCurrentData.length === 0) {
        throw new Error(
          "Impossible de récupérer les données météo. Veuillez réessayer plus tard."
        );
      }

      setWeatherData(validCurrentData);
      setForecastData(validForecastData);
      setStatus({ loading: false, error: null });
    } catch (err) {
      if (!axios.isCancel(err)) {
        setStatus({
          loading: false,
          error:
            err.response?.status === 401
              ? "Clé API invalide ou expirée"
              : err.message,
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition) => {
    const mainCondition = condition.toLowerCase();
    if (mainCondition.includes("clear")) return <WiDaySunny className="sun" />;
    if (mainCondition.includes("rain")) return <WiRain className="rain" />;
    return <WiCloud className="cloud" />;
  };

  const getForecastForDate = (cityName, date) => {
    const cityForecast = forecastData[cityName];
    if (!cityForecast) return null;

    const dateStr = date.toLocaleDateString();
    const dayForecast = cityForecast[dateStr];
    if (!dayForecast) return null;

    const avgTemp =
      dayForecast.reduce((sum, item) => sum + item.main.temp, 0) /
      dayForecast.length;
    const avgHumidity =
      dayForecast.reduce((sum, item) => sum + item.main.humidity, 0) /
      dayForecast.length;
    const avgWind =
      dayForecast.reduce((sum, item) => sum + item.wind.speed, 0) /
      dayForecast.length;

    const conditions = dayForecast.map((item) => item.weather[0].main);
    const mostFrequent = conditions
      .sort(
        (a, b) =>
          conditions.filter((v) => v === a).length -
          conditions.filter((v) => v === b).length
      )
      .pop();

    return {
      temp: Math.round(avgTemp),
      humidity: Math.round(avgHumidity),
      wind: Math.round(avgWind),
      condition: mostFrequent,
    };
  };

  return (
    <div className="map-wrapper">
      <div
        className="date-display-container"
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          backgroundColor: "white",
          padding: "15px 30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          border: "2px solid #007bff",
        }}
      >
        <h3 className="text-primary mb-0" style={{ fontSize: "1.2rem" }}>
          {selectedDate.toDateString() === new Date().toDateString()
            ? "Météo actuelle"
            : `Prévisions pour le ${formatDate(selectedDate)}`}
        </h3>
      </div>

      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Form.Group>
            <Form.Label>Date de prévision</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {status.loading ? (
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Chargement des données météo...</p>
        </div>
      ) : status.error ? (
        <div className="error-message">
          <p>{status.error}</p>
          <button className="retry-btn" onClick={fetchData}>
            Réessayer
          </button>
        </div>
      ) : (
        <div className="map-container">
          <MapContainer
            center={[35.5, 9.5]}
            zoom={7}
            scrollWheelZoom={true}
            style={{ height: "600px", width: "100%" }}
          >
            <MapController center={[35.5, 9.5]} zoom={7} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />
            {weatherData.map(({ city, position, data }) => {
              const forecast = getForecastForDate(city.name, selectedDate);
              const displayData = forecast || data;

              return (
                <Marker key={city.name} position={position}>
                  <Popup>
                    <h3>{city.name}</h3>
                    <div className="weather-card">
                      {getWeatherIcon(
                        displayData.condition || displayData.weather[0].main
                      )}
                      <div className="weather-details">
                        <p>
                          <WiThermometer />{" "}
                          {Math.round(
                            displayData.temp || displayData.main.temp
                          )}
                          °C
                        </p>
                        <p>
                          <WiHumidity />{" "}
                          {Math.round(
                            displayData.humidity || displayData.main.humidity
                          )}
                          %
                        </p>
                        <p>
                          <WiStrongWind />{" "}
                          {Math.round(
                            displayData.wind || displayData.wind.speed
                          )}{" "}
                          km/h
                        </p>
                      </div>
                    </div>
                    <p className="weather-description">
                      {forecast ? "Prévision" : "Actuel"}:{" "}
                      {displayData.condition ||
                        displayData.weather[0].description}
                    </p>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default WeatherMap;
