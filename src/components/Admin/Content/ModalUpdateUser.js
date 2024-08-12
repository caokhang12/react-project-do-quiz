import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { FiPlusCircle } from "react-icons/fi";
import "./ManageUser.scss";
import { toast } from "react-toastify";
import { putUser } from "../../../services/apiService";
import _ from "lodash";

const ModalUpdateUser = ({
  show,
  setShow,
  fetchListUser,
  user,
  setUser,
  currentPage,
}) => {
  const handleClose = () => {
    setShow(false);
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("USER");
    setImage("");
    setPreview("");
    setUser({});
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!_.isEmpty(user)) {
      setUsername(user.username);
      setPassword("");
      setEmail(user.email);
      setRole(user.role);
      setImage("");
      if (user.image) setPreview(`data:image/jpeg;base64,${user.image}`);
    }
  }, [user]);
  const handleUpImg = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async () => {
    // Validate
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      toast.error("Email không đúng định dạng");
      return;
    }

    //Gửi data
    let data = await putUser(user.id, username, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      console.log(currentPage);
      await fetchListUser(currentPage);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

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
          <Modal.Title>Cập nhật người dùng</Modal.Title>
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
                <Form.Control
                  type="text"
                  placeholder=" Nhập tên người dùng"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Quyền tài khoản</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-6 input-label ">
              <Form.Label
                className="btn btn-outline-secondary"
                htmlFor="formFile"
              >
                <FiPlusCircle />
                Tải ảnh
              </Form.Label>
              <Form.Control
                type="file"
                hidden
                id="formFile"
                onChange={(e) => handleUpImg(e)}
              />
            </Form.Group>
            {preview ? (
              <Form.Group className="img-preview">
                <Image src={preview} alt="preview" />
              </Form.Group>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
