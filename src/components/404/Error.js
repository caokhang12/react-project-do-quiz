import "./Error.scss";
import errorImage from "../../assets/404Horse.gif";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div>
      <div className="not-found-container text-center">
        <div className="content">
          <h1 className="display-4">We lost this page</h1>
          <p className="lead">
            We searched high and low but couldn’t find what you’re looking for.
            Let’s find a better place for you to go.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            To Homepage
          </Link>
        </div>
        <div className="illustration">
          <img src={errorImage} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};
export default Error;
