import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ModalAddUser = ()=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Tên tài khoản</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Nhập email" />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Quyền tài khoản</Form.Label>
                <Form.Select defaultValue="USER">
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-6" >
            <Form.Label>Ảnh</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalAddUser