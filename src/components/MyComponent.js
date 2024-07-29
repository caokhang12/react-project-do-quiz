import React from 'react';
class MyComponent extends React.Component{
    state ={
        name : 'KhangCao',
        email: 'Khang@it.edu.vn',
        age : 21
    }

    handleHover = (event) => {
        console.log('My name is hover')
    }

    handleClick = (event) => {
        console.log('My name is')
    }
    //JSX
    render(){
        return(
            <div>
                <h1>Hello World From MyComponent</h1>
                <p>name = {this.state.name}</p>
                <button onClick={this.handleClick}>Click button</button>
                <button onMouseOver={this.handleHover}>Hover button</button>

            </div>
        );
    }
}
export default MyComponent;