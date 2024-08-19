import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import "./Login.scss";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
      </div>
      <div className="title">
        <span onClick={() => navigate("/")}>ReactWeb</span>
      </div>
      <div className="description">Hello, who’s this?</div>
      <div className="form-container">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="abcd@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div className="submit-button">
          <button onClick={() => handleLogin()}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
