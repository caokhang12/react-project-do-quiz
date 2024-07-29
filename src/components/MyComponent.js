import React from "react";
import UserInfor from "./UserComponent";
import DisplayInfor from "./DisplayInfor";
class MyComponent extends React.Component {
 
  //JSX
  render() {
    return (
      <div>
        <UserInfor/>
        <br/>
        <DisplayInfor name="PROP" age="100"/>
      </div>
    );
  }
}
export default MyComponent;
