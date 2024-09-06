import _ from "lodash";

const Question = ({ index, data }) => {
  if (_.isEmpty(data)) return <></>;
  return (
    <>
      <div className="image-quiz">
        <img src={`data:image/jpeg;base64, ${data.image}`} alt="" />
      </div>
      <div className="question">
        <h5>
          Question {index + 1}: {data.questionDes}
        </h5>
      </div>
      <hr />
      <div className="answers">
        {data.answers.map((an, index) => {
          return (
            <div key={`answer-${index}`} className="option">
              <div className="form-check">
                <input
                  className="form-check-input"
                  value=""
                  type="checkbox"
                  id={`checkbox${index}`}
                />
                <label className="form-check-label" htmlFor={`checkbox${index}`}>
                  {an.description}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Question;
