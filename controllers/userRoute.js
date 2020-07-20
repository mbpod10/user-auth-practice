const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");

router.get("/", (req, res) => {
  User.find({}, (error, users) => {
    if (error) console.log(error);
    else res.json(users);
  });
});

// delete all
router.delete("/", (req, res) => {
  User.deleteMany({}, (error, users) => {
    if (error) console.log(error);
    else res.json(users);
  });
});

//post new user
router.post("/register", (req, res) => {
  const { username, password, email, password2 } = req.body;
  let errors = [];
  //check fields
  if (!username || !email || !password) {
    errors.push({ message: "Please Fill In Required Fields" });
  }
  if (password !== password2) {
    errors.push({ message: "Passwords Do Not Match" });
  }
  if (password.length < 6) {
    errors.push({ message: "Password Must Contain At Least 6 Characters" });
  }
  if (errors.length > 0) {
    res.json(errors);
  } else {
    //Validation passed
    User.findOne({ email: email }).then((email) => {
      if (email) {
        errors.push({ message: "Email Matches With Existing User" });
        res.json(errors);
      } else {
        bcrypt.genSalt(10, (error, salt) =>
          bcrypt.hash(req.body.password, salt, (error, hash) => {
            if (error) console.log(error);
            req.body.password = hash;
            User.create(req.body, (error, user) => {
              if (error) console.log(error);
              else res.json(user);
            });
          })
        );
      }
    });
  }
});

//Login Handle

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (error, user, info) => {
//     if (error) {
//       return res.json({
//         message: error || "Something Went Wrong",
//       });
//     }
//     return res.json(user);
//   })(req, res, next);
// });

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.json({
        message: error || "Something Went Wrong",
      });
    }
    req.login(user, function (error) {
      if (error) {
        return res.json({
          message: error || "Something Went Wrong",
        });
      }
      user.isAuthenticated = true;
      return res.json(user);
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logged Out" });
});

router.get("/api", (req, res) => {
  //const username = req.user.username;
  console.log(req);
  res.json({ message: "Hello" });
});

module.exports = router;
