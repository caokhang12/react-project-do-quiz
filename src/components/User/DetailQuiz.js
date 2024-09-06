import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuizData } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";

const DetailQuiz = () => {
  const [data, setData] = useState([]);
  const [curQuestion, setCurQuestion] = useState(0);
  const location = useLocation();
  const param = useParams();
  const paramId = param.id;
  useEffect(() => {
    fetchQuestion();
  }, [paramId]);

  const fetchQuestion = async () => {
    let res = await getQuizData(paramId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDes,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              image = item.image;
              questionDes = item.description;
            }
            answers.push(item.answers);
          });
          return {
            id: key,
            answers,
            questionDes,
            image,
          };
        })
        .value();
      setData(data);
    }
  };

  const handlePrev = () => {
    if (data && data.length > 0 && curQuestion === 0) return;
    setCurQuestion(curQuestion - 1);
  };
  const handleNext = () => {
    if (data && data.length > curQuestion + 1) setCurQuestion(curQuestion + 1);
  };
  console.log(data, curQuestion);

  return (
    <div>
      <div className="quiz-container ">
        <div className="left-content">
          <div className="title">
            Quiz {paramId} - {location.state.title}
          </div>
          <div className="quiz-detail">
            <Question
              index={curQuestion}
              data={data && data.length > 0 ? data[curQuestion] : []}
            />
          </div>

          <div className="footer">
            <button className="btn btn-primary" onClick={() => handlePrev()}>
              Prev
            </button>
            <button className="btn btn-primary" onClick={() => handleNext()}>
              Next
            </button>
          </div>
        </div>
        <div className="right-content">Question</div>
      </div>
    </div>
  );
};
export default DetailQuiz;
