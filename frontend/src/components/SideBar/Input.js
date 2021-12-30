import { Form } from "react-bootstrap";

function Input(props) {
  const {
    title,
    name,
    value,
    type,
    as,
    placeholder,
    onChange,
    visuallyHidden,
  } = props;

  return (
    <Form.Group
      className={visuallyHidden ? "" : "mb-3"}
      controlId={`form-${name}`}
    >
      <Form.Label visuallyHidden={visuallyHidden}>{title}</Form.Label>
      <Form.Control
        name={name}
        value={value}
        type={type}
        as={as}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Form.Group>
  );
}

export default Input;
