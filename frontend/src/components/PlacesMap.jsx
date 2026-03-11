import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

export default function PlacesMap({ places }) {
  const defaultCenter = [59.3293, 18.0686];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={11}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place) => {
        const coordinates = place.location?.coordinates;

        if (!coordinates || coordinates.length < 2) return null;

        const [lng, lat] = coordinates;

        return (
          <Marker key={place._id} position={[lat, lng]}>
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.city}
              <br />
              <Link to={`/places/${place._id}`}>View details</Link>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}