import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiService";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleRegister = async () => {
    let data = await postRegister(email, password,username);
    console.log(data,email,password,username);
    if (data && data.EC === 0) {
      toast.success(data.EM);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <div className="register-container">
        <div className="register-content-left ">
          <h1 className="logo" onClick={() => navigate("/")}>
            ReactWeb
          </h1>
          <div className="text">
            <p>Connect with friends and the world around you.</p>
          </div>
        </div>
        <div className="register-content-right">
          <div className="header">
            <span>Already have an account yet?</span>
            <button>Sign up</button>
          </div>
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
              <label>Username</label>
              <input
                type={"text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <div className="submit-button">
              <button onClick={() => handleRegister()}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
