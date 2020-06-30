import React from "react";
import { Router, navigate } from "@reach/router";
import Store from "../undux";
import net from "../services/net";

import Home from "../pages/Home";
import Hot from "../pages/Hot";
import Recommended from "../pages/Recommended";
import Discover from "../pages/Discover";
import Search from "../pages/Search";
import Following from "../pages/Following";
import History from "../pages/History";
import Live from "../pages/Live";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/Not-found";
import Category from "../pages/Category";
import Watch from "../pages/Watch";
import Channel from "../pages/Channel";
import Dashboard from "../pages/Dashboard";

const PrivateRoute = (props) => {
  const stores = Store.useStores();
  if (!stores.auth.get("isLogged")) {
    navigate("/");
    return null;
  }
  return React.createElement(props.component, props);
};

class Routes extends React.Component {
  async componentDidMount() {
    const response = await net.get("/auth/checksession");
    if (response.data.invalidSession === true) {
      this.props.auth.set("token")(null);
    } else {
      const response = await net.get("/channel/getfollowed");
      if(response.data.success) {
        const { profile } = this.props;
        profile.set("followedChannels")(response.data.channels);
      }
    }
  }

  render() {
    const { sidebar } = this.props;
    return (
      <Router
        className={`page-content ${sidebar.get("show") ? "" : "fullscreen"}`}
      >
        <Home path="/" />
        <Hot path="/hot" />
        <Live path="/live" />
        <Search path="/search/:info" />
        <Discover path="/discover" />
        <Recommended path="/recommended" />
        <Login path="/login" />
        <Register path="/register" />
        <Category path="/category/:category" />
        <Watch path="/watch/:link" />
        <Channel path="/channel/:link" />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/following" component={Following} />
        <PrivateRoute path="/history" component={History} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <NotFound path="*" />
      </Router>
    );
  }
}

export default Store.withStores(Routes);
