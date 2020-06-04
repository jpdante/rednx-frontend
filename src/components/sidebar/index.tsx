import React from "react";
import { Link } from "@reach/router";
import { withTranslation, WithTranslation } from "react-i18next";

import MainNav from "./main-nav";

import styles from "./sidebar.module.scss";

class SideBar extends React.Component<WithTranslation> {
  state = {
    isAuthenticated: false,
  };

  logout = async () => {};

  render() {
    const { t } = this.props;
    return <div className="sidebar">
      <MainNav />
    </div>;
  }
}

export default withTranslation()(SideBar);
