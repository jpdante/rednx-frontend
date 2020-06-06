import React, { Suspense } from "react";

import "./services/i18n";
import "./libraries/fontawesome";

import Store from "./undux";
import Routes from "./routes";

import Loading from "./components/loading";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
import Modals from "./components/modals";

class App extends React.Component {
  render() {
    return (
      <Store.Container>
        <Suspense fallback={<Loading />}>
          <div className="content">
            <NavBar />
            <Modals />
            <div className="wrapper">
              <SideBar />
              <Routes />
            </div>
          </div>
        </Suspense>
      </Store.Container>
    );
  }
}

export default App;
