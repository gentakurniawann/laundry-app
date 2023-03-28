import React from "react";
import axios from "axios";
import SidebarOwner from "./sidebarOwner";
import SidebarAdmin from "./sidebarAdmin";
import SidebarCashier from "./sidebarCashier";

export default class SidebarMain extends React.Component {
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
          roleAdmin: role
        })
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(this.state.roleAdmin)
  };

  componentDidMount = () => {
    this.getRoleAdmin();
  };
  render() {
    if (this.state.roleAdmin === "owner") {
      return (
        <div>
          <SidebarOwner />
        </div>
      );
    } else if (this.state.roleAdmin === "admin") {
      return (
        <div>
          <SidebarAdmin />
        </div>
      );
    } else if (this.state.roleAdmin === "cashier") {
      return (
        <div>
          <SidebarCashier />
        </div>
      );
    }
  }
}
