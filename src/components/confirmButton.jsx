import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const Confirm = ({ deleteAll }) => {
  Confirm.propTypes = {
    deleteAll: PropTypes.func.isRequired,
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete all tasks
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete all tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              deleteAll();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Confirm;
