import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginForm from "../shared/LoginForm";
import { Redirect } from "react-router-dom";

const Profile = (props) => {
  console.log(props.input);
  return (
    <>
      <h1>Profile</h1>
      <h1>Page</h1>
    </>
  );
};

export default Profile;
