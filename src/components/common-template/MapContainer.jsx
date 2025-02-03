import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = ({ id, children }) => {
  useEffect(() => {
    const map = L.map(id).setView([12.9716, 77.5946], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    children(map);

    return () => {
      map.remove();
    };
  }, [id, children]);

  return <div id={id} style={{ height: "400px", width: "100%" }}></div>;
};

export default MapContainer;
