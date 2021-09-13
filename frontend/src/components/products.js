import Grid from "@material-ui/core/Grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../reducer/showProduct";
import Card from "./card";
import { getProductFromCart } from "../reducer/addToCart";
import Cookies from "universal-cookie";

const Products = () => {
  const list = useSelector((state) => state.Products.Productlist);
  const error = useSelector((state) => state.Products.error);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    dispatch(fetchProduct());
    if (token) {
      dispatch(getProductFromCart(token));
    }
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
      <div>
        <h3 style={{ paddingLeft: "600px", paddingTop: "20px" }}>{error}</h3>
      </div>
    </Grid>
  );
};

export default Products;
