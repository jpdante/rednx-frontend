import React from "react";
import { Router, RouteComponentProps } from "@reach/router";

import Home from "../pages/home";
import Login from "../pages/login";
import NotFound from "../pages/not-found";

let HomePage = (props: RouteComponentProps) => <Home />;
let LoginPage = (props: RouteComponentProps) => <Login />;
let NotFoundPage = (props: RouteComponentProps) => <NotFound />;

function Routes() {
  return (
    <Router className="page-content">
      <HomePage path="/" />
      <LoginPage path="/login" />
      <NotFoundPage path="*" />
    </Router>
  );
}

export default Routes;
