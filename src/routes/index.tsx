import React from "react";
import { Router, RouteComponentProps, navigate } from "@reach/router";
import Store from "../undux";

import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Profile from "../pages/profile";
import NotFound from "../pages/not-found";
import Category from "../pages/category";

const HomePage = (props: RouteComponentProps) => <Home />;
const LoginPage = (props: RouteComponentProps) => <Login />;
const RegisterPage = (props: RouteComponentProps) => <Register />;
const NotFoundPage = (props: RouteComponentProps) => <NotFound />;
const CategoryPage = (props: RouteComponentProps) => <Category />;

interface PrivateRouteComponentProps extends RouteComponentProps {
  component: any;
};

const PrivateRoute = (props: PrivateRouteComponentProps) => {
  const stores = Store.useStores();
  if(!stores.auth.get("isLogged")) {
    navigate("/");
    return (null);
  }
  return props.component;
}

function Routes() {
  return (
    <Router className="page-content">
      <HomePage path="/" />
      <LoginPage path="/login" />
      <RegisterPage path="/register" />
      <CategoryPage path="/category/:category" />
      <PrivateRoute path="/profile" component={<Profile />}/>
      <NotFoundPage path="*" />
    </Router>
  );
}

export default Routes;
