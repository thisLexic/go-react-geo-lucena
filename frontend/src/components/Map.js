import { useContext } from "react";
import {
  GoogleMap,
  Polygon,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

import { StateContext, DispatchContext } from "../store/contexts";
import { SET_SHOW_AREA } from "../store/actions";
import Risks from "./Risks";

const lucenaLatLng = { lat: 13.941396, lng: 121.623444 };

function RawMap() {
  const { areas, isAreasLoaded } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  return (
    <GoogleMap defaultZoom={15} defaultCenter={lucenaLatLng}>
      {isAreasLoaded
        ? areas.map((area, index) => (
            <Polygon
              path={area.edges}
              strokeColor="#7CD1B8"
              fillColor="#7CD1B8"
              onClick={() =>
                dispatch({
                  type: SET_SHOW_AREA,
                  payload: { showArea: true, areaDisplayIndex: index },
                })
              }
            />
          ))
        : null}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(RawMap));
function Map() {
  const { error } = useContext(StateContext);
  return (
    <>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <Risks />
      {error ? (
        <p className="text-danger">An error occurred: {error?.message}</p>
      ) : null}
    </>
  );
}

export default Map;
