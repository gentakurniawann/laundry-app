import React from "react";
import axios from "axios";
import Media from "../component/media";
import SidebarMain from "../component/sidebar/sidebarMain";
import "./styles/dataPage.css";
import OutletTable from "../component/table/outletTable";

export default class Outlet extends React.Component {
  constructor() {
    super();
    this.state = {
      roleAdmin: "",
      adminName: "",
      outlet: [],
      id_outlet: "",
      name:"",
      address: "",
      phone: "",
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
      name:"",
      address: "",
      phone: "",
      action: "insert"
    })
  }

  handleEdit = (selectedItem) => {
    this.setState({
      isModalOpen: true,
      id_outlet: selectedItem.id_outlet,
      name: selectedItem.name,
      address: selectedItem.address,
      phone: selectedItem.phone,
      action: "update"
    })
  }

  handleDelete = (id_outlet) => {
    let url = "http://localhost:8000/outlet/" + id_outlet

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
          adminName: admin
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
    console.log(this.state.roleAdmin);
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
              <h1>Outlet</h1>  
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
                    <input className="form-control form-control-lg" type="text" placeholder="Search" aria-label=".form-control-lg example" style={{width: '272px'}}/>
                    <div className="my-2" style={{marginLeft: '-48px',}}>
                      <Media
                        value
                        image="icon-search.svg"
                        alt="icon-search.svg"
                      />
                    </div>
                  </div>
                  <button className="btn btn-md btn-add">
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
                  <table class="table mt-4">
                    <thead>
                      <tr>
                          <th scope="col">NO</th>
                          <th scope="col">NAME</th>
                          <th scope="col">ADDRESS</th>
                          <th scope="col">PHONE</th>
                          <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.outlet.map((item, index) => {
                        return(
                          <OutletTable
                          key={index}
                          no= {index+1}
                          name= {item.name}
                          address= {item.address}
                          phone= {item.phone}
                        />
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
