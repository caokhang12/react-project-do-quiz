import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";
// class MyComponent extends React.Component {
//   state = {
//     listUser: [
//       { id: 1, name: "A", age: 55 },
//       { id: 2, name: "B", age: 33 },
//       { id: 3, name: "C", age: 22 },
//       { id: 4, name: "D", age: 11 },
//     ],
//   };

//   handleChangeAddNewUser = (newUser) => {
//     let newListUser = [newUser, ...this.state.listUser];
//     this.setState({
//       listUser: newListUser,
//     });
//   };

//   handleDeleteUser = (id) => {
//     let newListUser = [...this.state.listUser];
//     newListUser = newListUser.filter((user) => user.id !== id);
//     this.setState({
//       listUser: newListUser,
//     });
//   };
//   //JSX
//   render() {
//     return (
//       <>
//         <AddUserInfor AddNewUser={this.handleChangeAddNewUser} />
//         <br />
//         <DisplayInfor DeleteUser={this.handleDeleteUser} listUser={this.state.listUser} />
//       </>
//     );
//   }
// }

const MyComponent = () => {
  const [listUser, setListUser] = useState([
    { id: 1, name: "A", age: "55" },
    { id: 2, name: "B", age: "33" },
    { id: 3, name: "C", age: "22" },
    { id: 4, name: "D", age: "11" },
  ]);

  const handleAddNewUser = (newUser) => {
    let newListUser = [newUser, ...listUser];
    setListUser(newListUser);
  };

  const handleDeleteUser = (id) => {
    let newListUser = [...listUser];
    newListUser = newListUser.filter((user) => user.id !== id);
    setListUser(newListUser);
  };

  return (
    <>
      <AddUserInfor AddNewUser={handleAddNewUser} />
      <br />
      <DisplayInfor DeleteUser={handleDeleteUser} listUser={listUser} />
    </>
  );
};
export default MyComponent;
