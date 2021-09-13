import React from "react";
import SignIn from "./signIn";
import SignUp from "./signUp";
import { useSelector } from "react-redux";
import { Route, useRouteMatch, Redirect, Link, Switch } from "react-router-dom";

const Auth = () => {
  const isLoggedIn = useSelector((state) => state.User.isLoggedIn);
  const isRegister = useSelector((state) => state.User.isRegister);
  const { path } = useRouteMatch();
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#1e81b0" }}>Authentication</h1>
      <div style={{ textAlign: "center" }}>
        <Link to={`${path}/signIn`} style={{ color: "#1e81b0" }}>
          SignIn
        </Link>
        <Link to={`${path}/signUp`} style={{ color: "#1e81b0" }}>
          {" "}
          || SignUp
        </Link>
      </div>
      <Switch>
        <Route path={`${path}/signIn`}>
          {isLoggedIn ? <Redirect to="/products" /> : <SignIn />}
        </Route>
        <Route path={`${path}/signUp`}>
          {isRegister ? <Redirect to={`${path}/signIn`} /> : <SignUp />}
        </Route>
      </Switch>
    </div>
  );
};

export default Auth;
