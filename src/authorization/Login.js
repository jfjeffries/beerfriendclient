import React, { Component } from "react";
import APIURL from '../helpers/environment'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        fetch(`${APIURL}/api/login`, {
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
        return (
            <div>
              <form onSubmit={this.handleSubmit} style={inputFormStyle}>
                <div>
                  <h3 style ={headerStyle}>Please Login</h3>
                </div>
                <div onSubmit={this.handleSubmit}>
                        <input type="text" name="email" placeholder="Email" required style={inputFieldStyle} onChange={this.handleChange}></input>
                </div>
                <div>
                        <input id="li_password" type="password" name="password" placeholder="Password" required onChange={this.handleChange} style={inputFieldStyle}></input>
                </div>
                <div><button style={buttonStyle}>Submit</button></div>
              </form>
            </div>
          );
        }
        
    
}
export default Login;

const inputFormStyle = {
    margin: 'auto',
    width: '25%',
    height: '12.5em',
    border: '.1em solid black',
    backgroundColor: 'black',
    borderRadius: '1em',
    marginTop: '5%',
    position: 'relative',
    minWidth:'300px'
  }
  const inputFieldStyle = {
    margin: '1em',
    padding: '.25em',
    marginLeft: '8.5%',
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
    display: 'inline-block',
    
  }