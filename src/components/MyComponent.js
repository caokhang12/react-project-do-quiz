import React from "react";
import UserInfor from "./UserComponent";
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
  //JSX
  render() {
    return (
      <div>
        <UserInfor />
        <br />
        <DisplayInfor listUser={this.state.listUser} />
      </div>
    );
  }
}
export default MyComponent;
