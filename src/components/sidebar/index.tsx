import React from "react";
import { Link } from "@reach/router";
import { withTranslation, WithTranslation } from "react-i18next";

import styles from "./sidebar.module.scss";

import MainNav from "./main-nav";
import FollowingNav from './following-nav';
import CategoryNav from "./category-nav";

class SideBar extends React.Component<WithTranslation> {
  state = {
    isAuthenticated: false,
  };

  logout = async () => {};

  render() {
    const { t } = this.props;
    return <div className="sidebar">
      <MainNav />
      <hr />
      <FollowingNav />
      <hr />
      <CategoryNav />
    </div>;
  }
}

export default withTranslation()(SideBar);
