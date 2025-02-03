import React from "react";
import MapContainer from "./MapContainer";
import L from "leaflet";

const PolygonMap = () => {
  const addLayer = (map) => {
    const polygonData = {
      type: "Feature",
      properties: { name: "Polygon A", description: "This is a polygon" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [77.6, 12.9],
            [77.7, 12.9],
            [77.7, 13.0],
            [77.6, 13.0],
            [77.6, 12.9],
          ],
        ],
      },
    };

    L.geoJSON(polygonData, {
      style: { color: "red", fillColor: "pink", fillOpacity: 0.5 },
      onEachFeature: (feature, layer) => {
        layer.bindTooltip(
          `<b>${feature.properties.name}</b><br/>${feature.properties.description}`
        );
      },
    }).addTo(map);
  };

  return <MapContainer id="polygon-map">{addLayer}</MapContainer>;
};

export default PolygonMap;
