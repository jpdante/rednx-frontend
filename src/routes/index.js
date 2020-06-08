import React from "react";
import { Router, navigate } from "@reach/router";
import Store from "../undux";

import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Profile from "../pages/profile";
import NotFound from "../pages/not-found";
import Category from "../pages/category";
import Watch from "../pages/watch";

const PrivateRoute = (props) => {
  const stores = Store.useStores();
  if(!stores.auth.get("isLogged")) {
    navigate("/");
    return (null);
  }
  return React.createElement(props.component, props);
}

function Routes() {
  return (
    <Router className="page-content">
      <Home path="/" />
      <Login path="/login" />
      <Register path="/register" />
      <Category path="/category/:category" />
      <Watch path="/watch/:link" />
      <PrivateRoute path="/profile" component={Profile}/>
      <NotFound path="*" />
    </Router>
  );
}

export default Routes;
