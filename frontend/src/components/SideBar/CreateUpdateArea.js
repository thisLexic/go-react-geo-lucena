import { useState } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";

function CreateUpdateArea() {
  const [area, setArea] = useState({});

  const onChangeHandler = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>New</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Clear description of new area"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Offcanvas.Body>
    </>
  );
}

export default CreateUpdateArea;
