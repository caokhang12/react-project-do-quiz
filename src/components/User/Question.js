import _ from "lodash";

const Question = ({ index, data,handleCheckTick }) => {
  const handleCheckbox = (e, aId,qId) => {
    console.log('anId' + 'qId',e.target.checked, aId,qId);
    handleCheckTick(aId,qId)
  }
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
      <div className="answers">
        {data.answers.map((an, index) => {
          return (
            <div key={`answer-${index}`} className="option">
              <div className="form-check">
                <input
                  className="form-check-input"
                  onChange = {(e) => handleCheckbox(e, an.id, data.id)}
                  checked={an.isSelected}
                  type="checkbox"
                  id={`checkbox${index}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`checkbox${index}`}
                >
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
