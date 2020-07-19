import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginForm from "../shared/LoginForm";

const Login = (props) => {
  console.log("Login", props);
  const [errors, setError] = useState([]);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);

  const handleChange = (event) => {
    console.log("event", event.target.name, event.target.value);
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
      .then((res) => {
        setUser({ createdItem: res.data.user });
        props.history.push("/login");
        console.log(res);
        //setError(res.data);
      })
      .catch(console.error);
  };

  return (
    <>
      <h1>Login</h1>
      <LoginForm
        user={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />{" "}
      <br /> <br />
      <Link to="/">Home</Link> <br /> <br />
      <Link to="/userList"> User List</Link> <br /> <br />
    </>
  );
};

export default Login;
