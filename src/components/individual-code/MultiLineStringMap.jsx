import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MultiLineStringMap = () => {
  useEffect(() => {
    // Initialize Map
    const map = L.map("multilinestring-map").setView([12.9716, 77.5946], 5);

    // Add Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Sample MultiLineString GeoJSON Data
    const multiLineStringData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "Route A",
            description: "This is MultiLineString A",
          },
          geometry: {
            type: "MultiLineString",
            coordinates: [
              [
                [77.5946, 12.9716],
                [78.4867, 17.385],
                [80.2785, 13.0878], // Line 1
              ],
              [
                [75.8577, 22.7196],
                [76.9858, 21.7679],
                [77.4126, 23.2599], // Line 2
              ],
            ],
          },
        },
      ],
    };

    // Add MultiLineString Layer
    L.geoJSON(multiLineStringData, {
      style: {
        color: "blue", // Line color
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
    <div
      id="multilinestring-map"
      style={{ height: "500px", width: "100%" }}
    ></div>
  );
};

export default MultiLineStringMap;
