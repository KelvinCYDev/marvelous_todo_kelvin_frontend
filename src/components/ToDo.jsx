import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ToDo = ({ task, updateStatusDone, updateMode, deleteToDo }) => {
  ToDo.propTypes = {
    task: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
    updateStatusDone: PropTypes.func.isRequired,
    updateMode: PropTypes.func.isRequired,
    deleteToDo: PropTypes.func.isRequired,
  };

  const [checked, setChecked] = useState(task.done);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked != task.done) {
      updateStatusDone({ done: checked });
    }
  }, [checked, updateStatusDone, task.done]);

  return (
    <Row className="mb-3">
      <Col>
        <input
          type="checkbox"
          className="me-2"
          checked={checked}
          onChange={handleChange}
        />
        {task.text}
      </Col>
      <Col>
        <Button variant="secondary" onClick={updateMode} className="m-1">
          <BiEdit className="icon" />
        </Button>
        <Button variant="danger" onClick={deleteToDo} className="m-1">
          <AiFillDelete className="icon" />
        </Button>
      </Col>
    </Row>
  );
};

export default ToDo;
