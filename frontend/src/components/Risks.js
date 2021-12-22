import { useContext } from "react";

import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styled from "styled-components";

import { StateContext, DispatchContext } from "../store/contexts";
import { SET_SHOW_RISK } from "../store/actions";

const StyledButtonGroup = styled(ButtonGroup)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

function Risks() {
  const { risks, isRisksLoaded, riskDisplayIndex } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleOnChange = (e) => {
    const riskIndex = parseInt(e.currentTarget.value);
    riskIndex === riskDisplayIndex
      ? dispatch({
          type: SET_SHOW_RISK,
          payload: { showRisk: true, riskDisplayIndex: null },
        })
      : dispatch({
          type: SET_SHOW_RISK,
          payload: { showRisk: true, riskDisplayIndex: riskIndex },
        });
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
