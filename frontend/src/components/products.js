import Grid from "@material-ui/core/Grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../reducer/showProduct";
import Card from "./card";
import { getProductFromCart } from "../reducer/addToCart";
import Cookies from "universal-cookie";
import { Route, useRouteMatch, Link, Switch } from "react-router-dom";
import Modal from "./modal";
import { fetchDescription } from "../reducer/showProduct";

const Products = () => {
  const list = useSelector((state) => state.Products.Productlist);
  const error = useSelector((state) => state.Products.error);
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    dispatch(fetchProduct());
    if (token) {
      dispatch(getProductFromCart(token));
    }
  }, [dispatch]);

  return (
    <>
      <div style={{ width: "75%" }}>
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
                  <Link
                    to={`${url}/modal/${id}`}
                    style={{
                      textDecoration: "none",
                      color: "#3F51B5",
                      paddingLeft: "13px",
                    }}
                    onClick={() => dispatch(fetchDescription({ id }))}
                  >
                    {" "}
                    DETAILS
                  </Link>
                </Grid>
              );
            })}
          <div>
            <h3 style={{ paddingLeft: "600px", paddingTop: "20px" }}>
              {error}
            </h3>
          </div>
        </Grid>
      </div>
      <div>
        <Route exact path={`${path}/modal/:id`}>
          <Modal />
        </Route>
      </div>
    </>
  );
};

export default Products;
