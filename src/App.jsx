import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { getAllToDo, updateDone, addToDo, deleteAll } from "./utils/HandleApi";
import { Container, Row, Col, Button, InputGroup, Form } from "react-bootstrap";
import Search from "./components/Search";

function App() {
  const [filter, setFilter] = useState("");
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

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
              onClick={() => addToDo(text, setText, setToDo)}
            >
              Add
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
          {toDo
            .filter(
              (item) =>
                item.done == false && item.text.toLowerCase().includes(filter)
            )
            .map((item) => (
              <ToDo
                key={item._id}
                item={item}
                updateDone={({ done }) => updateDone(item._id, done, setToDo)}
              />
            ))}
        </Col>
        <Col>
          <Row>
            <h5>Done</h5>
            <hr />
          </Row>
          {toDo
            .filter(
              (item) =>
                item.done != false && item.text.toLowerCase().includes(filter)
            )
            .map((item) => (
              <ToDo
                key={item._id}
                item={item}
                updateDone={({ done }) => updateDone(item._id, done, setToDo)}
              />
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
