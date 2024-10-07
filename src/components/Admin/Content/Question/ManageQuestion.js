import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import "./Question.scss";
import _ from "lodash";
import {
  getAllQuizByAdmin,
  postNewAnswer,
  postNewQuestion,
} from "../../../../services/apiService";
const ManageQuestion = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState({});
  const [questions, setQuestion] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);

  useEffect(() => {
    fetchAllQuiz();
  }, []);
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
    console.log(type, answerId, questionId, value);
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
    await Promise.all(
      questions.map(async (question) => {
        const ques = await postNewQuestion(
          +selectedQuiz.value,
          question.description,
          question.imageFile
        );
        await Promise.all(
          question.answers.map(async (answer) => {
            await postNewAnswer(
              answer.description,
              answer.isCorrect,
              ques.DT.id
            );
          })
        );
      })
    );
  };
  return (
    <div>
      <div className="manage-question-container">
        <div className="title">Manage Question</div>
        <hr />
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
                        <span>
                          {question.imageName
                            ? question.imageName
                            : "0 file was uploaded"}
                        </span>
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
          <button className="btn btn-primary" onClick={() => handleOnSubmit()}>
            Save question
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageQuestion;
