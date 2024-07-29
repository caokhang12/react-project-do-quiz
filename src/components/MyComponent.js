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

    handleOnChange = (event) => {
        this.setState({
            name : event.target.value
        })
        console.log(event.target.value)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)

    }
    //JSX
    render(){
        return(
            <div>
                <h1>Hello World From MyComponent</h1>
                <p>Name: {this.state.name} Age: {this.state.age}</p>
                <button onClick={(event) => {this.handleClick(event)}}>Click button</button>
                <button onMouseOver={this.handleHover}>Hover button</button>
                <form onSubmit={(event) => {this.handleSubmit(event)}}>
                    <input type="text" onChange={(event) => {this.handleOnChange(event)}}/>
                    <button>Submit</button>
                </form>


            </div>
        );
    }
}
export default MyComponent;