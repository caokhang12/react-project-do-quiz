import ModalAddUser from "./ModalAddUser";
import React, { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUsersPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDelUser from "./ModalDelUser";

const ManageUser = () => {
  const LIMIT_USER = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDel, setShowModalDel] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchListUser(1);
  }, []);
  const fetchListUser = async (page) => {
    let res = await getAllUsersPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };
  const handleBtnUpdate = (user) => {
    setShowModalUpdate(true);
    setUser(user);
  };
  const handleBtnView = (user) => {
    setShowModalView(true);
    setUser(user);
  };
  const handleBtnDel = (user) => {
    setShowModalDel(true);
    setUser(user);
  };
  return (
    <div className="manage-user-container">
      <div className="manage-user-title">ManageUser</div>
      <div className="manage-user-content">
        <div className="btn-add-user">
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowModalAdd(true)}
          >
            Thêm người dùng
          </button>
        </div>
        <div className="manage-user-table">
          <TableUser
            pageCount={pageCount}
            fetchListUser={fetchListUser}
            listUser={listUser}
            handleBtnUpdate={handleBtnUpdate}
            handleBtnView={handleBtnView}
            handleBtnDel={handleBtnDel}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className="manage-user"></div>
      <ModalAddUser
        show={showModalAdd}
        setShow={setShowModalAdd}
        fetchListUser={fetchListUser}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalUpdateUser
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        fetchListUser={fetchListUser}
        user={user}
        setUser={setUser}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalViewUser
        show={showModalView}
        setShow={setShowModalView}
        setUser={setUser}
        user={user}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalDelUser
        show={showModalDel}
        setShow={setShowModalDel}
        fetchListUser={fetchListUser}
        user={user}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default ManageUser;
