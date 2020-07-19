import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const response = await axios(`http://localhost:4000/api/stocks`);
        console.log(response.data);
        setStocks(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    makeAPICall();
  }, []);

  const stockName = stocks.map((element, index) => {
    return <h6>{element.name}</h6>;
  });

  return (
    <>
      <h1>Home</h1>
      <h1>Welcome</h1>
      {stockName}
      <Link to="/user/register">Register</Link> <br />
      <Link to="/userList"> User List</Link>
    </>
  );
};

export default Home;
