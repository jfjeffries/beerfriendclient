import React, {Component} from 'react'

import APIURL from '../helpers/environment'
import { Button, Modal, ModalHeader, ModalBody, Form } from 'reactstrap';

class UpdateForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            myrating:null,
            modal:true
        }
    }

componentWillMount = () => {
     window.addEventListener('keyup', this.handleKeyUp);
}
 
componentWillUnmount = () => {
     window.removeEventListener('keyup', this.handleKeyUp);
}

ratingUpdate = (rating) => {
    let updatedData = { mybeershad:{
        myrating:this.state.myrating
    }}

    console.log(updatedData)
    fetch(`${APIURL}/api/beerhad/update/${this.props.beername}`, {
         method: 'PUT',
         body: JSON.stringify(updatedData),
         headers: new Headers({
             'Content-Type': 'application/json',
             'Authorization': localStorage.getItem("token")
         })
     })
        .then((res) => {
        this.props.fetchMyBeers();
        this.props.toggle();
        })
}

toggle = () => {
    this.setState({ modal: !this.state.modal})
}

handleSubmit = (event) => {
    event.preventDefault();
    this.ratingUpdate();
    this.toggle();
}

    handleKeyUp = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render(){
        return(
            <div>
                <Modal style={modalStyle} isOpen={this.state.modal}>
                    <hr/>
                    <ModalHeader>
                        <Button style={closeButton} onClick={this.toggle}>X</Button>
                        <p style={hStyle}>Edit Rating</p>
                    </ModalHeader>
                    <hr/>
                    <ModalBody>
                <Form onSubmit={this.handleSubmit}>
                <input style={inputFieldStyle} type="text"  name="myrating" id="myrating" onKeyUp={this.handleKeyUp} placeholder="Update Rating"/>
                <Button style={buttonStyle} type="submit">Submit</Button>
                </Form>
                </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default UpdateForm

const buttonStyle = {
    margin: 'auto',
    borderRadius: '.5em',
    width: '6em',
    display: 'block',
    marginTop:'.5em',
    marginBotton:'.5em',
    float:'right'
  }

const modalStyle = {
    minWidth:'280px',
    width:'280px',
    maxHeight:'500px',
    backgroundColor:'black',
    color:'white',
    margin:'auto',
    padding:'1em',
    focusOutline:'none',
    borderRadius:'.5em',
    marginBotton:'4em',
    zIndex:'500',
    position:'fixed',
    top:'50%',
    left:'50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '.5em .5em .25em #112442',
    border:'2px solid white',
}

const hStyle = {
    fontWeight:'heavy',
    margin:'auto',
    width:'10em',
    fontSize:'150%',
}
const closeButton = {
    float:'right',
    width:'2em',
    marginBotton:'2em',
}

const inputFieldStyle = {
    margin: 'auto',
    padding: '.25em',
    borderRadius: '.5em',
    width: '8em',
    height:'1.1em',
  }