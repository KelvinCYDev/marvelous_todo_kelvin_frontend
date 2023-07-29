import { InputGroup, Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Search({ data, setData }) {
  Search.propTypes = {
    data: PropTypes.array.isRequired,
    setData: PropTypes.func.isRequired,
  };

  return (
    <InputGroup>
      <Form.Control
        onChange={(e) => setData(e.target.value.toLocaleLowerCase())}
        placeholder="Search"
        value={data}
      />
    </InputGroup>
  );
}
