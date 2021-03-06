import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import APIURL from '../helpers/environment'

class BeerResults extends Component {

    constructor(props){
        super(props)
        this.toggle=this.toggle.bind(this)
        this.state={
            modal:false,
            myrating:null,
        }
    }

    toggle (){
        this.setState({ modal: !this.state.modal})
    }
    addThisBeer = () => {
        fetch(`${APIURL}/api/beerhad/addbeer`, {
            method: 'POST',
            body: JSON.stringify({ mybeershad:{
                beername:this.props.beer.beername,
                myrating:this.state.myrating,
                hadit:true
            } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            })
        })
        .then((res) => res.json())
        .then((logData) => {
            this.props.fetchMyBeers();
            this.toggle();
        })
    }
render(){
        let beer = this.props.beer
        return (
                <div id="searchedList">
                    <Button style={buttonStyle} onClick={this.toggle}>{beer.beername}</Button>
                    <Modal style={modalStyle} isOpen={this.state.modal}>
                        <hr />   
                        <ModalHeader style={headerStyle}>
                        <Button style={closeButton} onClick={this.toggle}>X</Button>
                        <p style={hStyle}>{beer.beername}</p>
                        </ModalHeader>
                        <hr />
                            <ModalBody>
                                <p>Brewery: {beer.brewery}</p>
                                <p>Location: {beer.brewedin}</p>
                                <p>Style: {beer.styleof}</p>
                                <p>Rating: {beer.avgrating}</p>
                                <p>ABV: {beer.abv}</p>
                            </ModalBody>
                            <ModalFooter>
                            <input style={inputFieldStyle} type="text" name="myrating" onKeyUp={this.handleKeyUp} placeholder="rating 1-5"/>
                                <Button style={addButtonStyle} onClick={this.addThisBeer}>Add to my list</Button>
                                
                            </ModalFooter>
                    </Modal>
                </div>
        );
    }
}
export default BeerResults;


const buttonStyle = {
    margin: 'auto',
    borderRadius: '.5em',
    width: '10em',
    display: 'block',
    marginTop:'.5em',
    marginBotton:'.5em',
  }
const addButtonStyle = {
    margin: '.5em',
    borderRadius: '.5em',
    width: '8em',
    display: 'block',
    marginTop:'.5em',
    marginBotton:'5em',
    float:'right',
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
}

const hStyle = {
    color:'white',
    fontSize:'150%',
    fontWeight:'heavy',
    
}
const closeButton = {
    float:'right',
    width:'2em',
    marginBotton:'2em',
}

const inputFieldStyle = {
    margin: 'auto',
    padding: '.25em',
    marginLeft: '1em',
    borderRadius: '.5em',
    width: '8em',
    height:'1.1em',
  }
  const headerStyle = {
    display:'inline',
}