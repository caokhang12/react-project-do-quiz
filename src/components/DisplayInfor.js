import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

class DisplayInfor extends React.Component {
  state = {
    showList: true,
  }; 


  componentDidMount() {
      console.log("Mounted");
  }
  componentDidUpdate(prevProps, prevState) {
      console.log("Update",this.props,prevProps);
      if(this.props.listUser !== prevProps.listUser){
        if(this.props.listUser.length === 0){
          alert("List User is empty");
        }
      }
  }

  render() {
    const { listUser } = this.props;
    return (
      <div className="display-infor">
        <img src={logo} className="App-logo" alt="logo" />
        <br/>
        <button
          onClick={() => this.setState({ showList: !this.state.showList })}
        >
          {this.state.showList ? "Hide List" : "Show List"}
        </button>
        {this.state.showList && (
          <div>
            {listUser.map((user) => {
              return (
                <div className={user.age < 18 ? "green" : "red"} key={user.id}>
                  <p>Name: {user.name}</p>
                  <p>Age: {user.age}</p>
                  <button onClick={()=> this.props.DeleteUser(user.id)}>Delete</button>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default DisplayInfor;
