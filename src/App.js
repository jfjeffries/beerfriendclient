import React, { Component } from 'react';
import Auth from './authorization/Auth';
import Head from './homepage/Head';
import Homepage from './homepage/Homepage';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import FooterPage from './homepage/FooterPage'



class App extends Component {
  constructor(){
    super();
    this.state = {
      username:"",
      sessionToken: ''
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) { 
      this.setState({ sessionToken: token });
    }
}
setUser = (x) => {
  this.setState({
    username:x
  })
}
setSessionState = (token) => {
  localStorage.setItem('token', token);
  this.setState({ sessionToken: token });
}

logout = () => {
  this.setState({ 
    sessionToken: '', 
  });
  localStorage.clear();
}

protectedViews = () => {
  if (this.state.sessionToken === localStorage.getItem('token')) {
    return (
      <Switch>
        <Route path='/'>
          <Homepage sessionToken={this.state.sessionToken} />
        </Route>
      </Switch>
    )
  } else {
    return (
      <Route path="/" >
        <Auth setToken={this.setSessionState} setUser={this.setUser} username={this.state.username}/>
      </Route>
    )
  }
}

  render() {
    return (
      <Router>
        <div style={mainDivStyle}>
          <Head clickLogout={this.logout} username={this.state.username}/>
          {this.protectedViews()}

          <div>
            <FooterPage />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

const mainDivStyle={
    margin:'0',
    width:'100%',
    height:'100%',
    backgroundColor: 'gray',
    backgroundSize:'cover',
    // position:'absolute',
    // maxHeight:'1200px'
}
