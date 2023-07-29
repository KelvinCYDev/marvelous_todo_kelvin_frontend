import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const ToDo = ({ item, updateDone }) => {
  ToDo.propTypes = {
    item: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
    updateDone: PropTypes.func.isRequired,
  };

  const [checked, setChecked] = useState(item.done);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked != item.done) {
      updateDone({ done: checked });
    }
  }, [checked, updateDone, item.done]);

  return (
    <Row className="mb-3">
      <Col>
        <input
          type="checkbox"
          className="me-2"
          checked={checked}
          onChange={handleChange}
        />
        {item.text}
      </Col>
    </Row>
  );
};

export default ToDo;
