import PointMap from "./components/common-template/PointMap";
import PolygonMap from "./components/common-template/PolygonMap";
import GeoJSONMap from "./components/GeoJSONMap";

import LineStringMap from "./components/individual-code/LineStringMap";
import MultiLineStringMap from "./components/individual-code/MultiLineStringMap";
import MultiPointMap from "./components/individual-code/MultiPointMap";
import MultiPolygonMap from "./components/individual-code/MultiPolygonMap";

function App() {
  return (
    <>
      <GeoJSONMap />

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
