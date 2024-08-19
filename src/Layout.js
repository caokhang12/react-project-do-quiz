import { Route, Routes } from "react-router-dom";
import App from "./App";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser.js";
import Dashboard from "./components/Admin/Content/Dashboard";
import Login from "./components/Auth/Login.js";
import { Bounce, ToastContainer } from "react-toastify";
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/users" element={<User />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
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
