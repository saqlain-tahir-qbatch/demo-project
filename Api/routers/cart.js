import express from "express";
const Cartrouter = new express.Router();
import Cart from "../models/cart";

Cartrouter.get("/", async (req, res) => {
  try {
    res.send("Hello from cart");
  } catch (error) {
    res.status(500).send(error);
  }
});

Cartrouter.post("/cart", async (req, res) => {
  try {
    const { id, count } = req.body;
    const isexist = await Cart.find({ id });
    const update = await Cart.findOneAndUpdate(
      { id },
      { count: isexist[0].count + count }
    );
    res.send(update);
  } catch (error) {
    const cart = new Cart(req.body);
    const createCart = await cart.save();
    res.status(201).send(createCart);
  }
});
Cartrouter.get("/cart", async (req, res) => {
  try {
    const cartData = await Cart.find({});
    res.status(200).send(cartData);
  } catch (error) {
    res.status(500).send(error);
  }
});
Cartrouter.delete("/cart/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const cartData = await Cart.findOneAndDelete(id);
    if (!cartData) {
      return res.status(404).send();
    } else {
      res.send(cartData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
Cartrouter.patch("/cart/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cartData = await Cart.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.send(cartData);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default Cartrouter;
