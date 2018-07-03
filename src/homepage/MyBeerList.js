import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UpdateForm from './UpdateForm'
import APIURL from '../helpers/environment'

class MyBeerList extends Component {
    constructor(props){
        super(props)
        this.toggle=this.toggle.bind(this)
        this.toggle2=this.toggle2.bind(this)
        this.state={
            modal: false,
            modal2: false
        }
    }

    deleteBeer = (event) => {
        console.log(this.props.beer.id)
        fetch(`${APIURL}/api/beerhad/delete/${this.props.beer.id}`, {
          method: 'DELETE',
          body: JSON.stringify({ mybeershad: { id: this.props.beer.id } }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          })
        })
          .then((res) => this.props.fetchMyBeers()) 
      }

    toggle (){
        this.setState({ modal: !this.state.modal})
    }
    toggle2 (){
        this.setState({ modal2: !this.state.modal2})
    }
    render(){
        const beer = this.props.beer
    return(
            <div>
                <Button style={buttonStyle} onClick={this.toggle}>{beer.beername}</Button>
                <Modal style={modalStyle}isOpen={this.state.modal}>
                    <hr/>
                    <ModalHeader style={headerStyle}>
                    <Button style={closeButton} onClick={this.toggle}>X</Button>
                        <h2>{beer.beername}</h2>

                    </ModalHeader>
                    <hr/>
                        <ModalBody>
                            <p>My rating: {beer.myrating}</p>
                        </ModalBody>
                        <ModalFooter>
                            
                            <Button style={buttonStyle} onClick={this.toggle2}>Update</Button>
                            <Button style={buttonStyle} onClick={this.deleteBeer}>Remove</Button>
                            <Modal isOpen={this.state.modal2}>
                                <ModalBody>
                                    <UpdateForm toggle={this.toggle} myRating={beer.myrating} beername={beer.beername} fetchMyBeers={this.props.fetchMyBeers}/>
                                </ModalBody>
                            </Modal>
                        </ModalFooter>
                </Modal>
            </div>
        )  
    }
}

export default MyBeerList;

const buttonStyle = {
    margin: 'auto',
    borderRadius: '.5em',
    width: '10em',
    display: 'block',
    marginTop:'.5em',
    marginBotton:'.5em',
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
    marginBottom:'4em',
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

const headerStyle = {
    display:'inline',

}