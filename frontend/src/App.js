import React, { useState, useEffect } from "react";

import {
  GoogleMap,
  Polygon,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

const lucenaLatLng = { lat: 13.941396, lng: 121.623444 };

function Map() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function fetchAreasAPI() {
      let response = await fetch("http://localhost:4000/v1/areas");
      response = await response.json();
      setAreas(response.areas);
    }

    fetchAreasAPI();
  }, []);

  return (
    <GoogleMap defaultZoom={15} defaultCenter={lucenaLatLng}>
      {areas.map((area) => {
        console.log(area.edges);
        // area = [
        //   { lat: lucenaLatLng.lat + 0.01, lng: lucenaLatLng.lng },
        //   { lat: lucenaLatLng.lat, lng: lucenaLatLng.lng + 0.01 },
        //   { lat: lucenaLatLng.lat + 0.01, lng: lucenaLatLng.lng + 0.01 },
        // ];

        return (
          <Polygon
            path={area.edges}
            strokeColor="#7CD1B8"
            fillColor="#7CD1B8"
            // strokeOpacity={0.8}
            // strokeWeight={2}
            // fillOpacity={0.35}
          />
        );
      })}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div style={{ width: `100vw`, height: `100vh` }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;
