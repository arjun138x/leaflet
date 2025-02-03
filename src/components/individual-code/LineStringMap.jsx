import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LineStringMap = () => {
  useEffect(() => {
    // Initialize Map
    const map = L.map("linestring-map").setView([12.9716, 77.5946], 5);

    // Add Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Sample LineString GeoJSON Data
    const lineStringData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Route A", description: "This is LineString A" },
          geometry: {
            type: "LineString",
            coordinates: [
              [77.5946, 12.9716], // Start Point
              [78.4867, 17.385], // Mid Point
              [80.2785, 13.0878], // End Point
            ],
          },
        },
      ],
    };

    // Add LineString Layer
    L.geoJSON(lineStringData, {
      style: {
        color: "red", // Line color
        weight: 3,
        opacity: 0.8,
      },
      onEachFeature: (feature, layer) => {
        layer.on("mouseover", function () {
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
    <div id="linestring-map" style={{ height: "500px", width: "100%" }}></div>
  );
};

export default LineStringMap;
