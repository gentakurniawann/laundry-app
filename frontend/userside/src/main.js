import React from "react"
import { Route, Switch } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Home from "./pages/home"
export default class Main extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/' component={Home}/>

            </Switch>
        )
    }
}