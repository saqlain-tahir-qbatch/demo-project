const express = require("express");
require("./db/conn");
const productRouter = require("./routers/products");
const app = express();
const port = process.env.Port || 3000;


app.use(express.json());
app.use(productRouter);

 


app.listen(port, () => {
  console.log(`connnection is setup at ${port}`);
})