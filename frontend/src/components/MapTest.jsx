import { MapContainer, TileLayer } from "react-leaflet";

export default function MapTest() {
  return (
    <MapContainer
      center={[59.3293, 18.0686]} // Stockholm
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}