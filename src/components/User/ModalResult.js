import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalResult({ show, setShow,dataResult}) {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Total question
          <b>{dataResult.countTotal}</b>
          Correct answers
          <b>{dataResult.countCorrect}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;
