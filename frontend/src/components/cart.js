import React, { useEffect } from "react";
import { getProductFromCart } from "../reducer/addToCart";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import {
  add_remove_quantity,
  deleteProductFromCart,
} from "../reducer/addToCart";

const Cart = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.Cart.cartItem);
  const minusQuantity = (id, count) => {
    dispatch(add_remove_quantity({ count: count - 1, id: id }));
    dispatch(getProductFromCart());
  };
  const addQuantity = (id, count) => {
    dispatch(add_remove_quantity({ count: count + 1, id: id }));
    dispatch(getProductFromCart());
  };
  const removeFromCart = (id) => {
    dispatch(deleteProductFromCart({ id: id }));
  };
  useEffect(() => {
    dispatch(getProductFromCart());
  }, [dispatch]);
  return (
    <div style={{ display: "flex" }}>
      <Grid container>
        {list &&
          list.map((element, i) => {
            const { name, count, price, id } = element;
            return (
              <Grid item xs={4} key={id}>
                <h3>{name}</h3>
                <Button
                  disabled={count <= 1}
                  onClick={() => {
                    minusQuantity(id, count);
                  }}
                >
                  -
                </Button>
                <input value={count} />
                <Button
                  onClick={() => {
                    addQuantity(id, count);
                  }}
                >
                  +
                </Button>
                <h3>Price:{price}</h3>
                <h3>
                  Total:{price}x{count} = Rs. {price * count}
                </h3>
                <Button
                  color="primary"
                  backgroundcolor="primary"
                  onClick={() => {
                    removeFromCart(id);
                  }}
                >
                  Remove from cart
                </Button>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Cart;
