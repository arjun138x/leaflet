import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MultiPointMap = () => {
  useEffect(() => {
    // Initialize Map
    const map = L.map("multipoint-map").setView([12.9716, 77.5946], 5);

    // Add Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Sample MultiPoint GeoJSON Data
    const multiPointData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Point A", description: "This is Point A" },
          geometry: {
            type: "MultiPoint",
            coordinates: [
              [77.5946, 12.9716], // Point 1
              [78.4867, 17.385], // Point 2
              [80.2785, 13.0878], // Point 3
            ],
          },
        },
      ],
    };

    // Add MultiPoint Layer
    L.geoJSON(multiPointData, {
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
    <div id="multipoint-map" style={{ height: "500px", width: "100%" }}></div>
  );
};

export default MultiPointMap;
