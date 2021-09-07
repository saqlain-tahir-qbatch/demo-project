import React from "react";
import "./App.css";
import Product from "./components/products";
import NavBar from "./components/appBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./components/cart";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/products">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
