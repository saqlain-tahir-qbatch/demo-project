import express from "express";
const router = new express.Router();
import Product from "../models/products";

router.get("/products", async (req, res) => {
  try {
    const productData = await Product.find({});
    res.send(productData);
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await Product.find({id},{description:1, _id:0});
    res.send(productData);
  } catch (error) {
    return res.status(500).send(error);
  }
});


export default router;
