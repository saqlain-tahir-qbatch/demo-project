import mongoose from "mongoose";
require("dotenv").config();
const {MONGO_URI} = process.env;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connction is established");
  })
  .catch((err) => {
    console.log(err);
  });
