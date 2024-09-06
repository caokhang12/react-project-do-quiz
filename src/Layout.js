import { Route, Routes } from "react-router-dom";
import App from "./App";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser.js";
import Dashboard from "./components/Admin/Content/Dashboard";
import Login from "./components/Auth/Login.js";
import { Bounce, ToastContainer } from "react-toastify";
import Register from "./components/Auth/Register.js";
import LizQuiz from "./components/User/LizQuiz.js";
import DetailQuiz from "./components/User/DetailQuiz.js";
import Error from "./components/404/Error.js";
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<LizQuiz />} />
          <Route path="quiz/:id" element={<DetailQuiz />} />
        </Route>
        <Route path="admins" element={<Admin />}>
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transiotion={Bounce}
      />
    </>
  );
};

export default Layout;
