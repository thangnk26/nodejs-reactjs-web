import express from "express";

const configViewEngine = (app) => {
  app.use(express.static("./src/public")); //ảnh chỉ đc lấy trong public
  app.set("view engine", "ejs"); // khai báo NodeJS dùng viewEngine là EJS
  app.set("views", "./src/views");
};
export default configViewEngine;
