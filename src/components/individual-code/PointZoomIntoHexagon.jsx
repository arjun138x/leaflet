import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PointZoomIntoHexagon = () => {
  const mapRef = useRef(null);
  const pointLayerRef = useRef(null);
  const polygonLayerRef = useRef(null);

  useEffect(() => {
    // Initialize Map
    const newMap = L.map("map").setView([12.9716, 77.5946], 6);
    mapRef.current = newMap;

    // Add Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(newMap);

    // 🔹 GeoJSON Data with Multiple Properties
    const geojsonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Point A", category: "Type 1", population: 5000 },
          geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
        },
        {
          type: "Feature",
          properties: {
            name: "Point B",
            category: "Type 2",
            population: 10000,
          },
          geometry: { type: "Point", coordinates: [78.4867, 17.385] },
        },
        {
          type: "Feature",
          properties: { name: "MultiPolygon 1", category: "Zone A" },
          geometry: {
            type: "MultiPolygon",
            coordinates: [
              [
                [
                  [77.58, 12.97],
                  [77.59, 12.98],
                  [77.6, 12.97],
                  [77.58, 12.97],
                ],
              ],
              [
                [
                  [78.48, 17.38],
                  [78.49, 17.39],
                  [78.5, 17.38],
                  [78.48, 17.38],
                ],
              ],
            ],
          },
        },
      ],
    };

    // 🔹 Create Point Layer with Popups
    const pointLayer = L.geoJSON(geojsonData, {
      filter: (feature) => feature.geometry.type === "Point",
      pointToLayer: (feature, latLng) => {
        const point = L.circleMarker(latLng, {
          radius: 6,
          fillColor: feature.properties.category === "Type 1" ? "blue" : "red", // Different color per category
          color: "white",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
        const label = L.marker(latLng, {
          icon: L.divIcon({
            className: "label",
            html: `<div style="color: red; text-align:center; ">
                <strong>${feature.properties.category}</strong>
              </div>`,
            iconSize: [50, -40], // [width, height]
          }),
        });
        return L.featureGroup([point, label]).addTo(newMap);
      },

      onEachFeature: (feature, layer) => {
        layer.bindPopup(
          `<b>${feature.properties.name}</b><br/>
           Category: ${feature.properties.category}<br/>
           Population: ${feature.properties.population}`
        );
      },
    }).addTo(newMap);
    pointLayerRef.current = pointLayer;

    // 🔹 Create MultiPolygon Layer with Different Colors
    const polygonLayer = L.geoJSON(geojsonData, {
      filter: (feature) => feature.geometry.type === "MultiPolygon",
      style: (feature) => ({
        color: feature.properties.category === "Zone A" ? "green" : "purple", // Different color per category
        fillColor: "lightgreen",
        fillOpacity: 0.4,
      }),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(
          `<b>${feature.properties.name}</b><br/>Category: ${feature.properties.category}`
        );
      },
    });
    polygonLayerRef.current = polygonLayer;

    // 🔹 Toggle Points & MultiPolygon on Zoom
    newMap.on("zoomend", () => {
      const zoom = newMap.getZoom();

      if (zoom >= 12) {
        if (newMap.hasLayer(pointLayer)) newMap.removeLayer(pointLayer);
        if (!newMap.hasLayer(polygonLayer)) newMap.addLayer(polygonLayer);
      } else {
        if (newMap.hasLayer(polygonLayer)) newMap.removeLayer(polygonLayer);
        if (!newMap.hasLayer(pointLayer)) newMap.addLayer(pointLayer);
      }
    });

    return () => {
      newMap.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default PointZoomIntoHexagon;
