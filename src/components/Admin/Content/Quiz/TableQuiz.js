import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import Select from "react-select";
import { delQuiz, updateQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { FiPlusCircle } from "react-icons/fi";
import _ from "lodash";

const TableQuiz = ({ listQuiz, fetchQuiz }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [showUpdModal, setShowUpdModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [quiz, setQuiz] = useState({});
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  useEffect(() => {
    if (!_.isEmpty(quiz)) {
      setName(quiz.name);
      setDescription(quiz.description);
      setPreview(quiz.preview);
      setImage(quiz.image);
      if (quiz.image) setPreview(`data:image/jpeg;base64,${quiz.image}`);
    }
  }, [quiz]);
  const handleBtnDel = (quiz) => {
    setShowDelModal(true);
    setQuiz(quiz);
  };
  const handleSetImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleConfirmDel = async () => {
    //Gửi data
    let data = await delQuiz(quiz.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShowDelModal();
      await fetchQuiz();
      //setCurrentPage(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleBtnUpdate = (quiz) => {
    setShowUpdModal(true);
    setQuiz(quiz);
  };

  const handleSubmitUpd = async () => {
    //Gửi data
    let data = await updateQuiz(quiz.id, description, name, type.value, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShowUpdModal(false);
      setName("");
      setDescription("");
      setType("");
      setImage("");
      setPreview("");
      await fetchQuiz();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Tên bài quiz</th>
            <th scope="col">Miêu tả</th>
            <th scope="col">Độ khó</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => (
              <tr key={`table-user-${index}`}>
                <td>
                  {index + 1}
                  {/* {item.id} */}
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleBtnDel(item)}
                  >
                    Xóa
                  </button>
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => handleBtnUpdate(item)}
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}

          {listQuiz && listQuiz.length === 0 && (
            <tr>
              <td colSpan={4}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal show={showDelModal} onHide={setShowDelModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa bài quiz
          <b> {quiz.name}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => handleConfirmDel()}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showUpdModal}
        onHide={setShowUpdModal}
        centered
        size="lg"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật bài quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Tên bài quiz</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Miêu tả</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Độ khó</Form.Label>
                <Select
                  options={options}
                  value={type}
                  onChange={setType}
                ></Select>
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
                onChange={(e) => handleSetImage(e)}
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
          <Button variant="secondary" onClick={() => setShowUpdModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpd()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableQuiz;
