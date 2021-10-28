import React from "react";
import "./App.css";
import Product from "./components/products";
import NavBar from "./components/appBar";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import Inventory from "./components/Inventory";
import { useSelector } from "react-redux";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Cart from "./components/cart";
import NotFound from "./components/NotFound";
function App() {
  const isLoggedIn = useSelector((state) => state.User.isLoggedIn);
  const isRegister = useSelector((state) => state.User.isRegister);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/products" >
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/Inventory">
            <Inventory />
          </Route>
          <Route path={`/signIn`}>
          {isLoggedIn ? <Redirect to="/products" /> : <SignIn />}
          </Route>
          <Route path={`/signUp`}>
          {isRegister ? <Redirect to={`$/signIn`} /> : <SignUp />}
          </Route>
          <Redirect from='/' to="/products"/>
          <Route path="*" component={NotFound}></Route>
         </Switch>
      </Router>
    </div>
  );
}

export default App;
