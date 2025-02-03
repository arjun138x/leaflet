import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const GeoJSONMap = () => {
  useEffect(() => {
    // Initialize Map
    const map = L.map("geojson-map").setView([12.9716, 77.5946], 5);

    // Add Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Sample GeoJSON Data with multiple geometry types
    const geoJsonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Point A", description: "This is a Point" },
          geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
        },
        {
          type: "Feature",
          properties: {
            name: "MultiPoint A",
            description: "This is a MultiPoint",
          },
          geometry: {
            type: "MultiPoint",
            coordinates: [
              [78.4867, 17.385],
              [80.2785, 13.0878],
            ],
          },
        },
        {
          type: "Feature",
          properties: { name: "Line A", description: "This is a LineString" },
          geometry: {
            type: "LineString",
            coordinates: [
              [77.5946, 12.9716],
              [78.4867, 17.385],
              [80.2785, 13.0878],
            ],
          },
        },
        {
          type: "Feature",
          properties: {
            name: "MultiLine A",
            description: "This is a MultiLineString",
          },
          geometry: {
            type: "MultiLineString",
            coordinates: [
              [
                [75.8577, 22.7196],
                [76.9858, 21.7679],
                [77.4126, 23.2599],
              ],
              [
                [78.5, 15.5],
                [79.1, 16.1],
                [79.8, 16.8],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: { name: "Polygon A", description: "This is a Polygon" },
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
        },
        {
          type: "Feature",
          properties: {
            name: "MultiPolygon A",
            description: "This is a MultiPolygon",
          },
          geometry: {
            type: "MultiPolygon",
            coordinates: [
              [
                [
                  [78.4, 17.3],
                  [78.5, 17.3],
                  [78.5, 17.4],
                  [78.4, 17.4],
                  [78.4, 17.3],
                ],
              ],
              [
                [
                  [79.0, 18.0],
                  [79.2, 18.0],
                  [79.2, 18.2],
                  [79.0, 18.2],
                  [79.0, 18.0],
                ],
              ],
            ],
          },
        },
      ],
    };

    // Add GeoJSON Layer
    L.geoJSON(geoJsonData, {
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
      style: (feature) => {
        switch (feature.geometry.type) {
          case "LineString":
            return { color: "green", weight: 3, opacity: 0.8 };
          case "MultiLineString":
            return { color: "orange", weight: 3, opacity: 0.8 };
          case "Polygon":
            return { color: "blue", weight: 3, opacity: 0.8 };
          case "MultiPolygon":
            return {
              color: "red",
              weight: 2,
              fillColor: "blue",
              fillOpacity: 0.5,
            };
          default:
            return {};
        }
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
    <div id="geojson-map" style={{ height: "500px", width: "100%" }}></div>
  );
};

export default GeoJSONMap;
