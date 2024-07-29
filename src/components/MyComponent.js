import React from 'react';
class MyComponent extends React.Component{
    state ={
        name : 'KhangCao',
        email: 'Khang@it.edu.vn',
        age : 21
    }

    handleHover = (event) => {
        //console.log(`My age is hover ${this.state.age}`)
    }

    handleClick = (event) => {
        console.log('My name is ' + this.state.name)
        this.setState({
            name : 'Alex',
            age : Math.floor((Math.random()*100) + 1)
        })
    }
    //JSX
    render(){
        return(
            <div>
                <h1>Hello World From MyComponent</h1>
                <p>Name: {this.state.name} Age: {this.state.age}</p>
                <button onClick={(event) => {this.handleClick(event)}}>Click button</button>
                <button onMouseOver={this.handleHover}>Hover button</button>

            </div>
        );
    }
}
export default MyComponent;