import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PointMapWith2kRadiusCircles = () => {
  const mapRef = useRef(null); // Store map instance
  const circlesRef = useRef([]); // Store circles

  useEffect(() => {
    // Initialize Map
    const newMap = L.map("point-map").setView([12.9716, 77.5946], 6);
    mapRef.current = newMap;

    // Add Tile Layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(newMap);

    // Sample GeoJSON Data with multiple points
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

    // Add Points to Map
    L.geoJSON(geojsonData, {
      pointToLayer: (feature, latLng) => {
        return L.circleMarker(latLng, {
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
    }).addTo(newMap);

    // Add Zoom Event Listener
    newMap.on("zoomend", () => {
      const zoom = newMap.getZoom(); // Get the current zoom level of the map

      // 🔹 Remove all previously added circles when zooming out
      circlesRef.current.forEach((c) => {
        if (newMap.hasLayer(c)) newMap.removeLayer(c); // Check if the circle exists before removing it
      });
      circlesRef.current = []; // Clear the reference array to avoid keeping references to removed circles

      //  If the zoom level is 15 or greater, add new 2km radius circles around each point
      if (zoom >= 15) {
        geojsonData.features.forEach((feature) => {
          const [lng, lat] = feature.geometry.coordinates; // Extract coordinates from GeoJSON

          //  Create a new circle with a 2km radius centered at the point
          const circle = L.circle([lat, lng], {
            radius: 2000, // 2km in meters
            color: "red", // Circle border color
            fillColor: "lightblue", // Fill color inside the circle
            fillOpacity: 0.3, // Set transparency for better visibility
          }).addTo(newMap); // Add the circle to the map

          circlesRef.current.push(circle); //  Store the reference of the circle to remove it later
        });
      }
    });

    return () => {
      newMap.remove();
    };
  }, []);

  return <div id="point-map" style={{ height: "500px", width: "100%" }}></div>;
};

export default PointMapWith2kRadiusCircles;
