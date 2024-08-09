import ModalAddUser from "./ModalAddUser";
import React, { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [userUpdate, setUserUpdate] = useState({});

  useEffect(() => {
    fetchListUser();
  }, []);
  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      setListUser(res.DT);
    }
  };
  const handleBtnUpdate = (userUpdate) => {
    setShowModalUpdate(true);
    setUserUpdate(userUpdate);
  };
  return (
    <div className="manage-user-container">
      <div className="manage-user-title">ManageUser</div>
      <div className="manage-user-content">
        <div className="btn-add-user">
          <button className="btn btn-outline-primary" onClick={()=>setShowModalAdd(true)}>
            Thêm người dùng
          </button>
        </div>
        <div className="manage-user-table">
          <TableUser listUser={listUser} 
          handleBtnUpdate={handleBtnUpdate}/>
        </div>
      </div>
      <div className="manage-user"></div>
      <ModalAddUser
        show={showModalAdd} 
        setShow={setShowModalAdd}
        fetchListUser={fetchListUser}
      />
      <ModalUpdateUser
        show={showModalUpdate} 
        setShow={setShowModalUpdate}
        fetchListUser={fetchListUser}
        userUpdate={userUpdate}
        setUserUpdate={setUserUpdate}
      />
    </div>
  );
};
export default ManageUser;
