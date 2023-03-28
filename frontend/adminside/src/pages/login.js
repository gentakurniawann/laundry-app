import React from "react";
import axios from "axios";
import Media from "../component/media";
import "./styles/login.css";
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleLogin = (e) => {
    e.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    let url = "http://localhost:8000/admin/auth";
    axios.post(url, data).then((res) => {
      if (res.data.logged) {
        let name = res.data.data.name;
        let admin = res.data.data;
        let role = res.data.data.role;
        let token = res.data.token;
        localStorage.setItem("name", name);
        localStorage.setItem("admin", JSON.stringify(admin));
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
        let role_admin = localStorage.getItem("role");
        if (role_admin === "owner") {
          window.location = "/";
        } else if (role_admin === "admin") {
          let outlet = res.data.data.id_outlet;
          localStorage.setItem("id_outlet", outlet);
          window.location = "/";
        } else if (role_admin === "cashier") {
          let outlet = res.data.data.id_outlet;
          localStorage.setItem("id_outlet", outlet);
          window.location = "/";
        } else {
          window.alert(res.data.message);
        }
      } else {
        window.alert(res.data.message);
      }
    });
  };
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-7 col-lg-4">
              <div className="form-login">
                <div className="row justify-content-center">
                  <div className="col-7">
                    <Media value image="logo.png" width="100%" height="48px" />
                  </div>
                  <form onSubmit={(e) => this.handleLogin(e)}>
                    <div className="username">
                      <label for="username" className="form-label">
                        Username :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Masukkan Username"
                        onChange={this.handleChange}
                        value={this.state.username}
                      />
                    </div>
                    <div className="password">
                      <label for="password" className="form-label">
                        Password :
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="*****"
                        onChange={this.handleChange}
                        value={this.state.password}
                      />
                    </div>
                    <div className="form-action">
                      <button type="submit" className="btn btn-login">
                        Login
                      </button>
                    </div>
                  </form>

                  <p class="text-center copyright">All Right Reserved © 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
