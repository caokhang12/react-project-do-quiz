import React from 'react';
class MyComponent extends React.Component{
    state ={
        name : 'KhangCao',
        email: 'Khang@it.edu.vn',
        age : 21
    }
    //JSX
    render(){
        return(
            <div>
                <h1>Hello World From MyComponent</h1>
                <p>name = {this.state.name}</p>
            </div>
        );
    }
}
export default MyComponent;