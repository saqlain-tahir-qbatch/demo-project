import mongoose from "mongoose";

const cartScheme = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  userId: {
    type: String,
  }
});
const Cart = new mongoose.model("Cart", cartScheme);

export default Cart;
