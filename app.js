const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config({ debug: true });

// express세팅
const app = express();

// mongo db세팅
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
// console.log("mongouri", MONGODB_URI_PROD);

// bodyparser세팅
app.use(bodyParser.json());

app.use(cors());
app.use("/api", indexRouter);

// 몽구스 세팅
const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

// 포트 설정
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("server on 5000");
});
