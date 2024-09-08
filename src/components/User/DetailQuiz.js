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
            item.answers.isSelected = false;
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
  const handleFinish = () => {};

  const handleCheckTick = (aId, qId) => {
    let newData = _.cloneDeep(data);
    let question = newData.find((item) => +item.id === +qId);
    if (question && question.answers) {
      let clickAn = question.answers.map((an) => {
        if (+an.id === +aId) {
          an.isSelected = !an.isSelected;
        }
        return an;
      });

      question.answers = clickAn;
    }
    const index = newData.findIndex((item) => +item.id === +qId);
    if(index > -1){
      newData[index] = question;
      setData(newData);
    }
  };
  console.log(data, curQuestion);

  return (
    <div className="detail-quiz-container">
      <div className="quiz-container ">
        <div className="left-content">
          <div className="title">
            Quiz {paramId} - {location.state.title}
          </div>
          <hr />
          <div className="quiz-detail">
            <Question
              handleCheckTick={handleCheckTick}
              index={curQuestion}
              data={data && data.length > 0 ? data[curQuestion] : []}
            />
          </div>

          <div className="footer">
            {data && data.length > 0 && curQuestion === 0 ? (
              <button className="btn btn-danger" onClick={() => handleFinish()}>
                Finish
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => handlePrev()}>
                Prev
              </button>
            )}

            {data && data.length > curQuestion + 1 ? (
              <button className="btn btn-primary" onClick={() => handleNext()}>
                Next
              </button>
            ) : (
              <button className="btn btn-danger" onClick={() => handleFinish()}>
                Finish
              </button>
            )}
          </div>
        </div>
        <div className="right-content">Question</div>
      </div>
    </div>
  );
};
export default DetailQuiz;
