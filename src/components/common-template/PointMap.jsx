import React from "react";
import MapContainer from "./MapContainer";
import L from "leaflet";

const PointMap = () => {
  const addLayer = (map) => {
    const pointData = {
      type: "Feature",
      properties: { name: "Point A", description: "This is a single point" },
      geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
    };

    L.geoJSON(pointData, {
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 8,
          fillColor: "blue",
          color: "white",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        }),
      onEachFeature: (feature, layer) => {
        layer.bindTooltip(
          `<b>${feature.properties.name}</b><br/>${feature.properties.description}`
        );
      },
    }).addTo(map);
  };

  return <MapContainer id="point-map">{addLayer}</MapContainer>;
};

export default PointMap;
