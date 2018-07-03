import React, {Component} from 'react'
import { Button, Form } from 'reactstrap'
import APIURL from '../helpers/environment'

class UpdateForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            myrating:null
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

handleSubmit = (event) => {
    event.preventDefault();
    this.ratingUpdate();
}

    handleKeyUp = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                <input type="text"  name="myrating" id="myrating" onKeyUp={this.handleKeyUp} placeholder="Update Rating"/>
                <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default UpdateForm