import React from "react";

class DisplayInfor extends React.Component {
    render() {
        const { listUser } = this.props
        return (
            <div>
                {listUser.map((user)=>{
                    return(
                        <div key={user.id}>
                            <p>Name: {user.name}</p>
                            <p>Age: {user.age}</p>
                           <hr/>
                        </div>
                    )
                })}
            </div>
        );
    }
}
export default DisplayInfor