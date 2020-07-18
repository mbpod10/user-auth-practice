router.post("/", async (req, res) => {
  let message = "Not Found";
  if (!req.body.password) {
    res.json({ message: "Please enter a valid password" });
  } else if (!req.body.email) {
    res.json({ message: "Please enter an email" });
  } else if (!req.body.username) {
    res.json({ message: "Please enter a valid username" });
  } else if (req.body.password.length <= 8) {
    res.json({ message: "Password must contain at least 8 characters" });
  } else {
    let user = {};
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user = {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      };
    } catch {
      res.status(500).send();
    }
    User.create(user, (error, user) => {
      if (error) console.log(error);
      else res.json(user);
    });
  }
});

// router.post("/login", (req, res) => {
//   User.findOne({ username: req.body.username }, (error, username) => {
//     if (error) console.log(error);
//     if (!username) {
//       res.json({ success: false, message: "User Not Found" });
//     } else if (username) {
//       User.findOne({ password: req.body.password }, (error, password) => {
//         //res.json({ success: true, message: "User Found" });
//         if (bcrypt.compare(req.body.password, password)) {
//           res.send("success");
//         } else {
//           ("wrong password");
//         }
//       });
//     } else {
//       res.json("Nothing Found");
//     }
//   });
// });

// router.post("/login", (req, res) => {
//   User.findOne({ username: req.body.username }, (error, username) => {
//     if (error) console.log(error);
//     if (!username) {
//       res.json({ success: false, message: "User Not Found" });
//     } else if (username) {
//       if (bcrypt.compare(req.body.password, password)) {
//         res.send("success");
//       } else {
//         ("wrong password");
//       }
//     } else {
//       res.json("Nothingfound");
//     }
//   });
// });

// router.post("/login", (req, res) => {
//   password = req.body.password;
//   User.findOne(password, (error, password) => {
//     if (error) {
//       console.log(error);
//     } else {
//       if (bcrypt.compare(password, req.body.password)) {
//         res.send({ success: true, message: "PassWord Match" });
//       } else {
//         res.send({ success: false, message: "Incorrect Password" });
//       }
//     }
//   });
// });

// router.post("/login", (req, res) => {
//   User.findOne({ username: req.body.username }, (error, username) => {
//     if (error) console.log(error);
//     if (!username) {
//       res.json({ success: false, message: "User Not Found" });
//     } else if (username) {
//       User.findOne({ password: req.body.password }, (error, password) => {
//         //res.json({ success: true, message: "User Found" });
//         if (bcrypt.compare(req.body.password, password)) {
//           res.send("success");
//         } else {
//           ("wrong password");
//         }
//       });
//     } else {
//       res.json("Nothing Found");
//     }
//   });
// });

// router.get("/:username", (req, res) => {
//   User.find({ username: req.params.username }, (error, username) => {
//     if (error) console.log(error);
//     else res.json(username);
//   });
// });
