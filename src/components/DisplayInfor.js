import React from "react";

class DisplayInfor extends React.Component {
    render() {
        const { name, age } = this.props
        return (
            <div>
                <h3>Hello!!! My name is {name}</h3>
                <h4>I'm {age} years old</h4>
            </div>
        );
    }
}
export default DisplayInfor