import ModalAddUser from "./ModalAddUser";
import React, { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiService";

const ManageUser = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetchListUser();
  }, []);
  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      setListUser(res.DT);
    }
  };
  return (
    <div className="manage-user-container">
      <div className="manage-user-title">ManageUser</div>
      <div className="manage-user-content">
        <div className="btn-add-user">
          <button className="btn btn-outline-primary" onClick={handleShow}>
            Thêm người dùng
          </button>
        </div>
        <div className="manage-user-table">
          <TableUser listUser={listUser} />
        </div>
      </div>
      <div className="manage-user"></div>
      <ModalAddUser
        show={show}
        setShow={setShow}
        fetchListUser={fetchListUser}
      />
    </div>
  );
};
export default ManageUser;
