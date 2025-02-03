#

# Geometry types

In Leaflet, the following geometry types are commonly used within GeoJSON objects:

1. Point
2. MultiPoint
3. LineString
4. MultiLineString
5. Polygon
6. MultiPolygon

- **Point:** Represents a single geographical coordinate (latitude and longitude).

  - Example:
    ```json
    {
        "type": "Point",
        "coordinates": [longitude, latitude]
    }
    ```

- **LineString:** Represents a series of connected points, forming a line.

  - Example:
    ```json
    {
        "type": "LineString",
        "coordinates": [
            [lon1, lat1],
            [lon2, lat2],
            [lon3, lat3],
            // ... more points
        ]
    }
    ```

- **Polygon:** Represents a closed area defined by a set of connected points.

  - Example:
    ```json
    {
        "type": "Polygon",
        "coordinates": [
            [
                [lon1, lat1],
                [lon2, lat2],
                [lon3, lat3],
                [lon1, lat1] // Close the polygon
            ]
        ]
    }
    ```

- **MultiPoint:** Represents a collection of points.

  - Example:
    ```json
    {
        "type": "MultiPoint",
        "coordinates": [
            [lon1, lat1],
            [lon2, lat2],
            [lon3, lat3]
        ]
    }
    ```

- **MultiLineString:** Represents a collection of lines.

  - Example:
    ```json
    {
        "type": "MultiLineString",
        "coordinates": [
            [
                [lon1, lat1],
                [lon2, lat2]
            ],
            [
                [lon3, lat3],
                [lon4, lat4]
            ]
        ]
    }
    ```

- **MultiPolygon:** Represents a collection of polygons.

  - Example:
    ```json
    {
        "type": "MultiPolygon",
        "coordinates": [
            [
                [
                    [lon1, lat1],
                    [lon2, lat2],
                    [lon3, lat3],
                    [lon1, lat1]
                ]
            ],
            [
                [
                    [lon4, lat4],
                    [lon5, lat5],
                    [lon6, lat6],
                    [lon4, lat4]
                ]
            ]
        ]
    }
    ```

- **GeometryCollection:** Represents a collection of different geometry types.

#

# Detailed code explanation

**1. Initialize the Leaflet Map (L.map)**

- This creates a new Leaflet map object and assigns it to a container element (usually a `<div>`).

```javascript
var map = L.map("mapid").setView([51.505, -0.09], 13);
```

    *   `mapid`: The ID of the HTML element that will hold the map.
    *   `[51.505, -0.09]`: The initial geographical coordinates (latitude, longitude) for the map's center.
    *   `13`: The initial zoom level of the map.

**2. Loads OpenStreetMap Tiles (L.tileLayer)**

- This adds a layer of tiles (map images) from OpenStreetMap to the map.

```javascript
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
```

    *   The URL template defines how to construct the tile URLs based on zoom level (z), tile column (x), and tile row (y).
    *   `attribution`: The copyright information to be displayed in the map.

**3. Defines Polygon Data in GeoJSON format**

- GeoJSON is a common format for representing geographical data. Here's an example of a simple polygon:

```javascript
var polygonData = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-74.015756, 40.712776],
        [-74.015231, 40.706445],
        [-73.990579, 40.706892],
        [-73.989555, 40.712221],
        [-74.015756, 40.712776],
      ],
    ],
  },
};
```

**4. Adds the Polygon Layer (L.geoJSON)**

- This creates a Leaflet layer from the GeoJSON data and adds it to the map.

```javascript
var polygonLayer = L.geoJSON(polygonData).addTo(map);
```

**5. Applies Styling (color, fillColor, fillOpacity)**

- You can customize the appearance of the polygon using the `style` option in `L.geoJSON`.

```javascript
var polygonLayer = L.geoJSON(polygonData, {
  style: function (feature) {
    return {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
    };
  },
}).addTo(map);
```

**6. Shows Tooltip on Hover (mouseover & mouseout events)**

- You can create custom tooltips that appear when the mouse hovers over the polygon and disappear when the mouse moves away.

```javascript
polygonLayer.on({
  mouseover: function (e) {
    this.bindPopup("This is a polygon!").openPopup();
  },
  mouseout: function (e) {
    this.closePopup();
  },
});
```

**Complete Example:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Leaflet Map with Polygon</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p9XjO9jwpu/ZrZQ+XjqOqHlCUvbcC94uCPwBMTKZ/2Q=="
      crossorigin=""
    />
    <script
      src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      integrity="sha256-ZU+k|@QHP+aJX0Z+LIVosIGr/E40+pT7hBy9Oea/qU="
      crossorigin=""
    ></script>
  </head>
  <body>
    <div id="mapid" style="width: 600px; height: 400px;"></div>

    <script>
      var map = L.map("mapid").setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      var polygonData = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-74.015756, 40.712776],
              [-74.015231, 40.706445],
              [-73.990579, 40.706892],
              [-73.989555, 40.712221],
              [-74.015756, 40.712776],
            ],
          ],
        },
      };

      var polygonLayer = L.geoJSON(polygonData, {
        style: function (feature) {
          return {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
          };
        },
      }).addTo(map);

      polygonLayer.on({
        mouseover: function (e) {
          this.bindPopup("This is a polygon!").openPopup();
        },
        mouseout: function (e) {
          this.closePopup();
        },
      });
    </script>
  </body>
</html>
```
