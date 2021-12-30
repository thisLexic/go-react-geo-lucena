import { useContext } from "react";
import { Offcanvas, ListGroup, Button } from "react-bootstrap";

import { StateContextArea, DispatchContextArea } from "../../providers/area";
import { SET_SHOW_AREA } from "../../actions/area";

function ReadArea() {
  const { areas, areaDisplayIndex, showArea } = useContext(StateContextArea);
  const areaDispatch = useContext(DispatchContextArea);

  const area = areas[areaDisplayIndex];

  return (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{area?.description}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup className="my-2">
          <ListGroup.Item active key={-1}>
            Risk
          </ListGroup.Item>
          {area?.risks.map((risk, index) => (
            <ListGroup.Item key={index}>{risk.name}</ListGroup.Item>
          ))}
        </ListGroup>
        <ListGroup className="my-2">
          <ListGroup.Item active key={-1}>
            Edge
          </ListGroup.Item>
          {area?.edges.map((edge, index) => (
            <ListGroup.Item
              key={index}
            >{`${edge.lat}, ${edge.lng}`}</ListGroup.Item>
          ))}
        </ListGroup>
        <Button
          className="m-2"
          variant="primary"
          size="sm"
          onClick={() => {
            areaDispatch({
              type: SET_SHOW_AREA,
              payload: {
                showArea: showArea,
                areaDisplayIndex: areaDisplayIndex,
                areaCRUD: "create",
              },
            });
          }}
        >
          New
        </Button>
        <Button
          className="m-2"
          variant="secondary"
          size="sm"
          onClick={() => {
            areaDispatch({
              type: SET_SHOW_AREA,
              payload: {
                showArea: showArea,
                areaDisplayIndex: areaDisplayIndex,
                areaCRUD: "update",
              },
            });
          }}
        >
          Edit
        </Button>
      </Offcanvas.Body>
    </>
  );
}

export default ReadArea;
