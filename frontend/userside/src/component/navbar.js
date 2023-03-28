import React from "react"
import {Link} from 'react-router-dom'
import Media from "./media"
import "./navbar.css"
export default class Navbar extends React.Component{
    render(){
        return(
            <switch>
                <div>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container">
                            <Link className="navbar-brand" to="/"><Media value image="logo-white.png" width="201px" height="48px"/></Link>
                            <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/packages">Packages</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/transactions">Transactions</Link>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </switch>
        )
    }
}