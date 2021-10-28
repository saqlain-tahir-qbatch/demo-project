import express from "express";
import cors from "cors";
import "./db/conn";
import Product from "./routers/products";
import Cart from "./routers/cart";
import User from "./routers/user";
import logger from 'morgan';



const app = express();
const port = process.env.API_PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(logger('common'));
app.use("/",Product);
app.use("/", Cart);
app.use('/',User)
app.listen(port, () => {
  console.log(`connnection is setup at ${port}`);
});
