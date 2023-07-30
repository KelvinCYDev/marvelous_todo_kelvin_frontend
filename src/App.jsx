import { useEffect, useState, useRef } from "react";
import ToDo from "./components/ToDo";
import Search from "./components/Search";
import Intervals from "./components/Intervals";
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
  const [toDo, setToDo] = useState([]);
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

  const sort = (array) => {
    return array.sort((a, b) => {
      const textA = a.text.toUpperCase();
      const textB = b.text.toUpperCase();
      if (textA < textB) {
        return -1;
      }
      if (textA > textB) {
        return 1;
      }
      return 0;
    });
  };

  const toDoListFilter = (array) => {
    return sort(
      array.filter(
        (task) => task.done == false && task.text.toLowerCase().includes(filter)
      )
    );
  };

  const doneListFilter = (array) => {
    let result = [];
    let temp = array.filter(
      (task) => task.done == true && task.text.toLowerCase().includes(filter)
    );
    if (temp.length > 10) {
      temp.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      result = temp.slice(0, 10);
    } else {
      result = temp;
    }
    return sort(result);
  };

  const ToDoTask = ({ task }) => {
    ToDoTask.propTypes = {
      task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
      }),
    };
    return (
      <ToDo
        task={task}
        updateMode={() => updateMode(task._id, task.text)}
        deleteToDo={() => deleteToDo(task._id, setToDo)}
        updateStatusDone={({ done }) =>
          updateStatusDone(task._id, done, setToDo)
        }
      />
    );
  };

  return (
    <Container className="p-5 mb-4 bg-light rounded-3">
      <Row>
        <Col md="9">
          <h2>Marvelous v2.0</h2>
        </Col>
        <Col>
          <Button variant="danger" onClick={() => deleteAll(setToDo)}>
            Delete all tasks
          </Button>
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
          {toDo.length > 0 &&
            toDoListFilter(toDo).map((task) => (
              <ToDoTask key={task._id} task={task} />
            ))}
        </Col>
        <Col>
          <Row>
            <Col md="10">
              <h5>Done</h5>
              <hr />
            </Col>
          </Row>
          {toDo.length > 0 &&
            doneListFilter(toDo).map((task) => (
              <ToDoTask key={task._id} task={task} />
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
