import React from "react";

class DisplayInfor extends React.Component {
    state ={
        showList : true
    }

  render() {
    const { listUser } = this.props;
    return (
      <div>
        <span>
          <button onClick={() => this.setState({ showList: !this.state.showList })}>Show user infor</button>
        </span>
        {this.state.showList &&
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
        }
      </div>
    );
  }
}
export default DisplayInfor;
