import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, Label, Input, Row } from 'reactstrap';
import APIURL from '../helpers/environment'

class AddBeer extends Component {
    constructor(props){
        super(props)
        this.state={
            beername:"",
            brewery:"",
            brewedin:"",
            styleof:"",
            abv:null,
            modal:false,
        }
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal})
    }

    handleKeyUp = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
        fetch(`${APIURL}/api/log/create`, {
            method: 'POST',
            body: JSON.stringify({masterbeerlist:this.state}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
                })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.fetchBeerList()
            this.toggle()
        })
    }

    render(){
        return(
            <div>
                <p style={pStyle2}>Don't see the beer you're looking for? Add it here!</p>
                <Button style={buttonStyle} onClick={this.toggle}>Add Beer</Button>
                <Modal style={modalStyle} isOpen={this.state.modal}>
                    <hr/>
                    <ModalHeader>
                    <Button style={closeButton} onClick={this.toggle}>X</Button>
                        <h2>Please enter as much as you can.</h2>

                    </ModalHeader>
                    <hr/>
                    <ModalBody>
                        <Form style={formStyle} onSubmit={this.handleSubmit}>
                            <Row style={rowStyle}>
                                <Label style={labelStyle} for="beername">Beer name:</Label>
                                <Input style={inputFieldStyle} type="text" name="beername" onKeyUp={this.handleKeyUp}/>
                            </Row>
                            <br/>
                            <Row style={rowStyle}>
                                <Label style={labelStyle} for="brewery">Brewery:</Label>
                                <Input style={inputFieldStyle} type="text" name="brewery" onKeyUp={this.handleKeyUp}/>
                            </Row>
                            <br/>
                            <Row style={rowStyle}>
                                <Label style={labelStyle} for="brewedin:">Location:</Label>
                                <Input style={inputFieldStyle} type="text" name="brewedin" onKeyUp={this.handleKeyUp}/>
                            </Row>
                            <br/>
                            <Row style={rowStyle}>
                                <Label style={labelStyle} for="styleof">Style:</Label>
                                <Input style={inputFieldStyle} type="text" name="styleof" onKeyUp={this.handleKeyUp}/>
                            </Row>
                            <br/>
                            <Row style={rowStyle}>
                                <Label style={labelStyle} for="abv">ABV:</Label>
                                <Input style={inputFieldStyle} type="text" name="abv" onKeyUp={this.handleKeyUp}/>
                            </Row>
                            <br/>
                            <div><Button style={submitStyle} type="submit">Submit</Button></div>
                            
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default AddBeer


const buttonStyle = {
    margin: 'auto',
    borderRadius: '.5em',
    width: '10em',
    display: 'block',
    marginTop:'.5em',
    marginBotton:'.5em',
    backgroundColor:'#0a4566',
    color:'white',
    border:'none'
  }

const modalStyle = {
    minWidth:'280px',
    width:'280px',
    backgroundColor:'black',
    color:'white',
    margin:'auto',
    padding:'1em',
    borderRadius:'.5em',
    zIndex:'500',
    position:'fixed',
    top:'50%',
    left:'50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '.5em .5em .25em #112442',
}

const closeButton = {
    float:'right',
    width:'2em',
    marginBotton:'2em',
}

const inputFieldStyle = {
    float:'left',
    padding: '.25em',
    borderRadius: '.5em',
    width: '14em',
    height:'1.1em',
    marginTop:'1em'
}

const formStyle = {
    margin:'0',
}

const labelStyle = {
    display:'inline-block',
    width:'40%',
    marginTop:'1em',
}
const rowStyle={
    display:'inline-block',
}
const submitStyle = {
    margin: 'auto',
    borderRadius: '.5em',
    width: '10em',
    display: 'block',
    marginTop:'2em',
    marginBotton:'1em',
}
const pStyle2 = {
    color:'white',
    fontSize:'150%',
    fontWeight:'heavy',
}