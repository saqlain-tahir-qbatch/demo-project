import Grid from "@material-ui/core/Grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../reducer/showProduct";
import Card from "./card";
import { getProductFromCart } from "../reducer/addToCart";

const Products = () => {
  const list = useSelector((state) => state.Products.Productlist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(getProductFromCart());
  }, [dispatch]);

  return (
    <Grid container spacing={4}>
      {list &&
        list.map((element, i) => {
          const { id, name, img, description, price } = element;
          return (
            <Grid item xs={3} key={id}>
              <Card
                id={id}
                heading={name}
                img={img}
                description={description}
                price={price}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Products;
