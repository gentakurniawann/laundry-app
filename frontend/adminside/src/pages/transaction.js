import React from "react";
import axios from "axios";
import Media from "../component/media";
import SidebarMain from "../component/sidebar/sidebarMain";
import "./styles/dataPage.css";

export default class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      roleAdmin: "",
      adminName: "",
      transaction: [],
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
  getTransaction = () => {
    let url = "http://localhost:8000/transaksi"
    axios.get(url, this.headerConfig())
    .then(res => {
        this.setState({
            transaction: res.data.transaksi
        })
    })
    .catch(err => {
        console.log(err.message)
    })
  }
  componentDidMount = () => {
    this.getRoleAdmin();
    this.getAdmin();
    this.getTransaction();
  };
  render() {
    if(this.state.roleAdmin === "owner"){
      return(
        <div className="dataPage">
          <SidebarMain/>
          <div className="container">
            <div className="content-header d-flex align-items-center justify-content-between">
              <h1>Transaction</h1>  
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
                    <input class="form-control form-control-lg" type="text" placeholder="Search" aria-label=".form-control-lg example" style={{width: '272px'}}/>
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
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
