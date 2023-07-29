import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { getAllToDo, updateDone } from "./utils/HandleApi";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [toDo, setToDo] = useState([]);

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  return (
    <Container className="p-5 mb-4 bg-light rounded-3">
      <Row>
        <h2>Marvelous v2.0</h2>
      </Row>
      <Row>
        <Col>
          <Row>
            <h5>To Do</h5>
            <hr />
          </Row>
          {toDo
            .filter((item) => item.done == false)
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
            .filter((item) => item.done != false)
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
