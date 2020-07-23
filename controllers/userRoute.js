const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const { deleteOne } = require("../models/User");

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
    User.find({}, "email", (error, emailLoop) => {
      if (error) console.log(error);
      else if (emailLoop.length < 1) {
        bcrypt.genSalt(10, (error, salt) =>
          bcrypt.hash(req.body.password, salt, (error, hash) => {
            if (error) console.log(error);
            req.body.password = hash;
            bcrypt.hash(req.body.email, salt, (error, hash2) => {
              if (error) console.log(error);
              req.body.email = hash2;
              User.create(req.body, (error, user) => {
                if (error) console.log(error);
                else res.json(user);
              });
            });
          })
        );
      } else if (emailLoop.length >= 1) {
        console.log(emailLoop);
        emailLoop.forEach((element, index) => {
          bcrypt.compare(req.body.email, element.email, (error, isMatch) => {
            if (error) console.log(error);
            if (isMatch) {
              console.log(isMatch);
              //return done("Email Matches Existing User", false);
              res.json({ message: "Email Match Existing User" });
            } else {
              bcrypt.genSalt(10, (error, salt) =>
                bcrypt.hash(req.body.password, salt, (error, hash) => {
                  if (error) console.log(error);
                  req.body.password = hash;
                  bcrypt.hash(req.body.email, salt, (error, hash2) => {
                    if (error) console.log(error);
                    req.body.email = hash2;
                    User.create(req.body, (error, user) => {
                      if (error) console.log(error);
                      else res.json(user);
                    });
                  });
                })
              );
            }
          });
        });
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user) => {
    if (error) {
      return res.json({
        message: error || "Something Went Wrong",
      });
    }
    req.login(user, function (error) {
      if (error) {
        return res.status(500).json({
          message: error || "Something Went Wrong",
        });
      }
      user.isAuthenticated = true;

      //console.log(req.user);
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

router.get("/email", (req, res) => {
  User.find({}, "email", (error, email) => {
    if (error) console.log(error);
    else res.json(email);
  });
});

// User.find({}, "email", (error, emailLoop) => {
//   if(error) console.log(error)
//   else {
//       emailLoop.forEach((element, index) => {
//           bcrypt.compare(email, element.email, (error, isMatch) => {
//             if(error) console.log(error)
//             if(isMatch){
//               return done(null, email)
//             }else{
//               return done(
//                 "Email Already Exists", false
//               )
//             }
//           })
//       })
//   }
// })
module.exports = router;
