import express from "express";
import cors from "cors";
import "./db/conn";
import Product from "./routers/products";
import Cart from "./routers/cart";
const app = express();
const port = process.env.Port || 3000;

app.use(cors());
app.use(express.json());
app.use("/", Product);
app.use("/", Cart);

app.listen(port, () => {
  console.log(`connnection is setup at ${port}`);
});
