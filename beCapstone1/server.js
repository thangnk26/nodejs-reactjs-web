import express from "express"; // thêm module express vào project .
import viewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
// import cors from "cors";
require("dotenv").config();

const app = express(); // khởi tạo app sử dụng module express
// app.use(cors({ origin: true }));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app); // link tới file viewEngine trong config
initWebRoutes(app); // link lưu trữ các route trong web

connectDB();

const port = process.env.PORT || 8085;

console.log(">>> check port:", port);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
