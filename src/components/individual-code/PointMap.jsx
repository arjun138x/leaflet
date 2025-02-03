import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PointMap = () => {
  useEffect(() => {
    // Initialize Map
    const map = L.map("map").setView([12.9716, 77.5946], 5); // Default center and zoom

    // Add Tile Layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Sample GeoJSON Data
    const geojsonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Point A", description: "This is Point A" },
          geometry: { type: "Point", coordinates: [77.5946, 12.9716] }, // [lng, lat]
        },
        {
          type: "Feature",
          properties: { name: "Point B", description: "This is Point B" },
          geometry: { type: "Point", coordinates: [78.4867, 17.385] },
        },
      ],
    };

    // Add GeoJSON Layer
    L.geoJSON(geojsonData, {
      // Add pin style
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "blue",
          color: "white",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      },
      // Add each pin style
      onEachFeature: (feature, layer) => {
        layer.on("mouseover", function (e) {
          this.bindTooltip(
            `<b>${feature.properties.name}</b><br/>${feature.properties.description}`,
            { permanent: false, direction: "top" }
          ).openTooltip();
        });

        layer.on("mouseout", function () {
          this.closeTooltip();
        });
      },
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default PointMap;
