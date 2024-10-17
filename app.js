const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
// express세팅
const app = express();

// bodyparser세팅
app.use(bodyParser.json());
app.use("/api", indexRouter);

// 몽구스 세팅
const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

// 앱리스너세팅
app.listen(5000, () => {
  console.log("server on 5000");
});
