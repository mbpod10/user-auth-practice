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

// //post new user
// router.post("/register", (req, res) => {
//   const { username, password, email, password2 } = req.body;
//   let errors = [];
//   //check fields
//   if (!username || !email || !password) {
//     errors.push({ message: "Please fill in required fields" });
//   }
//   if (password !== password2) {
//     errors.push({ message: "Passwords do not match" });
//   }
//   if (password.length < 6) {
//     errors.push({ message: "Password must contain at least 6 characters" });
//   }
//   if (errors.length > 0) {
//     res.json(errors);
//   } else {
//     //Validation passed
//     User.findOne({ email: email }).then((email) => {
//       if (email) {
//         errors.push({ message: "Email matches with existing user!" });
//         res.json(errors);
//       } else {
//         const newUser = new User({
//           username,
//           email,
//           password,
//         });
//         //Hash for encrytption
//         bcrypt.genSalt(10, (error, salt) =>
//           bcrypt.hash(newUser.password, salt, (error, hash) => {
//             if (error) console.log(error);
//             //Set password to hashed
//             newUser.password = hash;
//             //Save user
//             //newUser.save();
//             User.create(newUser, (error, user) => {
//               if (error) console.log(error);
//               else res.json("Success");
//             });
//             //   .then((user) => {
//             //     es.redirect("/login");
//             //   })
//             //   .catch((error) => console.log(error));
//           })
//         );

//         // console.log(newUser);
//         // res.json({ message: "Success!" });
//       }
//     });
//   }
// });

//post new user
router.post("/register", (req, res) => {
  const { username, password, email, password2 } = req.body;
  let errors = [];
  //check fields
  if (!username || !email || !password) {
    errors.push({ message: "Please fill in required fields" });
  }
  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }
  if (password.length < 6) {
    errors.push({ message: "Password must contain at least 6 characters" });
  }
  if (errors.length > 0) {
    res.json(errors);
  } else {
    //Validation passed
    User.findOne({ email: email }).then((email) => {
      if (email) {
        errors.push({ message: "Email matches with existing user!" });
        res.json(errors);
      } else {
        // const newUser = new User({
        //   username,
        //   email,
        //   password,
        // });
        //Hash for encrytption
        bcrypt.genSalt(10, (error, salt) =>
          bcrypt.hash(req.body.password, salt, (error, hash) => {
            if (error) console.log(error);
            //Set password to hashed
            req.body.password = hash;
            //Save user
            //newUser.save();
            User.create(req.body, (error, user) => {
              if (error) console.log(error);
              else res.json(user);
            });
            //   .then((user) => {
            //     es.redirect("/login");
            //   })
            //   .catch((error) => console.log(error));
          })
        );

        // console.log(newUser);
        // res.json({ message: "Success!" });
      }
    });
  }
});

//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
});

module.exports = router;

// username: req.params.username,
//           email: req.params.email,
//           password: req.params.password,
