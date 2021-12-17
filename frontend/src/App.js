import React, { useState, useEffect } from "react";

import SideBar from "./components/SideBar";
import Map from "./components/Map";

function App() {
  const [areas, setAreas] = useState([]);
  const [isAreasLoaded, setIsAreasLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [areaDisplayIndex, setAreaDisplayIndex] = useState(null);
  const [showArea, setShowArea] = useState(false);

  const closeAreaHandler = () => setShowArea(false);
  const showAreaHandler = (index) => {
    setAreaDisplayIndex(index);
    setShowArea(true);
  };

  const area = areas[areaDisplayIndex];

  useEffect(() => {
    async function fetchAreasAPI() {
      let response = await fetch("http://localhost:4000/v1/areas");

      if (response.status !== 200) {
        let errorMessage = `Invalid response code: ${response.status}`;
        let err = Error(errorMessage);
        setError(err);
      } else {
        response = await response.json();
        setAreas(response.areas);
        setIsAreasLoaded(true);
      }
    }

    fetchAreasAPI();
  }, []);

  return (
    <div style={{ width: `100vw`, height: `100vh` }}>
      <Map
        areas={areas}
        showAreaHandler={showAreaHandler}
        isAreasLoaded={isAreasLoaded}
        error={error}
      />
      <SideBar
        area={area}
        showArea={showArea}
        closeAreaHandler={closeAreaHandler}
      />
    </div>
  );
}

export default App;
