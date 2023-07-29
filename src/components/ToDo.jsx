import React from "react";
import { Row, Col } from "react-bootstrap";

const ToDo = ({ text }) => {
  return (
    <Row className="mb-3">
      <Col>{text}</Col>
    </Row>
  );
};

export default ToDo;
