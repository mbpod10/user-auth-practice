const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
//

// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy(
//       { usernameField: "username" },
//       (username, password, done) => {
//         User.findOne({ username: username })
//           .then((user) => {
//             if (!user) {
//               return done(null, false, console.log("User Not Found"), {
//                 message: "User Not Found",
//               });
//             }

//             //Match Password
//             bcrypt.compare(password, user.password, (error, isMatch) => {
//               if (error) console.log(error);
//               if (isMatch) {
//                 return done(null, user, console.log("Login Successful"), {
//                   message: "Login Successful",
//                 });
//               } else {
//                 return done(null, false, console.log("Incorrect Password"), {
//                   message: "Incorrect Password",
//                 });
//               }
//             });
//           })
//           .catch((error) => console.log(error));
//       }
//     )
//   );
//   passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });
// };

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      (username, password, done) => {
        User.findOne({ username: username })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "User Not Found",
              });
            }

            //Match Password
            bcrypt.compare(password, user.password, (error, isMatch) => {
              if (error) console.log(error);
              if (isMatch) {
                return done(null, user, {
                  message: "Login Successful",
                });
              } else {
                return done(null, false, {
                  message: "Incorrect Password",
                });
              }
            });
          })
          .catch((error) => console.log(error));
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
