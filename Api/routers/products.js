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

export default router;
