import React, { Component } from "react";
import APIURL from '../helpers/environment'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:'',
            loginError:''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value,
        })
        localStorage.setItem('email', this.state.email)
    }

    handleSubmit = (event) => {
        while(this.state.loginError){
            this.setState({
                loginError:""
            })
        }
        if (this.state.username === ""){
            this.setState({
                loginError:<p>Please enter your email</p>})
                event.preventDefault();
            return;
        }
        
        fetch(`${APIURL}/api/createuser/`, {
            method: 'POST',
            body: JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.setToken(data.sessionToken)
            this.props.setUser(this.state.email)
            localStorage.setItem('email', this.state.email)
        })
        event.preventDefault()
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit} style={inputFormStyle}>
                    <div>
                        <h3 style ={headerStyle}>Please Signup</h3>
                    </div>
                    <div>
                        <input type="text" name="email" placeholder="Email" required style={inputFieldStyle} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" required style={inputFieldStyle} onChange={this.handleChange}></input>
                    </div>
                    <div><button style={buttonStyle}>Submit</button></div>
                </form>
            </div>
        )
    }
}

export default Signup;

const inputFormStyle = {
    margin: 'auto',
    width: '25%',
    height: '12.5em',
    border: '.1em solid black',
    backgroundColor: 'black',
    borderRadius: '1em',
    marginTop: '5%',
    minWidth:'300px'
  }
  const inputFieldStyle = {
    margin: '1em',
    padding: '.25em',
    marginLeft: '2em',
    borderRadius: '.5em',
    width: '83%',
    
  }
  const headerStyle = {
    margin: '.5em',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'gray',
    borderRadius: '.5em',
  }
  const buttonStyle = {
    float: 'right',
    margin: '1.7em',
    borderRadius: '.5em',
    width: '6em',
    display: 'inline-block'
  }