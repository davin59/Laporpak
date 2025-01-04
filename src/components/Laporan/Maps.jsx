import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Pastikan untuk mengimpor CSS Leaflet

const Maps = () => {
  const position = [-7.796209976491044, 110.36668563509367]; // Koordinat lokasi
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Daerah Istimewa Yogyakarta [51.505, -0.09]</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Maps;
