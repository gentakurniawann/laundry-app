import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Outlet from "./pages/outlet";
import Admin from "./pages/admin";
import Customer from "./pages/customer";
import Transaction from "./pages/transaction";

export default class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/outlet" component={Outlet} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/customer" component={Customer} />
        <Route exact path="/transaction" component={Transaction} />
      </Switch>
    );
  }
}
