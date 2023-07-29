import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ToDo = ({ task, updateDone, updateMode, deleteToDo }) => {
  ToDo.propTypes = {
    task: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
    updateDone: PropTypes.func.isRequired,
    updateMode: PropTypes.func.isRequired,
    deleteToDo: PropTypes.func.isRequired,
  };

  const [checked, setChecked] = useState(task.done);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked != task.done) {
      updateDone({ done: checked });
    }
  }, [checked, updateDone, task.done]);

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
        <BiEdit className="mx-2" onClick={updateMode} />
        <AiFillDelete className="mx-2" onClick={deleteToDo} />
      </Col>
    </Row>
  );
};

export default ToDo;
