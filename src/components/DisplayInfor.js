import React, { useState } from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

// class DisplayInfor extends React.Component {
//   render() {
//     const { listUser } = this.props;
//     return (
//       <div className="display-infor">
//         {true && (
//           <div>
//             {listUser.map((user) => {
//               return (
//                 <div className={user.age < 18 ? "green" : "red"} key={user.id}>
//                   <p>Name: {user.name}</p>
//                   <p>Age: {user.age}</p>
//                   <button onClick={()=> this.props.DeleteUser(user.id)}>Delete</button>
//                   <hr />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfor = (props) => {
  const [showUserList,setShowList] = useState(true)
  const handleShowList = () => {
    setShowList(!showUserList)
  }

  const { listUser } = props;
  return (
    <div className="display-infor">
      <div>
        <span onClick={()=>handleShowList()}>
         <button> {showUserList ? 'Hide list' : 'Show list'}</button>
        </span>
      </div>
      {showUserList && (
        <div>
          {listUser.map((user) => {
            return (
              <div className={user.age < 18 ? "green" : "red"} key={user.id}>
                <p>Name: {user.name}</p>
                <p>Age: {user.age}</p>
                <button onClick={() => props.DeleteUser(user.id)}>
                  Delete
                </button>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayInfor;
