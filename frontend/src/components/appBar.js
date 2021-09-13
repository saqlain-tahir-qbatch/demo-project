import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { Badge } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  product: {
    paddingRight: 20,
    color: "white",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const count = useSelector((state) => state.Cart.count);
  const { first_name } = useSelector((state) => state.User.userList);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Shopping Cart
          </Typography>
          <Typography variant="h6" className={classes.product}>
            logged in as {first_name}
          </Typography>
          <NavLink to="/products">
            <Typography variant="h6" className={classes.product}>
              Products
            </Typography>
          </NavLink>

          <NavLink to="auth/signUp">
            <Typography variant="h6" className={classes.product}>
              SignUp
            </Typography>
          </NavLink>
          <NavLink to="/cart">
            <Badge color="secondary" badgeContent={count}>
              <ShoppingCartRoundedIcon />
            </Badge>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
