import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ user, handleSubmit, handleChange, cancelPath }) => {
  console.log("LoginForm", user);

  return (
    <form onSubmit={handleSubmit}>
      <label>UserName: </label>
      <input
        placeholder="username"
        value={user.username}
        name="username"
        onChange={handleChange}
      />
      <br />
      <label>Password: </label>
      <input
        placeholder="password"
        value={user.password}
        name="password"
        onChange={handleChange}
      />
      <br /> <br />
      <button type="submit">Submit</button> <br />
      <br />
      <Link to={cancelPath}>
        <button>Cancel</button>
      </Link>
    </form>
  );
};

export default LoginForm;
