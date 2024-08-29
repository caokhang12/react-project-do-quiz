import { useSelector } from "react-redux";
import videoHomePage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-title">There's a better way to ask</div>
        <div className="homepage-description">
        Get more data—like signups, feedback, and anything else—with forms designed to be refreshingly different.
        </div>
        <div className="homepage-button">
          {isAuthenticated ? (
            <button onClick={() => navigate("/users")}>Do quiz</button>
          ) : (
            <button onClick={() => navigate("/login")}>Get's started. It's free</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
