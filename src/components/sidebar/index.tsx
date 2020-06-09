import React from "react";

import MainNav from "./main-nav";
import FollowingNav from "./following-nav";
import CategoryNav from "./category-nav";
import Store from "../../undux";

import styles from "./sidebar.module.scss";

function SideBar() {
  let stores = Store.useStores();
  return (
    <div className={`${styles.sidebar} ${!stores.sidebar.get("show") && styles.hide}`}>
      <MainNav />
      <hr />
      <FollowingNav />
      <hr />
      <CategoryNav />
    </div>
  );
}

export default SideBar;
