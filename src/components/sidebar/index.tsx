import React from "react";

import MainNav from "./main-nav";
import FollowingNav from "./following-nav";
import CategoryNav from "./category-nav";
import Store from "../../undux";

import styles from "./sidebar.module.scss";

function SideBar() {
  const { auth, sidebar } = Store.useStores();
  return (
    <div className={`${styles.sidebar} ${!sidebar.get("show") && styles.hide}`}>
      <MainNav />
      {auth.get("isLogged") && <hr />}
      {auth.get("isLogged") && <FollowingNav />}
      <hr />
      <CategoryNav />
    </div>
  );
}

export default SideBar;
