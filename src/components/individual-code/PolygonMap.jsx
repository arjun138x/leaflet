import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PolygonMap = () => {
  useEffect(() => {
    // Initialize Map
    const map = L.map("polygon-map").setView([12.9716, 77.5946], 7); // Default center and zoom

    // Add Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Sample Polygon Coordinates (GeoJSON format)
    const polygonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Zone A", description: "This is Polygon A" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [77.6, 12.9], // Point 1
                [77.7, 12.9], // Point 2
                [77.7, 13.0], // Point 3
                [77.6, 13.0], // Point 4
                [77.6, 12.9], // Closing the polygon (same as Point 1)
              ],
            ],
          },
        },

        {
          type: "Feature",
          properties: { name: "Zone A", description: "This is Polygon A" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [76.6, 12.9], // Point 1
                [76.7, 12.9], // Point 2
                [76.7, 13.0], // Point 3
                [76.6, 13.0], // Point 4
                [76.6, 12.9], // Closing the polygon (same as Point 1)
              ],
            ],
          },
        },
      ],
    };

    // Add Polygon Layer
    L.geoJSON(polygonData, {
      style: {
        color: "red", // Border color
        weight: 3,
        fillColor: "lightblue", // Fill color
        fillOpacity: 0.5,
      },
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

  return (
    <div id="polygon-map" style={{ height: "500px", width: "100%" }}></div>
  );
};

export default PolygonMap;
