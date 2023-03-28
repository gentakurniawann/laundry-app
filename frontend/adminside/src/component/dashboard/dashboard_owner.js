import React from "react";
import axios from "axios";
import Media from "../media";
import SidebarMain from "../sidebar/sidebarMain";

export default class Dashboard_owner extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      adminName: "",
      adminCount: 0,
      outletCount: 0,
      customerCount: 0,
      transaksiCount: 0,
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
    let role = localStorage.getItem("role");
    let url = "http://localhost:8000/admin";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          adminName: admin,
          adminCount: res.data.count,
          roleAdmin: role,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(this.state.adminCount);
  };
  getCustomer = () => {
    let url = "http://localhost:8000/customer";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          customerCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(this.state.customerCount);
  };
  getOutlet = () => {
    let url = "http://localhost:8000/outlet";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          outletCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(this.state.outletCount);
  };
  // getTransaksi = () => {
  //   let url = "http://localhost:8000/transaksi";
  //   axios
  //     .get(url, this.headerConfig())
  //     .then((res) => {
  //       this.setState({
  //         transaksiCount: res.data.count,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };
  componentDidMount = () => {
    this.getAdmin();
    this.getCustomer();
    this.getOutlet();
    // this.getTransaksi();
  };
  render() {
    if (this.state.roleAdmin === "owner") {
      return (
        <div className="dashboard">
          <SidebarMain />
          <div className="container">
            <div className="content-header d-flex align-items-center justify-content-between">
              <h1>Dashboard</h1>  
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
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-2">
                <div className="mini-stat d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-outlet-blue.svg"
                      alt="icon-outlet-blue.svg"
                    />
                  </div>
                  <div className="text">
                    <h2>{this.state.outletCount}</h2>
                    <h3>Outlet</h3>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-2">
                <div className="mini-stat d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-admin-blue.svg"
                      alt="icon-admin-blue.svg"
                    />
                  </div>
                  <div className="text">
                    <h2>{this.state.adminCount}</h2>
                    <h3>Admin</h3>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-2">
                <div className="mini-stat d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-customer-blue.svg"
                      alt="icon-customer-blue.svg"
                    />
                  </div>
                  <div className="text">
                    <h2>{this.state.customerCount}</h2>
                    <h3>Customer</h3>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-2">
                <div className="mini-stat d-flex align-items-center">
                  <div className="icon">
                    <Media
                      value
                      image="icon-transaction-blue.svg"
                      alt="icon-transaction-blue.svg"
                    />
                  </div>
                  <div className="text">
                    <h2>{this.state.transaksiCount}</h2>
                    <h3>Transaction</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
