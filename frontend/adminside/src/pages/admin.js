import React from "react";
import axios from "axios";
import Media from "../component/media";
import SidebarMain from "../component/sidebar/sidebarMain";
import "./styles/dataPage.css";
import AdminTable from "../component/table/adminTable";
import { Modal, Form } from "react-bootstrap";

export default class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      roleAdmin: "",
      adminName: "",
      filterAdmin: [],
      search: "",
      admin: [],
      outlet: [],
      id_admin: "",
      id_outlet: "",
      name: "",
      username: "",
      password: "",
      role: "",
      isModalOpen: false,
      action: "",
    };
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token");
    } else {
      window.location = "/login";
    }
  }
  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false
    })
  };

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      name: "",
      id_outlet: "",
      username: "",
      password: "",
      role: "",
      action: "insert"
    })
  }

  handleEdit = (selectedItem) => {
    this.setState({
        isModalOpen: true,
        id_admin: selectedItem.id_admin,
        id_outlet: selectedItem.id_outlet,
        name: selectedItem.name,
        username: selectedItem.username,
        password: "",
        role: selectedItem.role,
        action: "update"
    })
  }

  handleDelete = (id_admin) => {
    let url = "http://localhost:8000/admin/" + id_admin

    if(window.confirm("Are you sure to delete this data ?")){
        axios.delete(url, this.headerConfig())
        .then(res => {
            console.log(res.message)
            this.getAdmin()
        })
        .catch(err => {
            console.log(err.message)
        })
    }
  }

  handleSave = (e) => {
    e.preventDefault()
    let data = {
        name: this.state.name,
        id_outlet: this.state.id_outlet,
        username: this.state.username,
        password: this.state.password,
        role: this.state.role
    }
    let url = ""
    if(this.state.action === "insert"){
        url = "http://localhost:8000/admin"
        // panggil api backend
        axios.post(url, data, this.headerConfig())
        .then(res => {
            this.getAdmin()
            this.handleClose()
        })
        .catch(err => {
            console.log(err.message)
        })
    }else if(this.state.action === "update"){
        url = "http://localhost:8000/admin/" + this.state.id_admin
        axios.put(url, data, this.headerConfig())
        .then(res => {
            this.getAdmin()
            this.handleClose()
        })
        .catch(err => {
            console.log(err.message)
        })
    }
  }

  search = (e) => {
    // console.log('search')
    if (e.keyCode === 13) {
        let search = this.state.search.toLowerCase();
        let result = this.state.admin.filter(item => {
          return item.outlets.name.toLowerCase().includes(search) || 
          item.name.toLowerCase().includes(search) || 
          item.username.toString().includes(search) ||
          item.role.toString().includes(search)
        })
        console.log(result)
        if(this.state.admin.length <= 1){
          this.getAdmin()
        }else{
          this.setState({
            admin: result
          })
        }
    }
  }
  getAdmin = () => {
    let admin = localStorage.getItem("name");
    let url = "http://localhost:8000/admin";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          adminName: admin,
          admin: res.data.admin,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  getRoleAdmin = () => {
    let role = localStorage.getItem("role");
    let url = "http://localhost:8000/admin";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          roleAdmin: role,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  getOutlet = () => {
    let url = "http://localhost:8000/outlet"
    axios.get(url, this.headerConfig())
    .then(res => {
        this.setState({
            outlet: res.data.outlet
        })
    })
    .catch(err => {
        console.log(err.message)
    })
    console.log(this.state.outlet)
  }
  componentDidMount = () => {
    this.getRoleAdmin();
    this.getAdmin();
    this.getOutlet();
  };
  render() {
    if(this.state.roleAdmin === "owner"){
      return(
        <div className="dataPage">
          <SidebarMain/>
          <div className="container">
            <div className="content-header d-flex align-items-center justify-content-between">
              <h1>Admin</h1>  
              <div className="profile d-flex align-items-center">
                <div className="icon">
                  <Media
                    value
                    image="icon-profile.svg"
                    alt="icon-profile.svg"
                  />
                </div>
                <p>{this.state.adminName}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <input className="form-control form-control-lg" type="text" name="search" placeholder="Search" aria-label=".form-control-lg" onChange={this.handleChange} onKeyUp={e => this.search(e)} style={{width: '272px'}}/>
                    <div className="my-2" style={{marginLeft: '-48px',}}>
                      <Media
                        value
                        image="icon-search.svg"
                        alt="icon-search.svg"
                      />
                    </div>
                  </div>
                  <button className="btn btn-md btn-add" onClick={()=>this.handleAdd()}>
                      <span className="me-1">
                      <Media
                        value
                        image="icon-add.svg"
                        alt="icon-add.svg"
                      />
                      </span>
                      Add Data
                  </button> 
                </div>
                <div className="table-responsive">
                  <table className="table mt-4">
                    <thead>
                      <tr>
                          <th scope="col">NO</th>
                          <th scope="col">OUTLET</th>
                          <th scope="col">NAME</th>
                          <th scope="col">USERNAME</th>
                          <th scope="col">ROLE</th>
                          <th scope="col">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.admin.map((item, index) => {
                        return(
                          <AdminTable
                          key={index}
                          no= {index+1}
                          outletName={item.outlets.name}
                          name= {item.name}
                          username= {item.username}
                          role= {item.role}
                          onEdit= {()=>this.handleEdit(item)}
                          onDelete = {()=>this.handleDelete(item.id_admin)}
                        />
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Modal */}
          <Modal className="modal" show={this.state.isModalOpen} onHide={this.handleClose}>
            <Modal.Header className="modal-header" closeButton>
              {this.state.action === "insert" ? <Modal.Title className="modalTitle">Input Data Admin</Modal.Title> : <Modal.Title className="modalTitle">Edit Data Admin</Modal.Title>}
            </Modal.Header>
            <Form onSubmit={e => this.handleSave(e)}>
              <Modal.Body className="modal-body">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="form-label">Name</Form.Label>
                  <Form.Control type="text" className="form-control" name="name" placeholder="Insert Name" value={this.state.name} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="outlet">
                  <Form.Label className="form-label">Outlet</Form.Label>
                  <Form.Select aria-label="Default select example" className="form-control" name="id_outlet" onChange={this.handleChange}>
                    <option>Select Outlet</option>
                    {this.state.outlet.map((item,index) => {
                      if(item.id_outlet === this.state.id_outlet){
                        let selected= true
                        return(
                          <option value={item.id_outlet} selected={selected}>{item.name}</option>
                        )
                      }else{
                        let selected= false
                        return(
                          <option value={item.id_outlet} selected={selected}>{item.name}</option>
                        )
                      }
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="role">
                  <Form.Label className="form-label">Role</Form.Label>
                  <Form.Select aria-label="Default select example" className="form-control" name="role" onChange={this.handleChange}>
                    <option>Select Role</option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                    <option value="cashier">Cashier</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="form-label">Username</Form.Label>
                  <Form.Control type="text" name="username" className="form-control" placeholder="Insert UserName" value={this.state.username} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control type="password" name="password" className="form-control" placeholder="Insert Password" onChange={this.handleChange}/>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer className="modal-footer">
                <button className="btn btn-md btn-closes btn-secondary" onClick={this.handleClose}>Close</button>
                <button className="btn btn-md btn-submit" type="submit">Save</button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      )
    }
  }
}
