import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Navbar extends Component {
    render() {
        return (
            <nav className="navbar" style={{backgroundColor: "#E18081"}}> 
                <h4 className="nav-item">
                    <Link to="/">Home</Link>
                </h4>
                <ul className="nav-item">
                    <li style={ {cursor: "pointer", fontSize: '30px'} } >&#128465;</li>
                </ul>
            </nav>
        )
    }
}

export default Navbar
