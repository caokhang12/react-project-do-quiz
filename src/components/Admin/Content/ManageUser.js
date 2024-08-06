import ModalAddUser from "./ModalAddUser";

const ManageUser = () => {
  return (
    <div className="manage-user-container">
      <div className="manage-user-title">ManageUser</div>
      <div className="manage-user-content">Content</div>
      <div className="manage-user">
        <ModalAddUser />
      </div>
    </div>
  );
};
export default ManageUser;
