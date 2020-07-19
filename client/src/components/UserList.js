import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const UserList = () => {
  const [user, setUsers] = useState([]);
  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const response = await axios(`http://localhost:4000/api/user`);
        console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    makeAPICall();
  }, []);

  const userName = user.map((element, index) => {
    return <h6>{element.username}</h6>;
  });
  return (
    <>
      <h1>User List</h1>
      <Link to="/">Home</Link> <br /> <br />
      <Link to="/user/register">Register</Link> <br />
      {userName}
    </>
  );
};

export default UserList;
