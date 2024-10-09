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

import TableQuiz from "./TableQuiz";

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [listQuiz, setListQuiz] = useState([]);

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizByAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleSetImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleSubmitNewQuiz = async () => {
    if (!name || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    let data = await postNewQuiz(description, name, type?.value, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setName("");
      setDescription("");
      setType("");
      setImage(null);
      setPreview("");
      fetchQuiz();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

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
                    {/* <h2 className="text-center mb-4"></h2> */}
                    {/* Name */}
                    <FloatingLabel label="Quiz Name" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="EASY"
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
                    <Row className="mb-3">
                      <Form.Group as={Col} className="mb-3 ">
                        <Form.Label
                          className="btn btn-primary"
                          htmlFor="formFile"
                        >
                          Upload Image
                        </Form.Label>

                        <Form.Control
                          type="file"
                          hidden
                          id="formFile"
                          onChange={(e) => handleSetImage(e)}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} className="d-flex">
                        {preview ? (
                          <Image
                            src={preview}
                            alt="preview"
                            className="w-25 rounded float-right img-thumbnail"
                          />
                        ) : null}
                      </Form.Group>
                    </Row>
                    {/* Submit Button */}
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={(e) => handleSubmitNewQuiz()}
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
        <TableQuiz listQuiz={listQuiz} fetchQuiz={fetchQuiz} />
      </div>
    </div>
  );
};
export default ManageQuiz;
