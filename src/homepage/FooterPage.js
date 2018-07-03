import React, { Component } from 'react'


class FooterPage extends Component {
    render(){
        return(
            <div style={footerStyle}><p style={pStyle}>&copy; Jon Jeffries</p></div>
        )
    }
}

export default FooterPage

const footerStyle = {
    width:'100%',
    height:'5em',
    color:'white',
    backgroundColor:'black',
}
const pStyle={
    marginLeft:'1.5em',
    marginTop:'10em',
    lineHeight:'4.5em',
    
}