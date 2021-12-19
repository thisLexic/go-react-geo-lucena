import {
  GoogleMap,
  Polygon,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

import Risks from "./Risks";

const lucenaLatLng = { lat: 13.941396, lng: 121.623444 };

function RawMap(props) {
  const { areas, showAreaHandler, isAreasLoaded } = props;
  return (
    <GoogleMap defaultZoom={15} defaultCenter={lucenaLatLng}>
      {isAreasLoaded
        ? areas.map((area, index) => (
            <Polygon
              path={area.edges}
              strokeColor="#7CD1B8"
              fillColor="#7CD1B8"
              onClick={() => showAreaHandler(index)}
            />
          ))
        : null}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(RawMap));
function Map(props) {
  const {
    areas,
    showAreaHandler,
    isAreasLoaded,
    risks,
    isRisksLoaded,
    riskDisplayIndex,
    setRiskDisplayIndex,
    error,
  } = props;
  return (
    <>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        showAreaHandler={showAreaHandler}
        areas={areas}
        isAreasLoaded={isAreasLoaded}
      />
      <Risks
        risks={risks}
        isRisksLoaded={isRisksLoaded}
        riskDisplayIndex={riskDisplayIndex}
        setRiskDisplayIndex={setRiskDisplayIndex}
      />
      {error ? (
        <p className="text-danger">An error occurred: {error?.message}</p>
      ) : null}
    </>
  );
}

export default Map;
