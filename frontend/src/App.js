import React from "react";
import "./App.css";
import Product from "./components/products";
import NavBar from "./components/appBar";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Cart from "./components/cart";
import NotFound from "./components/NotFound";
import Auth from "./components/Auth";
function App() {
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
          <Route path="/auth" component={Auth}></Route>
          <Redirect exact from='/' to="/products"/>
          <Route component={NotFound}></Route>
         
          </Switch>
      </Router>
    </div>
  );
}

export default App;
