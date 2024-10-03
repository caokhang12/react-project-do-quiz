import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import "./Question.scss";
import _ from "lodash";
const ManageQuestion = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
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
              options={options}
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
                          onChange={(e) => {
                            question.description = e.target.value;
                          }}
                        />
                        <label>Description</label>
                      </div>
                      <div className="group-upload">
                        <label>
                          <RiImageAddFill className="label-up" />
                        </label>
                        <input type="file" hidden />
                        <span>0 file is uploaded</span>
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
                            />
                            <div className="form-floating answer-name">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Answer"
                                value={answer.description}
                                onChange={(e) => {
                                  answer.description = e.target.value;
                                }}
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
      </div>
    </div>
  );
};

export default ManageQuestion;
