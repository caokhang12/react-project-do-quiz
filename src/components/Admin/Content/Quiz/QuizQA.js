import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import "./QuizQA.scss";
import _ from "lodash";
import {
  getAllQuizByAdmin,
  getQuizWithQA,
  postNewAnswer,
  postNewQuestion,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import { Image } from "react-bootstrap";
const QuizQA = () => {
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState({});
  const [questions, setQuestion] = useState(initQuestion);

  useEffect(() => {
    fetchAllQuiz();
  }, []);
  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      // for (let i = 0; i < res.DT.qa.length; i++) {
      //   console.log("file", res.DT.qa[i].imageFile);
      // }
      setQuestion(res.DT.qa);
      console.log(questions);
    }
  };
  const fetchAllQuiz = async () => {
    let data = await getAllQuizByAdmin();
    if (data && data.EC === 0) {
      let newData = data.DT.map((item) => {
        return { value: item.id, label: item.description };
      });
      setListQuiz(newData);
    }
  };

  const handleAddRevQuestion = (type, id) => {
    if (type === "ADD") {
      setQuestion([
        ...questions,
        {
          id: uuidv4(),
          description: "",
          imageFile: "",
          imageName: "",
          answers: [
            {
              id: uuidv4(),
              description: "",
              isCorrect: false,
            },
          ],
        },
      ]);
    }
    if (type === "REV") {
      let questionsClone = _.cloneDeep(questions);
      setQuestion(questionsClone.filter((question) => question.id !== id));
    }
  };
  const handleAddRevAnswer = (type, id, questionId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAn = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex(
        (question) => question.id === questionId
      );
      questionsClone[index].answers.push(newAn);
      setQuestion([...questionsClone]);
    }
    if (type === "REV") {
      let index = questionsClone.findIndex(
        (question) => question.id === questionId
      );
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (an) => an.id !== id
      );
      setQuestion([...questionsClone]);
    }
  };

  const handleOnChange = (type, id, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((question) => question.id === id);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestion(questionsClone);
      }
    }
  };

  const handleOnChangeAnswer = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "DESCRIPTION") {
              answer.description = value;
            }
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
          }
          return answer;
        }
      );
      setQuestion(questionsClone);
    }
  };
  const handleOnChangeImage = (id, e) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((question) => question.id === id);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestion(questionsClone);
    }
  };

  const handleOnSubmit = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Vui lòng chọn Quiz!");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (_.isEmpty(questions[i].description)) {
        toast.error("Vui lòng nhập câu hỏi!");
        return;
      }
    }

    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (_.isEmpty(questions[i].answers[j].description)) {
          toast.error("Vui lòng nhập đáp án!");
          return;
        }
      }
    }

    for (const question of questions) {
      const ques = await postNewQuestion(
        selectedQuiz.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        await postNewAnswer(answer.description, answer.isCorrect, ques.DT.id);
      }
    }
    toast.success("Thêm câu hỏi thành công!");
    setQuestion(initQuestion);
    setSelectedQuiz();
  };
  return (
    <div>
      <div className="manage-question-container">
        <div className="add-question">
          <div className="col-6 form-group">
            <label className="mb-2">Select Quiz:</label>
            <Select
              defaultValue={selectedQuiz}
              onChange={setSelectedQuiz}
              options={listQuiz}
            />
          </div>
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <div key={question.id}>
                  <div className="mt-3">
                    <label className="mb-2">Question: {index + 1}</label>
                  </div>
                  <div className="q-main mb-5">
                    <div className="questions-content">
                      <div className="form-floating description">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={question.description}
                          onChange={(e) =>
                            handleOnChange(
                              "QUESTION",
                              question.id,
                              e.target.value
                            )
                          }
                        />
                        <label>Description</label>
                      </div>
                      <div className="btn-add">
                        <span>
                          <BsFillPatchPlusFill
                            className="icon-add"
                            onClick={() => handleAddRevQuestion("ADD", "")}
                          />
                        </span>
                        {questions.length > 1 && (
                          <span>
                            <BsPatchMinusFill
                              className="icon-remove"
                              onClick={() =>
                                handleAddRevQuestion("REV", question.id)
                              }
                            />
                          </span>
                        )}
                      </div>
                      <div className="group-upload">
                        <label htmlFor={question.id}>
                          <RiImageAddFill className="label-up" />
                        </label>
                        <input
                          type="file"
                          hidden
                          id={question.id}
                          onChange={(e) => handleOnChangeImage(question.id, e)}
                        />
                        {question.imageFile ? (
                          <Image
                            src={`data:image/jpeg;base64, ${question.imageFile}`}
                            alt="preview"
                            className="rounded d-flex image"
                          />
                        ) : (
                          // <span>{question.imageName}</span>
                          <span>0 file was uploaded</span>
                        )}
                        <div>{question.imageName}</div>
                      </div>
                    </div>
                    {question.answers &&
                      question.answers.length > 0 &&
                      question.answers.map((answer, index) => {
                        return (
                          <div key={answer.id} className="answers-content">
                            <input
                              type="checkbox"
                              className="form-check-input iscorrect"
                              checked={answer.isCorrect}
                              onChange={(e) =>
                                handleOnChangeAnswer(
                                  "CHECKBOX",
                                  answer.id,
                                  question.id,
                                  e.target.checked
                                )
                              }
                            />
                            <div className="form-floating answer-name">
                              <input
                                type="type"
                                className="form-control"
                                placeholder="Answer"
                                value={answer.description}
                                onChange={(e) =>
                                  handleOnChangeAnswer(
                                    "DESCRIPTION",
                                    answer.id,
                                    question.id,
                                    e.target.value
                                  )
                                }
                              />
                              <label>Answer {index + 1}</label>
                            </div>
                            <div className="btn-group">
                              <span>
                                <AiFillPlusSquare
                                  className="icon-add"
                                  onClick={() =>
                                    handleAddRevAnswer("ADD", "", question.id)
                                  }
                                />
                              </span>
                              {question.answers.length > 1 && (
                                <span>
                                  <AiOutlineMinusCircle
                                    className="icon-remove"
                                    onClick={() =>
                                      handleAddRevAnswer(
                                        "REV",
                                        answer.id,
                                        question.id
                                      )
                                    }
                                  />
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="btn-submit">
          <button
            className="btn btn-primary mt-3"
            onClick={() => handleOnSubmit()}
          >
            Save question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQA;
