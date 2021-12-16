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
  const [isAreasLoaded, setIsAreasLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAreasAPI() {
      let response = await fetch("http://localhost:4000/v1/areas");

      if (response.status !== 200) {
        let errorMessage = `Invalid response code: ${response.status}`;
        let err = Error(errorMessage);
        setError(err);
        console.log(err);
      } else {
        response = await response.json();
        setAreas(response.areas);
        setIsAreasLoaded(true);
      }
    }

    fetchAreasAPI();
  }, []);

  return (
    <GoogleMap defaultZoom={15} defaultCenter={lucenaLatLng}>
      {error ? <p>An error occurred: {error.message}</p> : null}
      {isAreasLoaded
        ? areas.map((area) => (
            <Polygon
              path={area.edges}
              strokeColor="#7CD1B8"
              fillColor="#7CD1B8"
              // strokeOpacity={0.8}
              // strokeWeight={2}
              // fillOpacity={0.35}
            />
          ))
        : null}
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
