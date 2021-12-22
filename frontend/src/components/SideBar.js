import { useContext } from "react";
import { Offcanvas, ListGroup } from "react-bootstrap";

import { StateContextArea, DispatchContextArea } from "../providers/area";
import { SET_SHOW_AREA } from "../actions/area";

function SideBar() {
  const { areas, areaDisplayIndex, showArea } = useContext(StateContextArea);
  const areaDispatch = useContext(DispatchContextArea);

  const area = areas[areaDisplayIndex];

  const closeAreaHandler = () => {
    areaDispatch({
      type: SET_SHOW_AREA,
      payload: { showArea: false, areaDisplayIndex: null },
    });
  };

  return (
    <Offcanvas show={showArea} onHide={closeAreaHandler}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{area?.description}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup>
          <ListGroup.Item active key={-1}>
            Risk
          </ListGroup.Item>
          {area?.risks.map((risk, index) => (
            <ListGroup.Item key={index}>{risk.name}</ListGroup.Item>
          ))}
        </ListGroup>
        <ListGroup>
          <ListGroup.Item active key={-1}>
            Edge
          </ListGroup.Item>
          {area?.edges.map((edge, index) => (
            <ListGroup.Item
              key={index}
            >{`${edge.lat}, ${edge.lng}`}</ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SideBar;
