import { useEffect, useState } from "react";
import { getAllQuizByUser } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";

const LizQuiz = () => {
  const navigate = useNavigate(); 
  const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    getQuiz();
  }, []);
  const getQuiz = async () => {
    const res = await getAllQuizByUser();
    console.log(res);
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
      //toast.success(res.EM);
    }
    // if (res && res.EC !== 0) {
    //   toast.error(res.EM);
    // }
  };
  return (
    <div className="quiz-container d-inline-flex">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <div key={`quiz-${item.id}`} className="card" style={{ width: "18rem" }}>
              <img className="card-img-top" src={`data:image/jpeg;base64, ${item.image}`} alt="Card cap" />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">
                  {item.description}
                </p>
                <button className="btn btn-primary"onClick={() => navigate(`/quiz/${item.id}`)}>Do Quiz</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LizQuiz;
