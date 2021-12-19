import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styled from "styled-components";

const StyledButtonGroup = styled(ButtonGroup)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

function Risks(props) {
  const { risks, isRisksLoaded, riskDisplayIndex, setRiskDisplayIndex } = props;

  const handleOnChange = (e) => {
    const riskIndex = parseInt(e.currentTarget.value);
    riskIndex === riskDisplayIndex
      ? setRiskDisplayIndex(-1)
      : setRiskDisplayIndex(riskIndex);
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
      ))
    </StyledButtonGroup>
  );
}

export default Risks;
