import React, { useEffect, useState } from "react";

// class UserInfor extends React.Component {
//   state = {
//     name: "",
//     id: "",
//     age: ""
//   };

//   handleOnChangeName = (event) => {
//     this.setState({
//       name: event.target.value,
//     });
//   };
//   handleOnChangeAge = (event) => {
//     this.setState({
//       age: event.target.value,
//     });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(this.state);
//     this.props.AddNewUser({
//       name: this.state.name,
//       age: this.state.age,
//       id : Math.ceil(Math.random()*1000).toString()
//     })
//   };
//   render() {
//     return (
//       <>
//         <h1 style={{ color: "cyan", backgroundColor: "black" }}>Hello World From MyComponent</h1>
//         <p>
//           Name: {this.state.name} Age: {this.state.age}
//         </p>
//         <form
//           onSubmit={(event) => {
//             this.handleSubmit(event);
//           }}
//         >
//           <label>Name: </label>
//           <input
//             type="text"
//             value={this.state.name}
//             onChange={(event) => {
//               this.handleOnChangeName(event);
//             }}
//           />
//           <br />
//           <label>Age: </label>
//           <input
//             type="text"
//             value={this.state.age}
//             onChange={(event) => {
//               this.handleOnChangeAge(event);
//             }}
//           />
//           <button>Submit</button>
//         </form>
//       </>
//     );
//   }
// }

const AddUserInfor = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setaddress] = useState("KhangIT");
  const handleOnChangeName = (event) => {
    console.log(event.target.name);
    setName(event.target.name);
  };
  const handleOnChangeAge = (event) => {
    console.log(event.target.age);

    setAge(event.target.age);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.AddNewUser({
      name: name,
      age: age,
      id: Math.ceil(Math.random() * 1000).toString(),
    });
  };

  useEffect(() => {
    setTimeout(() => {
      document.title = "Learn React";
    }, 4000);
  });
  return (
    <>
      <h1 style={{ color: "cyan", backgroundColor: "black" }}>
        Hello World From MyComponent
      </h1>
      <p>
        Name: {name} Age: {age}
      </p>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <br />
        <label>Age: </label>
        <input
          type="text"
          value={age}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default AddUserInfor;

