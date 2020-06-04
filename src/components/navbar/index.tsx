import React from "react";
import { Link } from "@reach/router";
import { withTranslation, WithTranslation } from "react-i18next";

import SearchBar from "./search-bar";
import NavLink from "./nav-link";

import ButtonBar from "./button-bar";

class NavBar extends React.Component<WithTranslation> {
  state = {
    isAuthenticated: false,
  };

  logout = async () => {};

  render() {
    const { t } = this.props;
    return (
      <nav
        className="navbar navbar-dark navbar-expand-md justify-content-center"
      >
        <div className="w-100 visible-md text-center">
          <a href="/" className="navbar-brand">
            <span style={{ color: "#B10003" }}> Red</span>NX
          </a>
          <SearchBar hasNavbarToggler={true} />
        </div>
        <div
          className="navbar-collapse collapse w-100"
          id="mainNavbarColappser"
        >
          <div className="d-flex w-100 mr-auto navbar-margin-top-md">
            <Link to="/" className="navbar-brand hidden-md">
              <span style={{ color: "#B10003" }}> Red</span>NX
            </Link>
            <ul className="navbar-nav w-100">
              <NavLink to="/">{t("components.navbar.home")}</NavLink>
              <NavLink to="/discover">
                {t("components.navbar.discover")}
              </NavLink>
            </ul>
          </div>
          <ul className="navbar-nav w-100 justify-content-center hidden-md">
            <SearchBar hasNavbarToggler={false} />
          </ul>
          <ButtonBar />
        </div>
      </nav>
    );
  }
}

export default withTranslation()(NavBar);
