import React, { Component } from 'react'
import BeerList from './BeerList'
import { Container, Button } from 'reactstrap'
import SearchBeers from './SearchBeers';
import MyBeerList from './MyBeerList'
import AddBeer from './AddBeer'
import APIURL from '../helpers/environment'

class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            allBeers : [],
            myBeers : [],
            displayMyBeers: true,
            title : "View All Beers"
        }
    }
    
    componentDidMount(){
        this.fetchBeerList();
        this.fetchMyBeers();
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
        if (this.state.displayMyBeers === false){
            console.log(this.state.allBeers)
            return(
                <Container>
                    <div style={divStyle2}>
                        <hr />
                        <h4 style={hStyle}>All Beers</h4>
                        <hr/>
                    </div>
                 {Object.keys(this.state.allBeers).map((index, key) => 
                <BeerList key={key} beer={this.state.allBeers[index]} fetchBeerList={this.fetchBeerList} fetchMyBeers={this.fetchMyBeers}/>)}
                <hr />
            </Container>
            )
        }else{
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
        }
    }
    // addThisBeer = () => {
        
    // }
    setButton = () => {
        if (this.state.title === "View my beers"){
            return ("View all beers")
        }else{
            return ("View my beers")
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({displayMyBeers: !this.state.displayMyBeers})
            if(this.state.displayMyBeers){
                this.setState({title:"View My Beers"})
            }else{
                this.setState({title:"View All Beers"})
            }
        
    }
    render(){
        

        return(
            <div style={wrapper}>
                <SearchBeers fetchMyBeers={this.fetchMyBeers}/>
                <div>
                    <AddBeer fetchBeerList={this.fetchBeerList}/> 
                </div>
                <Button style={buttonStyle} onClick={this.handleSubmit}>{this.state.title}</Button>
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
}

const hStyle = {
    margin:'auto',
    color:'white',
}
const divStyle2={
    textAlign:'center',
}