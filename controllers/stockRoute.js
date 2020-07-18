const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");
//const User = require("../models/User");

// all stocks
router.get("/", (req, res) => {
  Stock.find({}).then((stocks) => {
    res.json(stocks);
  });
});

// get stock by id
router.get("/:id", (req, res) => {
  Stock.findById(req.params.id, (error, stock) => {
    if (error) console.log(error);
    else res.send(stock);
  });
});

// create stock
router.post("/", (req, res) => {
  Stock.create(req.body, (error, stock) => {
    if (error) console.log(error);
    else res.send(stock);
  });
});

//update stock
router.put("/:id", (req, res) => {
  Stock.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, stock) => {
      if (error) console.log(error);
      else res.send(stock);
    }
  );
});

//delete by id
router.delete("/:id", (req, res) => {
  Stock.deleteOne({ _id: req.params.id }).then((stock) => {
    res.json(stock);
  });
});

router.get("/:id/information", (req, res) => {
  Stock.find({ _id: req.params.id })
    .populate("info")
    .then((stocks) => {
      res.json(stocks);
    });
});

// router.get("/u/login", (req, res) => {
//   User.find({}, (error, users) => {
//     if (error) console.log(error);
//     else res.json(users);
//   });
// });
module.exports = router;
