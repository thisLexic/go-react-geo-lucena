import React, { useEffect, useReducer } from "react";

import SideBar from "./components/SideBar";
import Map from "./components/Map";
import { areaReducer, defaultStateArea } from "./reducers/area";
import { riskReducer, defaultStateRisk } from "./reducers/risk";
import { miscReducer, defaultStateMisc } from "./reducers/misc";
import { SET_ALL_AREAS, SET_IS_AREAS_LOADED } from "./actions/area";
import { SET_ALL_RISKS, SET_IS_RISKS_LOADED } from "./actions/risk";
import { SET_ERROR } from "./actions/misc";
import { StateProviderArea, DispatchProviderArea } from "./providers/area";
import { StateProviderRisk, DispatchProviderRisk } from "./providers/risk";
import { StateProviderMisc, DispatchProviderMisc } from "./providers/misc";
import { ProviderComposer, provider } from "./providers/util";

function App() {
  const [areaState, areaDispatch] = useReducer(areaReducer, defaultStateArea);
  const [riskState, riskDispatch] = useReducer(riskReducer, defaultStateRisk);
  const [miscState, miscDispatch] = useReducer(miscReducer, defaultStateMisc);

  useEffect(() => {
    async function fetchAreasAPI() {
      let response = await fetch("http://localhost:4000/v1/areas");

      if (response.status !== 200) {
        let errorMessage = `Invalid response code: ${response.status}`;
        let err = Error(errorMessage);
        miscDispatch({ type: SET_ERROR, payload: err });
      } else {
        response = await response.json();
        areaDispatch({ type: SET_ALL_AREAS, payload: response.areas });
        areaDispatch({ type: SET_IS_AREAS_LOADED, payload: true });
      }
    }

    fetchAreasAPI();
  }, []);

  useEffect(() => {
    async function fetchRisksAPI() {
      let response = await fetch("http://localhost:4000/v1/risks");

      if (response.status !== 200) {
        let errorMessage = `Invalid response code: ${response.status}`;
        let err = Error(errorMessage);
        miscDispatch({ type: SET_ERROR, payload: err });
      } else {
        response = await response.json();
        riskDispatch({ type: SET_ALL_RISKS, payload: response.risks });
        riskDispatch({ type: SET_IS_RISKS_LOADED, payload: true });
      }
    }

    fetchRisksAPI();
  }, []);

  return (
    <ProviderComposer
      providers={[
        provider(StateProviderArea, { value: areaState }),
        provider(DispatchProviderArea, { value: areaDispatch }),
        provider(StateProviderRisk, { value: riskState }),
        provider(DispatchProviderRisk, { value: riskDispatch }),
        provider(StateProviderMisc, { value: miscState }),
        provider(DispatchProviderMisc, { value: miscDispatch }),
      ]}
    >
      <div style={{ width: `100vw`, height: `100vh` }}>
        <Map />
        <SideBar />
      </div>
    </ProviderComposer>
  );
}

export default App;
