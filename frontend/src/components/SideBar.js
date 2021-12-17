import { Offcanvas, ListGroup } from "react-bootstrap";

function SideBar(props) {
  const { area, showArea, closeAreaHandler } = props;
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
