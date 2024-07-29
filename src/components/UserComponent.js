import React from "react";

class UserInfor extends React.Component {
    state = {
        name: "KhangCao",
        email: "Khang@it.edu.vn",
        age: 21,
      };
    
      handleOnChangeName = (event) => {
        this.setState({
          name: event.target.value,
        });
      };
      handleOnChangeAge = (event) => {
        this.setState({
          age: event.target.value,
        });
      };
    
      handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
      };
    render(){
        return (
            <div>
                    <h1>Hello World From MyComponent</h1>
        <p>
          Name: {this.state.name} Age: {this.state.age}
        </p>
        <button
          onClick={(event) => {
            this.handleClick(event);
          }}
        >
          Click button
        </button>
        <button onMouseOver={this.handleHover}>Hover button</button>
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}
        >
            <label>Name: </label>
          <input
            type="text"
            value={this.state.name}
            onChange={(event) => {
              this.handleOnChangeName(event);
            }}
          />
          <br/>
            <label>Age: </label>
           <input
            type="text"
            value={this.state.age}
            onChange={(event) => {
              this.handleOnChangeAge(event);
            }}
          />
          <button>Submit</button>
        </form>
            </div>
        );
    }
};

export default UserInfor