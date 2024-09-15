import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
  Image,
} from "react-bootstrap";
import Select from "react-select";
import { postNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

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
  return (
    <Container className="mt-5 w-75">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Add New Quiz</h2>
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
  );
};
export default ManageQuiz;
