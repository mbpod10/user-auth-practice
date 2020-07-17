//import connection
const mongoose = require("../dbs/connection");
const { Schema } = require("../dbs/connection");

/* Create Cookbook as new schema
    Properties:
    title (string),
    yearPublished (integer),
*/
const StockSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number,
});

//export model
const Stock = mongoose.model("Stocks", StockSchema);
module.exports = Stock;
