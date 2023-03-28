import React from "react";
import axios from "axios";
import Media from "../media";
import SidebarMain from "../sidebar/sidebarMain";

export default class Dasboard_admin extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      adminName: "",
      packageCount: 0,
      cashierCount: 0,
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
    let url = "http://localhost:8000/admin";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          adminName: admin,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
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
  getPackage = () => {
    let url = "http://localhost:8000/paket";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          packageCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(this.state.packageCount);
  };
  getCashier = () => {
    let url = "http://localhost:8000/admin/cashier";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          cashierCount: res.data.count,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(this.state.cashierCount);
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
    this.getPackage();
    this.getCashier();
    // this.getTransaksi();
  };
  render() {
    return (
      <div className="dashboard">
        <SidebarMain />
        <div className="container">
          <div className="content-header d-flex align-items-center justify-content-between">
            <h1>Dashboard</h1>
            <div className="profile d-flex align-items-center">
              {/* <div className="icon"> */}
              <Media value image="icon-profile.svg" alt="icon-profile.svg" />
              {/* </div> */}
              <p>{this.state.adminName}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-2">
              <div className="mini-stat d-flex align-items-center">
                <div className="icon">
                  <Media
                    value
                    image="icon-package-blue.svg"
                    alt="icon-package-blue.svg"
                  />
                </div>
                <div className="text">
                  <h2>{this.state.packageCount}</h2>
                  <h3>Package</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 my-2">
              <div className="mini-stat d-flex align-items-center">
                <div className="icon">
                  <Media
                    value
                    image="icon-cashier-blue.svg"
                    alt="icon-cashier-blue.svg"
                  />
                </div>
                <div className="text">
                  <h2>{this.state.cashierCount}</h2>
                  <h3>Cashier</h3>
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
                    image="icon-admin-blue.svg"
                    alt="icon-admin-blue.svg"
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
