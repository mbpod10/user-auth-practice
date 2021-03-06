import React from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import UserList from "./components/UserList";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App(props) {
  //console.log("App props -", props);
  return (
    <>
      <Switch>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/userList" component={UserList} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/user/register" component={Register} />
        </div>
      </Switch>
    </>
  );
}

export default withRouter(App);
