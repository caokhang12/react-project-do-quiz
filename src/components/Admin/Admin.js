import SideBar from "./SideBar.js";
import "./Admin.scss";
import { useState } from "react";
import {FaBars} from  "react-icons/fa";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <FaBars onClick={() => setCollapsed(!collapsed)}/>
        <h1>AdminContent</h1>
      </div>
    </div>
  );
};

export default Admin;
