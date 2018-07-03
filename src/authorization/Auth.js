import React from 'react';
import { Row, Col } from 'reactstrap';
import Signup from './Signup';
import Login from './Login'

const Auth = (props) => {
    return (
        <div style = {wrapper}>
            <h1 style = {title}>Welcome to the Beer Drinker's Helper!!</h1>
            <Row>
                <Col xs="2" sm="4">
                    <div><Signup setToken={props.setToken} setUser={props.setUser} /></div>  
                </Col>
            </Row>
            <Row>
                <Col xs="2" sm="4">
                    <div><Login setToken={props.setToken} setUser={props.setUser} /></div>
                </Col>
            </Row>
        </div>
    )
}
export default Auth;

const wrapper={
    backgroundColor: 'gray',
    height: '100%',
    width: '100%',
    background: 'stretch',
    textAlign: 'center',
    margin: '0',
    minHeight: '100%',
    position: 'fixed',
    display: 'block'
  }

  const title={
      margin:'auto',
      color: 'white',
      marginTop:'2.5%'

  }