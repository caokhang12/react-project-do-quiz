import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGem, FaGithub } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import sidebarBg from "../../assets/bg2.jpg";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  return (
    <ProSidebar
      image={sidebarBg}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        {collapsed ? (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              padding: "24px",
            }}
          >
            <DiReact size={"35px"} color="00bfff" />
          </div>
        ) : (
          <div
            style={{
              gap: "10px",
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              whiteSpace: "nowrap",
            }}
          >
            <DiReact size={"3em"} color="00bfff" />
           <span style={{marginLeft: "10px", fontSize: "20px"}}>ReactWeb</span> 
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<MdDashboard />}>
            Dashboard
            <Link to="/admins/dashboard" />
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu icon={<FaGem />} title="Tính năng">
            <MenuItem>
              Quản lý Người dùng
              <Link to="/admins/manage-users" />
            </MenuItem>
            <MenuItem>
              {" "}
              Quản lý Bài Quiz
              <Link to="/admins/manage-quizzes" />
            </MenuItem>
            <MenuItem> Quản lý Câu Hỏi</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <a
            href="https://github.com/caokhang12/react-project-learn.git"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              ProjectLink
            </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};
export default SideBar;
