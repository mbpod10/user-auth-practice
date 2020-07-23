const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
var cookieSession = require("cookie-session");
const passport = require("passport");
const practiceController = require("./controllers/stockRoute");
const userController = require("./controllers/userRoute");

const PORT = process.env.PORT || 4000;

require("./config/passport")(passport);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use("/api/stocks", practiceController);
app.use("/api/user", userController);
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.set("port", process.env.PORT || 8080);

// app.listen(app.get("port"), () => {
//   console.log(`PORT: 4000 ${app.get("4000")} `);
// });

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
