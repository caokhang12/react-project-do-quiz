import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
  Image,
} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Select from "react-select";
import {
  getAllQuizByAdmin,
  postNewQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [listQuiz, setListQuiz] = useState([]);
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  useEffect(() => {
    fetchAllQuiz();
  }, []);
  const fetchAllQuiz = async () => {
    let data = await getAllQuizByAdmin();
    if (data && data.EC === 0) {
      setListQuiz(data.DT);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleSetImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleSubmit = async () => {
    if (!name || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    let data = await postNewQuiz(description, name, type.value, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setName("");
      setDescription("");
      setType("");
      setImage("");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleBtnDel = (quiz) => {};

  const handleBtnUpdate = (quiz) => {};
  return (
    <div className="manage-quiz-container">
      <div className="add-quiz">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Add New Quiz</Accordion.Header>
            <Accordion.Body>
              <Container className="w-75">
                <Row className="justify-content-center">
                  <Col md={6}>
                    <h2 className="text-center mb-4"></h2>
                    {/* Name */}
                    <FloatingLabel label="Quiz Name" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FloatingLabel>

                    {/* Description */}
                    <FloatingLabel label="Quiz Description" className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter quiz description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FloatingLabel>

                    {/* Quiz Type */}
                    <Form.Group className="mb-3">
                      <Form.Label>Quiz Type</Form.Label>
                      <Select
                        options={options}
                        value={type}
                        defaultValue={type}
                        onChange={setType}
                        placeholder={"Select quiz type"}
                      ></Select>
                    </Form.Group>

                    {/* Upload Image */}
                    <Form.Group className="mb-3 d-flex">
                      <Form.Label className="btn " htmlFor="formFile">
                        Upload Image
                      </Form.Label>

                      <Form.Control
                        type="file"
                        hidden
                        id="formFile"
                        onChange={(e) => handleSetImage(e)}
                      />
                      {preview ? (
                        <Image
                          src={preview}
                          alt="preview"
                          className="w-25 rounded float-right img-thumbnail"
                        />
                      ) : null}
                    </Form.Group>

                    {/* Submit Button */}
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={(e) => handleSubmit()}
                    >
                      Add Quiz
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="quiz-table">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Tên bài quiz</th>
              <th scope="col">Miêu tả</th>
              <th scope="col">Độ khó</th>
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
      </div>
    </div>
  );
};
export default ManageQuiz;
