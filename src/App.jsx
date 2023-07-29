import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import {
  getAllToDo,
  updateDone,
  addToDo,
  updateToDo,
  deleteToDo,
  deleteAll,
} from "./utils/HandleApi";
import { Container, Row, Col, Button, InputGroup, Form } from "react-bootstrap";
import Search from "./components/Search";

function App() {
  const [filter, setFilter] = useState("");
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const doneListFilter = (array) => {
    let result = [];
    let temp = array.filter(
      (item) => item.done != false && item.text.toLowerCase().includes(filter)
    );
    if (temp.length != 0) {
      temp.reduce((a, b) => result.push(a.updatedAt > b.updatedAt ? a : b));
    }
    console.log(result);
    return result.slice(0, 10);
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
        <Col>
          <InputGroup>
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
        <Col>
          <Search data={filter} setData={setFilter} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <h5>To Do</h5>
            <hr />
          </Row>
          {toDo.length > 0 &&
            toDo
              .filter(
                (item) =>
                  item.done == false && item.text.toLowerCase().includes(filter)
              )
              .map((item) => (
                <ToDo
                  key={item._id}
                  item={item}
                  updateMode={() => updateMode(item._id, item.text)}
                  deleteToDo={() => deleteToDo(item._id, setToDo)}
                  updateDone={({ done }) => updateDone(item._id, done, setToDo)}
                />
              ))}
        </Col>
        <Col>
          <Row>
            <h5>Done</h5>
            <hr />
          </Row>
          {toDo.length > 0 &&
            doneListFilter(toDo).map((item) => (
              <ToDo
                key={item._id}
                item={item}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => deleteToDo(item._id, setToDo)}
                updateDone={({ done }) => updateDone(item._id, done, setToDo)}
              />
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
