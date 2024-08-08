import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
      fetchListUser()
  }, []);
  const fetchListUser = async () => {
    let res = await getAllUsers();
    if(res && res.EC === 0){
        setListUser(res.DT)
    }
  }
  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Email</th>
          <th scope="col">Tên người dùng</th>
          <th scope="col">Role</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {listUser &&
          listUser.length > 0 &&
          listUser.map((item, index) => (
            <tr>
              <td key={`table-user-${index}`}>{index + 1}</td>
              <td>{item.email}</td>
              <td>{item.username}</td>
              <td>{item.role}</td>
              <td>
                <button className="btn btn-danger">Xóa</button>
                <button className="btn btn-warning mx-2">Sửa</button>
                <button className="btn btn-primary">Chi tiết</button>
              </td>
            </tr>
          ))}

        {listUser && listUser.length === 0 && (
          <tr>
            <td colSpan={4}>Không có dữ liệu</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableUser;
