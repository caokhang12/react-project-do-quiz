import React from "react";
import "./DisplayInfor.scss";

class DisplayInfor extends React.Component {
  state = {
    showList: true,
  };

  render() {
    const { listUser } = this.props;
    return (
      <div className="display-infor">
        <span>
          <button
            onClick={() => this.setState({ showList: !this.state.showList })}
          >
            {this.state.showList ? "Hide List" : "Show List"}
          </button>
        </span>
        {this.state.showList && (
          <div>
            {listUser.map((user) => {
              return (
                <div className={user.age < 18 ? "green" : "red"} key={user.id}>
                  <p>Name: {user.name}</p>
                  <p>Age: {user.age}</p>
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
