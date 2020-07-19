import React from "react";
import { Link } from "react-router-dom";

const UserForm = ({ user, handleSubmit, handleChange, cancelPath }) => {
  console.log("UserForm", user);

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
      <label>Email: </label>
      <input
        placeholder="email"
        value={user.email}
        name="email"
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
      <br />
      <label>Confirm Password: </label>
      <input
        placeholder="confirm password"
        value={user.password2}
        name="password2"
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
      <Link to={cancelPath}>
        <button>Cancel</button>
      </Link>
    </form>
  );
};

export default UserForm;
