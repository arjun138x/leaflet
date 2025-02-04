import PointMap from "./components/common-template/PointMap";
import PolygonMap from "./components/common-template/PolygonMap";
import GeoJSONMap from "./components/GeoJSONMap";

import LineStringMap from "./components/individual-code/LineStringMap";
import MultiLineStringMap from "./components/individual-code/MultiLineStringMap";
import MultiPointMap from "./components/individual-code/MultiPointMap";
import MultiPolygonMap from "./components/individual-code/MultiPolygonMap";
import PointMapWith2kRadiusCircles from "./components/PointMapWith2kRadiusCircles";

function App() {
  return (
    <>
      {/* ----- MAP WITH ALL GEOJSON TYPES ------ */}
      {/* <GeoJSONMap /> */}

      {/* ------ TOWER WITH NETWORK COVERAGE AREA  ------*/}
      <PointMapWith2kRadiusCircles />

      {/* ---------- INDIVIDUAL CODE --------- */}
      {/* <MultiPolygonMap /> */}
      {/* <MultiPointMap /> */}
      {/* <LineStringMap /> */}
      {/* <MultiLineStringMap /> */}

      {/* ---------- COMMON TEMPLATE --------- */}
      {/* <PointMap /> */}
      {/* <PolygonMap /> */}
    </>
  );
}

export default App;
