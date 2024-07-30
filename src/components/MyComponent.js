import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";
class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "A", age: 55 },
      { id: 2, name: "B", age: 33 },
      { id: 3, name: "C", age: 22 },
      { id: 4, name: "D", age: 11 },
    ],
  };

  handleChangeAddNewUser = (newUser) => {
    let newListUser = [newUser, ...this.state.listUser];
    this.setState({
      listUser: newListUser,
    });
  };
  //JSX
  render() {
    return (
      <>
        <AddUserInfor AddNewUser={this.handleChangeAddNewUser} />
        <br />
        <DisplayInfor listUser={this.state.listUser} />
      </>
    );
  }
}
export default MyComponent;
