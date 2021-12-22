import React, { useEffect, useReducer } from "react";

import SideBar from "./components/SideBar";
import Map from "./components/Map";
import { appReducer, defaultState } from "./store/reducer";
import { StateContext, DispatchContext } from "./store/contexts";
import {
  SET_ALL_AREAS,
  SET_IS_AREAS_LOADED,
  SET_ALL_RISKS,
  SET_IS_RISKS_LOADED,
  SET_ERROR,
} from "./store/actions";

function App() {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  useEffect(() => {
    async function fetchAreasAPI() {
      let response = await fetch("http://localhost:4000/v1/areas");

      if (response.status !== 200) {
        let errorMessage = `Invalid response code: ${response.status}`;
        let err = Error(errorMessage);
        dispatch({ type: SET_ERROR, payload: err });
      } else {
        response = await response.json();
        dispatch({ type: SET_ALL_AREAS, payload: response.areas });
        dispatch({ type: SET_IS_AREAS_LOADED, payload: true });
      }
    }

    async function fetchRisksAPI() {
      let response = await fetch("http://localhost:4000/v1/risks");

      if (response.status !== 200) {
        let errorMessage = `Invalid response code: ${response.status}`;
        let err = Error(errorMessage);
        dispatch({ type: SET_ERROR, payload: err });
      } else {
        response = await response.json();
        dispatch({ type: SET_ALL_RISKS, payload: response.risks });
        dispatch({ type: SET_IS_RISKS_LOADED, payload: true });
      }
    }

    fetchAreasAPI();
    fetchRisksAPI();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div style={{ width: `100vw`, height: `100vh` }}>
          <Map />
          <SideBar />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
