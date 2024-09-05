import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizData } from "../../services/apiService";
import _ from "lodash";

const DetailQuiz = () => {
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
      console.log(data);
    }
  };
  return <div>detailQuiz</div>;
};
export default DetailQuiz;
