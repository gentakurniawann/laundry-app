import React from "react";
import axios from "axios";
import "./styles/dashboard.css";
import Dashboard_owner from "../component/dashboard/dashboard_owner";
import Dasboard_admin from "../component/dashboard/dashboard_admin";
import Dashboard_cashier from "../component/dashboard/dashboard_cashier";
import "./styles/dashboard.css";
export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      roleAdmin: "",
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

  componentDidMount = () => {
    this.getRoleAdmin();
  };

  render() {
    if (this.state.roleAdmin === "owner") {
      return (
        <div>
          <Dashboard_owner />
        </div>
      );
    } else if (this.state.roleAdmin === "admin") {
      return (
        <div>
          <Dasboard_admin />
        </div>
      );
    } else if (this.state.roleAdmin === "cashier") {
      return (
        <div>
          <Dashboard_cashier />
        </div>
      );
    }
  }
}
