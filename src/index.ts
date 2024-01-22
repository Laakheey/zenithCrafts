// require('dotenv').config();
import dotenv from "dotenv";
import express from "express";
import auth_router from "./router/auth-router";
import connectDb from "./utils/db";
import productRouter from "./router/product-router";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", auth_router);
app.use("/api/product", productRouter);

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening to port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("Internet connection problem");
  });
