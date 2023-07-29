import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { getAllToDo } from "./utils/HandleApi";
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
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
