const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      (username, password, done) => {
        User.findOne({ username: username })
          .then((user) => {
            if (!user) {
              return done({ message: "User Not Found" }, false);
            }

            //Match Password
            bcrypt.compare(password, user.password, (error, isMatch) => {
              if (error) console.log(error);
              if (isMatch) {
                return done(
                  {
                    message: "Login Successful",
                  },
                  user,
                  console.log("Login Successful")
                );
              } else {
                return done(
                  {
                    message: "Incorrect Password",
                  },
                  false,
                  console.log("Incorrect Password")
                );
              }
            });
          })
          .catch((error) => console.log(error));
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function (username, done) {
    User.findOne({ username }, function (err, user) {
      done(err, user);
    });
  });
};
