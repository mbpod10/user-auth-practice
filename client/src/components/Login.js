import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginForm from "../shared/LoginForm";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Profile from "../components/Profile";

const Login = (props) => {
  // console.log("Login", props);
  const [errors, setError] = useState("");
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    // console.log("event", event.target.name, event.target.value);
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    axios({
      url: "http://localhost:4000/api/user/login",
      method: "POST",
      data: input,
    })
      .then((req, res) => {
        console.log(user);
        console.log(res);
        setError(res.data.message);
        setUser({ createdItem: res.data.user });
        console.log(res.data.username);
        setUsername(res.data.username);
        this.props.history.push("/profile");
        console.log(req);
        //setError(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("error", errors);
  return (
    <>
      {username ? <Redirect to="/profile" /> : errors}
      {/* {errors.message} */}
      {/* <h1>
        {errors.message === "Login Successful" ? (
          <h1>{username} Logged In </h1>
        ) : (
          errors.message
        )}
      </h1> */}
      <h1>Login</h1>
      <LoginForm
        user={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
      <br /> <br />
      <Link to="/">Home</Link> <br /> <br />
      <Link to="/userList"> User List</Link> <br /> <br />
      {/* <Switch>
        <Route
          exact
          path="/profile"
          component={() => <Profile user={user} />}
        />
      </Switch> */}
    </>
  );
};

export default Login;
