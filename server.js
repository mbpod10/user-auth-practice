const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const practiceController = require("./controllers/stockRoute");
const userController = require("./controllers/userRoute");
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));
app.use("/api/stocks", practiceController);
app.use("/api/user", userController);

app.set("port", process.env.PORT || 8080);

// app.listen(app.get("port"), () => {
//   console.log(`PORT: 4000 ${app.get("4000")} `);
// });

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
