import express from "express";
const Cartrouter = new express.Router();
import Cart from "../models/cart";
import auth from "../middleware/auth";

Cartrouter.post("/cart", auth, async (req, res) => {
  let email;
  const { id, count, name, price } = req.body;
  email = req.user;
  try {
    const isCartExist = await Cart.findOne({ id, userId: email });
    if (isCartExist) {
      const update = await Cart.findOneAndUpdate(
        { id, userId: email },
        { count: isCartExist.count + count }
      );
      res.send(update);
    } else {
      const data = {
        id,
        name,
        count,
        price,
        userId: email,
      };
      const cart = new Cart(data);
      const createCart = await cart.save();
      res.status(201).send(createCart);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
Cartrouter.get("/cart", auth, async (req, res) => {
  try {
    const email = req.user;
    const cartData = await Cart.find({ userId: email });
    res.status(200).send(cartData);
  } catch (error) {
    res.status(500).send(error);
  }
});
Cartrouter.delete("/cart/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.user;
    const cartData = await Cart.findOneAndDelete({ id, userId: email });
    if (!cartData) {
      return res.status(404).send();
    } else {
      res.send(cartData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
Cartrouter.patch("/cart/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.user;
    const cartData = await Cart.findOneAndUpdate(
      { id, userId: email },
      req.body,
      {
        new: true,
      }
    );
    res.send(cartData);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default Cartrouter;
