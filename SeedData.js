const mongoose = require("./dbs/connection");
const db = mongoose.connection;
const Stock = require("./models/Stock");
const { response } = require("express");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const main = async () => {
  await Stock.deleteMany({});
  const stocks = [
    {
      name: "American Express",
      symbol: "AXP",
      price: 187,
    },
    { name: "Microsoft", symbol: "MSFT", price: 203 },
    { name: "Amazon", symbol: "AMZN", price: 2950 },
    { name: "Apple", symbol: "AAPL", price: 298 },
    { name: "Caterpillar", symbol: "CAT", price: 125 },
    { name: "Cisco", symbol: "CSCO", price: 65 },
    { name: "CVX", symbol: "CVX", price: 58 },
    { name: "Exxon", symbol: "XOM", price: 65 },
    { name: "Goldman Sachs", symbol: "GS", price: 98 },
    { name: "Home Depot", symbol: "HD", price: 56 },
  ];
  await Stock.insertMany(stocks);
  //console.log("Created some items!", "test", test);
};
const run = async () => {
  await main();
  db.close();
};

run();
