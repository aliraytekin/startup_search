import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { useStartups } from "../../hooks/useStartups";
import "leaflet/dist/leaflet.css";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import markerPin from "../../assets/marker-pin.png";
import "../../styles/Map.css";

const customMarkerIcon = L.icon({
  iconUrl: markerPin,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

const MAP_FILTERS = {
  per: 1000,
};

export default function MapView() {
  const { startups } = useStartups(MAP_FILTERS);
  const center: [number, number] = [50.85045, 4.34878]; 

  const filteredStartups = startups.filter(
    (startup) => startup.location.latitude && startup.location.longitude
  )

  return (
    <MapContainer
      className="map-container"
      center={center}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup 
        chunkedLoading
      >
      {filteredStartups.map((startup) => (
        <Marker
        key={startup.id}
        position={[startup.location.latitude!, startup.location.longitude!]}
        icon={customMarkerIcon}
        >
          <Popup>
            <p className="popup-text">{startup.name}</p>
          </Popup>
        </Marker>
      ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}
