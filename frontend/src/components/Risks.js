import { useContext } from "react";

import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styled from "styled-components";

import { StateContextRisk, DispatchContextRisk } from "../providers/risk";
import { SET_SHOW_RISK } from "../actions/risk";
import { DispatchContextArea } from "../providers/area";
import { SET_VISIBLE_AREAS_IDS } from "../actions/area";
import { DispatchContextMisc } from "../providers/misc";
import { SET_ERROR } from "../actions/misc";

const StyledButtonGroup = styled(ButtonGroup)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

function Risks() {
  const { risks, isRisksLoaded, riskDisplayIndex } =
    useContext(StateContextRisk);
  const riskDispatch = useContext(DispatchContextRisk);
  const areaDispatch = useContext(DispatchContextArea);
  const miscDispatch = useContext(DispatchContextMisc);

  const handleOnChange = (e) => {
    const curRiskIndex = parseInt(e.currentTarget.value);
    const setAreasAndRisk = (newRiskIndex) => {
      riskDispatch({
        type: SET_SHOW_RISK,
        payload: { showRisk: true, riskDisplayIndex: newRiskIndex },
      });
      areaDispatch({
        type: SET_VISIBLE_AREAS_IDS,
        payload: {},
      });

      if (newRiskIndex !== null) {
        async function fetchAreasByRiskAPI(riskId) {
          let response = await fetch(
            `http://localhost:4000/v1/areas/${riskId}`
          );

          if (response.status !== 200) {
            let errorMessage = `Invalid response code: ${response.status}`;
            let err = Error(errorMessage);
            miscDispatch({ type: SET_ERROR, payload: err });
          } else {
            response = await response.json();
            areaDispatch({
              type: SET_VISIBLE_AREAS_IDS,
              payload: response.areas.reduce((map, obj) => {
                map[obj.id] = true;
                return map;
              }, {}),
            });
          }
        }

        fetchAreasByRiskAPI(risks[newRiskIndex].id);
      }
    };
    curRiskIndex === riskDisplayIndex
      ? setAreasAndRisk(null)
      : setAreasAndRisk(curRiskIndex);
  };

  return (
    <StyledButtonGroup className="mb-2">
      {isRisksLoaded
        ? risks.map((risk, index) => (
            <ToggleButton
              key={index}
              id={`risk-${index}`}
              type="checkbox"
              variant="outline-primary"
              value={index}
              checked={riskDisplayIndex === index}
              onChange={handleOnChange}
            >
              {risk.name}
            </ToggleButton>
          ))
        : null}
    </StyledButtonGroup>
  );
}

export default Risks;
