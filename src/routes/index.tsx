import React from "react";
import { Router, RouteComponentProps } from "@reach/router";

import Home from "../pages/home";

let HomePage = (props: RouteComponentProps) => <Home />;

function Routes() {
  return (
    <Router>
      <HomePage path="/" />
    </Router>
  );
}

export default Routes;
