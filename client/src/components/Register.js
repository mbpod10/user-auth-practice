import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserForm from "../shared/UserForm";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Register = (props) => {
  console.log("ItemCreate props", props);
  const [errors, setError] = useState([]);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
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
      url: "http://localhost:4000/api/user/register",
      method: "POST",
      data: input,
    })
      .then((res) => {
        setUser({ createdItem: res.data.user });
        props.history.push("/user/register");
        console.log(res.data);
        setError(res.data);
      })
      .catch(console.error);
  };
  console.log("error", errors);

  const errorArray = errors.map((element, index) => {
    return <h4>{element.message}</h4>;
  });

  const success = "Register Success";
  return (
    <>
      <h1>Register</h1>
      {errors ? errorArray : <h1>{input.username}Created</h1>}
      {/* {errorArray} */}
      <UserForm
        user={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />{" "}
      <br />
      <Link to="/">Home</Link> <br /> <br />
      <Link to="/userList"> User List</Link> <br /> <br />
      <Link to="/login"> Login </Link>
    </>
  );
};

export default Register;
