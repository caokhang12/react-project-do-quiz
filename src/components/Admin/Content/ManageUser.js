import ModalAddUser from "./ModalAddUser";
import { useState } from "react";


const ManageUser = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <div className="manage-user-container">
      <div className="manage-user-title">ManageUser</div>
      <div className="manage-user-content">
        <div className="btn-add-user">
          <button className="btn btn-outline-primary" onClick={handleShow}>Thêm người dùng</button>
        </div>
        <div className="manage-user-table">Table</div>
</div>
      <div className="manage-user"></div>
      <ModalAddUser show={show} setShow={setShow} />
    </div>
  );
};
export default ManageUser;
