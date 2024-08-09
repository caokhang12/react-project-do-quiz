import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import "./ManageUser.scss";
import _ from "lodash";

const ModalViewUser = ({ show, setShow, user, setUser }) => {
      const handleClose = () => {
    setShow(false);
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("USER");
    setPreview("");
    setUser({});
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!_.isEmpty(user)) {
      setUsername(user.username);
      setPassword("");
      setEmail(user.email);
      setRole(user.role);
      if (user.image)
        setPreview(`data:image/jpeg;base64,${user.image}`);
    }
  }, [user]);


  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  disabled
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Tên người dùng</Form.Label>
                <Form.Control type="text" value={username} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Quyền tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=" Nhập tên người dùng"
                  value={role}
                />
              </Form.Group>
            </Row>

            {preview ? (
              <Form.Group className="img-preview">
                <Image src={preview} alt="preview" />
              </Form.Group>
            ) : null}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalViewUser;
