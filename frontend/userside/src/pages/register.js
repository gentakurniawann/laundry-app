import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Media from "../component/media"
import "./styles/register.css"

export default class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            name: "",
            phone: "",
            address: "",
            image: null,
            jenis_kelamin: "",
            username: "",
            password: "",
            token: ""
        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else{
            window.location = "/login"
        }
    }
    headerConfig = () =>{
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    handleRegister = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("name", this.state.name)
        form.append("phone", this.state.phone)
        form.append("address", this.state.address)
        form.append("image", this.state.image)
        form.append("jenis_kelamin", this.state.jenis_kelamin)
        form.append("username", this.state.username)
        form.append("password", this.state.password)

        // console.log(this.state.image)

        let url= "http://localhost:8000/customer"
        axios.post(url, form)
            .then(res => {
                console.log(res)
                window.location = "/login"
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    render(){
        return(
            <div className="register">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <div className="form-register">
                                <div className="row justify-content-center">
                                    <div className="col-5">
                                        <Media value image="logo.png" width="201px" height="48px"/>
                                    </div>
                                    <form onSubmit={e => this.handleRegister(e)}>
                                        <div className="row">
                                            <div className="col">
                                                <div className="name">
                                                    <label className="form-label">Name :</label>
                                                    <input type="text" className="form-control" name="name" placeholder="Masukkan nama" onChange={this.handleChange} value={this.state.name}/>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="gender">
                                                    <label className="form-label">Gender :</label>
                                                    <select name="jenis_kelamin" className="form-control" onChange={this.handleChange} value={this.state.jenis_kelamin}>
                                                        <option></option>
                                                        <option value="L">Laki-laki</option>
                                                        <option value="P">Perempuan</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="phone">
                                            <label className="form-label">phone :</label>
                                            <input type="text" className="form-control" name="phone" placeholder="Masukkan No.Telp" onChange={this.handleChange} value={this.state.phone}/>
                                        </div>
                                        <div className="address">
                                            <label className="form-label">address :</label>
                                            <textarea className="form-control"  rows="4" name="address" placeholder="Masukkan Alamat" onChange={this.handleChange} value={this.state.address}/>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="username">
                                                    <label className="form-label">Username :</label>
                                                    <input type="text" className="form-control" name="username" placeholder="Masukkan Username" onChange={this.handleChange} value={this.state.username}/>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="password">
                                                    <label className="form-label">Password :</label>
                                                    <input type="password" name="password" className="form-control" placeholder="*****" onChange={this.handleChange} value={this.state.password} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="image">
                                            <label className="form-label">Image :</label>
                                            <input type="file" name="image" className="form-control" placeholder="insert image" onChange={this.handleFile}/>
                                        </div>
                                        <button type="submit" className="btn btn-register">Register</button>
                                    </form>
                                    <p>Back to <Link to="/login">Login</Link></p>
                                    <p className="text-center copyright">All Right Reserved © 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 