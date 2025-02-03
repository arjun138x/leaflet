import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MultiPolygonMap = () => {
  useEffect(() => {
    // Initialize Map
    const map = L.map("multipolygon-map").setView([12.9716, 77.5946], 6);

    // Add Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Sample MultiPolygon GeoJSON Data
    const multiPolygonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Area 1", description: "This is MultiPolygon 1" },
          geometry: {
            type: "MultiPolygon",
            coordinates: [
              [
                [
                  [77.6, 12.9],
                  [77.7, 12.9],
                  [77.7, 13.0],
                  [77.6, 13.0],
                  [77.6, 12.9],
                ],
              ],
              [
                [
                  [78.4, 17.3],
                  [78.5, 17.3],
                  [78.5, 17.4],
                  [78.4, 17.4],
                  [78.4, 17.3],
                ],
              ],
            ],
          },
        },
      ],
    };

    // Add MultiPolygon Layer
    L.geoJSON(multiPolygonData, {
      style: {
        color: "red", // Border color
        weight: 2,
        fillColor: "orange", // Fill color
        fillOpacity: 0.5,
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
    <div id="multipolygon-map" style={{ height: "500px", width: "100%" }}></div>
  );
};

export default MultiPolygonMap;
