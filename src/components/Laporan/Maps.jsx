import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup as LeafletPopup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import locations from "../../../public/Data/data.json";

export default function Maps({ wilayah, kecamatan, updateMap }) {
  const [center, setCenter] = useState([-7.797068, 110.370529]); // Default center (Yogyakarta)
  const [zoom, setZoom] = useState(13); // Default zoom level

  useEffect(() => {
    if (wilayah && kecamatan && locations[wilayah] && locations[wilayah][kecamatan]) {
      const coords = locations[wilayah][kecamatan];
      setCenter(coords);
      setZoom(15); // Adjust zoom for kecamatan level
    } else if (wilayah && locations[wilayah]) {
      setCenter(Object.values(locations[wilayah])[0]); // Default to first kecamatan in wilayah
      setZoom(12); // Adjust zoom for wilayah level
    }
  }, [wilayah, kecamatan]);

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (updateMap) {
        map.setView(center, zoom); // Set new map center and zoom level
      }
    }, [updateMap, center, zoom, map]);

    return null;
  };

  return (
    <div className="w-full  h-max ">
      <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "300px",zIndex: -1, position: "absolute" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {kecamatan && (
          <Marker position={center}>
            <LeafletPopup>{kecamatan}</LeafletPopup>
          </Marker>
        )}
        <MapUpdater />
      </MapContainer>
    </div>
  );
}
