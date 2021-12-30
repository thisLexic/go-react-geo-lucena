import { useState, useEffect, useReducer } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";

import { miscReducer, defaultStateMisc } from "../../reducers/misc";
import { SET_ERROR } from "../../actions/misc";

import Input from "./Input";

function CreateUpdateArea(props) {
  const { areaId } = props;
  const [area, setArea] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const [, miscDispatch] = useReducer(miscReducer, defaultStateMisc);

  useEffect(() => {
    if (areaId > 0) {
      async function fetchAreaAPI() {
        let response = await fetch(`http://localhost:4000/v1/area/${areaId}`);

        if (response.status !== 200) {
          let errorMessage = `Invalid response code: ${response.status}`;
          let err = Error(errorMessage);
          miscDispatch({ type: SET_ERROR, payload: err });
        } else {
          response = await response.json();
          const createdAtDate = new Date(response.area.created_at);
          setArea({
            id: areaId,
            description: response.area.description,
            createdAt: createdAtDate.toISOString().split("T")[0],
          });
        }
      }

      fetchAreaAPI();
    }
    setIsLoaded(true);
  }, [areaId]);

  const onChangeHandler = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };
    async function submitForm() {
      const response = await fetch(
        "http://localhost:4000/v1/admin/updatearea",
        requestOptions
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
    }
    submitForm();
  };

  const form = !isLoaded ? (
    <p>Loading...</p>
  ) : (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{areaId ? "Update" : "New"}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={onSubmitHandler}>
          <Input
            title="Id"
            name="id"
            value={area.id}
            type="hidden"
            onChange={onChangeHandler}
            visuallyHidden={true}
          />
          <Input
            title="Description"
            name="description"
            value={area.description}
            as="textarea"
            placeholder="Clear description of new area"
            onChange={onChangeHandler}
          />
          <Form.Select
            aria-label="risk"
            name="risk"
            className="mb-3"
            value={area.value}
            onChange={onChangeHandler}
          >
            <option value="">Choose a Risk</option>
            <option value="earthquake">Earthquake</option>
            <option value="flood">Flood</option>
            <option value="volcanic_eruption">Volcanic Eruption</option>
          </Form.Select>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
        <p>{JSON.stringify(area)}</p>
      </Offcanvas.Body>
    </>
  );

  return form;
}

export default CreateUpdateArea;
