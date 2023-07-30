import { useEffect, useState, useRef } from "react";
import ToDo from "./components/ToDo";
import Search from "./components/Search";
import Intervals from "./components/Intervals";
import Confirm from "./components/confirmButton";
import {
  getAllToDo,
  updateStatusDone,
  addToDo,
  updateToDo,
  deleteToDo,
  deleteAll,
} from "./utils/HandleApi";
import { Container, Row, Col, Button, InputGroup, Form } from "react-bootstrap";
import PropTypes from "prop-types";

function App() {
  const [filter, setFilter] = useState("");
  const [toDoAll, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const fetchDataRef = useRef();

  useEffect(() => {
    console.log("Refreshed!");
    getAllToDo(setToDo);
    return () => clearInterval(fetchDataRef);
  }, [fetchDataTrigger]);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const ToDoTask = ({ taskArray = [] }) => {
    ToDoTask.propTypes = {
      taskArray: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          done: PropTypes.bool.isRequired,
        })
      ),
    };
    return (
      taskArray.length > 0 &&
      taskArray
        .filter((task) => {
          return task.text.toLowerCase().includes(filter);
        })
        .map((task) => (
          <ToDo
            key={task._id}
            task={task}
            updateMode={() => updateMode(task._id, task.text)}
            deleteToDo={() => deleteToDo(task._id, setToDo)}
            updateStatusDone={({ done }) =>
              updateStatusDone(task._id, done, setToDo)
            }
          />
        ))
    );
  };

  return (
    <Container className="p-5 mb-4 bg-light rounded-3">
      <Row>
        <Col md="9">
          <h2>Marvelous v2.0</h2>
        </Col>
        <Col>
          <Confirm deleteAll={() => deleteAll(setToDo)} />
        </Col>
      </Row>
      <Row className="my-5">
        <Col md="4">
          <InputGroup className={isUpdating && "glow"}>
            <Form.Control
              placeholder="Add ToDos..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="warning"
              onClick={
                isUpdating
                  ? () =>
                      updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                  : () => addToDo(text, setText, setToDo)
              }
            >
              {isUpdating ? "Update" : "Add"}
            </Button>
          </InputGroup>
        </Col>
        <Col md="4">
          <Intervals
            fetchDataRef={fetchDataRef}
            setFetchDataTrigger={setFetchDataTrigger}
          />
        </Col>
        <Col md={{ span: 4 }}>
          <Search data={filter} setData={setFilter} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col md="10">
              <h5>To Do</h5>
              <hr />
            </Col>
          </Row>
          <ToDoTask taskArray={toDoAll.todo} />
        </Col>
        <Col>
          <Row>
            <Col md="10">
              <h5>Done</h5>
              <hr />
            </Col>
          </Row>
          <ToDoTask taskArray={toDoAll.todoDone} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
