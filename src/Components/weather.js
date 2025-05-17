import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import axios from 'axios'
import { WiDaySunny, WiRain, WiCloud, WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi'
import 'leaflet/dist/leaflet.css'

// Correction des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const cities = [
  { name: "Tunis", coords: [36.8065, 10.1815] },
  { name: "Sousse", coords: [35.8254, 10.6369] },
  { name: "Sfax", coords: [34.7406, 10.7603] },
  {   name: 'Ariana',   coords: [36.8665, 10.1647], },
  { 
    name: 'Ben Arous', 
    coords: [36.7435, 10.2317], 
  },
  { 
    name: 'Manouba', 
    coords: [36.8083, 9.9991], 
  },
  { 
    name: 'Nabeul', 
    coords: [36.451, 10.7361], 
  },
  { 
    name: 'Bizerte', 
    coords: [37.2744, 9.8739], 
  },
  { 
    name: 'Beja', 
    coords: [36.733, 9.1843], 
  },
  { 
    name: 'Jendouba', 
    coords: [36.5011, 8.7802], 
  },
  { 
    name: 'Kef', 
    coords: [36.1675, 8.704], 
  },
  { 
    name: 'Siliana', 
    coords: [36.088, 9.3746], 
  },
  { 
    name: 'Zaghouan', 
    coords: [36.4021, 10.1447], 
  },
  { 
    name: 'Monastir', 
    coords: [35.7643, 10.8113], 
  },
  { 
    name: 'Mahdia', 
    coords: [35.5047, 11.0622], 
  },
  { 
    name: 'Sfax', 
    coords: [34.7391, 10.7593], 
  },
  { 
    name: 'Kairouan', 
    coords: [35.6781, 10.0963], 
  },
  { 
    name: 'Kasserine', 
    coords: [35.1676, 8.8368], 
  },
  { 
    name: 'Sidi Bouzid', 
    coords: [35.0382, 9.4858], 
  },
  { 
    name: 'Gabes', 
    coords: [33.8815, 10.0982], 
  },
  { 
    name: 'Medenine', 
    coords: [33.3549, 10.5055], 
  },
  { 
    name: 'Tataouine', 
    coords: [32.929, 10.4518], 
  },
  { 
    name: 'Tozeur', 
    coords: [33.9197, 8.1335], 
  },
  { 
    name: 'Kebili', 
    coords: [33.7076, 8.9715], 
  },
  { 
    name: 'Gafsa', 
    coords: [34.425, 8.7842], 
  }
]

function MapController({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom])
  return null
}

const WeatherMap = () => {
  const [weatherData, setWeatherData] = useState([])
  const [status, setStatus] = useState({ loading: true, error: null })
  const API_KEY = 'ea6990b8ad9ce003cb88b22e93c93638' 

  useEffect(() => {
    const source = axios.CancelToken.source()
    
    const fetchData = async () => {
      try {
        const responses = await Promise.allSettled(
          cities.map(city => 
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords[0]}&lon=${city.coords[1]}&appid=${API_KEY}&units=metric&lang=fr`,
              {
                timeout: 15000,
                cancelToken: source.token
              }
            )
          )
        )

        const validData = responses
          .map((response, index) => {
            if (response.status === 'rejected') {
              console.error(`Erreur pour ${cities[index].name}:`, response.reason)
              return null
            }
            
            const data = response.value.data
            if (!data || data.cod !== 200) {
              console.warn(`Données invalides pour ${cities[index].name}:`, data)
              return null
            }
            
            return {
              city: cities[index],
              position: [data.coord.lat, data.coord.lon],
              data: data
            }
          })
          .filter(Boolean)

        if (validData.length === 0) {
          throw new Error('Échec de toutes les requêtes - Vérifiez votre connexion et votre clé API')
        }

        setWeatherData(validData)
        setStatus({ loading: false, error: null })
      } catch (err) {
        if (!axios.isCancel(err)) {
          setStatus({ 
            loading: false, 
            error: err.response?.status === 401 
              ? 'Clé API invalide ou expirée' 
              : err.message 
          })
        }
      }
    }

    fetchData()
    return () => source.cancel("Annulation requête")
  }, [])

  const getWeatherIcon = (condition) => {
    const mainCondition = condition.toLowerCase()
    if (mainCondition.includes('clear')) return <WiDaySunny className="sun" />
    if (mainCondition.includes('rain')) return <WiRain className="rain" />
    return <WiCloud className="cloud" />
  }

  return (
    <div className="map-wrapper">
      {status.loading && <div className="loading">Chargement...</div>}
      {status.error && <div className="error">Erreur: {status.error}</div>}
      
      <div className="map-container" style={{ display: status.error ? 'none' : 'block' }}>
      <MapContainer center={[35.5, 9.5]} zoom={7} scrollWheelZoom={true} style={{ height: "600px", width: "100%" }}>
  <MapController center={[35.5, 9.5]} zoom={7} />
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='© OpenStreetMap'
  />
  {weatherData.map(({ city, position, data }) => (
    <Marker key={city.name} position={position}>
      <Popup>
        <h3>{city.name}</h3>
        <div className="weather-card">
          {getWeatherIcon(data.weather[0].main)}
          <div className="weather-details">
            <p><WiThermometer /> {Math.round(data.main.temp)}°C</p>
            <p><WiHumidity /> {data.main.humidity}%</p>
            <p><WiStrongWind /> {data.wind.speed} km/h</p>
          </div>
        </div>
        <p className="weather-description">{data.weather[0].description}</p>
      </Popup>
    </Marker>
  ))}
</MapContainer>

      </div>
    </div>
  )
}

export default WeatherMap