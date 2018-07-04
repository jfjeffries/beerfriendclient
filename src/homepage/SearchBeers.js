import React, {Component} from 'react';
import {Button, Row, Modal, ModalHeader, ModalBody } from 'reactstrap'
import BeerResults from './BeerResults'
import APIURL from '../helpers/environment'

class SearchBeers extends Component {
    constructor(props){
        super(props);
        this.state = {
            beers: [],
            searchTerm:"",
            modal:false
        }
    }
    componentWillMount = () => {
        window.addEventListener('keyup', this.handleChange);
   }
    
   componentWillUnmount = () => {
        window.removeEventListener('keyup', this.handleChange);
   }
    toggle2 = () => {
        if (!this.state.modal){
            this.setState({
                modal:true
            })
        }
    }
    toggle =()=>{
        this.setState({ modal: !this.state.modal, beers:[]})
        if(this.state.modal=false){
            
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // // this.setState({searchTerm:e.target.value})
        // console.log(this.state.searchTerm)
        // this.toggle();
        // fetch(`${APIURL}/api/log/getsome/${this.state.searchTerm}`,{
        //     method:'POST',
        //     body: JSON.stringify({ query:this.state.searchTerm }),
        //     headers: new Headers({
        //         'Content-Type':'application/JSON',
        //         'Authorization':localStorage.getItem("token")
        //     })
        // })
        // .then(response => {
        //     response.json().then(data => {
        //         console.log("data from server: ",data)
        //         // const beers = data.beers
        //         this.setState({beers:data})
        //     })
        // })  
        // .catch(err =>
        // console.log("Fetch error"))
        
    }

    handleChange = (event) => {
        // this.setState({[event.target.name]:event.target.value})
        event.preventDefault();
        event.stopPropagation();
        let search = document.getElementById("searchTerm").value
        console.log("target value: ",search)
        if(!this.state.modal){
            this.toggle();
        }
        if(!event.target.value){
            this.setState({modal:false})
        } else {
        event.preventDefault();
        fetch(`${APIURL}/api/log/getsome/${search}`,{
            method:'POST',
            body: JSON.stringify({ query:search }),
            headers: new Headers({
                'Content-Type':'application/JSON',
                'Authorization':localStorage.getItem("token")
            })
        })
        .then(response => {
            response.json().then(data => {
                console.log("data from server: ",data)
                // const beers = data.beers
                this.setState({beers:data})
            })
        })  
        .catch(err =>
        console.log("Fetch error"))
        }
    }

    displayBeers = function conditionalDisplay() {
        if(this.state.beers){
            return(
                Object.keys(this.state.beers).map((index, key) => 
                    <BeerResults key={key} beer = {this.state.beers[index]} fetchMyBeers={this.props.fetchMyBeers} toggle2={this.props.toggle}/>)
            )
        } else {
            return(
                <div></div>
            )
        }
    }

    render(){
        return(
            <div style={divStyle}>
                <Row>
                    <form style={inputFormStyle}onSubmit={this.handleSubmit} id="form" ref="input">
                        <input style={inputFieldStyle} onClick={this.toggle2} id="searchTerm" name="searchTerm"type="text" placeholder="Search a beer" required onKeyUp={this.handleChange}/>
                        <Button style={buttonStyle} type="submit" name="searchTerm">Submit</Button>
                    </form>
                </Row>
                <Modal isOpen={this.state.modal} style={modalStyle}>
                    <hr />
                    <ModalHeader>
                    <Button style={closeButton} onClick={this.toggle}>X</Button>
                            <p style={hStyle}>Beers</p>
                    </ModalHeader>
                    <hr />
                    <ModalBody>
                        {this.displayBeers()}
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default SearchBeers

const inputFormStyle = {
    margin: 'auto',
    width: '15em',
    height: '2em',
    backgroundColor: 'transparent',
    position: 'relative',
    top: '50%',
    transform: 'perspective(1px) translateY(25%)',
    minWidth:'300px',
  }

  const inputFieldStyle = {
    margin: 'auto',
    padding: '.25em',
    marginLeft: '1em',
    borderRadius: '.5em',
    width: '12em',
    height:'1.25em',
  }
  
  const buttonStyle = {
    borderRadius: '.5em',
    width: '5em',
    display: 'block',
    marginTop:'.5em',
    marginBotton:'.5em',
    float:'right',
    marginRight:'1em',
  }
  
  const divStyle={
      margin:'1em'
  }

  const containerStyle={
    backgroundColor:'black',
    borderRadius:'.5em',
    width:'280px',
    margin:'auto',
    padding:'1em',
    marginBottom:'4em',
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

const closeButton = {
    float:'right',
    width:'2em',
    marginBotton:'2em',
}

const hStyle = {
    fontWeight:'heavy',
    margin:'auto',
    width:'10em',
    fontSize:'150%'
}


// filterItems = (search) =>{
            
//     (this.props.allBeers).map((filt)=>{
//     let beerValuesArray = Object.values(filt)

//      beerValuesArray.filter((filtered)=>{
//          if(typeof filtered==='string' && (filtered.toLowerCase())===(search.toLowerCase())){
//         let newBeer = this.state.beers.concat(filt)
//         console.log("filt: ",filt)
//         this.setState({
//             beers:newBeer
//         })
//         console.log("beers: ",this.state.beers)
//         }
//     })
// })
// }