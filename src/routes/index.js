import React from "react";
import { Router, navigate } from "@reach/router";
import Store, { StoreProps } from "../undux";
import net from "../services/net";

import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Profile from "../pages/profile";
import NotFound from "../pages/not-found";
import Category from "../pages/category";
import Watch from "../pages/watch";
import Channel from "../pages/channel";

const PrivateRoute = (props) => {
  const stores = Store.useStores();
  if (!stores.auth.get("isLogged")) {
    navigate("/");
    return null;
  }
  return React.createElement(props.component, props);
};

/*function Routes() {
  let stores = Store.useStores();
  const response = await net.get("/auth/checksession");
  console.warn(response);
  if (response.data.invalidSession === true) {
    stores.auth.set("token")(null);
  }
  return (
    <Router className={`page-content ${stores.sidebar.get("show") ? "" : "fullscreen"}`}>
      <Home path="/" />
      <Login path="/login" />
      <Register path="/register" />
      <Category path="/category/:category" />
      <Watch path="/watch/:link" />
      <Channel path="/channel/:link" />
      <PrivateRoute path="/profile" component={Profile}/>
      <NotFound path="*" />
    </Router>
  );
}

export default Routes;*/

class Routes extends React.Component {
  async componentDidMount() {
    const response = await net.get("/auth/checksession");
    console.warn(response);
    if (response.data.invalidSession === true) {
      this.props.auth.set("token")(null);
    }
  }

  render() {
    const { sidebar } = this.props;
    return (
      <Router
        className={`page-content ${sidebar.get("show") ? "" : "fullscreen"}`}
      >
        <Home path="/" />
        <Login path="/login" />
        <Register path="/register" />
        <Category path="/category/:category" />
        <Watch path="/watch/:link" />
        <Channel path="/channel/:link" />
        <PrivateRoute path="/profile" component={Profile} />
        <NotFound path="*" />
      </Router>
    );
  }
}

export default Store.withStores(Routes);
