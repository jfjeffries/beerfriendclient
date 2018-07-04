import React, { Component } from 'react'
import BeerList from './BeerList'
import { Container, Button } from 'reactstrap'
import MyBeerList from './MyBeerList'
import APIURL from '../helpers/environment'
import BeerResults from './BeerResults'
import AddBeer from './AddBeer'

class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            allBeers : [],
            myBeers : [],
            displayMyBeers: 1,
            title : "View All Beers",
            searchedBeers: [],
            searchTerm:"",
        }
    }

    componentDidMount(){
        this.fetchBeerList();
        this.fetchMyBeers();
    }

    handleChange = (event) => {
        this.setState({displayMyBeers:3})
        event.preventDefault();
        let search = document.getElementById("searchTerm").value
        
        fetch(`${APIURL}/api/log/getsome/${search}`,{
            method:'POST',
            body: JSON.stringify({ query:search }),
            headers: new Headers({
                'Content-Type':'application/JSON',
                'Authorization':localStorage.getItem("token")
            })
        })
        .then(response => {
            response.json().then(data =>
                this.setState({searchedBeers:data})
            )
        })  
        .catch(err =>
        console.log("Fetch error"))
        
    }

    fetchBeerList = () => {
        fetch(`${APIURL}/api/log/getall`, {  //get all beers
            method:'GET',
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem("token")
            })
        })
        .then((res) => res.json())
        .then((logData) => {
            return this.setState({ allBeers: logData})
        })
    }

    fetchMyBeers = () => {
        fetch(`${APIURL}/api/beerhad/getallmybeers`, {  //get all my beers
            method:'GET',
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem("token")
            })
        })
        .then((res) => res.json())
        .then((logData) => {
            return this.setState({ myBeers: logData})
        })
    }
    
    handleDisplay = () => {
        if (this.state.displayMyBeers===1) {
            return(
                <Container>
                    <div style={divStyle2}>
                        <hr />
                        <h4 style={hStyle}>My Beers</h4>
                        <hr/>
                    </div>
                    {Object.keys(this.state.myBeers).map((index, key) => 
                    <MyBeerList key={key} beer={this.state.myBeers[index]} fetchBeerList={this.fetchBeerList} fetchMyBeers={this.fetchMyBeers}/>)}
                    <hr/>
                </Container>
            )
        } else if (this.state.displayMyBeers===2) {
            return(
                <Container>
                    <div style={divStyle2}>
                        <hr />
                        <h4 style={hStyle}>All Beers</h4>
                        <hr/>
                    </div>
                    {Object.keys(this.state.allBeers).map((index, key) => 
                    <BeerList key={key} beer={this.state.allBeers[index]} fetchMyBeers={this.fetchMyBeers} />)}
                    <hr />
                </Container>
            )
        } else {
            return(
                <Container>
                    <div style={divStyle2}>
                        <hr />
                        <h4 style={hStyle}>Searched Beers</h4>
                        <hr/>
                    </div>
                    {this.displayBeers()}
                    <hr />
                </Container>
            )
        }
    }

    displayBeers = function conditionalDisplay() {
        if(this.state.searchedBeers){
            return(
                Object.keys(this.state.searchedBeers).map((index, key) => 
                    <BeerResults key={key} beer = {this.state.searchedBeers[index]} fetchMyBeers={this.fetchMyBeers} />)
            )
        } else {
            return(
                <div></div>
            )
        }
    }

    handleTitle = () => {
        if (this.state.displayMyBeers === 1 ){
            return("View All Beers")
        } else if (this.state.displayMyBeers === 2){
            return("View My Beers")
        } else {
            return("View My Beers")
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
            if(this.state.displayMyBeers===1){
                this.setState({displayMyBeers:2})
            }else if (this.state.displayMyBeers===2){
                this.setState({displayMyBeers:1})
            }else if (this.state.displayMyBeers===3){
                this.setState({displayMyBeers:1})
            }
        
    }

    setTo3 = (event) => {
        event.preventDefault();
        this.setState({displayMyBeers:3})
    }

    render(){
        return(
            <div style={wrapper}>
                <form style={inputFormStyle}onSubmit={this.handleSubmit} id="form" ref="input">
                    <input style={inputFieldStyle} onClick={this.setTo3} id="searchTerm" name="searchTerm"type="text" placeholder="Search a beer" required onKeyUp={this.handleChange}/>
                        
                </form>
                <div>
                    <AddBeer fetchBeerList={this.fetchBeerList}/> 
                </div>
                <Button style={buttonStyle} onClick={this.handleSubmit}>{this.handleTitle()}</Button>
                <div style={divStyle}>
                    {this.handleDisplay()}
                </div>
                
            </div>
        )
    }
}

export default Homepage;

const buttonStyle = {
  margin: '1.7em',
  borderRadius: '.5em',
  width: '10em',
  backgroundColor:'#0a4566',
  color:'white',
  border:'none'
}

const wrapper={
  width: '100%',
  background: 'stretch',
  textAlign: 'center',
  margin: '0',
  padding: '0',
  border:'0',
}

const divStyle={
  backgroundColor:'black',
  borderRadius:'.5em',
  width:'280px',
  margin:'auto',
  padding:'1em',
  marginBottom:'4em',
  minHeight:'12em',
  maxHeight:'50em'
}

const hStyle = {
    margin:'auto',
    color:'white',
}
const divStyle2={
    textAlign:'center',
}

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